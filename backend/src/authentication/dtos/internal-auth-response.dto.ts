import { UserDto } from "../../user/dtos/user.dto";
import { User } from "../../user/user.entity";


export class InternalAuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: User;

    constructor(
        accessToken: string,
        refreshToken: string,
        user: User
    ) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
    }
}