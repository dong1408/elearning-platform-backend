import { Router, Request, Response } from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.json({ success: true, message: "API is running" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
