import { Controller, Get, Delete, Param, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('admin-customers')
@Controller('admin/customers')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
@ApiBearerAuth()
export class AdminCustomersController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'List all customers' })
  async getCustomers() {
    return this.adminService.getCustomers();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  async deleteCustomer(@Param('id') id: string) {
    return this.adminService.deleteCustomer(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  async updateCustomer(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateCustomer(id, body);
  }
}
