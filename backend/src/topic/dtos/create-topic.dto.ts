import { IsEnum, IsInt, IsString, Min } from 'class-validator';
import { ConfidenceLevel } from '../../shared/enums/confidence-level';
export class CreateTopicDto {
    @IsString()
    name!: string;
    @IsString()
    description!: string;
    @IsInt()
    @Min(1)
    order!: number;
    @IsEnum(ConfidenceLevel)
    confidenceLevel!: ConfidenceLevel;
}