import axios from "axios";
import { baseApiUrl } from "../../../../shared/utils/baseApi";
import type { UserDto } from "../../../authentication/models/UserDto";
import type { UpdateUserDto } from "../models/UpdateUserDto";
import type { ChangePasswordDto } from "../models/ChangePasswordDto";

class UserService {

    async me(): Promise<UserDto> {
        return (await axios.get(`${baseApiUrl}/api/user/me`)).data;
    }

    async updateUser(dto: UpdateUserDto) {
        return (await axios.put(`${baseApiUrl}/api/user/update`, dto)).data;
    }

    async deleteUser() {
        return (await axios.delete(`${baseApiUrl}/api/user/delete`)).data;
    }

    async changePassword(dto: ChangePasswordDto) {
        return (await axios.patch(`${baseApiUrl}/api/user/change-password`, dto)).data;
    }


}

const userService = new UserService();
export default userService;