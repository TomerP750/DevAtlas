import { Expose } from "class-transformer"
import { Role } from "src/authentication/role"

export class UserDto {
    @Expose()
    id!: string;
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @Expose()
    email!: string;
    @Expose()
    avatarUrl!: string;
    @Expose()
    role!: Role;
}