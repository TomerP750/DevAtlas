import { Types } from "mongoose";
import { HttpError } from "../../../shared/exceptions/HttpError.js";
import type { CreateTopicDto } from "./dto/CreateTopicDto.js";
import type { UpdateTopicDto } from "./dto/UpdateTopicDto.js";
import { toDto } from "./topic-mapper.js";
import { type ITopic } from "./topic-model.js";
import * as topicRepository from "./topic-repository.js";

export const oneTopic = async (topicId: string) => {
    const topic = await fetchTopicEntity(topicId);
    
    return toDto(topic);
}

export const createTopic = async (sectionId: string, createTopicDto: CreateTopicDto) => {

    const newTopic: Omit<ITopic, "_id"> = {
        name: createTopicDto.name,
        explanation: createTopicDto.explanation,
        status: createTopicDto.status,
        sectionId: new Types.ObjectId(sectionId),
    };

    const topic = await topicRepository.createTopic(newTopic);
    return topic;
}

export const updateTopic = async (topicId: string, updateTopicDto: UpdateTopicDto) => {
    const topic = await topicRepository.updateById(topicId, updateTopicDto);
    return topic;
}

export const deleteTopic = async (topicId: string) => {
    const topic = await topicRepository.deleteById(topicId);
    return topic;
}


const fetchTopicEntity = async (topicId: string) => {
    const topic = await topicRepository.findById(topicId);
    if (!topic) {
        throw new HttpError(404, "Topic not found");
    }
    return topic;
}