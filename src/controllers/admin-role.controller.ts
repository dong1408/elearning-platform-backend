import { Request, Response, NextFunction } from "express";
import adminRoleService from "../services/admin-role.service";
import { successResponse } from "../utils/response";
import { MESSAGES, HTTP_STATUS } from "../constants";
import { CreateAdminRoleSchema, UpdateAdminRoleSchema } from "../validations/admin-role.validation";

const adminRoleController = {
  list: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roles = await adminRoleService.list();
      successResponse(res, roles);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body as CreateAdminRoleSchema;
      const role = await adminRoleService.create(body);
      successResponse(res, role, MESSAGES.ROLE.CREATE_SUCCESS, HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body as UpdateAdminRoleSchema;
      const role = await adminRoleService.update(req.params.id as string, body);
      successResponse(res, role, MESSAGES.ROLE.UPDATE_SUCCESS);
    } catch (error) {
      next(error);
    }
  },

  listPermissions: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permissions = await adminRoleService.listPermissions();
      successResponse(res, permissions, MESSAGES.PERMISSION.LIST_SUCCESS);
    } catch (error) {
      next(error);
    }
  },
};

export default adminRoleController;
