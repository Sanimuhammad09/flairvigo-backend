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
        items: ({
            variant: {
                product: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: import(".prisma/client").$Enums.ProductStatus;
                    description: string;
                    slug: string;
                    fabricDetails: string | null;
                    careInstructions: string | null;
                    basePrice: number;
                    isFeatured: boolean;
                    categoryId: string;
                    collectionId: string | null;
                    seoTitle: string | null;
                    seoDescription: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                sku: string;
                barcode: string | null;
                color: string;
                colorHex: string | null;
                size: string;
                priceOffset: number;
                inventory: number;
                compareAtPrice: number | null;
                isInventoryTracked: boolean;
                lowStockThreshold: number;
                weight: number | null;
                dimensions: import("@prisma/client/runtime/library").JsonValue | null;
                hsCode: string | null;
                countryOfOrigin: string | null;
            };
        } & {
            id: string;
            variantId: string;
            quantity: number;
            unitPrice: number;
            hasEmbroidery: boolean;
            embroideryDesignId: string | null;
            orderId: string;
        })[];
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
