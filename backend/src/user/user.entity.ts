import { IsEmail, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string; 

    @Column()
    @IsString()
    firstName: string 

    @Column()
    @IsString()
    lastName: string

    @Column()
    @IsEmail()
    email: string; 

    @Column()
    @IsString()
    password: string; 

    @Column()
    @IsString()
    avatarUrl: string 

  
}