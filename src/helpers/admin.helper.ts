import { AdminUserItem, PermissionItem, AdminRoleItem } from "../types";
import { UserWithRole, RoleWithPermissions } from "../types/prisma.types";
import { Permission } from "@prisma/client";

export const toAdminUserItem = (user: UserWithRole): AdminUserItem => ({
  id: user.id.toString(),
  email: user.email,
  fullName: user.fullName,
  status: user.status,
  roleId: user.roleId.toString(),
  roleName: user.role.name,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const toPermissionItem = (permission: Permission): PermissionItem => ({
  id: permission.id.toString(),
  name: permission.name,
  slug: permission.slug,
});

export const toAdminRoleItem = (role: RoleWithPermissions): AdminRoleItem => ({
  id: role.id.toString(),
  name: role.name,
  permissions: role.rolePermissions.map((item) => toPermissionItem(item.permission)),
  createdAt: role.createdAt,
  updatedAt: role.updatedAt,
});
