import prisma from "../config/database";
import { CreateUserInput } from "../types";
import { UserWithRole } from "../types/prisma.types";

const userWithRoleInclude = {
  role: true,
} as const;

const userRepository = {
  create: (userData: CreateUserInput): Promise<UserWithRole> =>
    prisma.user.create({
      data: userData,
      include: userWithRoleInclude,
    }),

  findByEmail: (email: string): Promise<UserWithRole | null> =>
    prisma.user.findUnique({
      where: { email },
      include: userWithRoleInclude,
    }),

  findById: (id: bigint): Promise<UserWithRole | null> =>
    prisma.user.findUnique({
      where: { id },
      include: userWithRoleInclude,
    }),

  emailExists: async (email: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({ where: { email } });
    return Boolean(user);
  },
};

export default userRepository;
