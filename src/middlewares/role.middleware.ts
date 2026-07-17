import { Request, Response, NextFunction, RequestHandler } from "express";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS } from "../constants";
import { UserRole } from "../types";

export const authorize = (...roles: UserRole[]): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new AppError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN));
      return;
    }
    next();
  };
};
