export interface DailyLossInput {
  startOfDayBalance: number;
  currentEquity: number;
  dailyLossPct: number;
  dailyLossBasis?: "balance" | "equity";
}

export interface DailyLossResult {
  breachThreshold: number;
  maxDailyLossAmount: number;
  currentDailyLoss: number;
  remainingDailyBuffer: number;
  remainingDailyBufferPct: number;
  isBreached: boolean;
}

/**
 * Calculates daily loss limits and remaining daily drawdown buffer.
 * Pure function — returns null on invalid inputs.
 */
export function calculateDailyLossLimit(input: DailyLossInput): DailyLossResult | null {
  const { startOfDayBalance, currentEquity, dailyLossPct } = input;

  if (startOfDayBalance <= 0 || currentEquity < 0 || dailyLossPct <= 0 || dailyLossPct > 100) {
    return null;
  }

  const maxDailyLossAmount = startOfDayBalance * (dailyLossPct / 100);
  const breachThreshold = startOfDayBalance - maxDailyLossAmount;
  const currentDailyLoss = Math.max(0, startOfDayBalance - currentEquity);
  const remainingDailyBuffer = currentEquity - breachThreshold;
  const remainingDailyBufferPct = (remainingDailyBuffer / startOfDayBalance) * 100;
  const isBreached = currentEquity <= breachThreshold;

  return {
    breachThreshold: Number(breachThreshold.toFixed(2)),
    maxDailyLossAmount: Number(maxDailyLossAmount.toFixed(2)),
    currentDailyLoss: Number(currentDailyLoss.toFixed(2)),
    remainingDailyBuffer: Number(remainingDailyBuffer.toFixed(2)),
    remainingDailyBufferPct: Number(remainingDailyBufferPct.toFixed(2)),
    isBreached,
  };
}
