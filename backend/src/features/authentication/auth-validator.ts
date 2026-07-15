import { z } from "zod";


export const loginRequestSchema = z.object({
    email: z.email().min(1),
    password: z.string().min(1),
});


export const signUpRequestSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.email().max(255),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
});
