import type { Request, Response, NextFunction } from "express";
import * as userService from "./user-service.js";   
import { HttpError } from "../../shared/exceptions/HttpError.js";


export const me = async (req: Request, res: Response, next: NextFunction) => {
    
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

};
