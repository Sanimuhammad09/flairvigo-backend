import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(user: any, dto: CreateOrderDto): Promise<{
        user: {
            id: string;
            email: string;
            passwordHash: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.Role;
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
                    slug: string;
                    description: string;
                    fabricDetails: string | null;
                    careInstructions: string | null;
                    basePrice: number;
                    isFeatured: boolean;
                    isActive: boolean;
                    categoryId: string;
                    collectionId: string | null;
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
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        subtotal: number;
        taxAmount: number;
        shippingCost: number;
        discountAmount: number;
        couponCode: string | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue;
        billingAddress: import("@prisma/client/runtime/client").JsonValue;
    }>;
    findMine(user: any): Promise<({
        items: ({
            variant: {
                product: {
                    name: string;
                    slug: string;
                    images: {
                        id: string;
                        order: number;
                        productId: string;
                        url: string;
                        alt: string | null;
                        isMain: boolean;
                    }[];
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
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        subtotal: number;
        taxAmount: number;
        shippingCost: number;
        discountAmount: number;
        couponCode: string | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue;
        billingAddress: import("@prisma/client/runtime/client").JsonValue;
    })[]>;
    findAllAdmin(): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        subtotal: number;
        taxAmount: number;
        shippingCost: number;
        discountAmount: number;
        couponCode: string | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue;
        billingAddress: import("@prisma/client/runtime/client").JsonValue;
    })[]>;
    findOne(user: any, id: string): Promise<{
        payment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            orderId: string;
            provider: string;
            transactionId: string;
            amount: number;
            currency: string;
        } | null;
        items: ({
            variant: {
                product: {
                    name: string;
                    slug: string;
                    images: {
                        id: string;
                        order: number;
                        productId: string;
                        url: string;
                        alt: string | null;
                        isMain: boolean;
                    }[];
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
        statusHistory: {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            note: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        subtotal: number;
        taxAmount: number;
        shippingCost: number;
        discountAmount: number;
        couponCode: string | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue;
        billingAddress: import("@prisma/client/runtime/client").JsonValue;
    }>;
}
