import type { ILearningPath } from "./learningPath-model.js";


export const toDto = (learningPath: ILearningPath) => {
    return {
        id: learningPath._id.toString(),
        name: learningPath.name,
        description: learningPath.description,
        ImageUrl: learningPath.ImageUrl,
        userId: learningPath.userId.toString(),
    };
}


export const toDashboardCardDto = (
    learningPath: ILearningPath,
    topicsLength: number,
    completedTopicsCount: number
) => {
    return {
        id: learningPath._id.toString(),
        title: learningPath.name,
        description: learningPath.description,
        completedTopicsCount,
        topicsLength,
        createdAt: learningPath.createdAt,
    };
};