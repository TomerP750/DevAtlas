import { Router } from "express";
import * as userController from "./user-controller.js";
import { isAuthenticated } from "../authentication/middleware/isAuthenticated.js";

const router = Router();

router.get("/me", isAuthenticated, userController.me);

router.delete("/", isAuthenticated, userController.deleteUser);

router.put("/", isAuthenticated, userController.updateUser);

router.patch("/change-password", isAuthenticated, userController.changePassword);


export default router;