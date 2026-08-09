import { Expose, Type } from "class-transformer";
import { UserDto } from "../../user/dtos/user.dto";


export class AuthResponseDto {
    @Expose()
    access_token: string;

    @Expose()
    @Type(() => UserDto)
    user: UserDto;

    constructor(access_token: string, user: UserDto) {
        this.access_token = access_token;
        this.user = user;
    }
}