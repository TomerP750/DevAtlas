import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Like, Repository } from 'typeorm';
import { LearningPath } from './learning-path.entity';
import { CreateLearningPathDto } from './dtos/create-learning-path-dto';
import { UpdateLearningPathDto } from './dtos/update-learning-path-dto';
import { LearningPathQueryDto } from './dtos/learning-path-query.dto';
import { Page } from '../shared/types/Page';
import { learningPathOwnedBy } from '../shared/utils/ownership.util';

@Injectable()
export class LearningPathService {

    constructor(
        @InjectRepository(LearningPath) private learningPathRepository: Repository<LearningPath>,
    ) { }

    async create(createLearningPathDto: CreateLearningPathDto) {
        const learningPath = this.learningPathRepository.create(createLearningPathDto);
        return this.learningPathRepository.save(learningPath);
    }

    async findOne(id: string, userId: string) {
        const learningPath = await this.learningPathRepository.findOne({
            where: { id, ...learningPathOwnedBy(userId) },
        });
        if (!learningPath) {
            throw new NotFoundException('Learning path not found');
        }
        return learningPath;
    }

    async findAll(userId: string, query: LearningPathQueryDto) {

        const { page, size, search, sortBy, sortOrder } = query;
        const ownedByUser = learningPathOwnedBy(userId);

        let where: FindOptionsWhere<LearningPath> | FindOptionsWhere<LearningPath>[] = ownedByUser;
        if (search) {
            // Escape the LIKE wildcards so a search for "100%" does not match everything.
            const term = `%${search.replace(/[%_\\]/g, '\\$&')}%`;
            where = [
                { ...ownedByUser, name: Like(term) },
                { ...ownedByUser, description: Like(term) },
            ];
        }

        const [items, total] = await this.learningPathRepository.findAndCount({
            where,
            order: { [sortBy]: sortOrder } as FindOptionsOrder<LearningPath>,
            skip: (page - 1) * size,
            take: size,
        });

        return { items, total, page, size, totalPages: Math.ceil(total / size) };
    }

    async update(id: string, userId: string, updateLearningPathDto: UpdateLearningPathDto) {
        const learningPath = await this.findOne(id, userId);
        await this.learningPathRepository.merge(learningPath, updateLearningPathDto);
        await this.learningPathRepository.save(learningPath);
    }

    async delete(id: string, userId: string) {
        const learningPath = await this.findOne(id, userId);
        await this.learningPathRepository.delete(id);
    }

    async updateLearningPathSectionCompletion(userId: string, id: string, completed: boolean) {
        const learningPath = await this.findOne(id, userId);
        
        learningPath.completedSectionsCount =
            completed
                ? learningPath.completedSectionsCount++
                : learningPath.completedSectionsCount--;
                
        await this.learningPathRepository.save(learningPath);
    }

    async updateTotalSections(userId: string, id: string, increment: boolean) {
        const learningPath = await this.findOne(id, userId);
        learningPath.totalSectionsCount = increment
            ? learningPath.totalSectionsCount++
            : learningPath.totalSectionsCount--;
        await this.learningPathRepository.save(learningPath);
    }
}
