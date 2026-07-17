import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/profile", userController.getProfile);

export default router;
