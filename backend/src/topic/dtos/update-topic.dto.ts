import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ConfidenceLevel } from '../../shared/enums/confidence-level';

export class UpdateTopicDto {
    @IsOptional()
    @IsString()
    name?: string;
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    @IsInt()
    @Min(1)
    order?: number;
    @IsOptional()
    @IsEnum(ConfidenceLevel)
    confidenceLevel?: ConfidenceLevel;
}

