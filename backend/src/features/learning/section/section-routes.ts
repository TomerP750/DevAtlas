import { Router } from "express";
import { isAuthenticated } from "../../authentication/middleware/isAuthenticated.js";
import * as sectionController from "./section-controller.js";
import { validate } from "../../../shared/middleware/validate.js";
import { createSectionRequestSchema, updateSectionRequestSchema } from "./section-validator.js";

const router = Router();

router.get("/:sectionId", isAuthenticated, sectionController.oneSection);

router.post("/:learningPathId", isAuthenticated, validate(createSectionRequestSchema), sectionController.createSection);

router.put("/:sectionId/:learningPathId", isAuthenticated, validate(updateSectionRequestSchema), sectionController.updateSection);

router.delete("/:sectionId/:learningPathId", isAuthenticated, sectionController.deleteSection);

export default router;