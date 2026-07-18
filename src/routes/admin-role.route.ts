import { Router } from "express";
import adminRoleController from "../controllers/admin-role.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/permission.middleware";
import validate from "../middlewares/validate.middleware";
import {
  createAdminRoleSchema,
  updateAdminRoleSchema,
} from "../validations/admin-role.validation";
import { PERMISSIONS } from "../constants";

const router = Router();

router.use(authenticate);

router.get("/", requirePermission(PERMISSIONS.ROLES_READ), adminRoleController.list);

router.post(
  "/",
  requirePermission(PERMISSIONS.ROLES_CREATE),
  validate(createAdminRoleSchema),
  adminRoleController.create
);

router.put(
  "/:id",
  requirePermission(PERMISSIONS.ROLES_UPDATE),
  validate(updateAdminRoleSchema),
  adminRoleController.update
);

export default router;
