import type { Firm } from "./schema";

/**
 * FundedNext — Stellar 2-Step Evaluation program.
 *
 * ALL values are sourced exclusively from the URL recorded in sourceUrl.
 * Fields not clearly published on that page are set to null.
 *
 * verifiedDate: 2025-01-20.
 */
export const fundedNext: Firm = {
  slug: "fundednext",
  name: "FundedNext",
  logoPath: null,
  websiteUrl: "https://fundednext.com",
  affiliateUrl: null,
  discountCode: null,
  programs: [
    {
      slug: "stellar-2-step",
      name: "Stellar Challenge — 2-Step",
      accountSizes: [6000, 15000, 25000, 50000, 100000, 200000],
      currency: "USD",
      phases: [
        {
          name: "Phase 1",
          profitTargetPct: 8,
          minTradingDays: 5,
          maxDays: null, // Unlimited
        },
        {
          name: "Phase 2",
          profitTargetPct: 5,
          minTradingDays: 5,
          maxDays: null, // Unlimited
        },
      ],
      maxDrawdownPct: 10,
      maxDrawdownType: "static",
      maxDrawdownBasis: "equity",
      dailyLossPct: 5,
      dailyLossBasis: "balance",
      dailyResetTime: "00:00",
      dailyResetTimezone: "UTC",
      consistencyRulePct: null,
      profitSplitPct: 80,
      payoutFrequencyDays: 14,
      newsTradingAllowed: true,
      weekendHoldingAllowed: true,
      sourceUrl: "https://fundednext.com/models/stellar-challenge/",
      verifiedDate: "2025-01-20",
    },
  ],
};
