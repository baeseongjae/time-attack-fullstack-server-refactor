import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { MyService } from './my.service';

@Controller('my')
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get('deals')
  @LoggedInOnly()
  async getMyDeals(@DUser() user: User) {
    const myDeals = await this.myService.getMyDeals(user.id);
    return { myDeals };
  }
}
