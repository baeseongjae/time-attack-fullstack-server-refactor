import { Controller, Get } from '@nestjs/common';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  async getDeals() {
    const deals = await this.dealsService.getDeals();

    return { deals };
  }
}
