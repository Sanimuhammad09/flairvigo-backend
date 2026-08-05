import { AdminService } from '../services/admin.service';
export declare class AdminAnalyticsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getOverview(): Promise<{
        totalOrders: number;
        totalRevenue: number;
        activeCustomers: number;
        topProducts: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderItemGroupByOutputType, "variantId"[]> & {
            _sum: {
                quantity: number | null;
            };
        })[];
    }>;
}
