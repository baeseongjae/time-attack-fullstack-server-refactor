import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  getDeals() {
    const deals = this.prismaService.product.findMany();

    return deals;
  }
}
