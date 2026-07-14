import { Router } from "express";
import { isAuthenticated } from "../../authentication/middleware/isAuthenticated.js";
import * as sectionController from "./section-controller.js";


const router = Router();

router.get("/:sectionId", isAuthenticated, sectionController.oneSection);

router.post("/:learningPathId", isAuthenticated, sectionController.createSection);

router.put("/:sectionId/:learningPathId", isAuthenticated, sectionController.updateSection);

router.delete("/:sectionId/:learningPathId", isAuthenticated, sectionController.deleteSection);

export default router;