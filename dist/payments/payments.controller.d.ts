import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    initializePaystack(body: {
        orderId: string;
        email: string;
        amount: number;
    }): Promise<{
        authorizationUrl: string;
        reference: string;
        accessCode?: undefined;
    } | {
        authorizationUrl: any;
        reference: any;
        accessCode: any;
    }>;
    handleWebhook(signature: string, req: any): Promise<{
        received: boolean;
    }>;
}
