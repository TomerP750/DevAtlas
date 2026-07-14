import { toDto } from "./learningPath-mapper.js";
import * as learningPathRepository from "./learningPath-repository.js";
import type { ILearningPath } from "./learningPath-model.js";
import { HttpError } from "../../../shared/exceptions/HttpError.js";


export const oneLearningPath = async (userId: string, learningPathId: string) => {
    const learningPath = await fetchLearningPathEntity(learningPathId);
    return toDto(learningPath);
}



const fetchLearningPathEntity = async (id: string) => {
    const learningPath = await learningPathRepository.findById(id);
    if (!learningPath) {
        throw new HttpError(404, "Learning path not found");
    }
    return learningPath;
}