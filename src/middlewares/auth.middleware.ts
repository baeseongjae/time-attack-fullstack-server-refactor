import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { verify } from 'jsonwebtoken';
import { ParsedQs } from 'qs';
import { PrismaService } from 'src/db/prisma/prisma.service';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) throw new Error('NO JWT_SECRET_KEY');

@Injectable()
export class AuthMiddleware implements NestMiddleware<Request, Response> {
  constructor(private readonly prismaService: PrismaService) {}

  async use(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: (error?: any) => void,
  ) {
    req.user = null;

    // 토큰 있는지 확인
    // ㄴ 없으면 일단 통과 but 아무것도 안해줌.
    const accessToken = req.headers.authorization?.split('Bearer ')[1];
    if (!accessToken) return next();

    let id: string;
    // 토큰이 있다면, 유효한 토큰인지?
    // ㄴ 없으면 에러 발생
    try {
      const { sub } = verify(accessToken, process.env.JWT_SECRET_KEY);
      id = sub as string; // as string 원래 없는데 어뜨케 하는지....
    } catch (e) {
      throw new UnauthorizedException('Invalid accessToken');
    }

    // 토큰 유효하다면 DB로부터 유저를 가져옴, 그리고 req에 넣어줌.
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new BadRequestException('Delete user');
    req.user = user;

    next();
  }
}
