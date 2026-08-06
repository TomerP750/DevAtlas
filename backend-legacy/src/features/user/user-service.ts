import { HttpError } from "../../shared/exceptions/HttpError.js";
import type { UpdateUserDto } from "./dto/UpdateUserDto.js";
import type { UserDto } from "./dto/UserDto.js";
import * as userRepository from "./user-repository.js";
import toUserDto from "./user-mapper.js";
import type { ChangePasswordDto } from "./dto/ChangePasswordDto.js";
import { hash, compare } from "bcryptjs";
import type { IUser } from "./user-model.js";
import { getPagination } from "../../shared/utils/getPagination.js";
import type { PaginationQuery } from "../../shared/models/PaginationQuery.js";
import { Role } from "./Role.js";

export const getAllUsers = async (role: Role, query: PaginationQuery): Promise<UserDto[]> => {

    if (role !== Role.ADMIN) {
        throw new HttpError(403, "You are not authorized to fetch users");
    }

    const { skip, pageSize } = getPagination(query);
    const users = await userRepository.findAll(skip, pageSize);

    return users.map(toUserDto);

}

export const me = async (userId: string): Promise<UserDto> => {

    const user = await fetchUserEntity(userId);
    return toUserDto(user);

};

export const deleteUser = async (userId: string): Promise<void> => {

    await userRepository.deleteById(userId);

};

export const updateUser = async (userId: string, updateUserDto: UpdateUserDto): Promise<void> => {

    await userRepository.updateById(userId, updateUserDto);

};

export const changePassword = async (userId: string, changePasswordDto: ChangePasswordDto): Promise<void> => {

    const user = await fetchUserEntity(userId);

    const isPasswordMatch = await compare(changePasswordDto.currentPassword, user.password);
    if (!isPasswordMatch) {
        throw new HttpError(401, "Invalid current password");
    }

    const isNewPasswordMatch = await compare(changePasswordDto.newPassword, changePasswordDto.confirmNewPassword);
    if (!isNewPasswordMatch) {
        throw new HttpError(401, "New password and confirm new password do not match");
    }

    const hashedNewPassword = await hash(changePasswordDto.newPassword, 12);
    await userRepository.updatePassword(userId, hashedNewPassword);

};

const fetchUserEntity = async (userId: string): Promise<IUser> => {

    const user = await userRepository.findById(userId);
    if (!user) {
        throw new HttpError(404, "User not found");
    }
    return user;

};