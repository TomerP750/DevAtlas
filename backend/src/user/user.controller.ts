import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
// import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
@Serialize(UserDto)
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Put("/update")
    // @UseGuards(AuthGuard)
    updateUser(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
        this.userService.update(user.id, dto)
    }

    @Get("/:id")
    // @UseGuards(AuthGuard)
    findUser(@Param("id") id: string) {
        return this.userService.findOne(id);
    }

    @Delete("/:id")
    // @UseGuards(AuthGuard)
    deleteUser(@CurrentUser() user: User) {
        this.userService.remove(user.id);
    }

}
