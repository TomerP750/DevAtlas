import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user-dto';
import { NotFoundException } from '@nestjs/common';

import { randomBytes, scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';
import { SignUpDto } from '../authentication/dtos/signup.dto';
import { Role } from '../authentication/role';
import { UpdatePasswordDto } from './dtos/update-password.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }


    async create(signUpDto: SignUpDto) {

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(signUpDto.password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        const user = this.userRepository.create({
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
            email: signUpDto.email,
            password: result,
            role: Role.USER,
        });

        return this.userRepository.save(user);
    }

    async update(userId: string, updateUserDto: UpdateUserDto) {

        const user = await this.findOne(userId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        this.userRepository.merge(user, updateUserDto);

        return this.userRepository.save(user);
    }

    async findOne(id: string): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    async remove(id: string) {

        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return this.userRepository.remove(user);

    }

    // TODO: make a hash utility function
    async updatePassword(userId: string, dto: UpdatePasswordDto) {
        const user = await this.findOne(userId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (dto.newPassword !== dto.confirmNewPassword) {
            throw new BadRequestException("New passwords do not match");
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(dto.newPassword, salt, 32)) as Buffer;
        user.password = salt + '.' + hash.toString('hex');

        return this.userRepository.save(user);
    }

    



}
