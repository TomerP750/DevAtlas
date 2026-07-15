import { toDto } from "./learningPath-mapper.js";
import * as learningPathRepository from "./learningPath-repository.js";
import type { ILearningPath } from "./learningPath-model.js";
import { HttpError } from "../../../shared/exceptions/HttpError.js";
import type { CreateLearningPathDto } from "./dto/CreateLearningPathDto.js";
import { Types } from "mongoose";
import type { UpdateLearningPathDto } from "./dto/UpdateLearningPathDto.js";


export const oneLearningPath = async (userId: string, learningPathId: string) => {
    const learningPath = await fetchLearningPathEntity(learningPathId);
    return toDto(learningPath);
}

export const createLearningPath = async (userId: string, createLearningPathDto: CreateLearningPathDto) => {

    const newLearningPath: Omit<ILearningPath, "_id" | "createdAt" | "updatedAt"> = {
        name: createLearningPathDto.name,
        description: createLearningPathDto.description,
        ImageUrl: createLearningPathDto.ImageUrl ?? "",
        userId: new Types.ObjectId(userId),
        category: createLearningPathDto.category,
        difficulty: createLearningPathDto.difficulty,
    }

    await learningPathRepository.create(newLearningPath);
}   

export const updateLearningPath = async (userId: string, learningPathId: string, updateLearningPathDto: UpdateLearningPathDto) => {
    const isOwner = await assertOwnerOfLearningPath(userId, learningPathId);
    if (!isOwner) {
        throw new HttpError(403, "You are not the owner of this learning path");
    }

    await learningPathRepository.updateById(learningPathId, updateLearningPathDto);

}

export const deleteLearningPath = async (userId: string, learningPathId: string) => {

    const isOwner = await assertOwnerOfLearningPath(userId, learningPathId);
    if (!isOwner) {
        throw new HttpError(403, "You are not the owner of this learning path");
    }

    await learningPathRepository.deleteById(learningPathId);
}

export const fetchLearningPathEntity = async (id: string): Promise<ILearningPath> => {
    const learningPath = await learningPathRepository.findById(id);
    if (!learningPath) {
        throw new HttpError(404, "Learning path not found");
    }
    return learningPath;
}

export const assertOwnerOfLearningPath = async (userId: string, learningPathId: string): Promise<boolean> => {
    const learningPath = await fetchLearningPathEntity(learningPathId);
    return learningPath.userId.toString() === userId;
}