import { AdminService } from '../services/admin.service';
import { OrderStatus } from '@prisma/client';
export declare class AdminOrdersController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getOrders(): Promise<({
        user: {
            id: string;
            email: string;
            passwordHash: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
            isEmailVerified: boolean;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        subtotal: number;
        taxAmount: number;
        shippingCost: number;
        currency: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod | null;
        discountAmount: number;
        couponCode: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        billingAddress: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    updateOrderStatus(id: string, body: {
        status: OrderStatus;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        subtotal: number;
        taxAmount: number;
        shippingCost: number;
        currency: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod | null;
        discountAmount: number;
        couponCode: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        billingAddress: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
