import { Router } from "express";
import { isAuthenticated } from "../../authentication/middleware/isAuthenticated.js";
import * as learningPathController from "./learningPath-controller.js";
import { validate } from "../../../shared/middleware/validate.js";
import { createLearningPathRequestSchema, updateLearningPathRequestSchema } from "./LearningPath-validator.js";

const router = Router();


router.get("/:learningPathId", isAuthenticated, learningPathController.oneLearningPath);

router.post("/create", isAuthenticated, validate(createLearningPathRequestSchema), learningPathController.createLearningPath);

router.put("/update/:learningPathId", isAuthenticated, validate(updateLearningPathRequestSchema), learningPathController.updateLearningPath);

router.delete("/delete/:learningPathId", isAuthenticated, learningPathController.deleteLearningPath);


export default router;