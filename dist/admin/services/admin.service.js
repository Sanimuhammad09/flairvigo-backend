"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
        const topProducts = await Promise.all(topProductsGrouping.map(async (group) => {
            const variant = await this.prisma.productVariant.findUnique({
                where: { id: group.variantId },
                include: { product: true }
            });
            return {
                variant,
                totalQuantitySold: group._sum.quantity,
            };
        }));
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
    async createProduct(data) {
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
                    data: variants.map((v) => ({
                        ...v,
                        productId: product.id,
                    })),
                });
            }
            if (images && images.length > 0) {
                await tx.productImage.createMany({
                    data: images.map((img) => ({
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
    async updateProduct(id, data) {
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }
    async deleteProduct(id) {
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
    async updateInventory(variantId, inventory) {
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
    async updateOrderStatus(orderId, status) {
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
    async deleteCustomer(id) {
        return this.prisma.user.delete({
            where: { id }
        });
    }
    async getCoupons() {
        return this.prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    async createCoupon(data) {
        return this.prisma.coupon.create({
            data
        });
    }
    async deleteCoupon(id) {
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
    async updateSettings(data) {
        return this.prisma.storeSettings.upsert({
            where: { id: 'global' },
            update: data,
            create: { ...data, id: 'global' }
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map