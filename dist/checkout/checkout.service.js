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
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const payments_service_1 = require("../payments/payments.service");
let CheckoutService = class CheckoutService {
    prisma;
    paymentsService;
    constructor(prisma, paymentsService) {
        this.prisma = prisma;
        this.paymentsService = paymentsService;
    }
    async initializeCheckout(userId, data) {
        const { items, paymentMethod, shippingAddress, billingAddress, email } = data;
        if (!items || items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        if (paymentMethod !== 'PAYSTACK' && paymentMethod !== 'BANK_TRANSFER') {
            throw new common_1.BadRequestException('Invalid payment method');
        }
        let subtotal = 0;
        for (const item of items) {
            const variant = await this.prisma.productVariant.findUnique({ where: { id: item.variantId }, include: { product: true } });
            if (!variant)
                throw new common_1.BadRequestException(`Variant ${item.variantId} not found`);
            subtotal += (variant.product.basePrice + variant.priceOffset) * item.quantity;
        }
        const taxAmount = subtotal * 0.075;
        const shippingCost = 1500;
        const totalAmount = subtotal + taxAmount + shippingCost;
        const order = await this.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    orderNumber: `ORD-${Date.now()}`,
                    userId,
                    status: 'PENDING_PAYMENT',
                    paymentMethod,
                    totalAmount,
                    subtotal,
                    taxAmount,
                    shippingCost,
                    shippingAddress: shippingAddress || {},
                    billingAddress: billingAddress || {},
                },
            });
            await tx.orderItem.createMany({
                data: items.map((item) => ({
                    orderId: newOrder.id,
                    variantId: item.variantId,
                    quantity: item.quantity,
                    unitPrice: 0,
                })),
            });
            return newOrder;
        });
        if (paymentMethod === 'PAYSTACK') {
            return this.paymentsService.initializePaystack(order.id, email, totalAmount);
        }
        else {
            return {
                message: 'Order created successfully. Please transfer the total amount to the bank account provided.',
                orderId: order.id,
                amount: totalAmount,
                bankDetails: {
                    bankName: 'Guaranty Trust Bank',
                    accountName: 'Flair Vigo',
                    accountNumber: '0123456789',
                },
            };
        }
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payments_service_1.PaymentsService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map