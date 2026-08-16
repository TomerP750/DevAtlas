import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Like, Repository } from 'typeorm';
import { LearningPath } from './learning-path.entity';
import { CreateLearningPathDto } from './dtos/create-learning-path-dto';
import { UpdateLearningPathDto } from './dtos/update-learning-path-dto';
import { LearningPathQueryDto } from './dtos/learning-path-query.dto';
import { Page } from '../shared/types/Page';
import { learningPathOwnedBy } from '../shared/utils/ownership.util';
import { UserService } from '../user/user.service';

@Injectable()
export class LearningPathService {

    constructor(
        @InjectRepository(LearningPath)
        private learningPathRepository: Repository<LearningPath>,
        private readonly userService: UserService
    ) { }

    async create(userId: string, createLearningPathDto: CreateLearningPathDto) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const learningPath = this.learningPathRepository.create(
            {
                ...createLearningPathDto,
                user
            });
        await this.learningPathRepository.save(learningPath);

        // Re-read so the DB defaults for the counters are part of the response.
        return this.findOne(learningPath.id, userId);
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

    async findAll(userId: string, query: LearningPathQueryDto): Promise<Page<LearningPath>> {

        const { page, size, search, sortBy, sortOrder } = query;
        const ownedByUser = learningPathOwnedBy(userId);

        let where: FindOptionsWhere<LearningPath> | FindOptionsWhere<LearningPath>[] = ownedByUser;
        if (search) {
            // Escape the LIKE wildcards so a search for "100%" does not match everything.
            const term = `%${search.replace(/[%_\\]/g, '\\$&')}%`;
            // Added ownedby
            // This is to prevent users from searching other users' learning paths
            where = [
                { ...ownedByUser, name: Like(term) },
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
        this.learningPathRepository.merge(learningPath, updateLearningPathDto);
        return this.learningPathRepository.save(learningPath);
    }

    async delete(id: string, userId: string) {
        const learningPath = await this.findOne(id, userId);
        await this.learningPathRepository.delete(learningPath.id);
        return learningPath;
    }

    async updateLearningPathSectionCompletion(userId: string, id: string, amount: number) {
        if (amount === 0) {
            return;
        }

        const learningPath = await this.findOne(id, userId);
        await this.learningPathRepository.increment(
            { id: learningPath.id },
            'completedSectionsCount',
            amount,
        );
    }

    async updateTotalSections(userId: string, id: string, amount: number) {
        if (amount === 0) {
            return;
        }

        const learningPath = await this.findOne(id, userId);
        await this.learningPathRepository.increment(
            { id: learningPath.id },
            'totalSectionsCount',
            amount,
        );
    }

    async updateTotalTopics(userId: string, id: string, amount: number) {
        if (amount === 0) {
            return;
        }

        const learningPath = await this.findOne(id, userId);
        await this.learningPathRepository.increment(
            { id: learningPath.id },
            'totalTopicsCount',
            amount,
        );
    }
}
