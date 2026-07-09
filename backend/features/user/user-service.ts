import { HttpError } from "../../shared/exceptions/HttpError.js";
import type { UpdateUserDto } from "./dto/UpdateUserDto.js";
import type { UserDto } from "./dto/UserDto.js";
import * as userRepository from "./user-repository.js";
import toUserDto from "./user-mapper.js";
import type { IUser } from "./user-model.js";

export const me = async (userId: string): Promise<UserDto> => {
    try {
        const user = await fetchUserEntity(userId);
        return toUserDto(user);
    } catch (error) {
        throw new HttpError(500,"Failed to fetch user");
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    try {

        await userRepository.deleteById(userId);
        
    } catch (error) {
        throw new HttpError(500,"Failed to delete user");
    }
};

export const updateUser = async (userId: string, updateUserDto: UpdateUserDto): Promise<void> => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new HttpError(404,"User not found");
        }
        await userRepository.updateById(userId, updateUserDto);
    } catch (error) {
        throw new HttpError(500,"Failed to update user");
    }
};

const fetchUserEntity = async (userId: string): Promise<IUser> => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new HttpError(404,"User not found");
        }
        return {
            _id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            avatarUrl: user.avatarUrl,
            role: user.role,
        };
    } catch (error) {
        throw new HttpError(500,"Failed to fetch user");
    }
};