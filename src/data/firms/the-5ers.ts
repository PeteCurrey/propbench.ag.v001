import type { Firm } from "./schema";

/**
 * The 5ers — High Stakes 2-Step Evaluation program.
 *
 * ALL values are sourced exclusively from the URL recorded in sourceUrl.
 * Fields not clearly published on that page are set to null.
 *
 * verifiedDate: 2025-01-20.
 */
export const the5ers: Firm = {
  slug: "the-5ers",
  name: "The 5ers",
  logoPath: null,
  websiteUrl: "https://www.the5ers.com/?afmc=1dv0",
  affiliateUrl: "https://www.the5ers.com/?afmc=1dv0",
  discountCode: null,
  programs: [
    {
      slug: "high-stakes-2-step",
      name: "High Stakes — 2-Step",
      accountSizes: [5000, 20000, 60000, 100000],
      currency: "USD",
      phases: [
        {
          name: "Phase 1 — Evaluation",
          profitTargetPct: 8,
          minTradingDays: 3,
          maxDays: null, // Unlimited trading days
        },
        {
          name: "Phase 2 — Verification",
          profitTargetPct: 5,
          minTradingDays: 3,
          maxDays: null, // Unlimited trading days
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
      sourceUrl: "https://the-5ers.com/high-stakes/",
      verifiedDate: "2025-01-20",
    },
  ],
};
