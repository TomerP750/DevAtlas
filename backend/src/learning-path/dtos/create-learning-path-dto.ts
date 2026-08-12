import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../category';
import { Difficulty } from '../difficulty';

export class CreateLearningPathDto {

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsEnum(Category)
    category!: Category;

    @IsNotEmpty()
    @IsEnum(Difficulty)
    difficulty!: Difficulty;

    @IsOptional()
    @IsString()
    avatarUrl?: string;

}