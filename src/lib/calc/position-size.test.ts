import { describe, it, expect } from "vitest";
import { calculatePositionSize } from "./position-size";

describe("calculatePositionSize", () => {
  it("calculates lot size correctly for standard EURUSD trade", () => {
    const res = calculatePositionSize({
      accountBalance: 100000,
      riskPct: 1, // $1000
      stopLossPips: 20,
      pipValuePerLot: 10,
    });

    expect(res).not.toBeNull();
    expect(res?.cashAtRisk).toBe(1000);
    expect(res?.riskPerPip).toBe(50);
    expect(res?.positionSizeLots).toBe(5.0);
    expect(res?.totalUnits).toBe(500000);
  });

  it("returns null for non-positive inputs", () => {
    expect(
      calculatePositionSize({
        accountBalance: 100000,
        riskPct: -1,
        stopLossPips: 20,
      })
    ).toBeNull();
  });
});
