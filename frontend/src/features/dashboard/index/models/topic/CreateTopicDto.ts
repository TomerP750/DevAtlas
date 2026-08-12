import type { ConfidenceLevel } from "../shared/ConfidenceLevel";

export interface CreateTopicDto {
    name: string;
    description: string;
    order: number;
    confidenceLevel: ConfidenceLevel;
}
