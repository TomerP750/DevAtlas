import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user-dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }

    async update(userId: string, attrs: Partial<User>) {
        const user = await this.findOne(userId);
        Object.assign(user, attrs);
        return this.userRepository.save(user);
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOneBy({ id });
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
