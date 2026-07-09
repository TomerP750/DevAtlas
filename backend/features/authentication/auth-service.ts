import { Role } from "../user/Role.js";
import type { AuthResponseDto } from "./dto/AuthResponseDto.js";
import type { LoginRequestDto } from "./dto/LoginRequestDto.js";
import type { SignUpRequestDto } from "./dto/SignUpRequestDto.js";
import { findByEmail } from "../user/user-repository.js";
import { HttpError } from "../../shared/exceptions/HttpError.js";
import toUserDto from "../user/user-mapper.js";
import { createUser } from "../user/user-repository.js";
import type { IUser } from "../user/user-model.js";

export const login = async (loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> => {

    const user = await findByEmail(loginRequestDto.email);

    if (!user) {
        throw new HttpError(404, "User not found");
    }

    return {
        token: "",
        user: toUserDto(user),
    };
}

export const signUp = async (dto: SignUpRequestDto): Promise<AuthResponseDto> => {

    try {
        const existingUser = await findByEmail(dto.email);
        if (existingUser) {
            throw new HttpError(400, "User already exists");
        }

        const newUser: Omit<IUser, "_id"> = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: dto.password,
            role: Role.USER,
            avatarUrl: "",
        };
        const createdUser = await createUser(newUser);

        if (!createdUser) {
            throw new HttpError(500, "Failed to create user");
        }

        return {
            token: "",
            user: toUserDto(createdUser),
        };

    } catch (error) {
        throw new HttpError(500, "Failed to sign up");
    }

}