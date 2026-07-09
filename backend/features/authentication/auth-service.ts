import { Role } from "../user/Role.js";
import type { AuthResponseDto } from "./dto/AuthResponseDto.js";
import type { LoginRequestDto } from "./dto/LoginRequestDto.js";
import type { SignUpRequestDto } from "./dto/SignUpRequestDto.js";
import { findByEmail } from "../user/user-repository.js";
import { HttpError } from "../../shared/exceptions/HttpError.js";
import toUserDto from "../user/user-mapper.js";

export const login = async (loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> => {
    
    const user = await findByEmail(loginRequestDto.email);

    if (!user) {
        throw new HttpError(404, "User not found");
    }
    
    return {
        token: "",
        user: {
            _id: "",
            firstName: "",
            lastName: "",
            email: "",
            avatarUrl: "",
            role: Role.USER,
        },
    };
}

export const signUp = async (signUpRequestDto: SignUpRequestDto): Promise<AuthResponseDto> => {
    return {
        token: "",
        user: {
            _id: "",
            firstName: "",
            lastName: "",
            email: "",
            avatarUrl: "",
            role: Role.USER,
        },
    };
}