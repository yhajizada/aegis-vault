const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding AegisVault database...");

  // Clean existing records if any
  try {
    await prisma.checkInLog.deleteMany();
    await prisma.vaultItem.deleteMany();
    await prisma.guardian.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.user.deleteMany();
  } catch (e) {
    // Fresh database
  }

  // Create Primary User
  const user = await prisma.user.create({
    data: {
      name: "Alex Mercer",
      email: "alex@aegisvault.io",
      role: "ADMIN",
      deadManSwitchFrequencyDays: 60,
      lastCheckInAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      nextCheckInDue: new Date(Date.now() + 58 * 24 * 60 * 60 * 1000), // in 58 days
      switchStatus: "ACTIVE",
      shamirThreshold: 2,
      shamirTotalShares: 3,
      keySaltHex: "7f4c9a2d8e1b3f5c0a9e8d7c6b5a4f3e",
    },
  });

  // Seed Check-In History
  await prisma.checkInLog.createMany({
    data: [
      {
        userId: user.id,
        checkInAt: new Date(Date.now() - 62 * 24 * 60 * 60 * 1000),
        method: "PORTAL_CLICK",
        ipAddress: "192.168.1.101",
      },
      {
        userId: user.id,
        checkInAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        method: "SECURE_LINK",
        ipAddress: "192.168.1.101",
      },
    ],
  });

  // Seed Vault Items across all 3 Granular Modules
  await prisma.vaultItem.createMany({
    data: [
      {
        userId: user.id,
        category: "FINANCIAL",
        title: "Chase & Schwab Private Banking + Wire Instructions",
        description: "Primary family checking, emergency fund, and investment brokerage instructions.",
        encryptedPayload: JSON.stringify({
          ciphertext: "4k39jfl920a0kdfm+k209fdkslf9302kdmslf920dskd029kds==",
          iv: "01a2b3c4d5e6f7a8b9c0d1e2",
          salt: "7f4c9a2d8e1b3f5c0a9e8d7c6b5a4f3e",
        }),
        hint: "Routing numbers, account suffixes, and trustee power-of-attorney clause.",
      },
      {
        userId: user.id,
        category: "FINANCIAL",
        title: "Ledger Nano X Hardware Wallet (BIP-39 24-Word Seed Phrase)",
        description: "Cold storage seed phrase containing Bitcoin (BTC) & Ethereum (ETH) assets.",
        encryptedPayload: JSON.stringify({
          ciphertext: "9xk20flksd0923kd092lkds0923kdmsl029dkmsl029kds0293kd==",
          iv: "11b2c3d4e5f6a7b8c9d0e1f2",
          salt: "7f4c9a2d8e1b3f5c0a9e8d7c6b5a4f3e",
        }),
        hint: "Hardware device in home fireproof safe #2. Seed backup requires 2-of-3 Shamir.",
      },
      {
        userId: user.id,
        category: "LEGACY",
        title: "Private Letters to Sarah & Children + Memory Cloud Archive",
        description: "Personal farewell video recordings, handwritten letters, and cloud photo albums.",
        encryptedPayload: JSON.stringify({
          ciphertext: "77a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0==",
          iv: "21a2b3c4d5e6f7a8b9c0d1e2",
          salt: "7f4c9a2d8e1b3f5c0a9e8d7c6b5a4f3e",
        }),
        hint: "Encrypted link to ProtonDrive family archive and unlock credentials.",
      },
      {
        userId: user.id,
        category: "BUSINESS_IT",
        title: "AWS & Kubernetes Cluster Root Recovery Key + Domains",
        description: "Critical infrastructure access for SaaS products, domains (Cloudflare, Namecheap).",
        encryptedPayload: JSON.stringify({
          ciphertext: "bb89c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1==",
          iv: "31a2b3c4d5e6f7a8b9c0d1e2",
          salt: "7f4c9a2d8e1b3f5c0a9e8d7c6b5a4f3e",
        }),
        hint: "Requires technical co-founder verification before decrypting root MFA codes.",
      },
    ],
  });

  // Seed Guardians with Shamir's Secret Sharing keys & granular access
  await prisma.guardian.createMany({
    data: [
      {
        userId: user.id,
        name: "Sarah Mercer",
        email: "sarah.mercer@family.example",
        phone: "+1 (555) 234-8901",
        relationship: "SPOUSE",
        allowedCategories: "FINANCIAL,LEGACY",
        status: "VERIFIED",
        shamirShareId: 1,
        publicShareHint: "SHAMIR-KEY-SHARE #1 (Family Guardian)",
        emergencyAccessToken: "emg-sarah-789a2b",
      },
      {
        userId: user.id,
        name: "Julian Vance",
        email: "julian@techventures.example",
        phone: "+1 (555) 456-7812",
        relationship: "BUSINESS_PARTNER",
        allowedCategories: "BUSINESS_IT",
        status: "VERIFIED",
        shamirShareId: 2,
        publicShareHint: "SHAMIR-KEY-SHARE #2 (CTO / Tech Trustee)",
        emergencyAccessToken: "emg-julian-445f1c",
      },
      {
        userId: user.id,
        name: "David Sterling, Esq.",
        email: "d.sterling@legalpartners.example",
        phone: "+1 (555) 789-0123",
        relationship: "LAWYER",
        allowedCategories: "FINANCIAL,BUSINESS_IT,LEGACY",
        status: "VERIFIED",
        shamirShareId: 3,
        publicShareHint: "SHAMIR-KEY-SHARE #3 (Legal Escrow / Dead Man Trigger)",
        emergencyAccessToken: "emg-sterling-991d3e",
      },
    ],
  });

  // Seed Subscription
  await prisma.subscription.create({
    data: {
      userId: user.id,
      plan: "FAMILY_PRO",
      stripeCustomerId: "cus_live_aegis_8892",
      stripeSubscriptionId: "sub_live_aegis_4410",
      status: "ACTIVE",
      priceAnnual: 69,
      currentPeriodEnd: new Date(Date.now() + 320 * 24 * 60 * 60 * 1000), // 320 days remaining
    },
  });

  console.log("✅ AegisVault seeded successfully with realistic data!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
