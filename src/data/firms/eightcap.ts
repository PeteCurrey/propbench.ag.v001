import type { Firm } from "./schema";

/**
 * Eightcap — Eightcap Prop Evaluation program.
 *
 * ALL values are sourced exclusively from the URL recorded in sourceUrl.
 * Fields not clearly published on that page are set to null.
 *
 * verifiedDate: 2025-01-20.
 */
export const eightcap: Firm = {
  slug: "eightcap",
  name: "Eightcap",
  logoPath: null,
  websiteUrl: "https://www.eightcap.com",
  affiliateUrl: null,
  discountCode: null,
  programs: [
    {
      slug: "eightcap-prop-2-step",
      name: "Eightcap Prop — 2-Step Evaluation",
      accountSizes: [10000, 25000, 50000, 100000, 200000],
      currency: "USD",
      phases: [
        {
          name: "Phase 1 — Evaluation",
          profitTargetPct: 8,
          minTradingDays: 5,
          maxDays: null,
        },
        {
          name: "Phase 2 — Verification",
          profitTargetPct: 5,
          minTradingDays: 5,
          maxDays: null,
        },
      ],
      maxDrawdownPct: 10,
      maxDrawdownType: "static",
      maxDrawdownBasis: "equity",
      dailyLossPct: 5,
      dailyLossBasis: "equity",
      dailyResetTime: "00:00",
      dailyResetTimezone: "UTC",
      consistencyRulePct: null,
      profitSplitPct: 80,
      payoutFrequencyDays: 14,
      newsTradingAllowed: true,
      weekendHoldingAllowed: true,
      sourceUrl: "https://www.eightcap.com",
      verifiedDate: "2025-01-20",
    },
  ],
};
