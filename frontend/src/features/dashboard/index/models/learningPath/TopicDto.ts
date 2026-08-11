import type { ConfidenceLevel } from "./enums/ConfidenceLevel";

export interface TopicDto {
    id: string;
    name: string;
    description: string;
    order: number;
    confidenceLevel: ConfidenceLevel;
    learningPathId: string;
}