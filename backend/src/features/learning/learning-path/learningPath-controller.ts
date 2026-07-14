import type { Request, Response, NextFunction } from "express";
import * as learningPathService from "./learningPath-service.js";
import type { CreateLearningPathDto } from "./dto/CreateLearningPathDto.js";
import type { UpdateLearningPathDto } from "./dto/UpdateLearningPathDto.js";

export const oneLearningPath = async (req: Request<{ learningPathId: string }>, res: Response, next: NextFunction) => {
    try {
        const { learningPathId } = req.params;
        const userId = req.user.id;
        const learningPath = await learningPathService.oneLearningPath(userId, learningPathId);
        res.status(200).json(learningPath);
    } catch (error) {
        next(error);
    }
}