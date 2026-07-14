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
