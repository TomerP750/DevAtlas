import { type UserDto } from "./UserDto";

export interface AuthResponseDto {
    access_token: string;
    user: UserDto;
}