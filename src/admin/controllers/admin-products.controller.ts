import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('admin-products')
@Controller('admin/products')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
@ApiBearerAuth()
export class AdminProductsController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'List all products (including drafts)' })
  async getProducts() {
    return this.adminService.getProducts();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product with variants and images atomically' })
  async createProduct(@Body() data: any) {
    return this.adminService.createProduct(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  async updateProduct(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateProduct(id, data);
  }
}
