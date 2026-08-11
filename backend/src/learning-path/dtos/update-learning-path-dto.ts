import { IsEnum, IsOptional, IsString } from "class-validator";
import { Category } from "../category";
import { Difficulty } from "../difficulty";

export class UpdateLearningPathDto {
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(Category)
    category?: Category;

    @IsOptional()
    @IsEnum(Difficulty)
    difficulty?: Difficulty;

    @IsOptional()
    @IsString()
    avatarUrl?: string;
    
}