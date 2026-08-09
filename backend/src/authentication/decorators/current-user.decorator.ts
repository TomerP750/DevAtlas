import { createParamDecorator, ExecutionContext } from "@nestjs/common";


/**
 * Decorator to get the current user's ID from the request.
 */
export const CurrentUser = createParamDecorator(
    (data: never, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest();
        return request.user?.sub;
    },
);