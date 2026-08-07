import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsString()
    @IsNotEmpty()
    lastName: string;
    @IsEmail()
    @IsNotEmpty()
    email: string 
    @IsString()
    @IsNotEmpty()
    password: string 
    @IsString()
    @IsNotEmpty()
    confirmPassword: string 

    constructor(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}