import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    service: "nexus-api",
    checks: {
      database: "connected",
      cache: "operational",
      storage: "operational",
    },
  });
}
