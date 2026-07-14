import type { Role } from "../Role.js";


export interface UserDto {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    role: Role;
}
