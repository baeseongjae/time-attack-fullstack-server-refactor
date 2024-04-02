import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../../db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDeals() {
    const deals = await this.prismaService.product.findMany();

    return deals;
  }

  async getDeal(dealId: number) {
    const deal = await this.prismaService.product.findUnique({
      where: { id: dealId },
    });

    return deal;
  }

  async createDeal(data: Prisma.ProductUncheckedCreateInput) {
    const deal = await this.prismaService.product.create({
      data,
    });

    return deal;
  }
}
