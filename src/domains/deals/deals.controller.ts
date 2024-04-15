import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('image'))
  async createDeal(
    @DUser() user: User,
    @Body() dto: CreateDealDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const deal = await this.dealsService.createDeal(
      {
        ...dto,
        authorEmail: user.email,
      },
      image,
    );

    return { deal };
  }

  @Patch(':dealId/edit')
  @LoggedInOnly()
  @UseInterceptors(FileInterceptor('image'))
  async updateDeal(
    @DUser() user: User,
    @Body() dto: UpdateDealDto,
    @Param('dealId', ParseIntPipe) dealId: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const updatedDeal = await this.dealsService.updateDeal(
      { ...dto },
      user.email,
      dealId,
      image,
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
