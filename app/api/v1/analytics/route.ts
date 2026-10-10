import { NextResponse } from "next/server";
import { MOCK_METRICS, RECENT_ACTIVITY } from "@/lib/constants";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      metrics: MOCK_METRICS,
      recentActivity: RECENT_ACTIVITY,
    },
    meta: {
      timestamp: new Date().toISOString(),
      source: "production-replica",
    },
  });
}
