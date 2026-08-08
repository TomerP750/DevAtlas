import { IsOptional, IsString } from "class-validator";

export class UpdateLearningPathDto {
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;
    
}