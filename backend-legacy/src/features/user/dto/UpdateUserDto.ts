import type { updateUserDtoSchema } from "../user-validator.js";
import type { z } from "zod";

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
