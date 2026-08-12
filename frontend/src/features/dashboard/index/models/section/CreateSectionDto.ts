import type { ConfidenceLevel } from "../shared/ConfidenceLevel";

export interface CreateSectionDto {
    name: string;
    description: string;
    codeSnippet?: string;
    confidenceLevel: ConfidenceLevel;
}
