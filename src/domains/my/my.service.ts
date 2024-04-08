import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../db/prisma/prisma.service';

@Injectable()
export class MyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyDeals(userEmail: string) {
    const myDeals = await this.prismaService.deal.findMany({
      where: { authorEmail: userEmail },
    });

    return myDeals;
  }
}
