import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { UserLogInDto, UserSignUpDto } from './auth.dto';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  // ** 회원가입
  async signUp(userSignUpDto: UserSignUpDto) {
    const { email, password } = userSignUpDto;

    const data: Prisma.UserCreateInput = {
      id: nanoid(),
      email,
      encryptedPassword: await hash(password, 12),
    };

    const user = await this.prismaService.user.create({
      data,
      select: { id: true, email: true },
    });

    const accessToken = this.generateAccessToken(user);

    return accessToken;
  }

  // ** 로그인
  async logIn(userLogInDto: UserLogInDto) {
    const { email, password } = userLogInDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, email: true, encryptedPassword: true },
    });

    // 유저 없으면 에러
    if (!user) throw new NotFoundException('No user found');

    // 패스워드 틀리면 에러
    const isCorrectPassword = compare(password, user.encryptedPassword);
    if (!isCorrectPassword) throw new BadRequestException('Incorrect password');

    const accessToken = this.generateAccessToken(user);

    return accessToken;
  }

  async getUserByEmail(email: string) {
    const userByEmail = await this.prismaService.user.findUnique({
      where: { email },
    });

    return userByEmail;
  }

  async refreshToken(user: User) {
    const refreshedAccessToken = this.generateAccessToken(user);

    return refreshedAccessToken;
  }

  // ** accessToken 발급
  generateAccessToken(user: Pick<User, 'id' | 'email'>) {
    const { id: subject, email } = user;

    const accessToken = sign({ email }, JWT_SECRET_KEY, {
      subject,
      expiresIn: '2h',
    });

    return accessToken;
  }
}
