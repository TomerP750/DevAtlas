import { Router } from "express";
import * as sectionController from "./section-controller.js";


const router = Router();

router.get("/:sectionId", sectionController.oneSection);

router.post("/:learningPathId", sectionController.createSection);

router.put("/:sectionId/:learningPathId", sectionController.updateSection);

router.delete("/:sectionId/:learningPathId", sectionController.deleteSection);

export default router;