export interface PayoutProjectorInput {
  grossProfit: number;
  profitSplitPct: number; // e.g. 80 for 80%
  feeDeductions?: number;
}

export interface PayoutProjectorResult {
  traderShare: number;
  firmShare: number;
  netPayout: number;
  effectiveSplitPct: number;
}

/**
 * Calculates net split breakdown and fee adjustments.
 * Pure function — returns null on invalid inputs.
 * FCA Compliant — purely educational framing, zero performance claims or outcome promises.
 */
export function calculatePayoutProjector(input: PayoutProjectorInput): PayoutProjectorResult | null {
  const { grossProfit, profitSplitPct, feeDeductions = 0 } = input;

  if (grossProfit <= 0 || profitSplitPct <= 0 || profitSplitPct > 100 || feeDeductions < 0) {
    return null;
  }

  const traderShare = grossProfit * (profitSplitPct / 100);
  const firmShare = grossProfit - traderShare;
  const netPayout = Math.max(0, traderShare - feeDeductions);
  const effectiveSplitPct = (netPayout / grossProfit) * 100;

  return {
    traderShare: Number(traderShare.toFixed(2)),
    firmShare: Number(firmShare.toFixed(2)),
    netPayout: Number(netPayout.toFixed(2)),
    effectiveSplitPct: Number(effectiveSplitPct.toFixed(2)),
  };
}
