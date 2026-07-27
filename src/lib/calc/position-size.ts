export interface PositionSizeInput {
  accountBalance: number;
  riskPct: number;
  stopLossPips: number;
  pipValuePerLot?: number; // Default 10 for standard USD pair 1 lot
}

export interface PositionSizeResult {
  cashAtRisk: number;
  positionSizeLots: number;
  totalUnits: number;
  riskPerPip: number;
}

/**
 * Calculates risk amount and required lot size.
 * Pure function — returns null on invalid or incomplete inputs.
 */
export function calculatePositionSize(input: PositionSizeInput): PositionSizeResult | null {
  const { accountBalance, riskPct, stopLossPips, pipValuePerLot = 10 } = input;

  if (
    accountBalance <= 0 ||
    riskPct <= 0 ||
    riskPct > 100 ||
    stopLossPips <= 0 ||
    pipValuePerLot <= 0
  ) {
    return null;
  }

  const cashAtRisk = accountBalance * (riskPct / 100);
  const riskPerPip = cashAtRisk / stopLossPips;
  const positionSizeLots = riskPerPip / pipValuePerLot;
  const totalUnits = Math.round(positionSizeLots * 100000);

  return {
    cashAtRisk,
    positionSizeLots: Number(positionSizeLots.toFixed(2)),
    totalUnits,
    riskPerPip: Number(riskPerPip.toFixed(2)),
  };
}
