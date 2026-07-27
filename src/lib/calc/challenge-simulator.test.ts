import { describe, it, expect } from "vitest";
import { runChallengeSimulation } from "./challenge-simulator";

describe("runChallengeSimulation", () => {
  it("runs simulation and returns valid outcome distribution", () => {
    const res = runChallengeSimulation({
      startingBalance: 100000,
      targetProfitPct: 10,
      maxDrawdownPct: 10,
      winRatePct: 55,
      rewardToRiskRatio: 1.5,
      riskPerTradePct: 1,
      numSimulations: 100,
    });

    expect(res).not.toBeNull();
    expect(res?.passRatePct + res?.failRatePct + res?.timeoutRatePct).toBeCloseTo(100, 1);
    expect(res?.histogramBins.length).toBe(8);
  });

  it("returns null for non-positive starting balance", () => {
    expect(
      runChallengeSimulation({
        startingBalance: 0,
        targetProfitPct: 10,
        maxDrawdownPct: 10,
        winRatePct: 50,
        rewardToRiskRatio: 1,
        riskPerTradePct: 1,
      })
    ).toBeNull();
  });
});
