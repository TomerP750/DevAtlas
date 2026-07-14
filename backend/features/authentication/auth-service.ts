import { Role } from "../user/Role.js";
import type { AuthResponseDto } from "./dto/AuthResponseDto.js";
import type { LoginRequestDto } from "./dto/LoginRequestDto.js";
import type { SignUpRequestDto } from "./dto/SignUpRequestDto.js";
import { findByEmail } from "../user/user-repository.js";
import { HttpError } from "../../shared/exceptions/HttpError.js";
import toUserDto from "../user/user-mapper.js";
import { createUser } from "../user/user-repository.js";
import type { IUser } from "../user/user-model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "./jwt-service.js";

export const login = async (loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> => {

    const existingUser = await findByEmail(loginRequestDto.email);
    if (!existingUser) {
        throw new HttpError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(loginRequestDto.password, existingUser.password);
    if (!isPasswordValid) {
        throw new HttpError(401, "Invalid password");
    }

    const userDto = toUserDto(existingUser);

    const token =
        await generateToken(existingUser._id.toString(), existingUser.role);

    return {
        token,
        user: userDto
    };
}

export const signUp = async (dto: SignUpRequestDto): Promise<AuthResponseDto> => {

    try {

        if (dto.password !== dto.confirmPassword) {
            throw new HttpError(400, "Password and confirm password do not match");
        }

        const existingUser = await findByEmail(dto.email);
        if (existingUser) {
            throw new HttpError(400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        const newUser: Omit<IUser, "_id"> = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: hashedPassword,
            role: Role.USER,
            avatarUrl: "",
        };

        const createdUser = await createUser(newUser);

        if (!createdUser) {
            throw new HttpError(500, "Failed to create user");
        }

        const userDto = toUserDto(createdUser);

        const token =
            await generateToken(createdUser._id.toString(), createdUser.role);

        return {
            token,
            user: userDto,
        };

    } catch (error) {
        throw new HttpError(500, "Failed to sign up");
    }

}