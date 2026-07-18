import prisma from "../config/database";

const permissionRepository = {
  findAllActive: () =>
    prisma.permission.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" },
    }),

  findActiveByIds: (ids: bigint[]) =>
    prisma.permission.findMany({
      where: {
        id: { in: ids },
        deletedAt: null,
      },
    }),
};

export default permissionRepository;
