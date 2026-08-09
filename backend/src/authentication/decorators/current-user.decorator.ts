import { createParamDecorator, ExecutionContext } from "@nestjs/common";


/**
 * Decorator to get the current user from the request.
 */
export const CurrentUserId = createParamDecorator(
    (data: never, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest();
        return request.user?.sub;
    },
);