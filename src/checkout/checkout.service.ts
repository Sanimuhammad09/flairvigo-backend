import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class CheckoutService {
  constructor(
    private prisma: PrismaService,
    private paymentsService: PaymentsService,
  ) {}

  async initializeCheckout(userId: string, data: any) {
    const { items, paymentMethod, shippingAddress, billingAddress, email } = data;

    if (!items || items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    if (paymentMethod !== 'PAYSTACK' && paymentMethod !== 'BANK_TRANSFER') {
      throw new BadRequestException('Invalid payment method');
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      const variant = await this.prisma.productVariant.findUnique({ where: { id: item.variantId }, include: { product: true } });
      if (!variant) throw new BadRequestException(`Variant ${item.variantId} not found`);
      subtotal += (variant.product.basePrice + variant.priceOffset) * item.quantity;
    }

    // For simplicity, fixed tax and shipping
    const taxAmount = subtotal * 0.075; // 7.5% VAT
    const shippingCost = 1500; // Fixed 1500 NGN
    const totalAmount = subtotal + taxAmount + shippingCost;

    // Create order using transaction
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

      // Create order items
      await tx.orderItem.createMany({
        data: items.map((item: any) => ({
          orderId: newOrder.id,
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: 0, // Should be calculated per item
        })),
      });

      return newOrder;
    });

    if (paymentMethod === 'PAYSTACK') {
      return this.paymentsService.initializePaystack(order.id, email, totalAmount);
    } else {
      // Bank Transfer
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
}
