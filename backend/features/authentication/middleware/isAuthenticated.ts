import type { Request, Response, NextFunction } from "express";
import { isTokenValid } from "../jwt-service.js";
import jwt from "jsonwebtoken";
import { HttpError } from "../../../shared/exceptions/HttpError.js";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const authHeader = req.get("Authorization");
        const [scheme, token] = authHeader?.split(" ") ?? [];
        if (scheme !== "Bearer" || !token) {
            throw new HttpError(401, "Unauthorized");
        }

        if (!isTokenValid(token)) {
            throw new HttpError(401, "Unauthorized");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        if (!decodedToken) {
            throw new HttpError(401, "Unauthorized");
        }

        req.userId = decodedToken.userId;
        next();

    } catch (error) {
        return next(error);
    }

}

