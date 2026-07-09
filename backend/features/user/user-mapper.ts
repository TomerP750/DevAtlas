import type { UserDto } from "./dto/UserDto.js";
import type { IUser } from "./user-model.js";

export default function toUserDto(user: IUser): UserDto {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
    };
};

