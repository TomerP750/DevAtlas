import type { createLearningPathRequestSchema } from "../LearningPath-validator.js";
import type { z } from "zod";

export type CreateLearningPathDto = z.infer<typeof createLearningPathRequestSchema>;