import { Types } from "mongoose";
import { HttpError } from "../../../shared/exceptions/HttpError.js";
import type { CreateTopicDto } from "./dto/CreateTopicDto.js";
import type { UpdateTopicDto } from "./dto/UpdateTopicDto.js";
import { toDto } from "./topic-mapper.js";
import { type ITopic } from "./topic-model.js";
import * as topicRepository from "./topic-repository.js";
import { assertOwnerOfSection, fetchSectionEntity } from "../section/section-service.js";
import { fetchLearningPathEntity } from "../learning-path/learningPath-service.js";

export const oneTopic = async (topicId: string) => {
    const topic = await fetchTopicEntity(topicId);
    
    return toDto(topic);
}

export const createTopic = async (userId: string, sectionId: string, createTopicDto: CreateTopicDto) => {

    const isOwner = await assertOwnerOfSection(userId, sectionId);
    if (!isOwner) {
        throw new HttpError(403, "You are not the owner of this section");
    }

    const newTopic: Omit<ITopic, "_id"> = {
        name: createTopicDto.name,
        explanation: createTopicDto.description || "",
        status: createTopicDto.status,
        sectionId: new Types.ObjectId(sectionId),
    };

    const topic = await topicRepository.createTopic(newTopic);
    return topic;
}

export const updateTopic = async (userId: string, topicId: string, updateTopicDto: UpdateTopicDto) => {
    const isOwner = await assertOwnerOfTopic(userId, topicId);
    if (!isOwner) {
        throw new HttpError(403, "You are not the owner of this topic");
    }

    const topic = await topicRepository.updateById(topicId, updateTopicDto);
    return topic;
}

export const deleteTopic = async (userId: string, topicId: string) => {

    const isOwner = await assertOwnerOfTopic(userId, topicId);
    if (!isOwner) {
        throw new HttpError(403, "You are not the owner of this topic");
    }

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

const assertOwnerOfTopic = async (userId: string, topicId: string): Promise<boolean> => {
    const topic = await fetchTopicEntity(topicId);
    const section = await fetchSectionEntity(topic.sectionId.toString());
    const learningPath = await fetchLearningPathEntity(section.learningPathId.toString());

    if (learningPath.userId.toString() !== userId) {
        return false;
    }

    return true;
};