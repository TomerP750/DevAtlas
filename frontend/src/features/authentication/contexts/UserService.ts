import axios from "axios";
import { baseApiUrl } from "../../../shared/utils/baseApi";
import type { UserDto } from "../models/UserDto";

class UserService {

    async me(): Promise<UserDto> {
        return (await axios.get(`${baseApiUrl}/api/users/me`)).data;
    }
}

const userService = new UserService();
export default userService;