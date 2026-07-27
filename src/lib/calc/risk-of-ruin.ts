export interface RiskOfRuinInput {
  accountBalance: number;
  riskPerTradePct: number;
  maxDrawdownPct: number;
  winRatePct: number;
  rewardToRiskRatio: number;
}

export interface LosingStreakRow {
  consecutiveLosses: number;
  cumulativeLossPct: number;
  remainingBalance: number;
  isBreached: boolean;
}

export interface RiskOfRuinResult {
  riskOfRuinPct: number;
  maxLossesBeforeBreach: number;
  losingStreakTable: LosingStreakRow[];
}

/**
 * Generates table of consecutive losses (1 to 20 trades) with remaining balances and breach indicators.
 */
export function losingStreakTable(
  accountBalance: number,
  riskPerTradePct: number,
  maxDrawdownPct: number,
  maxStreakCount: number = 20
): LosingStreakRow[] {
  const rows: LosingStreakRow[] = [];
  const breachFloor = accountBalance * (1 - maxDrawdownPct / 100);

  for (let streak = 1; streak <= maxStreakCount; streak++) {
    // Compounded loss formula: remaining = balance * (1 - risk/100)^streak
    const remainingBalance = accountBalance * Math.pow(1 - riskPerTradePct / 100, streak);
    const cumulativeLossPct = ((accountBalance - remainingBalance) / accountBalance) * 100;
    const isBreached = remainingBalance <= breachFloor;

    rows.push({
      consecutiveLosses: streak,
      cumulativeLossPct: Number(cumulativeLossPct.toFixed(2)),
      remainingBalance: Number(remainingBalance.toFixed(2)),
      isBreached,
    });
  }

  return rows;
}

/**
 * Calculates risk of ruin probability and consecutive loss breach thresholds.
 * Pure function — returns null on invalid inputs.
 */
export function calculateRiskOfRuin(input: RiskOfRuinInput): RiskOfRuinResult | null {
  const { accountBalance, riskPerTradePct, maxDrawdownPct, winRatePct, rewardToRiskRatio } = input;

  if (
    accountBalance <= 0 ||
    riskPerTradePct <= 0 ||
    riskPerTradePct > 100 ||
    maxDrawdownPct <= 0 ||
    maxDrawdownPct > 100 ||
    winRatePct <= 0 ||
    winRatePct >= 100 ||
    rewardToRiskRatio <= 0
  ) {
    return null;
  }

  const streakTable = losingStreakTable(accountBalance, riskPerTradePct, maxDrawdownPct);

  // Find max losses before breach
  const firstBreachedIndex = streakTable.findIndex((r) => r.isBreached);
  const maxLossesBeforeBreach =
    firstBreachedIndex === -1 ? streakTable.length : firstBreachedIndex;

  // Standard analytic Risk of Ruin approximation formula:
  // Edge = (W * R) - (1 - W)
  const W = winRatePct / 100;
  const L = 1 - W;
  const edge = W * rewardToRiskRatio - L;

  let riskOfRuinPct = 0;

  if (edge <= 0) {
    // Negative edge means ruin is inevitable over infinite trades
    riskOfRuinPct = 100;
  } else {
    // Ruin probability calculation based on capital units & edge
    const r = (1 - edge) / (1 + edge);
    const unitsToRuin = Math.floor(maxDrawdownPct / riskPerTradePct);
    riskOfRuinPct = Math.min(100, Math.max(0, Math.pow(r, unitsToRuin) * 100));
  }

  return {
    riskOfRuinPct: Number(riskOfRuinPct.toFixed(2)),
    maxLossesBeforeBreach,
    losingStreakTable: streakTable,
  };
}
