import { Module } from '@nestjs/common';
import { AdminAnalyticsController } from './controllers/admin-analytics.controller';
import { AdminProductsController } from './controllers/admin-products.controller';
import { AdminInventoryController } from './controllers/admin-inventory.controller';
import { AdminOrdersController } from './controllers/admin-orders.controller';
import { AdminCustomersController } from './controllers/admin-customers.controller';
import { AdminMarketingController } from './controllers/admin-marketing.controller';
import { AdminSettingsController } from './controllers/admin-settings.controller';
import { AdminService } from './services/admin.service';

@Module({
  controllers: [
    AdminAnalyticsController,
    AdminProductsController,
    AdminInventoryController,
    AdminOrdersController,
    AdminCustomersController,
    AdminMarketingController,
    AdminSettingsController,
  ],
  providers: [AdminService],
})
export class AdminModule {}
