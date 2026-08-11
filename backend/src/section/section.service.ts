import { Injectable, NotFoundException } from '@nestjs/common';
import { Section } from './section.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LearningPathService } from '../learning-path/learning-path.service';
import { CreateSectionDto } from './dtos/section.dto';
import { TopicService } from '../topic/topic.service';
import { UpdateSectionDto } from './dtos/update-section.dto';
import { sectionOwnedBy } from '../shared/utils/ownership.util';

@Injectable()
export class SectionService {

    constructor(
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
        private readonly learningPathService: LearningPathService,
        private readonly topicService: TopicService
    ) { }

    async findOne(id: string, userId: string): Promise<Section> {
        const section = await this.sectionRepository.findOne({
            where: {
                id,
                ...sectionOwnedBy(userId),
            },
            relations: {
                topic: {
                    learningPath: true,
                },
            },
        });

        if (!section) {
            throw new NotFoundException('Section not found');
        }

        return section;
    }

    async toggleSectionCompletion(userId: string, id: string): Promise<boolean> {

        const section = await this.findOne(id, userId);
        section.completed = !section.completed;

        await this.learningPathService
            .updateLearningPathSectionCompletion(
                userId,
                section.topic.learningPath.id,
                section.completed
            );

        await this.sectionRepository.save(section);
        return section.completed;

    }

    async createSection(userId: string, topicId: string, createSectionDto: CreateSectionDto): Promise<Section> {
        const { name, description } = createSectionDto;
        const topic = await this.topicService.findOne(topicId, userId);
        const section = this.sectionRepository.create({ name, description, topic });
        return this.sectionRepository.save(section);
    }

    async updateSection(userId: string, id: string, updateSectionDto: UpdateSectionDto): Promise<Section> {
        const section = await this.findOne(id, userId);
        this.sectionRepository.merge(section, updateSectionDto);
        return this.sectionRepository.save(section);
    }

    async deleteSection(userId: string, id: string): Promise<void> {
        const section = await this.findOne(id, userId);
        await this.sectionRepository.delete(section.id);
    }

}
