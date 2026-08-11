import { Expose } from "class-transformer";
import { ConfidenceLevel } from "../../shared/enums/confidence-level";

export class SectionDto {
    @Expose()
    id!: string;
    @Expose()
    name!: string;
    @Expose()
    description!: string;
    @Expose()
    codeSnippet?: string;
    @Expose()
    confidenceLevel!: ConfidenceLevel;
    @Expose()
    completed!: boolean;
}