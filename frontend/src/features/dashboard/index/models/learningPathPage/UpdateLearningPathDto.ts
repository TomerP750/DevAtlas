import type { Category } from "../learningPath/enums/Category";
import type { Difficulty } from "../learningPath/enums/Difficulty";


export interface UpdateLearningPathDto {
    title: string;
    description: string;
    category: Category;
    difficulty: Difficulty;
    ImageUrl?: string;
}