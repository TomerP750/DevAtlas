import { IsString } from 'class-validator';
export class CreateTopicDto {
    @IsString()
    name!: string;
    @IsString()
    description!: string;
    @IsString()
    codeSnippet!: string;
}