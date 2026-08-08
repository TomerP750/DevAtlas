import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user-dto';
import { NotFoundException } from '@nestjs/common';
import { SignUpDto } from 'src/authentication/dtos/signup.dto';
import { Role } from 'src/authentication/role';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }

    async create(signUpDto: SignUpDto) {

        const user = this.userRepository.create({
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
            email: signUpDto.email,
            password: signUpDto.password,
            role: Role.USER,
        });

        return this.userRepository.save(user);
    }

    async update(userId: string, updateUserDto: UpdateUserDto) {

        const user = await this.findOne(userId);
        
        if (userId !== user.id) {
            throw new BadRequestException("User not found");
        }

        Object.assign(user, updateUserDto);

        return this.userRepository.save(user);
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async remove(id: string) {

        const user = await this.findOne(id);

        this.userRepository.remove(user);

    }



}
