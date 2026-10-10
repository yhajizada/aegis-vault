import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MetricCard } from "@/components/metric-card";
import { DollarSign } from "lucide-react";

describe("MetricCard Component", () => {
  it("renders metric title, value and subtitle properly", () => {
    render(
      <MetricCard
        title="Monthly Recurring Revenue"
        value="$24,850"
        change="+14.2%"
        isPositive={true}
        icon={DollarSign}
        subtitle="Compared to previous 30 days"
      />
    );

    expect(screen.getByText("Monthly Recurring Revenue")).toBeInTheDocument();
    expect(screen.getByText("$24,850")).toBeInTheDocument();
    expect(screen.getByText("+14.2%")).toBeInTheDocument();
    expect(screen.getByText("Compared to previous 30 days")).toBeInTheDocument();
  });
});
