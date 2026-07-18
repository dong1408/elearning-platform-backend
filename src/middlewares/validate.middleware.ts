import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema } from "zod";
import AppError from "../utils/app-error";
import { HTTP_STATUS } from "../constants";

const mapZodErrors = (issues: { path: (string | number)[]; message: string }[]) =>
  issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(
        new AppError("Dữ liệu không hợp lệ", HTTP_STATUS.BAD_REQUEST, mapZodErrors(result.error.issues))
      );
      return;
    }

    req.body = result.data;
    next();
  };
};

export const validateQuery = (schema: ZodSchema): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(
        new AppError("Dữ liệu không hợp lệ", HTTP_STATUS.BAD_REQUEST, mapZodErrors(result.error.issues))
      );
      return;
    }

    req.validatedQuery = result.data;
    next();
  };
};

export default validate;
