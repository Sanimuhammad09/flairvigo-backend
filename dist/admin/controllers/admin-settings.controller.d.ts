import { AdminService } from '../services/admin.service';
export declare class AdminSettingsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getSettings(): Promise<{
        id: string;
        updatedAt: Date;
        currency: string;
        freeShippingThreshold: number;
        flatShippingRate: number;
        taxRate: number;
        contactEmail: string | null;
        contactPhone: string | null;
    }>;
    updateSettings(body: any): Promise<{
        id: string;
        updatedAt: Date;
        currency: string;
        freeShippingThreshold: number;
        flatShippingRate: number;
        taxRate: number;
        contactEmail: string | null;
        contactPhone: string | null;
    }>;
}
