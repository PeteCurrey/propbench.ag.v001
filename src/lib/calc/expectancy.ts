export interface ExpectancyInput {
  winRatePct: number;
  avgWinAmount: number;
  avgLossAmount: number;
}

export interface ExpectancyResult {
  expectedValuePerTrade: number;
  rewardToRiskRatio: number;
  expectedProfit100Trades: number;
  hasPositiveEdge: boolean;
}

/**
 * Calculates mathematical expectancy (expected value per trade).
 * Pure function — returns null on invalid inputs.
 */
export function calculateExpectancy(input: ExpectancyInput): ExpectancyResult | null {
  const { winRatePct, avgWinAmount, avgLossAmount } = input;

  if (winRatePct <= 0 || winRatePct >= 100 || avgWinAmount <= 0 || avgLossAmount <= 0) {
    return null;
  }

  const W = winRatePct / 100;
  const L = 1 - W;
  const rewardToRiskRatio = avgWinAmount / avgLossAmount;
  const expectedValuePerTrade = W * avgWinAmount - L * avgLossAmount;
  const expectedProfit100Trades = expectedValuePerTrade * 100;
  const hasPositiveEdge = expectedValuePerTrade > 0;

  return {
    expectedValuePerTrade: Number(expectedValuePerTrade.toFixed(2)),
    rewardToRiskRatio: Number(rewardToRiskRatio.toFixed(2)),
    expectedProfit100Trades: Number(expectedProfit100Trades.toFixed(2)),
    hasPositiveEdge,
  };
}
