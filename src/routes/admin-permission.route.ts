import { Router } from "express";
import adminRoleController from "../controllers/admin-role.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/permission.middleware";
import { PERMISSIONS } from "../constants";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  requirePermission(PERMISSIONS.PERMISSIONS_READ),
  adminRoleController.listPermissions
);

export default router;
