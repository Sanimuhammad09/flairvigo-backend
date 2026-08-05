import { Controller, Post, Body, Headers, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout/paystack')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initialize Paystack payment for an order' })
  async initializePaystack(@Body() body: { orderId: string; email: string; amount: number }) {
    return this.paymentsService.initializePaystack(body.orderId, body.email, body.amount);
  }

  @Public()
  @Post('webhooks/paystack')
  @ApiOperation({ summary: 'Paystack webhook endpoint' })
  async handleWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Req() req: any, // In NestJS you often need raw payload for webhooks
  ) {
    const rawBody = req.rawBody || (req as any).body;
    return this.paymentsService.handlePaystackWebhook(signature, rawBody);
  }
}
