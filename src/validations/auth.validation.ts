import { z } from "zod";
import { USER_ROLES } from "../constants";

const roleValues = [USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.ADMIN] as const;

export const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(128),
  role: z.enum(roleValues).optional().default(USER_ROLES.STUDENT),
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
