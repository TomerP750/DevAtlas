import { z } from "zod";
import { SectionStatus } from "./section-status.js";


export const createSectionRequestSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    learningPathId: z.string().min(1),
    status: z.enum(SectionStatus),
});

export const updateSectionRequestSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(SectionStatus),
});