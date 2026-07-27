import { describe, it, expect } from "vitest";
import { calculateRiskOfRuin, losingStreakTable } from "./risk-of-ruin";

describe("risk-of-ruin", () => {
  it("generates losing streak table correctly", () => {
    const table = losingStreakTable(100000, 1, 10, 5);
    expect(table.length).toBe(5);
    expect(table[0].consecutiveLosses).toBe(1);
    expect(table[0].remainingBalance).toBe(99000);
    expect(table[0].isBreached).toBe(false);
  });

  it("calculates risk of ruin probability correctly", () => {
    const res = calculateRiskOfRuin({
      accountBalance: 100000,
      riskPerTradePct: 1,
      maxDrawdownPct: 10,
      winRatePct: 50,
      rewardToRiskRatio: 1.5,
    });

    expect(res).not.toBeNull();
    expect(res?.riskOfRuinPct).toBeGreaterThanOrEqual(0);
    expect(res?.riskOfRuinPct).toBeLessThan(100);
    expect(res?.maxLossesBeforeBreach).toBeGreaterThan(0);
  });

  it("returns 100% risk of ruin for negative edge", () => {
    const res = calculateRiskOfRuin({
      accountBalance: 100000,
      riskPerTradePct: 1,
      maxDrawdownPct: 10,
      winRatePct: 30, // 30% win rate with 1:1 R:R = negative edge
      rewardToRiskRatio: 1.0,
    });

    expect(res?.riskOfRuinPct).toBe(100);
  });
});
