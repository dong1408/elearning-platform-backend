import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { successResponse } from "../utils/response";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS } from "../constants";

const userController = {
  getProfile: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      }
      const user = await userService.getProfile(req.user.id);
      successResponse(res, user);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
