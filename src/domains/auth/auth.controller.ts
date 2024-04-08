import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { UserLogInDto, UserSignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: UserSignUpDto) {
    const accessToken = await this.authService.signUp(dto);

    return { accessToken };
  }

  @Post('log-in')
  async logIn(@Body() dto: UserLogInDto) {
    const accessToken = await this.authService.logIn(dto);

    return { accessToken };
  }

  @LoggedInOnly()
  @Get('user-email')
  async getUserByEmail(@DUser() user: User) {
    const userByEmail = await this.authService.getUserByEmail(user.email);

    return { userByEmail };
  }
}
