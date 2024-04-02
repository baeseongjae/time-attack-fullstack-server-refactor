import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { CreateDealDto } from './deals.dto';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  async getDeals() {
    const deals = await this.dealsService.getDeals();

    return { deals };
  }

  @Get(':dealId')
  async getDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    const deal = await this.dealsService.getDeal(dealId);

    return { deal };
  }

  @LoggedInOnly()
  @Post('create')
  async createDeal(@DUser() user: User, @Body() dto: CreateDealDto) {
    const deal = await this.dealsService.createDeal({
      ...dto,
      authorId: user.id,
    });

    return { deal };
  }
}
