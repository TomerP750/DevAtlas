import { Controller, Param, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import { CreateLearningPathDto } from './dtos/create-learning-path-dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { UpdateLearningPathDto } from './dtos/update-learning-path-dto';

@Controller('learning-path')
export class LearningPathController {

    constructor(private learningPathService: LearningPathService) {}

    @Post()
    create(@Body() createLearningPathDto: CreateLearningPathDto) {
        return this.learningPathService.create(createLearningPathDto);
    }

    @Get('/:id')
    findOne(@Param('id') id: string, @CurrentUser() user: User) {
        return this.learningPathService.findOne(id, user.id);
    }

    @Get("/all")
    findAll() {
        return this.learningPathService.findAll();
    }

    @Put('/:id')
    update(@Param('id') id: string, 
    @CurrentUser() user: User,
    @Body() updateLearningPathDto: UpdateLearningPathDto, 
    ) {
        return this.learningPathService.update(id, user.id, updateLearningPathDto);
    }

    @Delete('/:id')
    delete(@Param('id') id: string, @CurrentUser() user: User) {
        return this.learningPathService.delete(id, user.id);
    }
}
