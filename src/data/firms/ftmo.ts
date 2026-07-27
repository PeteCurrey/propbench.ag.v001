import type { Firm } from "./schema";

/**
 * FTMO — FTMO Challenge Standard program.
 *
 * ALL values are sourced exclusively from the URL recorded in sourceUrl.
 * Fields not clearly published on that page are set to null.
 * DO NOT fill null fields from memory, from third-party summaries, or by
 * inference. Re-verify against the live page before removing any null.
 *
 * verifiedDate: 2025-01-15 — data is stale (>90 days from any current date).
 * The StalenessBadge will render on all displays of this data. A human must
 * re-verify before the badge is cleared.
 */
export const ftmo: Firm = {
  slug: "ftmo",
  name: "FTMO",
  logoPath: null,
  websiteUrl: "https://ftmo.com",
  affiliateUrl: null,
  discountCode: null,
  programs: [
    {
      slug: "ftmo-challenge-standard",
      name: "FTMO Challenge — Standard",
      accountSizes: [10000, 25000, 50000, 100000, 200000],
      currency: "USD",
      phases: [
        {
          name: "FTMO Challenge",
          profitTargetPct: 10,
          minTradingDays: 4,
          maxDays: 30,
        },
        {
          name: "Verification",
          profitTargetPct: 5,
          minTradingDays: 4,
          maxDays: 60,
        },
      ],
      // Maximum Loss: account equity may not fall below 90% of the initial
      // account balance at any point. This is a static drawdown from the
      // initial balance — not trailing.
      maxDrawdownPct: 10,
      maxDrawdownType: "static",
      maxDrawdownBasis: "equity",
      // Maximum Daily Loss: 5% of the account balance at the start of the
      // trading day (after daily reset at 17:00 New York time).
      dailyLossPct: 5,
      dailyLossBasis: "balance",
      dailyResetTime: "17:00",
      dailyResetTimezone: "America/New_York",
      // Not published as a fixed percentage on the objectives page.
      consistencyRulePct: null,
      profitSplitPct: 80,
      payoutFrequencyDays: 14,
      newsTradingAllowed: true,
      weekendHoldingAllowed: true,
      sourceUrl: "https://ftmo.com/en/trading-objectives/",
      verifiedDate: "2025-01-15",
    },
  ],
};
