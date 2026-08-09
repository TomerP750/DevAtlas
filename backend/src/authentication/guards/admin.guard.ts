import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../user/user.service";
import { Role } from "../role";


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        //get the jwt token from the request
        //decode it 
        //get the user role 
        // if role == admin, return true
        // if role == user, return false
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }
        const decoded = this.jwtService.verify(token);
        const user = await this.userService.findOne(decoded.sub);
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