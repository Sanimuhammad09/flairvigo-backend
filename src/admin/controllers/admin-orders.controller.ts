import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, OrderStatus } from '@prisma/client';

@ApiTags('admin-orders')
@Controller('admin/orders')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
@ApiBearerAuth()
export class AdminOrdersController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  async getOrders() {
    return this.adminService.getOrders();
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update order status (e.g., verify bank transfer)' })
  async updateOrderStatus(@Param('id') id: string, @Body() body: { status: OrderStatus }) {
    return this.adminService.updateOrderStatus(id, body.status);
  }
}
