import { Router } from "express";
import * as topicController from "./topic-controller.js";
import { validate } from "../../../shared/middleware/validate.js";
import { createTopicRequestSchema, updateTopicRequestSchema } from "./topic-validator.js";
import { isAuthenticated } from "../../authentication/middleware/isAuthenticated.js";

const router = Router();

router.get("/:topicId", isAuthenticated, topicController.oneTopic);

router.post("/:sectionId", isAuthenticated, validate(createTopicRequestSchema), topicController.createTopic);

router.put("/:topicId", isAuthenticated, validate(updateTopicRequestSchema), topicController.updateTopic);

router.delete("/:topicId", isAuthenticated, topicController.deleteTopic);


export default router;