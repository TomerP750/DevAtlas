import { HttpError } from "../../shared/exceptions/HttpError.js";
import type { UpdateUserDto } from "./dto/UpdateUserDto.js";
import type { UserDto } from "./dto/UserDto.js";
import * as userRepository from "./user-repository.js";
import toUserDto from "./user-mapper.js";
import type { ChangePasswordDto } from "./dto/ChangePasswordDto.js";
import { hash, compare } from "bcryptjs";
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

        await userRepository.updateById(userId, updateUserDto);

    } catch (error) {
        throw new HttpError(500,"Failed to update user");
    }
};

export const changePassword = async (userId: string, changePasswordDto: ChangePasswordDto): Promise<void> => {
    try {
        const user = await fetchUserEntity(userId);

        const isPasswordMatch = await compare(changePasswordDto.currentPassword, user.password);
        if (!isPasswordMatch) {
            throw new HttpError(401,"Invalid current password");
        }

        const isNewPasswordMatch = await compare(changePasswordDto.newPassword, changePasswordDto.confirmNewPassword);
        if (!isNewPasswordMatch) {
            throw new HttpError(401,"New password and confirm new password do not match");
        }   

        const hashedNewPassword = await hash(changePasswordDto.newPassword, 12);
        await userRepository.updatePassword(userId, hashedNewPassword);

    } catch (error) {
        throw new HttpError(500,"Failed to change password");
    }
};

const fetchUserEntity = async (userId: string): Promise<IUser> => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new HttpError(404,"User not found");
        }
        return user;
    } catch (error) {
        throw new HttpError(500, "Failed to fetch user");
    }
};