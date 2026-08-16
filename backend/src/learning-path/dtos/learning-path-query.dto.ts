import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { Category } from '../category';
import { Difficulty } from '../difficulty';

const SORTABLE_FIELDS = ['name', 'createdAt', 'updatedAt'] as const;

export class LearningPathQueryDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    size: number = 10;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    search?: string;

    @IsOptional()
    @IsEnum(Category)
    category?: Category;

    @IsOptional()
    @IsEnum(Difficulty)
    difficulty?: Difficulty;

    @IsOptional()
    @IsIn([...SORTABLE_FIELDS])
    sortBy: (typeof SORTABLE_FIELDS)[number] = 'createdAt';

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortOrder: 'ASC' | 'DESC' = 'DESC';
}
