import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";
import { verifyAccessToken } from "../utils/jwt";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS } from "../constants";
import { toSafeUser, parseUserId } from "../helpers/user.helper";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: parseUserId(decoded.id) },
      include: { role: true },
    });

    if (!user) {
      throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    req.user = toSafeUser(user);
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError(MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED));
  }
};
