import type { Category } from "./enums/Category";
import type { Difficulty } from "./enums/Difficulty";

export interface LearningPathDto {
    id: string;
    title: string;
    description: string;
    category: Category;
    difficulty: Difficulty;
    totalSectionsCount: number;
    totalTopicsCount: number;
    completedTopicsCount: number;
    createdAt: Date;
    avatarUrl?: string;
}

