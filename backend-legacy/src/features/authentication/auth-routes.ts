import { Router } from "express";
import * as authController from "./auth-controller.js";
import { validate } from "../../shared/middleware/validate.js";
import { loginRequestSchema, signUpRequestSchema } from "./auth-validator.js";

const router = Router();

router.post("/login", validate(loginRequestSchema), authController.login);
router.post("/signup", validate(signUpRequestSchema), authController.signUp);


export default router;