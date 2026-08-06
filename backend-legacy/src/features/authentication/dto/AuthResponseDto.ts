import type { UserDto } from "../../user/dto/UserDto.js";

export interface AuthResponseDto {
    token: string;
    user: UserDto;
}