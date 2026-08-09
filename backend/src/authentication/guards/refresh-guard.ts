import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class RefreshGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies['refresh_token'];
        if (!refreshToken) {
            return false;
        }
        return true;
    }
    
}
    