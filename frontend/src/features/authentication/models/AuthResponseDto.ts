import { type UserDto } from "./UserDto";

export interface AuthResponseDto {
    accessToken: string;
    userDto: UserDto;
}