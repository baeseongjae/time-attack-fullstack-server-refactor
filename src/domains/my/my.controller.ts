import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { getMyInterestedDealsDto } from './my.dto';
import { MyService } from './my.service';

@Controller('my')
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get('deals')
  @LoggedInOnly()
  async getMyDeals(@DUser() user: User) {
    const myDeals = await this.myService.getMyDeals(user.email);
    return { myDeals };
  }

  @Get('interests')
  @LoggedInOnly()
  async getMyInterests(@DUser() user: User) {
    const myInterests = await this.myService.getMyInterests(user.email);
    return { myInterests };
  }

  @Post('interested-deals')
  @LoggedInOnly()
  async getMyInterestedDeals(
    @DUser() user: User,
    @Body() dto: getMyInterestedDealsDto,
  ) {
    const myInterestedDeals = await this.myService.getMyInterestedDeals(dto);

    return { myInterestedDeals };
  }
}
