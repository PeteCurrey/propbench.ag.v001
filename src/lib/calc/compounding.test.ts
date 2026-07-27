import { describe, it, expect } from "vitest";
import { calculateCompounding } from "./compounding";

describe("calculateCompounding", () => {
  it("calculates 100% reinvestment compounding correctly", () => {
    const res = calculateCompounding({
      startingBalance: 10000,
      returnPerPeriodPct: 5, // 5% per month
      numberOfPeriods: 12,
      reinvestPct: 100,
    });

    expect(res).not.toBeNull();
    // 10000 * 1.05^12 = 17958.56
    expect(res?.finalBalance).toBe(17958.56);
    expect(res?.percentageGain).toBe(79.59);
    expect(res?.equityPoints.length).toBe(13);
  });

  it("returns null for non-positive starting balance", () => {
    expect(
      calculateCompounding({
        startingBalance: 0,
        returnPerPeriodPct: 5,
        numberOfPeriods: 10,
      })
    ).toBeNull();
  });
});
