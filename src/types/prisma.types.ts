import { User, Role, Permission, RolePermission, UserStatus } from "@prisma/client";

export type UserWithRole = User & {
  role: Role;
};

export type UserWithRoleAndPermissions = User & {
  role: Role & {
    rolePermissions: Array<
      RolePermission & {
        permission: Permission;
      }
    >;
  };
};

export type RoleWithPermissions = Role & {
  rolePermissions: Array<
    RolePermission & {
      permission: Permission;
    }
  >;
};

export type { UserStatus };
