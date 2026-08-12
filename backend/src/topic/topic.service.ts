import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { Repository } from 'typeorm';
import { LearningPathService } from '../learning-path/learning-path.service';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { topicOwnedBy } from '../shared/utils/ownership.util';
import { Section } from '../section/section.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic) private topicRepository: Repository<Topic>,
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
        private readonly learningPathService: LearningPathService,
        private readonly dataSource: DataSource //TODO add transaction 
    ) { }

    async findOne(id: string, userId: string): Promise<Topic> {
        const topic = await this.topicRepository.findOne({
            where: { id, ...topicOwnedBy(userId) },
            relations: {
                learningPath: true,
            },
        });
        if (!topic) {
            throw new NotFoundException('Topic not found');
        }
        return topic;
    }

    async findAll(userId: string, learningPathId: string): Promise<Topic[]> {
        const topics = await this.topicRepository.find({
            where: {
                learningPath: {
                    id: learningPathId,
                    user: {
                        id: userId,
                    },
                },
            },
        });

        return topics;
    }

    async createTopic(userId: string, learningPathId: string, createTopicDto: CreateTopicDto): Promise<Topic> {
        const { name, description, order, confidenceLevel } = createTopicDto;
        const learningPath = await this.learningPathService
            .findOne(learningPathId, userId);
        const topic = this.topicRepository.create({ name, description, order, confidenceLevel, learningPath });
        const savedTopic = await this.topicRepository.save(topic);
        await this.learningPathService.updateTotalTopics(userId, learningPathId, 1);
        return savedTopic;
    }

    async updateTopic(userId: string, id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
        const topic = await this.findOne(id, userId);
        this.topicRepository.merge(topic, updateTopicDto);
        return this.topicRepository.save(topic);
    }

    async deleteTopic(userId: string, id: string) {

        const topic = await this.findOne(id, userId);
        const [totalSections, completedSections] = await Promise.all([
            this.sectionRepository.count({
                where: {
                    topic: { id: topic.id },
                },
            }),
            this.sectionRepository.count({
                where: {
                    topic: { id: topic.id },
                    completed: true,
                },
            }),
        ]);
        const learningPathId = topic.learningPath.id;
        await this.topicRepository.remove(topic);
        await this.learningPathService.updateTotalTopics(
            userId,
            learningPathId,
            -1
        );
        await this.learningPathService.updateTotalSections(
            userId,
            learningPathId,
            -totalSections
        );
        await this.learningPathService.updateLearningPathSectionCompletion(
            userId,
            learningPathId,
            -completedSections
        );

    }

    

}
