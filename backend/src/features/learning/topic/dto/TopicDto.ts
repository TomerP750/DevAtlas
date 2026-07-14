import { TopicStatus } from "../topic-status.js";


export interface ITopicDto {
    id?: string;
    name: string;
    explanation: string;
    status: TopicStatus;
    sectionId: string;
}