import type { TopicStatus } from "../topic-status.js";


export interface UpdateTopicDto {
    name?: string;
    explanation?: string;
    status?: TopicStatus;
    sectionId?: string;
}
