import { Router } from "express";
import * as topicController from "./topic-controller.js";

const router = Router();

router.get("/:topicId", topicController.oneTopic);

router.post("/:sectionId", topicController.createTopic);

router.put("/:topicId", topicController.updateTopic);

router.delete("/:topicId", topicController.deleteTopic);


export default router;