import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { successResponse } from "../utils/response";
import { MESSAGES, HTTP_STATUS } from "../constants";
import { RegisterInput, LoginInput, RefreshInput } from "../types";

const authController = {
  register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await authService.register(req.body as RegisterInput);
      successResponse(res, result, MESSAGES.AUTH.REGISTER_SUCCESS, HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await authService.login(req.body as LoginInput);
      successResponse(res, result, MESSAGES.AUTH.LOGIN_SUCCESS);
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await authService.refresh(req.body as RefreshInput);
      successResponse(res, result, MESSAGES.AUTH.REFRESH_SUCCESS);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
