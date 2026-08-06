import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

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
