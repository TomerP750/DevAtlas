import { Router } from "express";
import { isAuthenticated } from "../../authentication/middleware/isAuthenticated.js";
import * as learningPathController from "./learningPath-controller.js";

const router = Router();


router.get("/:learningPathId", isAuthenticated, learningPathController.oneLearningPath);

// router.post("/", isAuthenticated, learningPathController.createLearningPath);

// router.put("/:learningPathId", isAuthenticated, learningPathController.updateLearningPath);

// router.delete("/:learningPathId", isAuthenticated, learningPathController.deleteLearningPath);


export default router;