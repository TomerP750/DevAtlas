import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Role } from "../../user/Role.js";
import { HttpError } from "../../../shared/exceptions/HttpError.js";

type AuthTokenPayload = JwtPayload & {
    userId: string;
    role: Role;
};


/**
 * Check if the payload is a valid authentication token payload, 
 * it checks if the payload is a string and if the userId is a string and if the role is a valid role.
 * @param payload - The payload to check.
 * @returns True if the payload is a valid authentication token payload, false otherwise.
 */
const isAuthTokenPayload = (payload: string | JwtPayload): payload is AuthTokenPayload => {
    return typeof payload !== "string" 
    && typeof payload.userId === "string" 
    && Object.values(Role).includes(payload.role);
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

    try {

        const authHeader = req.get("Authorization");
        const [scheme, token] = authHeader?.split(" ") ?? [];
        if (scheme?.toLowerCase() !== "bearer" || !token) {
            throw new HttpError(401, "Unauthorized");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!, {
            issuer: "devatlas"
        });
        if (!isAuthTokenPayload(decodedToken)) {
            throw new HttpError(401, "Unauthorized");
        }

        req.user = {
            id: decodedToken.userId,
            role: decodedToken.role,
        };
        next();

    } catch (error) {
        return next(error);
    }

}

