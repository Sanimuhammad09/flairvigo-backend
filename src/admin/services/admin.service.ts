import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAnalyticsOverview() {
    const totalOrders = await this.prisma.order.count();
    const totalRevenueResult = await this.prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } },
    });
    
    const topProducts = await this.prisma.orderItem.groupBy({
      by: ['variantId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    const activeCustomers = await this.prisma.user.count({
      where: { role: 'USER' },
    });

    return {
      totalOrders,
      totalRevenue: totalRevenueResult._sum.totalAmount || 0,
      activeCustomers,
      topProducts,
    };
  }

  async createProduct(data: any) {
    return this.prisma.$transaction(async (tx) => {
      const { variants, images, categoryId, collectionId, ...productData } = data;
      
      const product = await tx.product.create({
        data: {
          ...productData,
          categoryId,
          collectionId,
        },
      });

      if (variants && variants.length > 0) {
        await tx.productVariant.createMany({
          data: variants.map((v: any) => ({
            ...v,
            productId: product.id,
          })),
        });
      }

      if (images && images.length > 0) {
        await tx.productImage.createMany({
          data: images.map((img: any) => ({
            ...img,
            productId: product.id,
          })),
        });
      }

      return tx.product.findUnique({
        where: { id: product.id },
        include: { variants: true, images: true },
      });
    });
  }

  async updateProduct(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getProducts() {
    return this.prisma.product.findMany({
      include: { variants: true, category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLowStockInventory() {
    return this.prisma.productVariant.findMany({
      where: {
        isInventoryTracked: true,
        inventory: {
          lte: this.prisma.productVariant.fields.lowStockThreshold,
        },
      },
      include: { product: true },
    });
  }

  async updateInventory(variantId: string, inventory: number) {
    return this.prisma.productVariant.update({
      where: { id: variantId },
      data: { inventory },
    });
  }

  async getOrders() {
    return this.prisma.order.findMany({
      include: { 
        user: true,
        items: {
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateOrderStatus(orderId: string, status: any) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status,
          note: `Admin updated status to ${status}`,
        },
      });

      return order;
    });
  }
}
