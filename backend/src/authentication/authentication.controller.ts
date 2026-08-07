import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) {
    }

    @Post("/signup")
    signUp(@Body() dto: SignUpDto) {
        return this.authenticationService.signUp(dto);
    }

    @Post("/signin")
    signIn(@Body() dto: SignInDto) {
        return this.authenticationService.signIn(dto);
    }

}
