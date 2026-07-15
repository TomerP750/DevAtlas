import { HttpError } from "../../../shared/exceptions/HttpError.js";
import type { UpdateLearningPathDto } from "./dto/UpdateLearningPathDto.js";
import { toDto } from "./learningPath-mapper.js";
import LearningPath, { type ILearningPath } from "./learningPath-model.js";


export const findById = async (id: string) => {
    const learningPath = await LearningPath.findById(id);
    if (!learningPath) {
        throw new HttpError(404, "Learning path not found");
    }
    return learningPath;
}

export const updateById = async (id: string, learningPath: UpdateLearningPathDto) => {
    await LearningPath.findByIdAndUpdate(id, learningPath, { returnDocument: "after" });
}

export const create = async (learningPath: Omit<ILearningPath, "_id">) => {
    await LearningPath.create(learningPath);
}

export const deleteById = async (id: string) => {
    await LearningPath.findByIdAndDelete(id);
}