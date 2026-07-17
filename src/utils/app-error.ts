import { ValidationErrorItem } from "../types";

export default class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: ValidationErrorItem[];

  constructor(message: string, statusCode: number, errors?: ValidationErrorItem[]) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
