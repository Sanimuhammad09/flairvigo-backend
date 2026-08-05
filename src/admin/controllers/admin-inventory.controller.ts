import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('admin-inventory')
@Controller('admin/inventory')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
@ApiBearerAuth()
export class AdminInventoryController {
  constructor(private readonly adminService: AdminService) {}

  @Get('low-stock')
  @ApiOperation({ summary: 'Get low stock inventory' })
  async getLowStock() {
    return this.adminService.getLowStockInventory();
  }

  @Put(':variantId')
  @ApiOperation({ summary: 'Update variant stock level' })
  async updateInventory(@Param('variantId') variantId: string, @Body() body: { inventory: number }) {
    return this.adminService.updateInventory(variantId, body.inventory);
  }
}
