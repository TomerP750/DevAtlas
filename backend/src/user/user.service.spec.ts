import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { User } from './user.entity';
import { Role } from '../authentication/role';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: {
    create: jest.MockedFunction<Repository<User>['create']>;
    save: jest.MockedFunction<Repository<User>['save']>;
    merge: jest.MockedFunction<Repository<User>['merge']>;
    findOneBy: jest.MockedFunction<Repository<User>['findOneBy']>;
    remove: jest.MockedFunction<Repository<User>['remove']>;
    update: jest.MockedFunction<Repository<User>['update']>;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            findOneBy: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockUserRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    const user: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: Role.USER,
      version: 1,
      avatarUrl: '',
    };

    it('should return a user', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(user);
      const result = await service.findOne(user.id);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
    });

    it('should return null if the user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      const result = await service.findOne(user.id);
      expect(result).toBeNull();
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
    });

  });

  describe('findByEmail', () => {
    const user: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: Role.USER,
      version: 1,
      avatarUrl: '',
    };

    it('should return a user if user exists', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(user);
      const result = await service.findByEmail(user.email);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email: user.email });
    });
    
    it('should return null if the user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      const result = await service.findByEmail(user.email);
      expect(result).toBeNull();
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email: user.email });
    });

  });

  describe('remove', () => {
    const user: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: Role.USER,
      version: 1,
      avatarUrl: '',
    };

    it('should remove a user', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockUserRepository.remove.mockResolvedValue(user);
      const result = await service.remove(user.id);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
      expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
    });

    it('should throw an error if the user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      await expect(service.remove(user.id)).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
    });

    
  });

  describe('update', () => {
    const user: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: Role.USER,
      version: 1,
      avatarUrl: '',
    };

    it('should update a user if credentials are valid', async () => {
      const updateUserDto: UpdateUserDto = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
      };
      const updatedUser: User = { ...user, ...updateUserDto };
    
      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockUserRepository.save.mockResolvedValue(updatedUser);
    
      const result = await service.update(user.id, updateUserDto);
    
      expect(result).toEqual(updatedUser);
      
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
      expect(mockUserRepository.merge).toHaveBeenCalledWith(user, updateUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw an error if the user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      await expect(service.update(user.id, {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
      })).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
    });

  });

  describe('updatePassword', () => {
    const user: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: Role.USER,
      version: 1,
      avatarUrl: '',
    };

    it('should update the password if credentials are valid', async () => {
      const updatePasswordDto: UpdatePasswordDto = {
        newPassword: 'newpassword',
        confirmNewPassword: 'newpassword',
        oldPassword: 'password',
      };
      const existingUser = { ...user };

      mockUserRepository.findOneBy.mockResolvedValue(existingUser);
      mockUserRepository.save.mockResolvedValue(existingUser);

      const result = await service.updatePassword(user.id, updatePasswordDto);

      expect(result).toEqual(existingUser);
      expect(result.password).not.toBe(updatePasswordDto.newPassword);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
      expect(mockUserRepository.save).toHaveBeenCalledWith(existingUser);
    });

    it('should throw an error if the user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      await expect(service.updatePassword(user.id, {
        newPassword: 'newpassword',
        confirmNewPassword: 'newpassword',
        oldPassword: 'password',
      })).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
    });

    it('should throw an error if the new passwords do not match', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(user);
      await expect(service.updatePassword(user.id, {
        newPassword: 'newpassword',
        confirmNewPassword: 'newpassword2',
        oldPassword: 'password',
      })).rejects.toThrow(BadRequestException);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
    });

  });

});
