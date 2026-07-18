import { Router, Request, Response } from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import adminRoutes from "./admin.route";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.json({ success: true, message: "API is running" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

export default router;
