export interface LotSizeInput {
  accountBalance: number;
  riskAmountOrPct: number;
  isPercentage: boolean; // true = %, false = currency $
  stopLossPips: number;
  pipValuePerLot?: number;
}

export interface LotSizeResult {
  recommendedLots: number;
  cashAtRisk: number;
  riskPctOfAccount: number;
}

/**
 * Calculates lot size from cash amount or risk percentage.
 * Pure function — returns null on invalid inputs.
 */
export function calculateLotSize(input: LotSizeInput): LotSizeResult | null {
  const { accountBalance, riskAmountOrPct, isPercentage, stopLossPips, pipValuePerLot = 10 } = input;

  if (accountBalance <= 0 || riskAmountOrPct <= 0 || stopLossPips <= 0 || pipValuePerLot <= 0) {
    return null;
  }

  let cashAtRisk = 0;
  let riskPctOfAccount = 0;

  if (isPercentage) {
    if (riskAmountOrPct > 100) return null;
    riskPctOfAccount = riskAmountOrPct;
    cashAtRisk = accountBalance * (riskPctOfAccount / 100);
  } else {
    cashAtRisk = riskAmountOrPct;
    riskPctOfAccount = (cashAtRisk / accountBalance) * 100;
  }

  const recommendedLots = cashAtRisk / (stopLossPips * pipValuePerLot);

  return {
    recommendedLots: Number(recommendedLots.toFixed(2)),
    cashAtRisk: Number(cashAtRisk.toFixed(2)),
    riskPctOfAccount: Number(riskPctOfAccount.toFixed(2)),
  };
}
