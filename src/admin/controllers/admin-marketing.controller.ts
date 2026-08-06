import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('admin-marketing')
@Controller('admin/marketing')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
@ApiBearerAuth()
export class AdminMarketingController {
  constructor(private readonly adminService: AdminService) {}

  @Get('coupons')
  @ApiOperation({ summary: 'List all coupons' })
  async getCoupons() {
    return this.adminService.getCoupons();
  }

  @Post('coupons')
  @ApiOperation({ summary: 'Create a coupon' })
  async createCoupon(@Body() body: any) {
    return this.adminService.createCoupon(body);
  }

  @Delete('coupons/:id')
  @ApiOperation({ summary: 'Delete a coupon' })
  async deleteCoupon(@Param('id') id: string) {
    return this.adminService.deleteCoupon(id);
  }
}
