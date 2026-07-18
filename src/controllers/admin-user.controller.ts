import { Request, Response, NextFunction } from "express";
import adminUserService from "../services/admin-user.service";
import { successResponse } from "../utils/response";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS } from "../constants";
import { AdminUserListQuerySchema, UpdateAdminUserSchema } from "../validations/admin-user.validation";

const adminUserController = {
  list: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.validatedQuery as AdminUserListQuerySchema;
      const result = await adminUserService.list(query);
      successResponse(res, result);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await adminUserService.getById(req.params.id as string);
      successResponse(res, user);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      }

      const body = req.body as UpdateAdminUserSchema;
      const user = await adminUserService.update(req.params.id as string, body, req.user.id);
      successResponse(res, user, MESSAGES.USER.UPDATE_SUCCESS);
    } catch (error) {
      next(error);
    }
  },

  softDelete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      }

      await adminUserService.softDelete(req.params.id as string, req.user.id);
      successResponse(res, null, MESSAGES.USER.DELETE_SUCCESS);
    } catch (error) {
      next(error);
    }
  },
};

export default adminUserController;
