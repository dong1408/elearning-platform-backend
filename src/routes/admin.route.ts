import { Router } from "express";
import adminUserRoutes from "./admin-user.route";
import adminRoleRoutes from "./admin-role.route";
import adminPermissionRoutes from "./admin-permission.route";

const router = Router();

router.use("/users", adminUserRoutes);
router.use("/roles", adminRoleRoutes);
router.use("/permissions", adminPermissionRoutes);

export default router;
