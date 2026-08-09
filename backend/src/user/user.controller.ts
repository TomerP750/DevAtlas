import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { CurrentUserId } from '../authentication/decorators/current-user.decorator';
import { Serialize } from '../shared/interceptors/serialize.interceptor';


@Controller('user')
@Serialize(UserDto)
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Put("/update")
    updateUser(@CurrentUserId() userId: string, @Body() dto: UpdateUserDto) {
        this.userService.update(userId, dto)
    }

    @Get("/me")
    findUser(@CurrentUserId() userId: string) {
        return this.userService.findOne(userId);
    }

    @Delete("/:id")
    deleteUser(@CurrentUserId() userId: string) {
        this.userService.remove(userId);
    }

}
