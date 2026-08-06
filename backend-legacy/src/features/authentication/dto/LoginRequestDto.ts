import type { loginRequestSchema } from "../auth-validator.js";
import type { z } from "zod";

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;