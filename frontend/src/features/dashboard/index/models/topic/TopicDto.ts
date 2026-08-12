import type { ConfidenceLevel } from "../shared/ConfidenceLevel";

export interface TopicDto {
    id: string;
    name: string;
    description: string;
    order: number;
    confidenceLevel: ConfidenceLevel;
    learningPathId: string;
    completedSectionsCount: number;
    totalSectionsCount: number;
}
