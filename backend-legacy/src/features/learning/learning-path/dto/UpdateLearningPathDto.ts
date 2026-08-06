import type { z } from "zod";
import type { updateLearningPathRequestSchema } from "../LearningPath-validator.js";

export type UpdateLearningPathDto = z.infer<typeof updateLearningPathRequestSchema>;