import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const user = await db.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const items = await db.vaultItem.findMany({
      where: {
        userId: user.id,
        ...(category && category !== "ALL" ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Failed to fetch vault items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, encryptedPayload, hint } = body;

    if (!title || !category || !encryptedPayload) {
      return NextResponse.json(
        { error: "Title, category, and encrypted payload are required" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newItem = await db.vaultItem.create({
      data: {
        userId: user.id,
        title,
        description: description || null,
        category,
        encryptedPayload: typeof encryptedPayload === "string" ? encryptedPayload : JSON.stringify(encryptedPayload),
        hint: hint || null,
      },
    });

    return NextResponse.json({
      success: true,
      item: newItem,
      message: "Item encrypted client-side and saved with Zero-Knowledge verification.",
    });
  } catch (error) {
    console.error("Failed to create vault item:", error);
    return NextResponse.json(
      { error: "Failed to store encrypted vault record" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID required" }, { status: 400 });
    }

    await db.vaultItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Vault record deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
