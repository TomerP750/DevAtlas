import type { Category } from "../learningPath/enums/Category";
import type { Difficulty } from "../learningPath/enums/Difficulty";



export interface CreateLearningPathDto {
    title: string;
    description: string;
    difficulty: Difficulty;
    category: Category;
    ImageUrl?: string;
}