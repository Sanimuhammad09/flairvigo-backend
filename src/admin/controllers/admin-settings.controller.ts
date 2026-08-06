import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('admin-settings')
@Controller('admin/settings')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
@ApiBearerAuth()
export class AdminSettingsController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'Get global store settings' })
  async getSettings() {
    return this.adminService.getSettings();
  }

  @Put()
  @ApiOperation({ summary: 'Update global store settings' })
  async updateSettings(@Body() body: any) {
    return this.adminService.updateSettings(body);
  }
}
