import { IsEnum, IsString } from 'class-validator';
import { ConfidenceLevel } from '../../shared/enums/confidence-level';
export class CreateTopicDto {
    @IsString()
    name!: string;
    @IsString()
    description!: string;
    @IsEnum(ConfidenceLevel)
    confidenceLevel!: ConfidenceLevel;
}