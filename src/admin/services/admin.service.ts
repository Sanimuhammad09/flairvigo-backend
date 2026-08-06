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
    
    const topProductsGrouping = await this.prisma.orderItem.groupBy({
      by: ['variantId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    const topProducts = await Promise.all(
      topProductsGrouping.map(async (group) => {
        const variant = await this.prisma.productVariant.findUnique({
          where: { id: group.variantId },
          include: { product: true }
        });
        return {
          variant,
          totalQuantitySold: group._sum.quantity,
        };
      })
    );

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

  async getCustomers() {
    return this.prisma.user.findMany({
      where: { role: 'USER' },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { orders: true }
        }
      }
    });
  }

  async deleteCustomer(id: string) {
    return this.prisma.user.delete({
      where: { id }
    });
  }

  async updateCustomer(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  async getCoupons() {
    return this.prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createCoupon(data: any) {
    return this.prisma.coupon.create({
      data
    });
  }

  async deleteCoupon(id: string) {
    return this.prisma.coupon.delete({
      where: { id }
    });
  }

  async getSettings() {
    let settings = await this.prisma.storeSettings.findUnique({
      where: { id: 'global' }
    });
    if (!settings) {
      settings = await this.prisma.storeSettings.create({
        data: { id: 'global' }
      });
    }
    return settings;
  }

  async updateSettings(data: any) {
    return this.prisma.storeSettings.upsert({
      where: { id: 'global' },
      update: data,
      create: { ...data, id: 'global' }
    });
  }
}
