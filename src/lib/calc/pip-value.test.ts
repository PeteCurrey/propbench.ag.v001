import { describe, it, expect } from "vitest";
import { calculatePipValue } from "./pip-value";

describe("calculatePipValue", () => {
  it("calculates pip value for EURUSD 2 lots", () => {
    const res = calculatePipValue({
      instrument: "EURUSD",
      tradeSizeLots: 2.0,
    });

    expect(res).not.toBeNull();
    expect(res?.pipValue).toBe(20.0);
    expect(res?.pipSize).toBe(0.0001);
  });

  it("returns null for non-positive lot size", () => {
    expect(
      calculatePipValue({
        instrument: "EURUSD",
        tradeSizeLots: 0,
      })
    ).toBeNull();
  });
});
