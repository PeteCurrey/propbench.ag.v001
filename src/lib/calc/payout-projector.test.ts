import { describe, it, expect } from "vitest";
import { calculatePayoutProjector } from "./payout-projector";

describe("calculatePayoutProjector", () => {
  it("calculates 80% split with fee deduction correctly", () => {
    const res = calculatePayoutProjector({
      grossProfit: 5000,
      profitSplitPct: 80,
      feeDeductions: 50,
    });

    expect(res).not.toBeNull();
    expect(res?.traderShare).toBe(4000);
    expect(res?.firmShare).toBe(1000);
    expect(res?.netPayout).toBe(3950);
    expect(res?.effectiveSplitPct).toBe(79);
  });

  it("returns null for non-positive gross profit", () => {
    expect(
      calculatePayoutProjector({
        grossProfit: 0,
        profitSplitPct: 80,
      })
    ).toBeNull();
  });
});
