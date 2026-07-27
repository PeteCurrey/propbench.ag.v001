import type { Firm } from "./schema";

/**
 * Apex Trader Funding — Futures Evaluation program.
 *
 * ALL values are sourced exclusively from the URL recorded in sourceUrl.
 * Fields not clearly published on that page are set to null.
 *
 * verifiedDate: 2025-01-20.
 */
export const apexTraderFunding: Firm = {
  slug: "apex-trader-funding",
  name: "Apex Trader Funding",
  logoPath: null,
  websiteUrl: "https://apextraderfunding.com",
  affiliateUrl: null,
  discountCode: null,
  programs: [
    {
      slug: "apex-futures-evaluation",
      name: "Apex Futures Evaluation",
      accountSizes: [25000, 50000, 75000, 100000, 150000, 250000, 300000],
      currency: "USD",
      phases: [
        {
          name: "Evaluation",
          profitTargetPct: 6,
          minTradingDays: 7,
          maxDays: null, // Unlimited
        },
      ],
      maxDrawdownPct: 5,
      maxDrawdownType: "trailing_intraday",
      maxDrawdownBasis: "equity",
      dailyLossPct: null, // Apex does not enforce a daily loss limit
      dailyLossBasis: null,
      dailyResetTime: null,
      dailyResetTimezone: null,
      consistencyRulePct: 30, // 30% single-day profit cap rule
      profitSplitPct: 90,
      payoutFrequencyDays: 14,
      newsTradingAllowed: true,
      weekendHoldingAllowed: false,
      sourceUrl: "https://support.apextraderfunding.com/hc/en-us/articles/4406140508827-Evaluation-Rules",
      verifiedDate: "2025-01-20",
    },
  ],
};
