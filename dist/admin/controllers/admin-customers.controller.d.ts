import { AdminService } from '../services/admin.service';
export declare class AdminCustomersController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCustomers(): Promise<({
        _count: {
            orders: number;
        };
    } & {
        id: string;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        isEmailVerified: boolean;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    deleteCustomer(id: string): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        isEmailVerified: boolean;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCustomer(id: string, body: any): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        isEmailVerified: boolean;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
