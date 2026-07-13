import type { Category } from "../learningPath/enums/Category";
import type { Difficulty } from "../learningPath/enums/Difficulty";


export interface UpdateLearningPathDto {
    title: string;
    difficulty: Difficulty;
    category: Category;
    description: string;
}