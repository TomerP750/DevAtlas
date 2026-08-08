import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLearningPathDto {

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsString()
    avatarUrl!: string;

}