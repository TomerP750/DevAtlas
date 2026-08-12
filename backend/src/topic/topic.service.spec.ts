import { Test, TestingModule } from '@nestjs/testing';
import { TopicService } from './topic.service';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { LearningPathService } from '../learning-path/learning-path.service';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Section } from '../section/section.entity';


describe('TopicService', () => {
  let service: TopicService;
  let mockTopicRepository: {
    findOne: jest.MockedFunction<Repository<Topic>['findOne']>;
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicService,
        {
          provide: getRepositoryToken(Topic),
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            createTopic: jest.fn(),
            updateTopic: jest.fn(),
            deleteTopic: jest.fn(),
            toggleTopicCompletion: jest.fn(),
          },
        },
        {
          provide: LearningPathService,
          useValue: {
            findOne: jest.fn(),
            updateTotalTopics: jest.fn(),
            updateTotalSections: jest.fn(),
            updateLearningPathSectionCompletion: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Section),
          useValue: {
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TopicService>(TopicService);
    mockTopicRepository = module.get(getRepositoryToken(Topic));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('returns the topic when it belongs to the user', async () => {
      const topic = {
        id: 'topic-1',
        name: 'Unit testing',
        description: 'Learn how to isolate dependencies',
        learningPath: {
          user: {
            id: 'user-1',
          },
        },
      } as Topic;

      mockTopicRepository.findOne.mockResolvedValue(topic);

      await expect(service.findOne('topic-1', 'user-1')).resolves.toBe(topic);
      expect(mockTopicRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 'topic-1',
          learningPath: {
            user: {
              id: 'user-1',
            },
          },
        },
        relations: {
          learningPath: true,
        },
      });
    });

    it('throws NotFoundException when the topic does not exist', async () => {
      mockTopicRepository.findOne.mockResolvedValue(null);

      await expect(
        service.findOne('missing-topic', 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });

  });

  describe('findAll', () => {
    it('returns all topics for the user', async () => {
       
    });

    
  });

  describe('createTopic', () => {

    it('creates a new topic for the user', async () => {

    });

  })

  describe('updateTopic', () => {
    it('should update a topic for the user', async () => {
      
    });
  })

  describe('deleteTopic', () => {
    it('should delete a topic for the user', async () => {

      mockTopicRepository

    });
  });




  
});
