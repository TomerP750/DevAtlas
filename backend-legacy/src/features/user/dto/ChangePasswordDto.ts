import type { changePasswordRequestSchema } from "../user-validator.js";
import type { z } from "zod";

export type ChangePasswordDto = z.infer<typeof changePasswordRequestSchema>;