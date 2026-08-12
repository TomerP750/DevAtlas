import { Expose, Type } from "class-transformer";
import { Category } from "../category";
import { Difficulty } from "../difficulty";

export class LearningPathDto {
    @Expose()
    id!: string;
    @Expose()
    name!: string;
    @Expose()
    description!: string;
    @Expose()
    category!: Category;
    @Expose()
    difficulty!: Difficulty;
    @Expose()
    avatarUrl?: string;
    @Expose()
    totalSectionsCount!: number;
    @Expose()
    totalTopicsCount!: number;
    @Expose()
    completedSectionsCount!: number;
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
