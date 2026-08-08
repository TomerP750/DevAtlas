import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Role } from 'src/authentication/role';
import { NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {

    mockUserService = {
      findOne: (id: string) => Promise.resolve({ id: '1', firstName: 'test', lastName: 'test', role: Role.USER, avatarUrl: '', email: 'test@test.com', password: 'password' } as User),
      remove: (id: string) => Promise.resolve(),
      // update: (userId: string, updateUserDto: UpdateUserDto) => Promise.resolve(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with id is not found', async () => {
    mockUserService.findOne = () =>
      Promise.reject(new NotFoundException('User not found'));
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

});
