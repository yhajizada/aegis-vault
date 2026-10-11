import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await db.user.findFirst({
      include: {
        checkInLogs: {
          orderBy: { checkInAt: "desc" },
          take: 5,
        },
        guardians: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const now = new Date();
    const nextDue = new Date(user.nextCheckInDue);
    const msRemaining = nextDue.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

    return NextResponse.json({
      success: true,
      switchStatus: user.switchStatus,
      frequencyDays: user.deadManSwitchFrequencyDays,
      lastCheckInAt: user.lastCheckInAt,
      nextCheckInDue: user.nextCheckInDue,
      daysRemaining,
      guardiansCount: user.guardians.length,
      checkInLogs: user.checkInLogs,
      shamirThreshold: user.shamirThreshold,
      shamirTotalShares: user.shamirTotalShares,
    });
  } catch (error) {
    console.error("Failed to fetch switch status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, status, frequencyDays } = body;

    const user = await db.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (action === "check_in") {
      // User confirms "I am alive"
      const now = new Date();
      const freq = frequencyDays || user.deadManSwitchFrequencyDays;
      const nextDue = new Date(now.getTime() + freq * 24 * 60 * 60 * 1000);

      const [updatedUser, log] = await db.$transaction([
        db.user.update({
          where: { id: user.id },
          data: {
            lastCheckInAt: now,
            nextCheckInDue: nextDue,
            deadManSwitchFrequencyDays: freq,
            switchStatus: "ACTIVE",
          },
        }),
        db.checkInLog.create({
          data: {
            userId: user.id,
            checkInAt: now,
            method: "PORTAL_CLICK",
          },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Check-in successful! Your dead-man's switch timer has been safely extended.",
        switchStatus: updatedUser.switchStatus,
        lastCheckInAt: updatedUser.lastCheckInAt,
        nextCheckInDue: updatedUser.nextCheckInDue,
        log,
      });
    }

    if (action === "simulate_tier") {
      // Simulate tiered escalation (Tier 1 Grace, Tier 2 Urgent, Tier 3 Escalated, or Triggered)
      const allowed = ["ACTIVE", "GRACE_TIER_1", "URGENT_TIER_2", "ESCALATED_TIER_3", "TRIGGERED"];
      if (!allowed.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }

      const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
          switchStatus: status,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Switch status updated to ${status} for verification demo.`,
        switchStatus: updatedUser.switchStatus,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Switch action failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
