import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../db/prisma/prisma.service';
import { getMyInterestedDealsDto } from './my.dto';

@Injectable()
export class MyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyDeals(userEmail: string) {
    const myDeals = await this.prismaService.deal.findMany({
      where: { authorEmail: userEmail },
    });

    return myDeals;
  }

  async getMyInterests(userEmail: string) {
    const myInterests = await this.prismaService.interest.findMany({
      where: { userEmail },
    });

    return myInterests;
  }

  async getMyInterestedDeals(dto: getMyInterestedDealsDto) {
    const { dealIds } = dto;

    const myInterestedDeals = await this.prismaService.deal.findMany({
      where: {
        id: {
          in: dealIds,
        },
      },
    });

    return myInterestedDeals;
  }
}
