import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const guardian = await db.guardian.findUnique({
      where: { emergencyAccessToken: token },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            switchStatus: true,
            shamirThreshold: true,
            shamirTotalShares: true,
            nextCheckInDue: true,
          },
        },
      },
    });

    if (!guardian) {
      return NextResponse.json(
        { error: "Invalid or expired emergency access token." },
        { status: 404 }
      );
    }

    const isUnlocked = guardian.user.switchStatus === "TRIGGERED";
    const allowedCategoriesArray = guardian.allowedCategories
      .split(",")
      .map((c) => c.trim());

    // If unlocked, fetch encrypted items for only the permitted categories
    let items: any[] = [];
    if (isUnlocked) {
      items = await db.vaultItem.findMany({
        where: {
          userId: guardian.userId,
          category: { in: allowedCategoriesArray },
        },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          encryptedPayload: true,
          hint: true,
          createdAt: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      guardian: {
        id: guardian.id,
        name: guardian.name,
        relationship: guardian.relationship,
        allowedCategories: allowedCategoriesArray,
        shamirShareId: guardian.shamirShareId,
      },
      vaultOwner: {
        name: guardian.user.name,
        status: guardian.user.switchStatus,
        isUnlocked,
        shamirThreshold: guardian.user.shamirThreshold,
      },
      items,
    });
  } catch (error) {
    console.error("Emergency portal check failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
