import { Prisma, UserStatus } from "@prisma/client";
import prisma from "../config/database";
import { CreateUserInput } from "../types";
import { UserWithRole, UserWithRoleAndPermissions } from "../types/prisma.types";

const userWithRoleInclude = {
  role: true,
} as const;

const userWithRoleAndPermissionsInclude = {
  role: {
    include: {
      rolePermissions: {
        include: {
          permission: true,
        },
      },
    },
  },
} as const;

export interface AdminUserListFilters {
  search?: string;
  status?: UserStatus;
  roleId?: bigint;
  skip: number;
  take: number;
}

export interface UpdateUserData {
  fullName?: string | null;
  status?: UserStatus;
  roleId?: bigint;
}

const buildAdminWhere = (
  filters: Pick<AdminUserListFilters, "search" | "status" | "roleId">
): Prisma.UserWhereInput => {
  const where: Prisma.UserWhereInput = {
    deletedAt: null,
  };

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.roleId) {
    where.roleId = filters.roleId;
  }

  if (filters.search) {
    where.OR = [
      { email: { contains: filters.search } },
      { fullName: { contains: filters.search } },
    ];
  }

  return where;
};

const userRepository = {
  create: (userData: CreateUserInput): Promise<UserWithRole> =>
    prisma.user.create({
      data: userData,
      include: userWithRoleInclude,
    }),

  findByEmail: (email: string): Promise<UserWithRole | null> =>
    prisma.user.findFirst({
      where: { email, deletedAt: null },
      include: userWithRoleInclude,
    }),

  findById: (id: bigint): Promise<UserWithRole | null> =>
    prisma.user.findFirst({
      where: { id, deletedAt: null },
      include: userWithRoleInclude,
    }),

  findByIdWithPermissions: (id: bigint): Promise<UserWithRoleAndPermissions | null> =>
    prisma.user.findFirst({
      where: { id, deletedAt: null },
      include: userWithRoleAndPermissionsInclude,
    }),

  emailExists: async (email: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
    return Boolean(user);
  },

  findManyForAdmin: (filters: AdminUserListFilters): Promise<UserWithRole[]> => {
    const where = buildAdminWhere(filters);
    return prisma.user.findMany({
      where,
      include: userWithRoleInclude,
      orderBy: { createdAt: "desc" },
      skip: filters.skip,
      take: filters.take,
    });
  },

  countForAdmin: (filters: Pick<AdminUserListFilters, "search" | "status" | "roleId">): Promise<number> => {
    return prisma.user.count({
      where: buildAdminWhere(filters),
    });
  },

  updateById: (id: bigint, data: UpdateUserData): Promise<UserWithRole> =>
    prisma.user.update({
      where: { id },
      data,
      include: userWithRoleInclude,
    }),

  softDeleteById: (id: bigint): Promise<UserWithRole> =>
    prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: userWithRoleInclude,
    }),
};

export default userRepository;
