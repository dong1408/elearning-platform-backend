import { Request, Response, NextFunction, RequestHandler } from "express";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS } from "../constants";

export const requirePermission = (...slugs: string[]): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
      return;
    }

    const hasPermission = slugs.some((slug) => req.user?.permissions.includes(slug));

    if (!hasPermission) {
      next(new AppError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN));
      return;
    }

    next();
  };
};
