import type { Category } from "./Category";
import type { Difficulty } from "./Difficulty";

export interface LearningPathFilters {
    category?: Category;
    difficulty?: Difficulty;
    sortBy?: "name" | "createdAt" | "updatedAt";
    sortOrder?: "ASC" | "DESC";
}

export interface LearningPathQueryDto extends LearningPathFilters {
    page?: number;
    size?: number;
    search?: string;
}
