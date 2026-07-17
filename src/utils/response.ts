import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message = "Error",
  statusCode = 500,
  errors: { field: string; message: string }[] | null = null
): Response => {
  const body: Record<string, unknown> = {
    success: false,
    message,
  };

  if (errors) {
    body.errors = errors;
  }

  return res.status(statusCode).json(body);
};
