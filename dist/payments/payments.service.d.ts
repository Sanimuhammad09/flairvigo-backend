import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private configService;
    private prisma;
    private readonly paystackSecretKey;
    private readonly paystackBaseUrl;
    constructor(configService: ConfigService, prisma: PrismaService);
    initializePaystack(orderId: string, email: string, amount: number): Promise<{
        authorizationUrl: string;
        reference: string;
        accessCode?: undefined;
    } | {
        authorizationUrl: any;
        reference: any;
        accessCode: any;
    }>;
    handlePaystackWebhook(signature: string, payload: Buffer): Promise<{
        received: boolean;
    }>;
    private handlePaymentSuccess;
}
