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

export const createLearningPath = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const { name, description, ImageUrl, category, difficulty } = req.body as CreateLearningPathDto;

        const learningPath = await learningPathService.createLearningPath(userId, { name, description, ImageUrl, category, difficulty });
        res.status(201).json(learningPath);
    } catch (error) {
        next(error);
    }
}

export const updateLearningPath = async (req: Request<{ learningPathId: string }>, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const { learningPathId } = req.params;
        const { name, description, ImageUrl, category, difficulty } = req.body as UpdateLearningPathDto;
        const learningPath = await learningPathService.updateLearningPath(userId, learningPathId, { name, description, ImageUrl, category, difficulty });
        res.status(200).json(learningPath);
    } catch (error) {
        next(error);
    }
}

export const deleteLearningPath = async (req: Request<{ learningPathId: string }>, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const { learningPathId } = req.params;
        const learningPath = await learningPathService.deleteLearningPath(userId, learningPathId);
        res.status(200).json(learningPath);
    } catch (error) {
        next(error);
    }
}