import { Expose } from 'class-transformer';

export class TopicDto {
    @Expose()
    id!: string;
    @Expose()
    name!: string;
    @Expose()
    description!: string;
    @Expose()
    codeSnippet?: string;
    @Expose()
    learningPathId!: string;
}