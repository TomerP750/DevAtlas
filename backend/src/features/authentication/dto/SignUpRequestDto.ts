import type { z } from "zod";
import type { signUpRequestSchema } from "../../user/user-validator.js";

export type SignUpRequestDto = z.infer<typeof signUpRequestSchema>;