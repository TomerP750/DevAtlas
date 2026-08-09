import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dtos/signup.dto';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { SignInDto } from './dtos/signin.dto';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { Public } from './decorators/public.decorator';


@Controller('auth')
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) {
    }

    @Post("/signup")
    @Public()
    @Serialize(AuthResponseDto)
    async signUp(@Body() dto: SignUpDto): Promise<AuthResponseDto> {
        const { accessToken, refreshToken, user } =
            await this.authenticationService.signUp(dto);

        // response.cookie('refresh_token', refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'lax',
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        //     path: '/auth',
        // });

        return new AuthResponseDto(accessToken, user);
    }

    @Post("/signin")
    @Public()
    @Serialize(AuthResponseDto)
    async signIn(@Body() dto: SignInDto): Promise<AuthResponseDto> {

        const { accessToken, refreshToken, user } =
            await this.authenticationService.signIn(dto);

        // response.cookie('refresh_token', refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'lax',
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        //     path: '/auth',
        // });

        return new AuthResponseDto(accessToken, user);
    }

}
