import "dotenv/config";
import { PrismaClient } from "@prisma/client";

if (process.env.NODE_ENV !== "development") {
  throw new Error("Refusing to seed non-development data. Set NODE_ENV=development explicitly.");
}

const prisma = new PrismaClient();

const permissions = [
  ["catalog:read", "Read public catalog"],
  ["catalog:manage:own", "Manage products owned by the authenticated seller"],
  ["catalog:manage:any", "Manage marketplace catalog"],
  ["orders:read:own", "Read orders associated with the authenticated user or seller"],
  ["orders:manage:own", "Fulfill seller orders"],
  ["orders:manage:any", "Manage marketplace orders"],
  ["customers:manage", "Manage customer support and account status"],
  ["sellers:manage", "Review and manage sellers"],
  ["delivery:manage:own", "Manage assigned shipments"],
  ["delivery:manage:any", "Manage all delivery partners and shipments"],
  ["payments:manage", "Manage payment and refund workflows"],
  ["settlements:manage", "Manage seller settlements"],
  ["platform:configure", "Manage marketplace settings and permissions"],
];

const rolePermissions = {
  SUPER_ADMIN: permissions.map(([key]) => key),
  SELLER: ["catalog:read", "catalog:manage:own", "orders:read:own", "orders:manage:own"],
  CUSTOMER: ["catalog:read", "orders:read:own"],
  DELIVERY_PARTNER: ["orders:read:own", "delivery:manage:own"],
};

const categories = [
  ["Electronics", "electronics"],
  ["Fashion", "fashion"],
  ["Home & Living", "home-living"],
  ["Beauty", "beauty"],
  ["Accessories", "accessories"],
  ["Footwear", "footwear"],
];

try {
  const permissionRecords = new Map();
  for (const [key, description] of permissions) {
    const permission = await prisma.permission.upsert({
      where: { key },
      update: { description },
      create: { key, description },
    });
    permissionRecords.set(key, permission.id);
  }

  for (const [name, permissionKeys] of Object.entries(rolePermissions)) {
    const role = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name, description: `${name.replaceAll("_", " ")} marketplace role` },
    });
    for (const permissionKey of permissionKeys) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permissionRecords.get(permissionKey),
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permissionRecords.get(permissionKey),
        },
      });
    }
  }

  for (const [name, slug] of categories) {
    await prisma.category.upsert({
      where: { slug },
      update: { name, isActive: true },
      create: { name, slug },
    });
  }

  console.info("Development roles, permissions, and categories seeded.");
} finally {
  await prisma.$disconnect();
}
