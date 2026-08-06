import { AdminService } from '../services/admin.service';
import { OrderStatus } from '@prisma/client';
export declare class AdminOrdersController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getOrders(): Promise<({
        user: {
            role: import(".prisma/client").$Enums.Role;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            passwordHash: string;
            firstName: string;
            lastName: string;
            isActive: boolean;
            isEmailVerified: boolean;
            avatar: string | null;
        };
        items: ({
            variant: {
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    slug: string;
                    description: string;
                    fabricDetails: string | null;
                    careInstructions: string | null;
                    basePrice: number;
                    isFeatured: boolean;
                    status: import(".prisma/client").$Enums.ProductStatus;
                    seoTitle: string | null;
                    seoDescription: string | null;
                    categoryId: string;
                    collectionId: string | null;
                };
            } & {
                id: string;
                sku: string;
                barcode: string | null;
                productId: string;
                color: string;
                colorHex: string | null;
                size: string;
                priceOffset: number;
                compareAtPrice: number | null;
                inventory: number;
                isInventoryTracked: boolean;
                lowStockThreshold: number;
                weight: number | null;
                dimensions: import("@prisma/client/runtime/library").JsonValue | null;
                hsCode: string | null;
                countryOfOrigin: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            orderId: string;
            variantId: string;
            quantity: number;
            unitPrice: number;
            hasEmbroidery: boolean;
            embroideryDesignId: string | null;
        })[];
    } & {
        totalAmount: number;
        subtotal: number;
        taxAmount: number;
        shippingCost: number;
        discountAmount: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        orderNumber: string;
        userId: string;
        currency: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod | null;
        couponCode: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        billingAddress: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    updateOrderStatus(id: string, body: {
        status: OrderStatus;
    }): Promise<{
        totalAmount: number;
        subtotal: number;
        taxAmount: number;
        shippingCost: number;
        discountAmount: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        orderNumber: string;
        userId: string;
        currency: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod | null;
        couponCode: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        billingAddress: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
