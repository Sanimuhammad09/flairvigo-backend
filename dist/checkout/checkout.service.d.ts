import { PrismaService } from '../prisma/prisma.service';
import { PaymentsService } from '../payments/payments.service';
export declare class CheckoutService {
    private prisma;
    private paymentsService;
    constructor(prisma: PrismaService, paymentsService: PaymentsService);
    initializeCheckout(userId: string, data: any): Promise<{
        authorizationUrl: string;
        reference: string;
        accessCode?: undefined;
    } | {
        authorizationUrl: any;
        reference: any;
        accessCode: any;
    } | {
        message: string;
        orderId: string;
        amount: number;
        bankDetails: {
            bankName: string;
            accountName: string;
            accountNumber: string;
        };
    }>;
}
