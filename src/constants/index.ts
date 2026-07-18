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

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export const PERMISSIONS = {
  USERS_READ: "users.read",
  USERS_UPDATE: "users.update",
  USERS_DELETE: "users.delete",
  ROLES_READ: "roles.read",
  ROLES_CREATE: "roles.create",
  ROLES_UPDATE: "roles.update",
  PERMISSIONS_READ: "permissions.read",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

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
    ACCOUNT_BLOCKED: "Tài khoản đã bị khóa",
    ACCOUNT_DELETED: "Tài khoản đã bị vô hiệu hóa",
  },
  USER: {
    NOT_FOUND: "Không tìm thấy người dùng",
    UPDATE_SUCCESS: "Cập nhật người dùng thành công",
    DELETE_SUCCESS: "Vô hiệu hóa người dùng thành công",
    CANNOT_MODIFY_SELF: "Không thể thực hiện thao tác này trên chính tài khoản của bạn",
  },
  ROLE: {
    NOT_FOUND: "Không tìm thấy vai trò",
    CREATE_SUCCESS: "Tạo vai trò thành công",
    UPDATE_SUCCESS: "Cập nhật vai trò thành công",
    NAME_EXISTS: "Tên vai trò đã tồn tại",
    SYSTEM_ROLE_PROTECTED: "Không thể sửa vai trò hệ thống ADMIN",
    INVALID_PERMISSIONS: "Danh sách quyền không hợp lệ",
  },
  PERMISSION: {
    LIST_SUCCESS: "Lấy danh sách quyền thành công",
  },
} as const;
