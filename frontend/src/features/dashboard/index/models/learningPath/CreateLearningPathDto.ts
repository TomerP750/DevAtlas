import type { Category } from "./Category";
import type { Difficulty } from "./Difficulty";

export interface CreateLearningPathDto {
    name: string;
    description: string;
    difficulty: Difficulty;
    category: Category;
    avatarUrl?: string;
}
