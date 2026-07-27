export interface ConsistencyRuleInput {
  totalProfit: number;
  bestDayProfit: number;
  consistencyCapPct: number; // e.g. 30, 40, 50%
}

export interface ConsistencyRuleResult {
  maxAllowedBestDayProfit: number;
  actualBestDayPct: number;
  isCompliant: boolean;
  excessProfit: number;
  requiredTotalProfitForCap: number;
}

/**
 * Checks compliance against prop firm profit consistency cap rules.
 * Pure function — returns null on invalid inputs.
 */
export function calculateConsistencyRule(input: ConsistencyRuleInput): ConsistencyRuleResult | null {
  const { totalProfit, bestDayProfit, consistencyCapPct } = input;

  if (totalProfit <= 0 || bestDayProfit < 0 || consistencyCapPct <= 0 || consistencyCapPct > 100) {
    return null;
  }

  const maxAllowedBestDayProfit = totalProfit * (consistencyCapPct / 100);
  const actualBestDayPct = (bestDayProfit / totalProfit) * 100;
  const isCompliant = bestDayProfit <= maxAllowedBestDayProfit;
  const excessProfit = Math.max(0, bestDayProfit - maxAllowedBestDayProfit);
  const requiredTotalProfitForCap = bestDayProfit / (consistencyCapCapFraction(consistencyCapPct));

  return {
    maxAllowedBestDayProfit: Number(maxAllowedBestDayProfit.toFixed(2)),
    actualBestDayPct: Number(actualBestDayPct.toFixed(2)),
    isCompliant,
    excessProfit: Number(excessProfit.toFixed(2)),
    requiredTotalProfitForCap: Number(requiredTotalProfitForCap.toFixed(2)),
  };
}

function consistencyCapCapFraction(pct: number): number {
  return pct / 100;
}
