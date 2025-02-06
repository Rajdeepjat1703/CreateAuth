import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  getDashboardMetrics() {
    return this.dashboardService.getDashboardMetrics();
  }

  @Get('popular-dishes')
  getPopularDishes() {
    return this.dashboardService.getPopularDishes();
  }

  @Get('overview')
  getOverview(@Query('period') period: 'daily' | 'weekly' | 'monthly' = 'monthly') {
    return this.dashboardService.getOverview(period);
  }
}
