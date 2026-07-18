import { z } from "zod";
import { USER_ROLES } from "../constants";

const registerRoleValues = [USER_ROLES.STUDENT, USER_ROLES.TEACHER] as const;

export const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(128),
  fullName: z.string().trim().min(1, "Họ tên không được để trống").max(100).optional(),
  role: z.enum(registerRoleValues).optional().default(USER_ROLES.STUDENT),
});

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token không được để trống"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RefreshSchema = z.infer<typeof refreshSchema>;
