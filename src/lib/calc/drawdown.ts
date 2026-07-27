export type DrawdownType = "static" | "trailing_intraday" | "trailing_eod";

export interface DrawdownInput {
  initialBalance: number;
  currentBalance: number;
  highWaterMark: number;
  maxDrawdownPct: number;
  drawdownType: DrawdownType;
}

export interface DrawdownResult {
  breachFloor: number;
  maxDrawdownAmount: number;
  currentDrawdownAmount: number;
  currentDrawdownPct: number;
  remainingBuffer: number;
  remainingBufferPct: number;
  isBreached: boolean;
  zone: "safe" | "warning" | "danger" | "breached";
}

/**
 * Calculates drawdown metrics and breach floor for static and trailing drawdown rules.
 * Pure function — returns null on invalid or incomplete inputs.
 */
export function calculateDrawdown(input: DrawdownInput): DrawdownResult | null {
  const { initialBalance, currentBalance, highWaterMark, maxDrawdownPct, drawdownType } = input;

  if (
    initialBalance <= 0 ||
    currentBalance < 0 ||
    highWaterMark <= 0 ||
    maxDrawdownPct <= 0 ||
    maxDrawdownPct > 100
  ) {
    return null;
  }

  const referenceBalance = drawdownType === "static" ? initialBalance : Math.max(initialBalance, highWaterMark);
  const breachFloor = referenceBalance * (1 - maxDrawdownPct / 100);
  const maxDrawdownAmount = referenceBalance * (maxDrawdownPct / 100);
  
  const currentDrawdownAmount = Math.max(0, referenceBalance - currentBalance);
  const currentDrawdownPct = (currentDrawdownAmount / referenceBalance) * 100;
  
  const remainingBuffer = currentBalance - breachFloor;
  const remainingBufferPct = (remainingBuffer / referenceBalance) * 100;
  const isBreached = currentBalance <= breachFloor;

  let zone: "safe" | "warning" | "danger" | "breached" = "safe";
  if (isBreached) {
    zone = "breached";
  } else if (remainingBufferPct <= maxDrawdownPct * 0.25) {
    zone = "danger";
  } else if (remainingBufferPct <= maxDrawdownPct * 0.5) {
    zone = "warning";
  }

  return {
    breachFloor,
    maxDrawdownAmount,
    currentDrawdownAmount,
    currentDrawdownPct,
    remainingBuffer,
    remainingBufferPct,
    isBreached,
    zone,
  };
}
