import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class LoggedInOnlyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Reflector 활용하여 'LoggedInOnly' 메타데이터 조회
    const loggedInOnly = this.reflector.get<boolean>(
      'LoggedInOnly',
      context.getHandler(),
    );
    if (!loggedInOnly) return true;

    // 요청에서 사용자 정보 추출 => request.user
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.user) throw new ForbiddenException();

    return true;
  }
}
