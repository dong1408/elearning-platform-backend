import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roles = ["STUDENT", "TEACHER", "ADMIN"] as const;

const permissions = [
  { name: "Xem danh sách người dùng", slug: "users.read" },
  { name: "Cập nhật người dùng", slug: "users.update" },
  { name: "Xóa người dùng", slug: "users.delete" },
  { name: "Xem danh sách vai trò", slug: "roles.read" },
  { name: "Tạo vai trò", slug: "roles.create" },
  { name: "Cập nhật vai trò", slug: "roles.update" },
  { name: "Xem danh sách quyền", slug: "permissions.read" },
] as const;

async function main(): Promise<void> {
  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { slug: permission.slug },
      update: { name: permission.name },
      create: {
        name: permission.name,
        slug: permission.slug,
      },
    });
  }

  const adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });
  if (!adminRole) {
    throw new Error("ADMIN role not found after seed");
  }

  const allPermissions = await prisma.permission.findMany({
    where: { deletedAt: null },
  });

  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
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
