import { CheckoutService } from './checkout.service';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    initializeCheckout(user: any, body: any): Promise<{
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
