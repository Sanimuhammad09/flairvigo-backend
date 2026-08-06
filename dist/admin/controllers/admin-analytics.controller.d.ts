import { AdminService } from '../services/admin.service';
export declare class AdminAnalyticsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getOverview(): Promise<{
        totalOrders: number;
        totalRevenue: number;
        activeCustomers: number;
        topProducts: {
            variant: ({
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
            }) | null;
            totalQuantitySold: number | null;
        }[];
    }>;
}
