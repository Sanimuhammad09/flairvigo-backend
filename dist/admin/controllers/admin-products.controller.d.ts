import { AdminService } from '../services/admin.service';
export declare class AdminProductsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getProducts(): Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            image: string | null;
            parentId: string | null;
        };
        variants: {
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
        }[];
    } & {
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
    })[]>;
    createProduct(data: any): Promise<({
        variants: {
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
        }[];
        images: {
            order: number;
            id: string;
            productId: string;
            url: string;
            alt: string | null;
            isMain: boolean;
        }[];
    } & {
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
    }) | null>;
    updateProduct(id: string, data: any): Promise<{
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
    }>;
}
