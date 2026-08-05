"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = __importDefault(require("axios"));
const crypto = __importStar(require("crypto"));
let PaymentsService = class PaymentsService {
    configService;
    prisma;
    paystackSecretKey;
    paystackBaseUrl = 'https://api.paystack.co';
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.paystackSecretKey = this.configService.get('PAYSTACK_SECRET_KEY') || '';
    }
    async initializePaystack(orderId, email, amount) {
        if (!this.paystackSecretKey) {
            return { authorizationUrl: 'https://checkout.paystack.com/mock', reference: `mock_${orderId}` };
        }
        try {
            const response = await axios_1.default.post(`${this.paystackBaseUrl}/transaction/initialize`, {
                email,
                amount: Math.round(amount * 100),
                metadata: { orderId },
            }, {
                headers: {
                    Authorization: `Bearer ${this.paystackSecretKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                authorizationUrl: response.data.data.authorization_url,
                reference: response.data.data.reference,
                accessCode: response.data.data.access_code,
            };
        }
        catch (error) {
            const message = error.response?.data?.message || error.message;
            throw new common_1.BadRequestException(`Paystack initialization failed: ${message}`);
        }
    }
    async handlePaystackWebhook(signature, payload) {
        if (!this.paystackSecretKey)
            return { received: true };
        const hash = crypto
            .createHmac('sha512', this.paystackSecretKey)
            .update(payload)
            .digest('hex');
        if (hash !== signature) {
            throw new common_1.BadRequestException('Invalid webhook signature');
        }
        let event;
        try {
            event = JSON.parse(payload.toString());
        }
        catch (err) {
            throw new common_1.BadRequestException('Invalid JSON payload');
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
    async handlePaymentSuccess(orderId, transactionId, amount, currency) {
        await this.prisma.$transaction(async (tx) => {
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
            await tx.order.update({
                where: { id: orderId },
                data: { status: 'CONFIRMED' },
            });
            await tx.orderStatusHistory.create({
                data: {
                    orderId,
                    status: 'CONFIRMED',
                    note: 'Payment received via Paystack',
                },
            });
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map