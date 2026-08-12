import type { ConfidenceLevel } from "../shared/ConfidenceLevel";

export interface SectionDto {
    id: string;
    name: string;
    description: string;
    codeSnippet?: string;
    confidenceLevel: ConfidenceLevel;
    completed: boolean;
}
