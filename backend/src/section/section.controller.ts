import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dtos/create-section.dto';
import { CurrentUserId } from '../authentication/decorators/current-user.decorator';
import { UpdateSectionDto } from './dtos/update-section.dto';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { SectionDto } from './dtos/section.dto';

@Controller('api/sections')
export class SectionController {

    constructor(private readonly sectionService: SectionService) {}

    @Post('create/:topicId')
    create(@CurrentUserId() userId: string, @Body() createSectionDto: CreateSectionDto, @Param('topicId') topicId: string) {
        return this.sectionService.create(userId, topicId, createSectionDto);
    }

    @Put('update/:id')
    update(@CurrentUserId() userId: string, @Body() updateSectionDto: UpdateSectionDto, @Param('id') id: string) {
        return this.sectionService.update(userId, id, updateSectionDto);
    }

    @Delete('delete/:id')
    delete(@CurrentUserId() userId: string, @Param('id') id: string) {
        return this.sectionService.delete(userId, id);
    }

    @Get(':id')
    @Serialize(SectionDto)
    findOne(@CurrentUserId() userId: string, @Param('id') id: string) {
        return this.sectionService.findOne(userId, id);
    }

    @Get('topic/:topicId')
    @Serialize(SectionDto)
    findAll(@CurrentUserId() userId: string, @Param('topicId') topicId: string) {
        return this.sectionService.findAll(userId, topicId);
    }

    @Patch(':id/toggle-completion')
    toggleCompletion(@CurrentUserId() userId: string, @Param('id') id: string) {
        return this.sectionService.toggleSectionCompletion(userId, id);
    }

}
