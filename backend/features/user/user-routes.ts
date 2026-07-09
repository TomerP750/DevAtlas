import { Router } from "express";
import * as userController from "./user-controller.js";

const router = Router();

router.get("/me", userController.me);

router.delete("/", userController.deleteUser);

router.put("/", userController.updateUser);


export default router;