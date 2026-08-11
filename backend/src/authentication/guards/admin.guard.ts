import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { UserService } from "../../user/user.service";
import { Role } from "../role";
import type { JwtPayload } from "../jwt-payload";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isAdminOnly = this.reflector.getAllAndOverride<boolean>('isAdmin', [
            context.getHandler(),
            context.getClass(),
        ]);

        // Only routes marked with @IsAdmin() are restricted
        if (!isAdminOnly) {
            return true;
        }

        const request: Request = context.switchToHttp().getRequest();

        // The AuthGuard already put the payload on the request when it ran first
        let payload = request.user;
        if (!payload) {
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                throw new UnauthorizedException('Unauthorized');
            }
            try {
                payload = await this.jwtService.verifyAsync<JwtPayload>(token);
                request.user = payload;
            } catch (error) {
                throw new UnauthorizedException('Unauthorized');
            }
        }

        const user = await this.userService.findOne(payload!.sub);
        if (!user) {
            return false;
        }

        return user.role === Role.ADMIN;

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers?.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
