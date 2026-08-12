import { Controller, Param, Get, Body, Post, Put, Delete } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CurrentUserId } from '../authentication/decorators/current-user.decorator';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { TopicDto } from './dtos/topic.dto';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';

@Controller('api/topic')
@Serialize(TopicDto)
export class TopicController {

    constructor(private readonly topicService: TopicService) {}

    @Get('/all/learning-path/:learningPathId')
    async findAll(
        @CurrentUserId() userId: string,
        @Param('learningPathId') learningPathId: string,
    ) {
        return this.topicService.findAll(userId, learningPathId);
    }

    @Get('/one/:id')
    async findOne(@Param('id') id: string, @CurrentUserId() userId: string) {
        return this.topicService.findOne(id, userId);
    }

    @Post('/create/:learningPathId')
    async create(
        @CurrentUserId() userId: string,
        @Param('learningPathId') learningPathId: string,
        @Body() createTopicDto: CreateTopicDto
    ) {
        return this.topicService.createTopic(userId, learningPathId, createTopicDto);
    }

    @Put('/update/:id')
    async update(
        @CurrentUserId() userId: string,
        @Param('id') id: string,
        @Body() updateTopicDto: UpdateTopicDto
    ) {
        return this.topicService.updateTopic(userId, id, updateTopicDto);
    }

    @Delete('/delete/:id')
    async delete(
        @CurrentUserId() userId: string,
        @Param('id') id: string
    ) {
        return this.topicService.deleteTopic(userId, id);
    }
}
