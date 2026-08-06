import { AdminService } from '../services/admin.service';
export declare class AdminMarketingController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCoupons(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        code: string;
        value: number;
        minOrderValue: number | null;
        maxDiscount: number | null;
        startDate: Date | null;
        endDate: Date | null;
        usageLimit: number | null;
        usageCount: number;
    }[]>;
    createCoupon(body: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        code: string;
        value: number;
        minOrderValue: number | null;
        maxDiscount: number | null;
        startDate: Date | null;
        endDate: Date | null;
        usageLimit: number | null;
        usageCount: number;
    }>;
    deleteCoupon(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        code: string;
        value: number;
        minOrderValue: number | null;
        maxDiscount: number | null;
        startDate: Date | null;
        endDate: Date | null;
        usageLimit: number | null;
        usageCount: number;
    }>;
}
