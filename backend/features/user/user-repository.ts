import type { UpdateUserDto } from "./dto/UpdateUserDto.js";
import User, { type IUser } from "./user-model.js";

export const findById = async (id: string) => {
    return await User.findById(id);
};

export const findByEmail = async (email: string) => {
    return await User.findOne({ email });
};

export const deleteById = async (id: string) => {
    return await User.findByIdAndDelete(id);
};

export const updateById = async (id: string, updateUserDto: UpdateUserDto) => {
    return await User.findByIdAndUpdate(id, updateUserDto, { new: true });
};

export const createUser = async (user: Omit<IUser, "_id">) => {
    return await User.create(user);
};