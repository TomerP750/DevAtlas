import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DeepPartial, FindOperator, Repository } from 'typeorm';
import { Role } from '../authentication/role';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Category } from './category';
import { CreateLearningPathDto } from './dtos/create-learning-path-dto';
import { LearningPathQueryDto } from './dtos/learning-path-query.dto';
import { UpdateLearningPathDto } from './dtos/update-learning-path-dto';
import { Difficulty } from './difficulty';
import { LearningPath } from './learning-path.entity';
import { LearningPathService } from './learning-path.service';

type MockLearningPathRepository = {
  create: jest.MockedFunction<
    (entityLike: DeepPartial<LearningPath>) => LearningPath
  >;
  save: jest.MockedFunction<
    (entity: DeepPartial<LearningPath>) => Promise<LearningPath>
  >;
  findOne: jest.MockedFunction<Repository<LearningPath>['findOne']>;
  findAndCount: jest.MockedFunction<Repository<LearningPath>['findAndCount']>;
  merge: jest.Mock;
  delete: jest.Mock;
  increment: jest.Mock;
};

describe('LearningPathService', () => {
  let service: LearningPathService;
  let repository: MockLearningPathRepository;
  let userService: {
    findOne: jest.MockedFunction<UserService['findOne']>;
  };
  let user: User;
  let learningPath: LearningPath;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LearningPathService,
        {
          provide: getRepositoryToken(LearningPath),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
            increment: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(LearningPathService);
    repository = module.get(getRepositoryToken(LearningPath));
    userService = module.get(UserService);

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

    learningPath = {
      id: 'learning-path-1',
      name: 'Learning Path 1',
      description: 'Learning Path 1 description',
      category: Category.BACKEND,
      difficulty: Difficulty.BEGINNER,
      totalSectionsCount: 0,
      totalTopicsCount: 0,
      completedSectionsCount: 0,
      user,
      avatarUrl: '',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    };
  });

  it('should be defined when dependencies are provided', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a learning path when it is owned by the user', async () => {
      repository.findOne.mockResolvedValue(learningPath);

      await expect(
        service.findOne(learningPath.id, user.id),
      ).resolves.toEqual(learningPath);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: learningPath.id,
          user: { id: user.id },
        },
      });
    });

    it('should throw when the owned learning path is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.findOne(learningPath.id, user.id),
      ).rejects.toThrow(new NotFoundException('Learning path not found'));
    });
  });

  describe('findAll', () => {
    const query: LearningPathQueryDto = {
      page: 2,
      size: 10,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    };

    it('should return an ownership-scoped page when paths exist', async () => {
      const learningPaths = [
        learningPath,
        { ...learningPath, id: 'learning-path-2', name: 'Learning Path 2' },
      ];
      repository.findAndCount.mockResolvedValue([learningPaths, 12]);

      await expect(service.findAll(user.id, query)).resolves.toEqual({
        items: learningPaths,
        total: 12,
        page: 2,
        size: 10,
        totalPages: 2,
      });
      expect(repository.findAndCount).toHaveBeenCalledWith({
        where: { user: { id: user.id } },
        order: { createdAt: 'DESC' },
        skip: 10,
        take: 10,
      });
    });

    it('should return an empty page when no learning paths exist', async () => {
      repository.findAndCount.mockResolvedValue([[], 0]);

      await expect(service.findAll(user.id, query)).resolves.toEqual({
        items: [],
        total: 0,
        page: 2,
        size: 10,
        totalPages: 0,
      });
    });

    
  });

  describe('create', () => {
    const createDto: CreateLearningPathDto = {
      name: 'Learning Path 1',
      description: 'Learning Path 1 description',
      category: Category.BACKEND,
      difficulty: Difficulty.BEGINNER,
      avatarUrl: '',
    };

    it('should create, save, and re-read when the user exists', async () => {
      userService.findOne.mockResolvedValue(user);
      repository.create.mockReturnValue(learningPath);
      repository.save.mockResolvedValue(learningPath);
      repository.findOne.mockResolvedValue(learningPath);

      await expect(service.create(user.id, createDto)).resolves.toEqual(
        learningPath,
      );
      expect(repository.create).toHaveBeenCalledWith({
        ...createDto,
        user,
      });
      expect(repository.save).toHaveBeenCalledWith(learningPath);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: learningPath.id,
          user: { id: user.id },
        },
      });
    });

    it('should throw without writing when the user is not found', async () => {
      userService.findOne.mockResolvedValue(null);

      await expect(service.create(user.id, createDto)).rejects.toThrow(
        new NotFoundException('User not found'),
      );
      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const updateDto: UpdateLearningPathDto = {
      name: 'Updated Learning Path',
      description: 'Updated learning path description',
    };

    it('should merge and save when the learning path exists', async () => {
      const updatedLearningPath = { ...learningPath, ...updateDto };
      repository.findOne.mockResolvedValue(learningPath);
      repository.save.mockResolvedValue(updatedLearningPath);

      await expect(
        service.update(learningPath.id, user.id, updateDto),
      ).resolves.toEqual(updatedLearningPath);
      expect(repository.merge).toHaveBeenCalledWith(learningPath, updateDto);
      expect(repository.save).toHaveBeenCalledWith(learningPath);
    });

    it('should not write when the learning path is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update(learningPath.id, user.id, updateDto),
      ).rejects.toThrow(NotFoundException);
      expect(repository.merge).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete and return when the learning path is owned', async () => {
      repository.findOne.mockResolvedValue(learningPath);

      await expect(
        service.delete(learningPath.id, user.id),
      ).resolves.toEqual(learningPath);
      expect(repository.delete).toHaveBeenCalledWith(learningPath.id);
    });

    it('should not delete when the owned learning path is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.delete(learningPath.id, user.id),
      ).rejects.toThrow(NotFoundException);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });

  describe('updateLearningPathSectionCompletion', () => {
    it('should increment the completed section count when amount is nonzero', async () => {
      repository.findOne.mockResolvedValue(learningPath);

      await expect(
        service.updateLearningPathSectionCompletion(
          user.id,
          learningPath.id,
          1,
        ),
      ).resolves.toBeUndefined();
      expect(repository.increment).toHaveBeenCalledWith(
        { id: learningPath.id },
        'completedSectionsCount',
        1,
      );
    });

    it('should do nothing when the completion amount is zero', async () => {
      await service.updateLearningPathSectionCompletion(
        user.id,
        learningPath.id,
        0,
      );

      expect(repository.findOne).not.toHaveBeenCalled();
      expect(repository.increment).not.toHaveBeenCalled();
    });
  });

  describe('updateTotalSections', () => {
    it('should increment the total section count when amount is nonzero', async () => {
      repository.findOne.mockResolvedValue(learningPath);

      await service.updateTotalSections(user.id, learningPath.id, 2);

      expect(repository.increment).toHaveBeenCalledWith(
        { id: learningPath.id },
        'totalSectionsCount',
        2,
      );
    });

    it('should do nothing when the section amount is zero', async () => {
      await service.updateTotalSections(user.id, learningPath.id, 0);

      expect(repository.findOne).not.toHaveBeenCalled();
      expect(repository.increment).not.toHaveBeenCalled();
    });
  });

  describe('updateTotalTopics', () => {
    it('should increment the total topic count when amount is nonzero', async () => {
      repository.findOne.mockResolvedValue(learningPath);

      await service.updateTotalTopics(user.id, learningPath.id, -1);

      expect(repository.increment).toHaveBeenCalledWith(
        { id: learningPath.id },
        'totalTopicsCount',
        -1,
      );
    });

    it('should not increment when the learning path is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateTotalTopics(user.id, learningPath.id, 1),
      ).rejects.toThrow(NotFoundException);
      expect(repository.increment).not.toHaveBeenCalled();
    });

    it('should do nothing when the topic amount is zero', async () => {
      await service.updateTotalTopics(user.id, learningPath.id, 0);

      expect(repository.findOne).not.toHaveBeenCalled();
      expect(repository.increment).not.toHaveBeenCalled();
    });
  });
});
