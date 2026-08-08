import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningPath } from './learning-path.entity';
import { UserService } from 'src/user/user.service';
import { CreateLearningPathDto } from './dtos/create-learning-path-dto';
import { UpdateLearningPathDto } from './dtos/update-learning-path-dto';

@Injectable()
export class LearningPathService {

    constructor(
        @InjectRepository(LearningPath) private learningPathRepository: Repository<LearningPath>,
    ) {}

    async create(createLearningPathDto: CreateLearningPathDto) {
        const learningPath = this.learningPathRepository.create(createLearningPathDto);
        return this.learningPathRepository.save(learningPath);
    }

    async findOne(id: string, userId: string) {
        const learningPath = await this.learningPathRepository.findOne({ where: { id } });
        if (!learningPath) {
            throw new NotFoundException('Learning path not found');
        }
        if (learningPath.user.id !== userId) {
            throw new UnauthorizedException('You are not allowed to access this learning path');
        }
        return learningPath;
    }

    // TODO: Add pagination
    async findAll() {
        return this.learningPathRepository.find();
    }

    async update(id: string, userId: string, updateLearningPathDto: UpdateLearningPathDto) {
        const learningPath = await this.findOne(id, userId);
        this.learningPathRepository.update(id, updateLearningPathDto);
    }

    async delete(id: string, userId: string) {
        const learningPath = await this.findOne(id, userId);
        this.learningPathRepository.delete(id);
    }
}
