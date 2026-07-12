import { Role } from "./Role";

export interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    role: Role;
}