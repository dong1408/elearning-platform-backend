import { z } from "zod";
import { PAGINATION, USER_STATUS } from "../constants";

export const adminUserListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
  search: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.BLOCKED]).optional(),
  roleId: z
    .string()
    .regex(/^\d+$/, "roleId không hợp lệ")
    .optional(),
});

export const updateAdminUserSchema = z
  .object({
    fullName: z.string().trim().min(1, "Họ tên không được để trống").max(100).nullable().optional(),
    status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.BLOCKED]).optional(),
    roleId: z.string().regex(/^\d+$/, "roleId không hợp lệ").optional(),
  })
  .refine((data) => data.fullName !== undefined || data.status !== undefined || data.roleId !== undefined, {
    message: "Cần ít nhất một trường để cập nhật",
  });

export type AdminUserListQuerySchema = z.infer<typeof adminUserListQuerySchema>;
export type UpdateAdminUserSchema = z.infer<typeof updateAdminUserSchema>;
