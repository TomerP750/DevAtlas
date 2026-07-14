import axios from "axios";
import { baseApiUrl } from "../../../shared/utils/baseApi";
import type { LoginRequestDto } from "../models/LoginRequestDto";
import type { SignUpRequestDto } from "../models/SignUpRequestDto";

class AuthService {

    async login(loginRequestDto: LoginRequestDto) {
        return (await axios.post(`${baseApiUrl}/api/auth/login`, loginRequestDto)).data;
        
    }

    async signUp(signUpRequestDto: SignUpRequestDto) {
        return (await axios.post(`${baseApiUrl}/api/auth/signup`, signUpRequestDto)).data;
    }

}

const authService = new AuthService();
export default authService;