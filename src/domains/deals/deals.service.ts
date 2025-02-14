import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getImgSrcFromFile } from 'src/utils/getImgSrcFromFile';
import { PrismaService } from './../../db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDeals() {
    const deals = await this.prismaService.deal.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return deals;
  }

  async getDeal(dealId: number) {
    const deal = await this.prismaService.deal.findUnique({
      where: { id: dealId },
    });

    return deal;
  }

  async createDeal(
    data: Prisma.DealUncheckedCreateInput,
    image: Express.Multer.File,
  ) {
    // *1. 이미지 처리
    let imgSrc: string | undefined;
    if (image) imgSrc = await getImgSrcFromFile(image);

    const createDealData = {
      ...data,
      ...(imgSrc && { imgSrc }),
    };

    // *2. 판매글 생성
    const deal = await this.prismaService.deal.create({
      data: createDealData,
    });

    return deal;
  }

  async updateDeal(
    data: Prisma.DealUncheckedUpdateInput,
    authorEmail: string,
    dealId: number,
    image: Express.Multer.File,
  ) {
    // 요청한 유저가 해당글의 작성자인지 확인
    const targetDeal = await this.prismaService.deal.findUnique({
      where: { authorEmail, id: dealId },
    });
    // ㄴ 아니면 에러
    if (!targetDeal) throw new ForbiddenException();

    // ㄴ 맞다면 판매글 수정
    // *1. 이미지 처리
    let imgSrc: string | undefined;
    if (image) imgSrc = await getImgSrcFromFile(image);

    const updateDealData = {
      ...data,
      ...(imgSrc && { imgSrc }),
    };
    // *2. 수정
    const updatedDeal = await this.prismaService.deal.update({
      where: { id: dealId },
      data: updateDealData,
    });

    return updatedDeal;
  }

  async deleteDeal(authorEmail: string, dealId: number) {
    const targetDeal = await this.prismaService.deal.findUnique({
      where: { authorEmail, id: dealId },
    });

    if (!targetDeal) throw new ForbiddenException();

    const deleteDeal = await this.prismaService.deal.delete({
      where: { id: dealId },
    });

    return deleteDeal;
  }

  async toggleInterest({
    userEmail,
    dealId,
  }: Prisma.InterestDealIdUserEmailCompoundUniqueInput) {
    const interest = await this.prismaService.interest.findUnique({
      where: { dealId_userEmail: { dealId, userEmail } },
    });

    // 이미 좋아요 되어있다면 취소.
    if (interest) {
      await this.prismaService.interest.delete({
        where: { dealId_userEmail: { dealId, userEmail } },
      });

      return await this.prismaService.deal.update({
        where: { id: dealId },
        data: {
          interest: {
            decrement: 1,
          },
        },
      });
    } else {
      await this.prismaService.interest.create({
        data: {
          dealId,
          userEmail,
        },
      });

      return await this.prismaService.deal.update({
        where: { id: dealId },
        data: {
          interest: {
            increment: 1,
          },
        },
      });
    }
  }

  async updateViews(dealId: number) {
    const dealUpdatedViews = await this.prismaService.deal.update({
      where: {
        id: dealId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return dealUpdatedViews;
  }
}
