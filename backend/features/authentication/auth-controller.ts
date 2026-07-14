import * as authService from "./auth-service.js";
import type { Request, Response, NextFunction } from "express";
import type { LoginRequestDto } from "./dto/LoginRequestDto.js";
import type { SignUpRequestDto } from "./dto/SignUpRequestDto.js";

export const login = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const loginRequestDto: LoginRequestDto = req.body;
        const authResponseDto = await authService.login(loginRequestDto);
        res.status(200).json(authResponseDto);

    } catch (error) {
        return next(error);
    }

}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const signUpRequestDto: SignUpRequestDto = req.body;
        const authResponseDto = await authService.signUp(signUpRequestDto);
        res.status(200).json(authResponseDto);

    } catch (error) {
        return next(error);
    }

}

