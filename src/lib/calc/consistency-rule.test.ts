import { describe, it, expect } from "vitest";
import { calculateConsistencyRule } from "./consistency-rule";

describe("calculateConsistencyRule", () => {
  it("detects non-compliance when best day exceeds cap", () => {
    const res = calculateConsistencyRule({
      totalProfit: 10000,
      bestDayProfit: 4500, // 45% of total
      consistencyCapPct: 40, // Max allowed is 40% ($4000)
    });

    expect(res).not.toBeNull();
    expect(res?.maxAllowedBestDayProfit).toBe(4000);
    expect(res?.actualBestDayPct).toBe(45);
    expect(res?.isCompliant).toBe(false);
    expect(res?.excessProfit).toBe(500);
    expect(res?.requiredTotalProfitForCap).toBe(11250);
  });

  it("returns compliant when best day is under cap", () => {
    const res = calculateConsistencyRule({
      totalProfit: 10000,
      bestDayProfit: 3000,
      consistencyCapPct: 40,
    });

    expect(res?.isCompliant).toBe(true);
    expect(res?.excessProfit).toBe(0);
  });
});
