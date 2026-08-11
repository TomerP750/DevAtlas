import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ConfidenceLevel } from "../../shared/enums/confidence-level";

export class CreateSectionDto {
    @IsNotEmpty()
    @IsString()
    name!: string;
    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsOptional()
    @IsString()
    codeSnippet?: string;

    @IsEnum(ConfidenceLevel)
    confidenceLevel!: ConfidenceLevel;
}