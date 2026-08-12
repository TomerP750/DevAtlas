import type { Category } from "./Category";
import type { Difficulty } from "./Difficulty";

export interface LearningPathDto {
    id: string;
    name: string;
    description: string;
    category: Category;
    difficulty: Difficulty;
    totalSectionsCount: number;
    totalTopicsCount: number;
    completedSectionsCount: number;
    createdAt: string;
    avatarUrl?: string;
}
