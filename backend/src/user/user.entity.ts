import { IsEmail, IsString } from "class-validator";
import { Role } from "src/authentication/role";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    @IsString()
    firstName!: string

    @Column()
    @IsString()
    lastName!: string

    @Column()
    @IsEmail()
    email!: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role!: Role;

    @Column()
    @IsString()
    password!: string;

    @Column()
    @IsString()
    avatarUrl!: string


}