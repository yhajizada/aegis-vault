import { describe, it, expect } from "vitest";
import { cn, formatCurrency, formatDate, generateApiKey } from "@/lib/utils";

describe("Utility Functions", () => {
  it("cn should merge tailwind classes cleanly", () => {
    const result = cn("p-4 bg-white", "text-black", { "shadow-lg": true, "hidden": false });
    expect(result).toContain("p-4");
    expect(result).toContain("bg-white");
    expect(result).toContain("shadow-lg");
    expect(result).not.toContain("hidden");
  });

  it("formatCurrency should format numeric amounts as USD", () => {
    const formatted = formatCurrency(24500);
    expect(formatted).toBe("$24,500");
  });

  it("formatDate should format valid dates", () => {
    const formatted = formatDate(new Date("2026-01-15T00:00:00Z"));
    expect(formatted).toContain("2026");
  });

  it("generateApiKey should start with nx_ prefix", () => {
    const key = generateApiKey();
    expect(key.startsWith("nx_")).toBe(true);
    expect(key.length).toBeGreaterThan(10);
  });
});
