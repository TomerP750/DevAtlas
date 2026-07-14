import Topic, { type ITopic } from "./topic-model.js";
import type { UpdateTopicDto } from "./dto/UpdateTopicDto.js";

export const findById = async (id: string) => {
    return await Topic.findById(id);
}

export const createTopic = async (newTopic: Omit<ITopic, "_id">) => {
    return await Topic.create(newTopic);
}

export const updateById = async (id: string, updateTopicDto: UpdateTopicDto) => {
    return await Topic.findByIdAndUpdate(id, updateTopicDto, { new: true });
}

export const deleteById = async (id: string) => {
    return await Topic.findByIdAndDelete(id);
}

