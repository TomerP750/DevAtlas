import type { ConfidenceLevel } from "./enums/ConfidenceLevel";

export interface SectionDto {
    id: string;
    name: string;
    description: string;
    codeSnippet?: string;
    confidenceLevel: ConfidenceLevel;
    completed: boolean;
}