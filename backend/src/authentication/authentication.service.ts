import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { SignInDto } from './dtos/signin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { User } from '../user/user.entity';
import { InternalAuthResponseDto } from './dtos/internal-auth-response.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthenticationService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async signUp(dto: SignUpDto): Promise<InternalAuthResponseDto> {

        const existingUser = await this.userService.findByEmail(dto.email);
        if (existingUser) {
            throw new BadRequestException("Email is in use");
        }

        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException("Passwords do not match");
        }

        const user = await this.userService.create(dto);
        return new InternalAuthResponseDto(
            this.generateAccessToken(user),
            this.generateRefreshToken(user),
            user
        );

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

        return new InternalAuthResponseDto(
            this.generateAccessToken(user),
            this.generateRefreshToken(user),
            user
        );

    }

    async signOut() {

    }

    private generateAccessToken(user: User): string {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role
        },
            {
                expiresIn: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
                secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET')
            }
        );
    }

    private generateRefreshToken(user: User): string {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role
        }, {
            expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
            secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET')
        });

    }
}
