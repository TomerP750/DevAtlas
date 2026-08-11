import { IsOptional, IsString } from 'class-validator';

export class UpdateTopicDto {
    @IsOptional()
    @IsString()
    name?: string;
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    @IsString()
    codeSnippet?: string;
}

