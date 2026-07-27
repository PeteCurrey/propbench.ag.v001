import { describe, it, expect } from "vitest";
import { calculateDrawdown } from "./drawdown";

describe("calculateDrawdown", () => {
  it("calculates static drawdown correctly", () => {
    const res = calculateDrawdown({
      initialBalance: 100000,
      currentBalance: 95000,
      highWaterMark: 110000,
      maxDrawdownPct: 10,
      drawdownType: "static",
    });

    expect(res).not.toBeNull();
    expect(res?.breachFloor).toBe(90000);
    expect(res?.maxDrawdownAmount).toBe(10000);
    expect(res?.currentDrawdownAmount).toBe(5000);
    expect(res?.currentDrawdownPct).toBe(5);
    expect(res?.remainingBuffer).toBe(5000);
    expect(res?.isBreached).toBe(false);
    expect(res?.zone).toBe("warning");
  });

  it("calculates trailing drawdown correctly when high water mark increases", () => {
    const res = calculateDrawdown({
      initialBalance: 100000,
      currentBalance: 102000,
      highWaterMark: 110000,
      maxDrawdownPct: 10,
      drawdownType: "trailing_intraday",
    });

    expect(res).not.toBeNull();
    expect(res?.breachFloor).toBe(99000);
    expect(res?.remainingBuffer).toBe(3000);
    expect(res?.isBreached).toBe(false);
  });

  it("detects breached state correctly", () => {
    const res = calculateDrawdown({
      initialBalance: 100000,
      currentBalance: 89000,
      highWaterMark: 100000,
      maxDrawdownPct: 10,
      drawdownType: "static",
    });

    expect(res?.isBreached).toBe(true);
    expect(res?.zone).toBe("breached");
  });

  it("returns null for invalid inputs", () => {
    expect(
      calculateDrawdown({
        initialBalance: 0,
        currentBalance: 100,
        highWaterMark: 100,
        maxDrawdownPct: 10,
        drawdownType: "static",
      })
    ).toBeNull();
  });
});
