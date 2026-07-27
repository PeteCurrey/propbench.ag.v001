export interface CompoundingInput {
  startingBalance: number;
  returnPerPeriodPct: number;
  numberOfPeriods: number;
  reinvestPct?: number; // 0 to 100%, default 100%
}

export interface PeriodPoint {
  period: number;
  balance: number;
  profitThisPeriod: number;
  withdrawnProfit: number;
}

export interface CompoundingResult {
  finalBalance: number;
  totalProfit: number;
  totalWithdrawn: number;
  percentageGain: number;
  equityPoints: PeriodPoint[];
}

/**
 * Calculates multi-period compounding equity curve and withdrawals.
 * Pure function — returns null on invalid inputs.
 */
export function calculateCompounding(input: CompoundingInput): CompoundingResult | null {
  const { startingBalance, returnPerPeriodPct, numberOfPeriods, reinvestPct = 100 } = input;

  if (
    startingBalance <= 0 ||
    numberOfPeriods <= 0 ||
    numberOfPeriods > 365 ||
    reinvestPct < 0 ||
    reinvestPct > 100
  ) {
    return null;
  }

  let currentBalance = startingBalance;
  let totalWithdrawn = 0;
  const equityPoints: PeriodPoint[] = [
    { period: 0, balance: startingBalance, profitThisPeriod: 0, withdrawnProfit: 0 },
  ];

  for (let period = 1; period <= numberOfPeriods; period++) {
    const profitThisPeriod = currentBalance * (returnPerPeriodPct / 100);
    const reinvested = profitThisPeriod * (reinvestPct / 100);
    const withdrawn = profitThisPeriod - reinvested;

    currentBalance += reinvested;
    totalWithdrawn += withdrawn;

    equityPoints.push({
      period,
      balance: Number(currentBalance.toFixed(2)),
      profitThisPeriod: Number(profitThisPeriod.toFixed(2)),
      withdrawnProfit: Number(withdrawn.toFixed(2)),
    });
  }

  const totalProfit = currentBalance - startingBalance + totalWithdrawn;
  const percentageGain = ((currentBalance + totalWithdrawn - startingBalance) / startingBalance) * 100;

  return {
    finalBalance: Number(currentBalance.toFixed(2)),
    totalProfit: Number(totalProfit.toFixed(2)),
    totalWithdrawn: Number(totalWithdrawn.toFixed(2)),
    percentageGain: Number(percentageGain.toFixed(2)),
    equityPoints,
  };
}
