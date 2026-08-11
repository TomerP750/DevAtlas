import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dtos/signup.dto';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { SignInDto } from './dtos/signin.dto';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { Public } from './decorators/public.decorator';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import ms, { type StringValue } from 'ms';


@Controller('api/auth')
export class AuthenticationController {

    constructor(
        private authenticationService: AuthenticationService,
        private configService: ConfigService,
    ) {
    }

    @Post("/signup")
    @Public()
    @Serialize(AuthResponseDto)
    async signUp(@Body() dto: SignUpDto, @Res({ passthrough: true }) response: Response): Promise<AuthResponseDto> {
        const { accessToken, refreshToken, user } =
            await this.authenticationService.signUp(dto);

        this.setRefreshTokenCookie(response, refreshToken);

        return new AuthResponseDto(accessToken, user);
    }

    @Post("/login")
    @Public()
    @Serialize(AuthResponseDto)
    async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) response: Response): Promise<AuthResponseDto> {

        const { accessToken, refreshToken, user } =
            await this.authenticationService.signIn(dto);

        this.setRefreshTokenCookie(response, refreshToken);

        return new AuthResponseDto(accessToken, user);
    }

    @Post("/logout")
    @Public()
    async signOut(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<void> {
        const rawRefreshToken = request.cookies.refresh_token;

        if (rawRefreshToken) {
            await this.authenticationService.signOut(rawRefreshToken);
        }

        response.clearCookie('refresh_token', { path: '/api/auth' });

    }

    @Post("/refresh-token")
    @Public()
    @Serialize(AuthResponseDto)
    async rotate(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ): Promise<AuthResponseDto> {

        const rawRefreshToken = request.cookies.refresh_token;
        const { accessToken, refreshToken, user } =
            await this.authenticationService.rotateRefreshToken(rawRefreshToken);

        this.setRefreshTokenCookie(response, refreshToken);

        return new AuthResponseDto(accessToken, user);
    }

    private setRefreshTokenCookie(response: Response, refreshToken: string): void {
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            sameSite: 'lax',
            maxAge: ms(
                this.configService.getOrThrow<StringValue>(
                    'REFRESH_TOKEN_EXPIRATION_TIME',
                ),
            ),
            path: '/api/auth',
        });
    }



}
