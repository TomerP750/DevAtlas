import type { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodType } from "zod";
import { HttpError } from "../exceptions/HttpError.js";

export const validate = (schema: ZodType): RequestHandler => {
    
    return (req: Request, res: Response, next: NextFunction) => {
        
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return next(new HttpError(400, result.error.message));
        }

        next();
    };

}