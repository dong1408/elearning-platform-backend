import { z } from "zod";

const permissionIdsSchema = z
  .array(z.string().regex(/^\d+$/, "permissionId không hợp lệ"))
  .min(1, "Cần chọn ít nhất một quyền");

export const createAdminRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên vai trò phải có ít nhất 2 ký tự")
    .max(50, "Tên vai trò tối đa 50 ký tự")
    .regex(/^[A-Z][A-Z0-9_]*$/, "Tên vai trò chỉ gồm chữ hoa, số và gạch dưới"),
  permissionIds: permissionIdsSchema,
});

export const updateAdminRoleSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Tên vai trò phải có ít nhất 2 ký tự")
      .max(50, "Tên vai trò tối đa 50 ký tự")
      .regex(/^[A-Z][A-Z0-9_]*$/, "Tên vai trò chỉ gồm chữ hoa, số và gạch dưới")
      .optional(),
    permissionIds: permissionIdsSchema.optional(),
  })
  .refine((data) => data.name !== undefined || data.permissionIds !== undefined, {
    message: "Cần ít nhất một trường để cập nhật",
  });

export type CreateAdminRoleSchema = z.infer<typeof createAdminRoleSchema>;
export type UpdateAdminRoleSchema = z.infer<typeof updateAdminRoleSchema>;
