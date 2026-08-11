import { Expose } from "class-transformer"
import { Role } from "../../authentication/role";


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
    avatarUrl?: string | null;
    @Expose()
    role!: Role;
}