import type { Request, Response, NextFunction } from "express";
import type { CreateSectionDto } from "./dto/CreateSectionDto.js";
import type { UpdateSectionDto } from "./dto/UpdateSectionDto.js";
import * as sectionService from "./section-service.js";
import { fetchLearningPathEntity } from "../learning-path/learningPath-service.js";
import { HttpError } from "../../../shared/exceptions/HttpError.js";

export const oneSection = async (req: Request<{ sectionId: string }>, res: Response, next: NextFunction) => {
    try {

        const { sectionId } = req.params;
        const section = await sectionService.oneSection(sectionId);

        res.status(200).json(section);
    } catch (error) {
        next(error);
    }
}

export const createSection = async (req: Request<{ learningPathId: string }>, res: Response, next: NextFunction) => {
    try {
        const { learningPathId } = req.params;
        const userId = req.user.id;

        const { name, description, status } = req.body as CreateSectionDto;
        const section = await sectionService.createSection(userId, learningPathId, { name, description, status });
        res.status(201).json(section);
    } catch (error) {
        next(error);
    }
}

export const updateSection = async (req: Request<{ sectionId: string, learningPathId: string }>, res: Response, next: NextFunction) => {
    try {
        const { sectionId, learningPathId } = req.params;
        const userId = req.user.id;

        const { name, description, status } = req.body as UpdateSectionDto;
        const section = await sectionService.updateSection(userId, sectionId, learningPathId, { name, description, status });
        res.status(200).json(section);
    } catch (error) {
        next(error);
    }
}

export const deleteSection = async (req: Request<{ sectionId: string, learningPathId: string }>, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const { sectionId, learningPathId } = req.params;

        const section = await sectionService.deleteSection(userId, sectionId, learningPathId);
        res.status(200).json(section);
    } catch (error) {
        next(error);
    }
}

