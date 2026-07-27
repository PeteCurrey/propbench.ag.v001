import { describe, it, expect } from "vitest";
import { calculateDailyLossLimit } from "./daily-loss-limit";

describe("calculateDailyLossLimit", () => {
  it("calculates daily loss threshold and remaining buffer correctly", () => {
    const res = calculateDailyLossLimit({
      startOfDayBalance: 100000,
      currentEquity: 97000,
      dailyLossPct: 5, // Max daily loss $5000 (breach at $95000)
    });

    expect(res).not.toBeNull();
    expect(res?.breachThreshold).toBe(95000);
    expect(res?.currentDailyLoss).toBe(3000);
    expect(res?.remainingDailyBuffer).toBe(2000);
    expect(res?.isBreached).toBe(false);
  });

  it("detects breached state correctly", () => {
    const res = calculateDailyLossLimit({
      startOfDayBalance: 100000,
      currentEquity: 94000,
      dailyLossPct: 5,
    });

    expect(res?.isBreached).toBe(true);
  });
});
