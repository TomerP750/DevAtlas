import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';
import { UpdateUserDto } from 'src/user/dtos/update-user-dto';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { NotFoundException } from '@nestjs/common';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let mockUserService: Partial<UserService>;
  let mockAuthService: Partial<AuthenticationService>;

  beforeEach(async () => {
    
    mockUserService = {
      findOne: (id: string) => Promise.resolve({ id, firstName: 'test', lastName: 'test', role: Role.USER, avatarUrl: '', email: 'test@test.com', password: 'password' } as User),
      remove: (id: string) => Promise.resolve(),
      // update: (userId: string, updateUserDto: UpdateUserDto) => Promise.resolve(),
    };
    
    mockAuthService = {
      signUp: (dto: SignUpDto) => Promise.resolve(),
      signIn: (dto: SignInDto) => Promise.resolve(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: AuthenticationService,
          useValue: mockAuthService,
        },
      ]
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
});
