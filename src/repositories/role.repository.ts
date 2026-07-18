import prisma from "../config/database";
import { RoleWithPermissions } from "../types/prisma.types";

const roleWithPermissionsInclude = {
  rolePermissions: {
    include: {
      permission: true,
    },
    where: {
      permission: {
        deletedAt: null,
      },
    },
  },
} as const;

const roleRepository = {
  findByName: (name: string) =>
    prisma.role.findFirst({
      where: { name, deletedAt: null },
    }),

  findById: (id: bigint) =>
    prisma.role.findFirst({
      where: { id, deletedAt: null },
    }),

  findByIdWithPermissions: (id: bigint): Promise<RoleWithPermissions | null> =>
    prisma.role.findFirst({
      where: { id, deletedAt: null },
      include: roleWithPermissionsInclude,
    }),

  findAllWithPermissions: (): Promise<RoleWithPermissions[]> =>
    prisma.role.findMany({
      where: { deletedAt: null },
      include: roleWithPermissionsInclude,
      orderBy: { id: "asc" },
    }),

  createWithPermissions: async (
    name: string,
    permissionIds: bigint[]
  ): Promise<RoleWithPermissions> => {
    return prisma.role.create({
      data: {
        name,
        rolePermissions: {
          create: permissionIds.map((permissionId) => ({ permissionId })),
        },
      },
      include: roleWithPermissionsInclude,
    });
  },

  updateName: (id: bigint, name: string) =>
    prisma.role.update({
      where: { id },
      data: { name },
    }),

  replacePermissions: async (roleId: bigint, permissionIds: bigint[]): Promise<void> => {
    await prisma.$transaction([
      prisma.rolePermission.deleteMany({ where: { roleId } }),
      prisma.rolePermission.createMany({
        data: permissionIds.map((permissionId) => ({
          roleId,
          permissionId,
        })),
      }),
    ]);
  },

  nameExists: async (name: string, excludeId?: bigint): Promise<boolean> => {
    const role = await prisma.role.findFirst({
      where: {
        name,
        deletedAt: null,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    return Boolean(role);
  },
};

export default roleRepository;
