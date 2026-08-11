import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { SignInDto } from './dtos/signin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { InternalAuthResponseDto } from './dtos/internal-auth-response.dto';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthenticationService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private refreshTokenService: RefreshTokenService
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
            await this.refreshTokenService.create(user.id),
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
            await this.refreshTokenService.create(user.id),
            user
        );

    }

    async signOut(rawToken: string) {
        await this.refreshTokenService.revoke(rawToken);
    }

    async rotateRefreshToken(rawToken: string): Promise<InternalAuthResponseDto> {
        const storedRefreshToken = await this.refreshTokenService.validate(rawToken);
        const user = await this.userService.findOne(storedRefreshToken.userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const refreshToken = await this.refreshTokenService.rotate(rawToken);

        return new InternalAuthResponseDto(
            this.generateAccessToken(user),
            refreshToken,
            user,
        );
    }

    private generateAccessToken(user: User): string {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role
        }
        );
    }

}
