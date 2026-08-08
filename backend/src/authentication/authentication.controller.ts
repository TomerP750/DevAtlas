import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthResponseDto } from './dtos/auth.response.dto';

@Controller('auth')
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) {
    }

    @Post("/signup")
    signUp(@Body() dto: SignUpDto) {
        return this.authenticationService.signUp(dto);
    }

    // @Post("/signin")
    // async signIn(
    //     @Body() dto: SignInDto): Promise<AuthResponseDto> {
    //     const { access_token, refresh_token, user } =
    //         await this.authenticationService.signIn(dto);

    //     response.cookie('refresh_token', refresh_token, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === 'production',
    //         sameSite: 'lax',
    //         maxAge: 7 * 24 * 60 * 60 * 1000,
    //         path: '/auth',
    //     });

    //     return new AuthResponseDto(access_token, user);
    // }

}
