import jwt from "jsonwebtoken";
import env from "../config/env";
import { AccessTokenPayload, RefreshTokenPayload } from "../types";

export const signAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  });
};

export const signRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
};

export const getRefreshTokenExpiry = (): Date => {
  const match = env.JWT_REFRESH_EXPIRES_IN.match(/^(\d+)d$/);
  const days = match ? parseInt(match[1], 10) : 7;
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);
  return expiry;
};
