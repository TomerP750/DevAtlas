import type { updateSectionRequestSchema } from "../section-validator.js";
import type { z } from "zod";


export type UpdateSectionDto = z.infer<typeof updateSectionRequestSchema>;