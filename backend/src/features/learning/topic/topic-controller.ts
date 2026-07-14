import type { Request, Response, NextFunction } from "express";
import * as topicService from "./topic-service.js";
import { HttpError } from "../../../shared/exceptions/HttpError.js";

export const oneTopic = async (
    req: Request<{ topicId: string }>,
    res: Response,
    next: NextFunction) => {
    try {
        const { topicId } = req.params;
        const topic = await topicService.oneTopic(topicId);
        res.status(200).json(topic);
    } catch (error) {
        next(error);
    }
}

export const createTopic = async (
    req: Request<{ sectionId: string }>,
    res: Response,
    next: NextFunction) => {
    try {
        const { sectionId } = req.params;

        const { name, explanation, status } = req.body;
        const topic = await topicService.createTopic(
            sectionId, { name, explanation, status }
        );
        res.status(201).json(topic);
    } catch (error) {
        next(error);
    }
}

export const updateTopic = async (
    req: Request<{ topicId: string }>,
    res: Response,
    next: NextFunction) => {

    try {
        const { topicId } = req.params;
        
        const { name, explanation, status } = req.body;
        if (!topicId) {
            throw new HttpError(400, "Topic ID is required");
        }
        const topic = await topicService.updateTopic(topicId, { name, explanation, status });
        res.status(200).json(topic);
    } catch (error) {
        next(error);
    }
}

export const deleteTopic = async (
    req: Request<{ topicId: string }>,
    res: Response,
    next: NextFunction) => {

    try {
        const { topicId } = req.params;
        if (!topicId) {
            throw new HttpError(400, "Topic ID is required");
        }
        const topic = await topicService.deleteTopic(topicId);
        res.status(200).json(topic);
    } catch (error) {
        next(error);
    }
}

