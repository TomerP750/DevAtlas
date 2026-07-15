import type { updateTopicRequestSchema } from "../topic-validator.js";
import type { z } from "zod";

export type UpdateTopicDto = z.infer<typeof updateTopicRequestSchema>;
