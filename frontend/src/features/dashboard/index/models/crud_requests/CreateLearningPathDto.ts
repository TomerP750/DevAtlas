import type { Difficulty } from "./enums/Difficulty";
import type { Category } from "./enums/Category";


export interface CreateLearningPathDto {
    title: string;
    description: string;
    difficulty: Difficulty;
    category: Category;
}