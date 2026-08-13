import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SectionService } from './section.service';
import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { Section } from './section.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Role } from '../authentication/role';
import { User } from '../user/user.entity';
import { ConfidenceLevel } from '../shared/enums/confidence-level';
import { Topic } from '../topic/topic.entity';
import { TopicService } from '../topic/topic.service';
import { LearningPath } from '../learning-path/learning-path.entity';
import { LearningPathService } from '../learning-path/learning-path.service';
import { Category } from '../learning-path/category';
import { Difficulty } from '../learning-path/difficulty';
import { NotFoundException } from '@nestjs/common';

type MockSectionRepository = {
  create: jest.MockedFunction<
    (entityLike: DeepPartial<Section>) => Section
  >;
  save: jest.MockedFunction<
    (entity: DeepPartial<Section>) => Promise<Section>
  >;
  findOne: jest.MockedFunction<Repository<Section>['findOne']>;
  find: jest.MockedFunction<Repository<Section>['find']>;
  merge: jest.Mock;
  delete: jest.Mock;
  increment: jest.Mock;
};

describe('SectionService', () => {
  let service: SectionService;
  let repository: MockSectionRepository;
  let user: User;
  let section: Section;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: getRepositoryToken(Section),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
            increment: jest.fn(),
          },
        },
        {
          provide: LearningPathService,
          useValue: {
            updateLearningPathSectionCompletion: jest.fn(),
            updateTotalSections: jest.fn(),
          },
        },
        {
          provide: TopicService,
          useValue: {
            findOne: jest.fn(),
            updateCompletedSectionsCount: jest.fn(),
            updateTotalSectionsCount: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
    repository = module.get(getRepositoryToken(Section));

    user = {
      id: 'user-1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      role: Role.USER,
      password: 'hashed-password',
      avatarUrl: '',
      version: 1,
    };

    const learningPath: LearningPath = {
      id: 'learning-path-1',
      name: 'Learning Path 1',
      description: 'Learning Path 1 description',
      category: Category.BACKEND,
      difficulty: Difficulty.BEGINNER,
      totalSectionsCount: 1,
      totalTopicsCount: 1,
      completedSectionsCount: 0,
      user,
      avatarUrl: '',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    };

    const topic: Topic = {
      id: 'topic-1',
      name: 'Topic 1',
      description: 'Topic 1 description',
      order: 1,
      confidenceLevel: ConfidenceLevel.LOW,
      completedSectionsCount: 0,
      totalSectionsCount: 1,
      learningPath,
    };

    section = {
      id: 'section-1',
      name: 'Section 1',
      description: 'Section 1 description',
      confidenceLevel: ConfidenceLevel.LOW,
      codeSnippet: '',
      topic,
      completed: false,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(user).toBeDefined();
    expect(section).toBeDefined();
  });

  describe('findOne', () => {

    it('should return a section when it is owned by the user', async () => {
      repository.findOne.mockResolvedValue(section);
      const result = await service.findOne(section.id, user.id);
      expect(result).toEqual(section);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: section.id, topic: { learningPath: { user: { id: user.id } } } },
      });
    });

    it('should throw an error when the section is not owned by the user', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne(section.id, 'user-2')).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: section.id, topic: { learningPath: { user: { id: 'user-2' } } } },
      });
    });
    

  });


});
