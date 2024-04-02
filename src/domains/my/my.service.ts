import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../db/prisma/prisma.service';

@Injectable()
export class MyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyDeals(userId: string) {
    const myDeals = await this.prismaService.product.findMany({
      where: { authorId: userId },
    });

    return myDeals;
  }
}
