import { describe, it, expect } from "vitest";
import { calculateExpectancy } from "./expectancy";

describe("calculateExpectancy", () => {
  it("calculates EV correctly for 60% win rate and 1.5 R:R", () => {
    const res = calculateExpectancy({
      winRatePct: 60,
      avgWinAmount: 300,
      avgLossAmount: 200,
    });

    expect(res).not.toBeNull();
    // 0.6 * 300 - 0.4 * 200 = 180 - 80 = 100
    expect(res?.expectedValuePerTrade).toBe(100);
    expect(res?.rewardToRiskRatio).toBe(1.5);
    expect(res?.expectedProfit100Trades).toBe(10000);
    expect(res?.hasPositiveEdge).toBe(true);
  });

  it("returns null for win rate >= 100", () => {
    expect(
      calculateExpectancy({
        winRatePct: 100,
        avgWinAmount: 100,
        avgLossAmount: 100,
      })
    ).toBeNull();
  });
});
