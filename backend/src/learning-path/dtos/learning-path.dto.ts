import { Expose } from "class-transformer";

export class LearningPathDto {
    @Expose()
    id!: string;
    @Expose()
    name!: string;
    @Expose()
    description!: string;
    @Expose()
    avatarUrl!: string;
    @Expose()
    createdAt!: Date;
}