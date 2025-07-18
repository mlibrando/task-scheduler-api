import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (
    data_: unknown,
    ctx: ExecutionContext,
  ): { userId: number; username: string } => {
    const request: { user: { userId: number; username: string } } = ctx
      .switchToHttp()
      .getRequest();
    return request.user;
  },
);
