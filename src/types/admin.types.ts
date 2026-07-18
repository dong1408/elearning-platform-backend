import { UserStatus } from "./common.types";
import { PaginationMeta } from "./common.types";

export interface AdminUserItem {
  id: string;
  email: string;
  fullName: string | null;
  status: UserStatus;
  roleId: string;
  roleName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUserListQuery {
  page: number;
  limit: number;
  search?: string;
  status?: UserStatus;
  roleId?: string;
}

export interface AdminUserListResult {
  items: AdminUserItem[];
  pagination: PaginationMeta;
}

export interface UpdateAdminUserInput {
  fullName?: string | null;
  status?: UserStatus;
  roleId?: string;
}

export interface PermissionItem {
  id: string;
  name: string;
  slug: string;
}

export interface AdminRoleItem {
  id: string;
  name: string;
  permissions: PermissionItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAdminRoleInput {
  name: string;
  permissionIds: string[];
}

export interface UpdateAdminRoleInput {
  name?: string;
  permissionIds?: string[];
}
