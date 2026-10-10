const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing records if any
  try {
    await prisma.auditLog.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
  } catch (e) {
    // tables might be empty or fresh
  }

  // Create demo Organization
  const org = await prisma.organization.create({
    data: {
      name: "Acme Innovations",
      slug: "acme-innovations",
      plan: "PRO",
    },
  });

  // Create demo Users
  const admin = await prisma.user.create({
    data: {
      name: "Alex Morgan",
      email: "alex@example.com",
      role: "ADMIN",
      organizationId: org.id,
    },
  });

  const member = await prisma.user.create({
    data: {
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "USER",
      organizationId: org.id,
    },
  });

  // Create active subscription
  await prisma.subscription.create({
    data: {
      userId: admin.id,
      stripeCustomerId: "cus_mock_12345",
      stripeSubscriptionId: "sub_mock_12345",
      status: "ACTIVE",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // Create initial audit log
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: "WORKSPACE_INITIALIZED",
      resource: "Organization: Acme Innovations",
      ipAddress: "127.0.0.1",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
