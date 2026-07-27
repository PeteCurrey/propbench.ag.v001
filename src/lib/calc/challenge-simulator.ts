export interface ChallengeSimulatorInput {
  startingBalance: number;
  targetProfitPct: number;
  maxDrawdownPct: number;
  winRatePct: number;
  rewardToRiskRatio: number;
  riskPerTradePct: number;
  maxTrades?: number; // e.g. 50
  numSimulations?: number; // e.g. 1000
}

export interface HistogramBin {
  binMinPct: number;
  binMaxPct: number;
  label: string;
  count: number;
  percentage: number;
  status: "fail" | "timeout" | "pass";
}

export interface ChallengeSimulatorResult {
  passRatePct: number;
  failRatePct: number;
  timeoutRatePct: number;
  numSimulations: number;
  histogramBins: HistogramBin[];
}

/**
 * Runs a deterministic Monte Carlo simulation of challenge outcomes based on user inputs.
 * Clearly framed as a mathematical simulation of user assumptions.
 * Pure function — returns null on invalid inputs.
 */
export function runChallengeSimulation(input: ChallengeSimulatorInput): ChallengeSimulatorResult | null {
  const {
    startingBalance,
    targetProfitPct,
    maxDrawdownPct,
    winRatePct,
    rewardToRiskRatio,
    riskPerTradePct,
    maxTrades = 50,
    numSimulations = 1000,
  } = input;

  if (
    startingBalance <= 0 ||
    targetProfitPct <= 0 ||
    maxDrawdownPct <= 0 ||
    winRatePct <= 0 ||
    winRatePct >= 100 ||
    rewardToRiskRatio <= 0 ||
    riskPerTradePct <= 0 ||
    riskPerTradePct > 100
  ) {
    return null;
  }

  const targetProfit = startingBalance * (targetProfitPct / 100);
  const targetBalance = startingBalance + targetProfit;
  const maxDrawdownAmount = startingBalance * (maxDrawdownPct / 100);
  const breachFloor = startingBalance - maxDrawdownAmount;

  let passes = 0;
  let fails = 0;
  let timeouts = 0;

  const finalReturnPcts: number[] = [];

  // Simple pseudo-random number generator for deterministic testing reproducibility if needed
  let seed = 123456789;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  const winProb = winRatePct / 100;

  for (let sim = 0; sim < numSimulations; sim++) {
    let currentBalance = startingBalance;
    let outcome: "pass" | "fail" | "timeout" = "timeout";

    for (let trade = 0; trade < maxTrades; trade++) {
      const riskAmount = currentBalance * (riskPerTradePct / 100);
      const isWin = random() < winProb;

      if (isWin) {
        currentBalance += riskAmount * rewardToRiskRatio;
      } else {
        currentBalance -= riskAmount;
      }

      if (currentBalance >= targetBalance) {
        outcome = "pass";
        break;
      }

      if (currentBalance <= breachFloor) {
        outcome = "fail";
        break;
      }
    }

    if (outcome === "pass") passes++;
    else if (outcome === "fail") fails++;
    else timeouts++;

    const returnPct = ((currentBalance - startingBalance) / startingBalance) * 100;
    finalReturnPcts.push(returnPct);
  }

  const passRatePct = Number(((passes / numSimulations) * 100).toFixed(1));
  const failRatePct = Number(((fails / numSimulations) * 100).toFixed(1));
  const timeoutRatePct = Number(((timeouts / numSimulations) * 100).toFixed(1));

  // Construct histogram bins (-maxDrawdownPct to +targetProfitPct)
  const minRange = -maxDrawdownPct * 1.2;
  const maxRange = targetProfitPct * 1.2;
  const binStep = (maxRange - minRange) / 8;

  const histogramBins: HistogramBin[] = [];

  for (let i = 0; i < 8; i++) {
    const binMinPct = minRange + i * binStep;
    const binMaxPct = binMinPct + binStep;
    const count = finalReturnPcts.filter((r) => r >= binMinPct && r < binMaxPct).length;
    const percentage = Number(((count / numSimulations) * 100).toFixed(1));

    let status: "fail" | "timeout" | "pass" = "timeout";
    if (binMaxPct <= 0) status = "fail";
    else if (binMinPct >= targetProfitPct) status = "pass";

    histogramBins.push({
      binMinPct: Number(binMinPct.toFixed(1)),
      binMaxPct: Number(binMaxPct.toFixed(1)),
      label: `${binMinPct.toFixed(0)}% to ${binMaxPct.toFixed(0)}%`,
      count,
      percentage,
      status,
    });
  }

  return {
    passRatePct,
    failRatePct,
    timeoutRatePct,
    numSimulations,
    histogramBins,
  };
}
