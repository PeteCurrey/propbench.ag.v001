export interface ChallengePlanInput {
  startingBalance: number;
  targetProfitPct: number;
  tradingDays: number;
}

export interface DayEquityPoint {
  day: number;
  equity: number;
}

export interface ChallengePlanResult {
  targetProfitAmount: number;
  targetDailyProfit: number;
  dailyTargetPct: number;
  targetFinalBalance: number;
  projectedEquityCurve: DayEquityPoint[];
}

/**
 * Calculates daily profit targets and projected linear/compounded progress curve.
 * Pure function — returns null on invalid inputs.
 */
export function calculateChallengePlan(input: ChallengePlanInput): ChallengePlanResult | null {
  const { startingBalance, targetProfitPct, tradingDays } = input;

  if (startingBalance <= 0 || targetProfitPct <= 0 || tradingDays <= 0) {
    return null;
  }

  const targetProfitAmount = startingBalance * (targetProfitPct / 100);
  const targetFinalBalance = startingBalance + targetProfitAmount;
  const targetDailyProfit = targetProfitAmount / tradingDays;
  const dailyTargetPct = (targetDailyProfit / startingBalance) * 100;

  const projectedEquityCurve: DayEquityPoint[] = [{ day: 0, equity: startingBalance }];

  for (let day = 1; day <= tradingDays; day++) {
    const equity = startingBalance + targetDailyProfit * day;
    projectedEquityCurve.push({
      day,
      equity: Number(equity.toFixed(2)),
    });
  }

  return {
    targetProfitAmount,
    targetDailyProfit: Number(targetDailyProfit.toFixed(2)),
    dailyTargetPct: Number(dailyTargetPct.toFixed(2)),
    targetFinalBalance,
    projectedEquityCurve,
  };
}
