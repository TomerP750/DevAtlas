import {Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, isEmail, IsString, isString } from "class-validator";


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