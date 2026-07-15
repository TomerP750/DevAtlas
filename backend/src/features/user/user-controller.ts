import type { Request, Response, NextFunction } from "express";
import * as userService from "./user-service.js";
import { HttpError } from "../../shared/exceptions/HttpError.js";
import type { PaginationQuery } from "../../shared/models/PaginationQuery.js";
import type { ChangePasswordDto } from "./dto/ChangePasswordDto.js";
import type { UpdateUserDto } from "./dto/UpdateUserDto.js";


export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const user = await userService.me(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = req.user.role;
        const { pageIndex, pageSize } = req.query as PaginationQuery;

        const users = await userService.getAllUsers(role, { pageIndex: pageIndex || "0", pageSize: pageSize || "10" });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        await userService.deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = req.user.id;
        
        const { firstName, lastName, email, avatarUrl } = req.body as UpdateUserDto;
        
        await userService.updateUser(userId, { firstName, lastName, email, avatarUrl });
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmNewPassword } = req.body as ChangePasswordDto;
        await userService.changePassword(userId, { currentPassword, newPassword, confirmNewPassword });
        
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        next(error);
    }
};