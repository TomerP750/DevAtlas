import { IsEnum, IsOptional, IsString } from "class-validator";
import { ConfidenceLevel } from "../../shared/enums/confidence-level";

export class UpdateSectionDto {
    @IsOptional()
    @IsString()
    name?: string;
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    codeSnippet?: string;

    @IsOptional()
    @IsEnum(ConfidenceLevel)
    confidenceLevel?: ConfidenceLevel;
}