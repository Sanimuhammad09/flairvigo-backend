import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly paystackSecretKey: string;
  private readonly paystackBaseUrl = 'https://api.paystack.co';

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.paystackSecretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
  }

  async initializePaystack(orderId: string, email: string, amount: number) {
    if (!this.paystackSecretKey) {
      // Mock for development
      return { authorizationUrl: 'https://checkout.paystack.com/mock', reference: `mock_${orderId}` };
    }

    try {
      const response = await axios.post(
        `${this.paystackBaseUrl}/transaction/initialize`,
        {
          email,
          amount: Math.round(amount * 100), // Convert to kobo
          metadata: { orderId },
        },
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return {
        authorizationUrl: response.data.data.authorization_url,
        reference: response.data.data.reference,
        accessCode: response.data.data.access_code,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      throw new BadRequestException(`Paystack initialization failed: ${message}`);
    }
  }

  async handlePaystackWebhook(signature: string, payload: Buffer) {
    if (!this.paystackSecretKey) return { received: true };

    const hash = crypto
      .createHmac('sha512', this.paystackSecretKey)
      .update(payload)
      .digest('hex');

    if (hash !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    let event: any;
    try {
      event = JSON.parse(payload.toString());
    } catch (err) {
      throw new BadRequestException('Invalid JSON payload');
    }

    if (event.event === 'charge.success') {
      const data = event.data;
      const orderId = data.metadata?.orderId;
      if (orderId) {
        await this.handlePaymentSuccess(orderId, data.id.toString(), data.amount / 100, data.currency);
      }
    }

    return { received: true };
  }

  private async handlePaymentSuccess(orderId: string, transactionId: string, amount: number, currency: string) {
    await this.prisma.$transaction(async (tx) => {
      // Create payment record
      await tx.payment.create({
        data: {
          orderId,
          provider: 'paystack',
          transactionId,
          amount,
          currency,
          status: 'succeeded',
        },
      });

      // Update order status
      await tx.order.update({
        where: { id: orderId },
        data: { status: 'CONFIRMED' },
      });

      // Record history
      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status: 'CONFIRMED',
          note: 'Payment received via Paystack',
        },
      });
    });
  }
}
