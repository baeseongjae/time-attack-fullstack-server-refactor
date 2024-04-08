import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../../db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDeals() {
    const deals = await this.prismaService.deal.findMany();

    return deals;
  }

  async getDeal(dealId: number) {
    const deal = await this.prismaService.deal.findUnique({
      where: { id: dealId },
    });

    return deal;
  }

  async createDeal(data: Prisma.DealUncheckedCreateInput) {
    const deal = await this.prismaService.deal.create({
      data,
    });

    return deal;
  }

  async updateDeal(
    data: Prisma.DealUncheckedUpdateInput,
    userEmail: string,
    dealId: number,
  ) {
    // 요청한 유저가 해당글의 작성자인지 확인
    const targetDeal = this.prismaService.deal.findUnique({
      where: { authorEmail: userEmail, id: dealId },
    });
    // ㄴ 아니면 에러
    if (!targetDeal) throw new ForbiddenException();

    // ㄴ 맞다면 판매글 수정
    const updatedDeal = this.prismaService.deal.update({
      where: { id: dealId },
      data,
    });

    return updatedDeal;
  }

  async deleteDeal(userEmail: string, dealId: number) {
    const targetDeal = this.prismaService.deal.findUnique({
      where: { authorEmail: userEmail, id: dealId },
    });

    if (!targetDeal) throw new ForbiddenException();

    const deleteDeal = this.prismaService.deal.delete({
      where: { id: dealId },
    });

    return deleteDeal;
  }
}
