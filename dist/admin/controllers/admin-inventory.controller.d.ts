import { AdminService } from '../services/admin.service';
export declare class AdminInventoryController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getLowStock(): Promise<({
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
    })[]>;
    updateInventory(variantId: string, body: {
        inventory: number;
    }): Promise<{
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
    }>;
}
