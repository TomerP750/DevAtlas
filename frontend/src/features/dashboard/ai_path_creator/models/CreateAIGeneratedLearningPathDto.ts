import type { Category } from "../../index/models/learningPath/Category";
import type { Difficulty } from "../../index/models/learningPath/Difficulty";


export interface CreateAIGeneratedLearningPathDto {
    learningGoal: string;
    description: string;
    category: Category;
    difficulty: Difficulty;
}