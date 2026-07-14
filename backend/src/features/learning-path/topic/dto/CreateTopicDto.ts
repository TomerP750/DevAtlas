import type { TopicStatus } from "../topic-status.js";


export interface CreateTopicDto {
    name: string;
    explanation: string;
    status: TopicStatus;
}