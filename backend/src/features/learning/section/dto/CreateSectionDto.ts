import type { createSectionRequestSchema } from "../section-validator.js";
import type { z } from "zod";

export type CreateSectionDto = z.infer<typeof createSectionRequestSchema>;