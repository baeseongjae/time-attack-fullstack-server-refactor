import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { CreateDealDto, UpdateDealDto } from './deals.dto';
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

  @Post('create')
  @LoggedInOnly()
  async createDeal(@DUser() user: User, @Body() dto: CreateDealDto) {
    const deal = await this.dealsService.createDeal({
      ...dto,
      authorEmail: user.email,
    });

    return { deal };
  }

  @Patch(':dealId/edit')
  @LoggedInOnly()
  async updateDeal(
    @DUser() user: User,
    @Body() dto: UpdateDealDto,
    @Param('dealId', ParseIntPipe) dealId: number,
  ) {
    const updatedDeal = await this.dealsService.updateDeal(
      { ...dto },
      user.email,
      dealId,
    );

    return { updatedDeal };
  }

  @Delete(':dealId/delete')
  @LoggedInOnly()
  async deleteDeal(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
  ) {
    const deletedDeal = await this.dealsService.deleteDeal(user.email, dealId);

    return { deletedDeal };
  }

  @Patch(':dealId/interest')
  @LoggedInOnly()
  async toggleInterest(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
  ) {
    const updatedDeal = await this.dealsService.toggleInterest({
      userEmail: user.email,
      dealId: dealId,
    });

    return { updatedDeal };
  }

  @Patch(':dealId/views')
  async updateViews(@Param('dealId', ParseIntPipe) dealId: number) {
    const dealUpdatedViews = await this.dealsService.updateViews(dealId);
    const updatedViews = dealUpdatedViews.views;

    return { updatedViews };
  }
}
