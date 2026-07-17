import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roles = ["STUDENT", "TEACHER", "ADMIN"] as const;

async function main(): Promise<void> {
  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
