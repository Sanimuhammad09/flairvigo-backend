import { AdminService } from '../services/admin.service';
export declare class AdminCustomersController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCustomers(): Promise<({
        _count: {
            orders: number;
        };
    } & {
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
    })[]>;
    deleteCustomer(id: string): Promise<{
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
    }>;
}
