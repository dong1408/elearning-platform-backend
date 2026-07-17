import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema } from "zod";
import AppError from "../utils/app-error";
import { HTTP_STATUS } from "../constants";

const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      next(new AppError("Dữ liệu không hợp lệ", HTTP_STATUS.BAD_REQUEST, errors));
      return;
    }

    req.body = result.data;
    next();
  };
};

export default validate;
