import { UserDto } from "src/user/dtos/user.dto";


export class AuthResponseDto {
    access_token: string;
    user: UserDto;

    constructor(access_token: string, user: UserDto) {
        this.access_token = access_token;
        this.user = user;
    }
}