import { describe, it, expect } from "vitest";
import { calculateLotSize } from "./lot-size";

describe("calculateLotSize", () => {
  it("calculates lots from cash risk correctly", () => {
    const res = calculateLotSize({
      accountBalance: 50000,
      riskAmountOrPct: 500, // $500 cash risk
      isPercentage: false,
      stopLossPips: 25,
    });

    expect(res).not.toBeNull();
    expect(res?.cashAtRisk).toBe(500);
    expect(res?.riskPctOfAccount).toBe(1.0);
    expect(res?.recommendedLots).toBe(2.0);
  });

  it("returns null on invalid inputs", () => {
    expect(
      calculateLotSize({
        accountBalance: 0,
        riskAmountOrPct: 100,
        isPercentage: true,
        stopLossPips: 10,
      })
    ).toBeNull();
  });
});
