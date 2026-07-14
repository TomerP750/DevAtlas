import { Router } from "express";
import { isAuthenticated } from "../../authentication/middleware/isAuthenticated.js";
import * as learningPathController from "./learningPath-controller.js";

const router = Router();


router.get("/:learningPathId", isAuthenticated, learningPathController.oneLearningPath);


export default router;