import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Response } from '../common/interface/responsedto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getGlobalDashboard(): Promise<Response> {
    const data = await this.dashboardService.getDashboard();
    return {
      status: 200,
      message: 'Global dashboard stats fetched successfully',
      result: [data],
    };
  }
}
