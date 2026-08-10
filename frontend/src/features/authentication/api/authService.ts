import axios from "axios";
import { baseApiUrl } from "../../../shared/utils/baseApi";
import type { LoginRequestDto } from "../models/LoginRequestDto";
import type { SignUpRequestDto } from "../models/SignupRequestDto";
import type { AuthResponseDto } from "../models/AuthResponseDto";


class AuthService {

    async login(loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> {
        return (await axios.post(`${baseApiUrl}/api/auth/login`, loginRequestDto)).data;
        
    }

    async signUp(signUpRequestDto: SignUpRequestDto): Promise<AuthResponseDto> {
        return (await axios.post(`${baseApiUrl}/api/auth/signup`, signUpRequestDto)).data;
    }

    async logout(): Promise<void> {
        await axios.post(`${baseApiUrl}/api/auth/logout`);
    }

    async refreshToken(): Promise<AuthResponseDto> {
        return (await axios.post(`${baseApiUrl}/api/auth/refresh-token`)).data;
    }

}

const authService = new AuthService();
export default authService;