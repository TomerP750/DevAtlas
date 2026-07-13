import type { Difficulty } from "./Difficulty";
import type { Category } from "./Category";


export interface CreateLearningPathDto {
    title: string;
    description: string;
    difficulty: Difficulty;
    category: Category;
}