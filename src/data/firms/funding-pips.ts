import type { Firm } from "./schema";

/**
 * Funding Pips — 2-Step Evaluation program.
 *
 * ALL values are sourced exclusively from the URL recorded in sourceUrl.
 * Fields not clearly published on that page are set to null.
 *
 * verifiedDate: 2025-01-20.
 */
export const fundingPips: Firm = {
  slug: "funding-pips",
  name: "Funding Pips",
  logoPath: null,
  websiteUrl: "https://fundingpips.com",
  affiliateUrl: null,
  discountCode: null,
  programs: [
    {
      slug: "funding-pips-2-step",
      name: "Funding Pips — 2-Step Evaluation",
      accountSizes: [5000, 10000, 25000, 50000, 100000],
      currency: "USD",
      phases: [
        {
          name: "Student",
          profitTargetPct: 8,
          minTradingDays: null, // No minimum trading days
          maxDays: null, // Unlimited trading days
        },
        {
          name: "Practitioner",
          profitTargetPct: 5,
          minTradingDays: null, // No minimum trading days
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
      payoutFrequencyDays: 5,
      newsTradingAllowed: true,
      weekendHoldingAllowed: false,
      sourceUrl: "https://fundingpips.com/faq/",
      verifiedDate: "2025-01-20",
    },
  ],
};
