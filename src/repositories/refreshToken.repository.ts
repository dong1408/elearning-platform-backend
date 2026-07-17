import prisma from "../config/database";
import { RefreshToken } from "@prisma/client";

interface CreateRefreshTokenInput {
  jti: string;
  userId: bigint;
  expiresAt: Date;
}

const refreshTokenRepository = {
  create: (data: CreateRefreshTokenInput): Promise<RefreshToken> =>
    prisma.refreshToken.create({ data }),

  findByJti: (jti: string): Promise<RefreshToken | null> =>
    prisma.refreshToken.findUnique({ where: { jti } }),

  revokeByJti: (jti: string): Promise<RefreshToken> =>
    prisma.refreshToken.update({
      where: { jti },
      data: { revokedAt: new Date() },
    }),

  revokeAllByUserId: (userId: bigint): Promise<{ count: number }> =>
    prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
};

export default refreshTokenRepository;
