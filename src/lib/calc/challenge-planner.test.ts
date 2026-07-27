import { describe, it, expect } from "vitest";
import { calculateChallengePlan } from "./challenge-planner";

describe("calculateChallengePlan", () => {
  it("calculates targets and equity curve correctly", () => {
    const res = calculateChallengePlan({
      startingBalance: 100000,
      targetProfitPct: 10,
      tradingDays: 10,
    });

    expect(res).not.toBeNull();
    expect(res?.targetProfitAmount).toBe(10000);
    expect(res?.targetDailyProfit).toBe(1000);
    expect(res?.dailyTargetPct).toBe(1.0);
    expect(res?.projectedEquityCurve.length).toBe(11);
    expect(res?.projectedEquityCurve[10].equity).toBe(110000);
  });

  it("returns null for invalid inputs", () => {
    expect(
      calculateChallengePlan({
        startingBalance: -100,
        targetProfitPct: 10,
        tradingDays: 10,
      })
    ).toBeNull();
  });
});
