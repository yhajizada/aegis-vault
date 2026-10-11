import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyEpointCallback } from "@/lib/epoint";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const dataBase64 = formData.get("data") as string;
    const signature = formData.get("signature") as string;

    const privateKey = process.env.EPOINT_PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json({ error: "EPOINT_PRIVATE_KEY is not configured" }, { status: 500 });
    }

    if (!dataBase64 || !signature) {
      return NextResponse.json({ error: "Missing data or signature" }, { status: 400 });
    }

    const isValid = verifyEpointCallback(dataBase64, signature, privateKey);
    if (!isValid) {
      console.warn("⚠️ Invalid ePoint signature in webhook callback");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const jsonString = Buffer.from(dataBase64, "base64").toString("utf-8");
    const payload = JSON.parse(jsonString);

    // payload: { order_id, status: "success", transaction, amount, ... }
    if (payload.status === "success") {
      const user = await db.user.findFirst();
      if (user) {
        await db.subscription.updateMany({
          where: { userId: user.id },
          data: {
            status: "ACTIVE",
            currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          },
        });
      }
      return NextResponse.json({ status: "success", message: "Subscription activated" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error) {
    console.error("ePoint callback error:", error);
    return NextResponse.json({ error: "Callback processing failed" }, { status: 500 });
  }
}
