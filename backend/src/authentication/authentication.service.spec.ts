import { Test } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dtos/signup.dto';
import { User } from 'src/user/user.entity';
import { Role } from './role';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dtos/signin.dto';



describe('AuthService', () => {

  let service: AuthenticationService;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    const users: User[] = [];
    mockUserService = {
      findByEmail: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers[0]);
      },
      create: (dto: SignUpDto) => {
        const user = { id: Math.floor(Math.random() * 999999).toString(), role: Role.USER, avatarUrl: '', ...dto } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService, {
          provide: UserService,
          useValue: mockUserService,
        }
      ],
    }).compile();

    service = module.get(AuthenticationService);
  });


  it('can create an instance of AuthenticationService', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const dto = new SignUpDto('user', 'one', 'test@test.com', 'password', 'confirmPassword');
    const user = await service.signUp(dto);

    expect(user.password).not.toEqual(dto.password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    const dto = new SignUpDto('user', 'one', 'test@test.com', 'password', 'confirmPassword');
    await service.signUp(dto);
    await expect(service.signUp(dto)).rejects.toThrow(BadRequestException);
  });


  it('throws if signin is called with an unused email', async () => {
    const dto = new SignInDto('test@test.com', 'password');
    await expect(service.signIn(dto)).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    const dto = new SignInDto('test@test.com', 'wrongPassword');
    await expect(service.signIn(dto)).rejects.toThrow(UnauthorizedException);
  });

  it('returns a user if correct password is provided', async () => {
    const dto = new SignInDto('test@test.com', 'testPass');
    const user = await service.signIn(dto);
    expect(user).toBeDefined();
  });


});