import type { Difficulty } from "../../index/models/learningPath/Difficulty";

export interface CreateAIGeneratedLearningPathDto {
    learningGoal: string;
    level: Difficulty;
}