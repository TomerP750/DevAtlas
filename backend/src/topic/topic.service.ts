import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { Repository } from 'typeorm';
import { LearningPathService } from '../learning-path/learning-path.service';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { topicOwnedBy } from '../shared/utils/ownership.util';

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic) private topicRepository: Repository<Topic>,
        private readonly learningPathService: LearningPathService
    ) { }

    async findOne(id: string, userId: string): Promise<Topic> {
        const topic = await this.topicRepository.findOne({
            where: { id, ...topicOwnedBy(userId) },
        });
        if (!topic) {
            throw new NotFoundException('Topic not found');
        }
        return topic;
    }

    // async findAll(userId: string, learningPathId: string): Promise<Topic[]> {
    //     return null;
    // }

    async createTopic(userId: string, learningPathId: string, createTopicDto: CreateTopicDto): Promise<Topic> {
        const { name, description, codeSnippet } = createTopicDto;
        const learningPath = await this.learningPathService
            .findOne(learningPathId, userId);
        const topic = this.topicRepository.create({ name, description, codeSnippet, learningPath });
        return this.topicRepository.save(topic);
    }

    async updateTopic(userId: string, id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
        const topic = await this.findOne(id, userId);
        this.topicRepository.merge(topic, updateTopicDto);
        return this.topicRepository.save(topic);
    }

    async deleteTopic(userId: string, id: string): Promise<Topic> {
        const topic = await this.findOne(id, userId);
        return this.topicRepository.remove(topic);
    }

    

}
