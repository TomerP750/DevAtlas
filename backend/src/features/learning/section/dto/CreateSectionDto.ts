import type { SectionStatus } from "../section-status.js";


export interface CreateSectionDto {
    name: string;
    description: string;
    status: SectionStatus;
}