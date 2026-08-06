import { z } from "zod";


export const updateUserDtoSchema = z.object({
    firstName: z.string().regex(/^[a-zA-Z]+$/).min(2).max(50).optional(),
    lastName: z.string().regex(/^[a-zA-Z]+$/).min(2).max(50).optional(),
    email: z.string().email().max(255).optional(),
    avatarUrl: z.string().optional(),
});

export const changePasswordRequestSchema = z.object({
    currentPassword: z.string().min(8).max(128),
    newPassword: z.string().min(8).max(128),
    confirmNewPassword: z.string().min(8).max(128),
});