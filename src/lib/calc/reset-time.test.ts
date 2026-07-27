import { describe, it, expect } from "vitest";
import { convertResetTime } from "./reset-time";

describe("convertResetTime", () => {
  it("converts reset time and formats countdown correctly", () => {
    const refTime = new Date("2025-01-15T12:00:00Z").getTime();
    const res = convertResetTime({
      firmResetTime: "17:00",
      firmTimezone: "America/New_York",
      userTimezone: "Europe/London",
      referenceTimeMs: refTime,
    });

    expect(res).not.toBeNull();
    expect(res?.firmResetTime).toBe("17:00");
    expect(res?.secondsUntilReset).toBeGreaterThan(0);
    expect(res?.formattedCountdown).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it("returns null for invalid time string", () => {
    expect(
      convertResetTime({
        firmResetTime: "25:99",
        firmTimezone: "America/New_York",
      })
    ).toBeNull();
  });
});
