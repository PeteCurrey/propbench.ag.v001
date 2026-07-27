export interface PipValueInput {
  instrument: string;
  tradeSizeLots: number;
  accountCurrency?: "USD" | "GBP" | "EUR";
}

export interface PipValueResult {
  pipValue: number;
  oneLotPipValue: number;
  pipSize: number;
  standardUnits: number;
}

/**
 * Calculates pip value based on instrument and lot size.
 * Pure function — returns null on invalid inputs.
 */
export function calculatePipValue(input: PipValueInput): PipValueResult | null {
  const { instrument, tradeSizeLots, accountCurrency = "USD" } = input;

  if (tradeSizeLots <= 0) {
    return null;
  }

  const cleanInst = instrument.toUpperCase().replace("/", "");

  // Base pip size & base lot value per pip for standard 1 lot (100,000 units)
  let pipSize = 0.0001;
  let oneLotPipValue = 10.0; // Default $10 for USD quote pairs

  if (cleanInst.includes("JPY")) {
    pipSize = 0.01;
    oneLotPipValue = 6.7; // ~ $6.70 per pip depending on exchange rate
  } else if (cleanInst.includes("XAU") || cleanInst.includes("GOLD")) {
    pipSize = 0.1;
    oneLotPipValue = 10.0; // $10 per 0.1 move on 100 oz contract
  } else if (cleanInst.includes("BTC") || cleanInst.includes("CRYPTO")) {
    pipSize = 1.0;
    oneLotPipValue = 1.0;
  }

  const pipValue = oneLotPipValue * tradeSizeLots;
  const standardUnits = Math.round(tradeSizeLots * 100000);

  return {
    pipValue: Number(pipValue.toFixed(2)),
    oneLotPipValue: Number(oneLotPipValue.toFixed(2)),
    pipSize,
    standardUnits,
  };
}
