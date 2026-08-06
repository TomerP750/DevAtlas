import { z } from "zod";
import { TopicStatus } from "./topic-status.js";


export const createTopicRequestSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    sectionId: z.string().min(1),
    status: z.enum(TopicStatus),
});

export const updateTopicRequestSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(TopicStatus).optional(),
});