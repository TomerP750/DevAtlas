import { z } from "zod";
import { Category } from "./category.js";
import { Difficulty } from "./difficulty.js";

export const createLearningPathRequestSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(Category),
    difficulty: z.enum(Difficulty),
    ImageUrl: z.string().optional(),
});

export const updateLearningPathRequestSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    category: z.enum(Category).optional(),
    difficulty: z.enum(Difficulty).optional(),
    ImageUrl: z.string().optional(),
});