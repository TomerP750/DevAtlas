import type { Category } from "./Category";
import type { Difficulty } from "./Difficulty";

export interface CreateLearningPathDto {
    title: string;
    description: string;
    difficulty: Difficulty;
    category: Category;
    ImageUrl?: string;
}
