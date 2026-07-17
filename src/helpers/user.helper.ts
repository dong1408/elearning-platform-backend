import { SafeUser } from "../types";
import { UserWithRole } from "../types/prisma.types";

const isUserRole = (name: string): name is SafeUser["role"] => {
  return name === "STUDENT" || name === "TEACHER" || name === "ADMIN";
};

export const toSafeUser = (user: UserWithRole): SafeUser => {
  const roleName = user.role.name;
  if (!isUserRole(roleName)) {
    throw new Error(`Invalid role name: ${roleName}`);
  }

  return {
    id: user.id.toString(),
    email: user.email,
    role: roleName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const parseUserId = (id: string): bigint => BigInt(id);
