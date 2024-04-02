import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// ExecutionContext 활용하여 HTTP 요청 추출 -> request로부터 user속성 반환
export const DUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
