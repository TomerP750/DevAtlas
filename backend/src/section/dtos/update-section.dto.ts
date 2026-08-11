import { IsOptional, IsString } from "class-validator";

export class UpdateSectionDto {
    @IsOptional()
    @IsString()
    name?: string;
    @IsOptional()
    @IsString()
    description?: string;
}