import { UserRole } from "../types";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const USER_ROLES = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  ADMIN: "ADMIN",
} as const satisfies Record<UserRole, UserRole>;

export const MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: "Đăng ký thành công",
    LOGIN_SUCCESS: "Đăng nhập thành công",
    REFRESH_SUCCESS: "Làm mới token thành công",
    INVALID_CREDENTIALS: "Email hoặc mật khẩu không đúng",
    EMAIL_EXISTS: "Email đã được sử dụng",
    UNAUTHORIZED: "Bạn cần đăng nhập để tiếp tục",
    FORBIDDEN: "Bạn không có quyền truy cập",
    INVALID_TOKEN: "Token không hợp lệ hoặc đã hết hạn",
    REFRESH_TOKEN_REVOKED: "Refresh token đã bị thu hồi hoặc không hợp lệ",
    INVALID_ROLE: "Vai trò không hợp lệ",
  },
  USER: {
    NOT_FOUND: "Không tìm thấy người dùng",
  },
} as const;
