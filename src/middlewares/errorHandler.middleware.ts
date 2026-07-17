import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import logger from "../utils/logger";
import AppError from "../utils/app-error";
import { HTTP_STATUS } from "../constants";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(err);

  if (err instanceof AppError) {
    const body: Record<string, unknown> = {
      success: false,
      message: err.message,
    };

    if (err.errors) {
      body.errors = err.errors;
    }

    res.status(err.statusCode).json(body);
    return;
  }

  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      errors,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: "Email đã tồn tại",
    });
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Đã xảy ra lỗi server"
        : err.message,
  });
};

export default errorHandler;
