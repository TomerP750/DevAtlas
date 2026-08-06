import { Router } from "express";
import * as userController from "./user-controller.js";
import { isAuthenticated } from "../authentication/middleware/isAuthenticated.js";
import { validate } from "../../shared/middleware/validate.js";
import { changePasswordRequestSchema, updateUserDtoSchema } from "./user-validator.js";

const router = Router();

router.get("/me", isAuthenticated, userController.me);

router.delete("/delete", isAuthenticated, userController.deleteUser);

router.put("/update", isAuthenticated, validate(updateUserDtoSchema), userController.updateUser);

router.patch("/change-password", isAuthenticated, validate(changePasswordRequestSchema), userController.changePassword);


export default router;