import { SafeUser } from "../types";
import { UserWithRole, UserWithRoleAndPermissions } from "../types/prisma.types";

const extractPermissions = (user: UserWithRole | UserWithRoleAndPermissions): string[] => {
  if (!("rolePermissions" in user.role)) {
    return [];
  }

  return user.role.rolePermissions
    .filter((item) => item.permission.deletedAt === null)
    .map((item) => item.permission.slug);
};

export const toSafeUser = (user: UserWithRole | UserWithRoleAndPermissions): SafeUser => {
  return {
    id: user.id.toString(),
    email: user.email,
    fullName: user.fullName,
    status: user.status,
    role: user.role.name,
    permissions: extractPermissions(user),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const parseUserId = (id: string): bigint => BigInt(id);

export const parseBigIntId = (id: string): bigint => BigInt(id);
