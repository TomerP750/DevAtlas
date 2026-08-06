import type { ITopicDto } from "./dto/TopicDto.js";
import type { ITopic } from "./topic-model.js";


export const toDto = (topic: ITopic): ITopicDto => {
    return {
        id: topic._id.toString(),
        name: topic.name,
        explanation: topic.explanation,
        status: topic.status,
        sectionId: topic.sectionId.toString(),
    }
}