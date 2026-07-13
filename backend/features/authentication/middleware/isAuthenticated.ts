import type { Request, Response, NextFunction } from "express";
import { isTokenValid } from "../jwt-service.js";
// import jwt from "jsonwebtoken";
import { HttpError } from "../../../shared/exceptions/HttpError.js";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    

    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new HttpError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new HttpError(401, "Unauthorized");
    }

    let decodedToken;
    
    try {
        // decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new HttpError(401, "Unauthorized");
    }

    if (!decodedToken) {
        throw new HttpError(401, "Unauthorized");
    }

    // req.userId = decodedToken.userId;
    next();

}