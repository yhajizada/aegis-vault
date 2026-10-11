import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [vaultCount, guardianCount, userCount, activeSubCount] = await Promise.all([
      db.vaultItem.count(),
      db.guardian.count(),
      db.user.count(),
      db.subscription.count({ where: { status: "ACTIVE" } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalEncryptedVaults: vaultCount,
        totalGuardians: guardianCount,
        activeUsers: userCount,
        activeSubscriptions: activeSubCount,
        encryptionStandard: "AES-256-GCM + PBKDF2 (100,000 iterations)",
        secretSharingScheme: "Shamir's Secret Sharing GF(256) (2-of-3)",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
