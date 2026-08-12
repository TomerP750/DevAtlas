import type { Category } from "./Category";
import type { Difficulty } from "./Difficulty";

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

