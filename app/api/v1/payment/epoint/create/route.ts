import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createEpointPayment } from "@/lib/epoint";
import { PRICING_PLANS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { planId, currency = "USD" } = body;

    const plan = PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[1]; // default Family Pro

    const user = await db.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const orderId = `AEGIS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const paymentResponse = await createEpointPayment({
      orderId,
      amount: plan.priceAnnual,
      currency: currency === "AZN" ? "AZN" : "USD",
      description: `AegisVault ${plan.name} (1 Year Subscription)`,
      successUrl: `${baseUrl}/dashboard/billing?status=success&orderId=${orderId}`,
      errorUrl: `${baseUrl}/dashboard/billing?status=error&orderId=${orderId}`,
      callbackUrl: `${baseUrl}/api/v1/payment/epoint/callback`,
      language: "az",
    });

    if (paymentResponse.status === "success" && paymentResponse.redirect_url) {
      // Record pending or simulated subscription in database
      const existingSub = await db.subscription.findFirst({
        where: { userId: user.id },
      });

      if (existingSub) {
        await db.subscription.update({
          where: { id: existingSub.id },
          data: {
            plan: plan.id.toUpperCase(),
            status: "ACTIVE",
            priceAnnual: plan.priceAnnual,
            currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          },
        });
      } else {
        await db.subscription.create({
          data: {
            userId: user.id,
            plan: plan.id.toUpperCase(),
            status: "ACTIVE",
            priceAnnual: plan.priceAnnual,
            currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          },
        });
      }

      return NextResponse.json({
        success: true,
        redirectUrl: paymentResponse.redirect_url,
        orderId,
        transaction: paymentResponse.transaction,
      });
    }

    return NextResponse.json(
      { error: paymentResponse.message || "Failed to initiate ePoint checkout" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("ePoint creation failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
