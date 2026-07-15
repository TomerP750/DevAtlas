import type { createTopicRequestSchema } from "../topic-validator.js";
import type { z } from "zod";

export type CreateTopicDto = z.infer<typeof createTopicRequestSchema>;