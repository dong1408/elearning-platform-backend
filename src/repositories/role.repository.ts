import prisma from "../config/database";

const roleRepository = {
  findByName: (name: string) =>
    prisma.role.findFirst({
      where: { name, deletedAt: null },
    }),
};

export default roleRepository;
