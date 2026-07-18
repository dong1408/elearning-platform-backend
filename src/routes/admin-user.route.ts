import { Router } from "express";
import adminUserController from "../controllers/admin-user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/permission.middleware";
import validate, { validateQuery } from "../middlewares/validate.middleware";
import {
  adminUserListQuerySchema,
  updateAdminUserSchema,
} from "../validations/admin-user.validation";
import { PERMISSIONS } from "../constants";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  requirePermission(PERMISSIONS.USERS_READ),
  validateQuery(adminUserListQuerySchema),
  adminUserController.list
);

router.get(
  "/:id",
  requirePermission(PERMISSIONS.USERS_READ),
  adminUserController.getById
);

router.put(
  "/:id",
  requirePermission(PERMISSIONS.USERS_UPDATE),
  validate(updateAdminUserSchema),
  adminUserController.update
);

router.delete(
  "/:id",
  requirePermission(PERMISSIONS.USERS_DELETE),
  adminUserController.softDelete
);

export default router;
