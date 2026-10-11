import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await db.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const guardians = await db.guardian.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      success: true,
      guardians,
      count: guardians.length,
      shamirThreshold: user.shamirThreshold,
      shamirTotalShares: user.shamirTotalShares,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, relationship, allowedCategories, shamirShareId, publicShareHint } = body;

    if (!name || !email || !relationship || !allowedCategories) {
      return NextResponse.json(
        { error: "Name, email, relationship, and allowed categories are required" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const guardian = await db.guardian.create({
      data: {
        userId: user.id,
        name,
        email,
        phone: phone || null,
        relationship,
        allowedCategories,
        shamirShareId: shamirShareId || null,
        publicShareHint: publicShareHint || `SHAMIR-KEY-SHARE #${shamirShareId || 1}`,
      },
    });

    return NextResponse.json({
      success: true,
      guardian,
      message: "Guardian assigned with granular access permissions and emergency portal link generated.",
    });
  } catch (error) {
    console.error("Failed to add guardian:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Guardian ID required" }, { status: 400 });
    }

    await db.guardian.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Guardian removed" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete guardian" }, { status: 500 });
  }
}
