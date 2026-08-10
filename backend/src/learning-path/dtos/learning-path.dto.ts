import { Expose, Type } from "class-transformer";

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

export class PaginatedLearningPathDto {
    @Expose()
    @Type(() => LearningPathDto)
    items!: LearningPathDto[];
    @Expose()
    total!: number;
    @Expose()
    page!: number;
    @Expose()
    size!: number;
    @Expose()
    totalPages!: number;
}
