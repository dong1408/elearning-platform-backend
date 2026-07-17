import { randomUUID } from "crypto";
import userRepository from "../repositories/user.repository";
import roleRepository from "../repositories/role.repository";
import refreshTokenRepository from "../repositories/refreshToken.repository";
import { hashPassword, comparePassword } from "../helpers/password.helper";
import { toSafeUser, parseUserId } from "../helpers/user.helper";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} from "../utils/jwt";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS } from "../constants";
import {
  AuthResult,
  LoginInput,
  RefreshInput,
  RefreshResult,
  RegisterInput,
} from "../types";
import { UserWithRole } from "../types/prisma.types";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

const createTokenPair = async (user: UserWithRole): Promise<TokenPair> => {
  const jti = randomUUID();
  const safeUser = toSafeUser(user);
  const accessToken = signAccessToken({ id: safeUser.id, role: safeUser.role });
  const refreshToken = signRefreshToken({ id: safeUser.id, jti });

  await refreshTokenRepository.create({
    jti,
    userId: user.id,
    expiresAt: getRefreshTokenExpiry(),
  });

  return { accessToken, refreshToken };
};

const authService = {
  register: async (input: RegisterInput): Promise<AuthResult> => {
    const { email, password, role: roleName = "STUDENT" } = input;

    const exists = await userRepository.emailExists(email);
    if (exists) {
      throw new AppError(MESSAGES.AUTH.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const role = await roleRepository.findByName(roleName);
    if (!role) {
      throw new AppError(MESSAGES.AUTH.INVALID_ROLE, HTTP_STATUS.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(password);
    const user = await userRepository.create({
      email,
      password: hashedPassword,
      roleId: role.id,
    });

    const { accessToken, refreshToken } = await createTokenPair(user);

    return { user: toSafeUser(user), accessToken, refreshToken };
  },

  login: async (input: LoginInput): Promise<AuthResult> => {
    const { email, password } = input;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }
    const { accessToken, refreshToken } = await createTokenPair(user);
    return { user: toSafeUser(user), accessToken, refreshToken };
  },

  refresh: async (input: RefreshInput): Promise<RefreshResult> => {
    const { refreshToken } = input;

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError(MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
    }

    const storedToken = await refreshTokenRepository.findByJti(decoded.jti);
    if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
      throw new AppError(MESSAGES.AUTH.REFRESH_TOKEN_REVOKED, HTTP_STATUS.UNAUTHORIZED);
    }

    const user = await userRepository.findById(parseUserId(decoded.id));
    if (!user || user.id !== storedToken.userId) {
      throw new AppError(MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
    }

    await refreshTokenRepository.revokeByJti(decoded.jti);

    const jti = randomUUID();
    const safeUser = toSafeUser(user);
    const accessToken = signAccessToken({ id: safeUser.id, role: safeUser.role });
    const newRefreshToken = signRefreshToken({ id: safeUser.id, jti });

    await refreshTokenRepository.create({
      jti,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    });

    return { accessToken, refreshToken: newRefreshToken };
  },
};

export default authService;
