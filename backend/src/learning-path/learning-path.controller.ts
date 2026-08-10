import { Controller, Param, Get, Post, Body, Delete, Put, Query } from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import { CreateLearningPathDto } from './dtos/create-learning-path-dto';
import { CurrentUserId } from '../authentication/decorators/current-user.decorator';
import { UpdateLearningPathDto } from './dtos/update-learning-path-dto';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { LearningPathDto, PaginatedLearningPathDto } from './dtos/learning-path.dto';
import { LearningPathQueryDto } from './dtos/learning-path-query.dto';

@Controller('learning-path')
export class LearningPathController {

    constructor(private learningPathService: LearningPathService) {}

    @Post()
    @Serialize(LearningPathDto)
    create(@Body() createLearningPathDto: CreateLearningPathDto) {
        return this.learningPathService.create(createLearningPathDto);
    }

    @Get("/all")
    @Serialize(PaginatedLearningPathDto)
    findAll(@CurrentUserId() userId: string, @Query() query: LearningPathQueryDto) {
        return this.learningPathService.findAll(userId, query);
    }

    @Get('/:id')
    @Serialize(LearningPathDto)
    findOne(@Param('id') id: string, @CurrentUserId() userId: string) {
        return this.learningPathService.findOne(id, userId);
    }

    @Put('/:id')
    @Serialize(LearningPathDto)
    update(@Param('id') id: string,
        @CurrentUserId() userId: string,
        @Body() updateLearningPathDto: UpdateLearningPathDto,
    ) {
        return this.learningPathService.update(id, userId, updateLearningPathDto);
    }

    @Delete('/:id')
    @Serialize(LearningPathDto)
    delete(@Param('id') id: string, @CurrentUserId() userId: string) {
        return this.learningPathService.delete(id, userId);
    }
}
