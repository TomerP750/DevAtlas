import type { SectionStatus } from "../section-status.js";


export interface UpdateSectionDto {
    name: string;
    description: string;
    status: SectionStatus;
}