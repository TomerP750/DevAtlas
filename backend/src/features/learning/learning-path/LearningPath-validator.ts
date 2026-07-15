import { z } from "zod";

export const createLearningPathRequestSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    ImageUrl: z.string().optional(),
});

export const updateLearningPathRequestSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    ImageUrl: z.string().optional(),
});