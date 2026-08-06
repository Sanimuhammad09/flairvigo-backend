import { AdminService } from '../services/admin.service';
export declare class AdminMarketingController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCoupons(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        code: string;
        type: string;
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
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        code: string;
        type: string;
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
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        code: string;
        type: string;
        value: number;
        minOrderValue: number | null;
        maxDiscount: number | null;
        startDate: Date | null;
        endDate: Date | null;
        usageLimit: number | null;
        usageCount: number;
    }>;
}
