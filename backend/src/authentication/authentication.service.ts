import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { SignInDto } from './dtos/signin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthenticationService {

    constructor(private userService: UserService) {}

    async signUp(dto: SignUpDto) {

        const existingUser = await this.userService.findByEmail(dto.email);
        if (existingUser) {
            throw new BadRequestException("Email is in use");
        }

        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException("Passwords do not match");
        }

        const user = await this.userService.create(dto);
        return user;

    }

    async signIn(dto: SignInDto) {

        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new BadRequestException("Invalid credentials");
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(dto.password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException("Invalid credentials");
        }

        return user;

    }

    async signOut() {
        
    }
}
