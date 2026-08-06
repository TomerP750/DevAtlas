import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
@Serialize(UserDto)
export class UserController {

    constructor(private userService: UserService) { }

    @Put("/update")
    updateUser(@Body() dto: UpdateUserDto) {
        this.userService.update(dto)
    }

    @Get("/:id")
    findUser(@Param("id") id: string) {
        return this.userService.findOne(id);
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: string) {
        this.userService.remove(id);
    }

}
