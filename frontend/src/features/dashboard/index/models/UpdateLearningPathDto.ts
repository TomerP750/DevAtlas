import type { Category } from "./Category";
import type { Difficulty } from "./Difficulty";


export interface UpdateLearningPathDto {
    title: string;
    difficulty: Difficulty;
    category: Category;
    description: string;
}