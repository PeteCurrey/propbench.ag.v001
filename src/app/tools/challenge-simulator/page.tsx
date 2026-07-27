"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { MonteCarloHistogram } from "@/components/calculators/MonteCarloHistogram";
import { runChallengeSimulation, type ChallengeSimulatorInput } from "@/lib/calc/challenge-simulator";

const DEFAULT_INPUTS: ChallengeSimulatorInput = {
  startingBalance: 100000,
  targetProfitPct: 10,
  maxDrawdownPct: 10,
  winRatePct: 55,
  rewardToRiskRatio: 1.5,
  riskPerTradePct: 1,
  maxTrades: 50,
  numSimulations: 1000,
};

const RELATED_TOOLS = [
  { slug: "challenge-planner", name: "Challenge Target Planner", description: "Plan linear daily target goals." },
  { slug: "risk-of-ruin-calculator", name: "Risk of Ruin Calculator", description: "Calculate losing streak breach probabilities." },
  { slug: "expectancy-calculator", name: "Expectancy Calculator", description: "Evaluate mathematical edge per trade." },
];

function ChallengeSimulatorContent() {
  return (
    <CalculatorShell<ChallengeSimulatorInput>
      title="Monte Carlo Challenge Simulator"
      subtitle="Simulate 1,000 randomized challenge runs based strictly on your trading inputs to plot outcome distributions."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        startingBalance: Number(params.get("startingBalance")) || DEFAULT_INPUTS.startingBalance,
        targetProfitPct: Number(params.get("targetProfitPct")) || DEFAULT_INPUTS.targetProfitPct,
        maxDrawdownPct: Number(params.get("maxDrawdownPct")) || DEFAULT_INPUTS.maxDrawdownPct,
        winRatePct: Number(params.get("winRatePct")) || DEFAULT_INPUTS.winRatePct,
        rewardToRiskRatio: Number(params.get("rewardToRiskRatio")) || DEFAULT_INPUTS.rewardToRiskRatio,
        riskPerTradePct: Number(params.get("riskPerTradePct")) || DEFAULT_INPUTS.riskPerTradePct,
      })}
      formatSearchParams={(inputs) => ({
        startingBalance: String(inputs.startingBalance),
        targetProfitPct: String(inputs.targetProfitPct),
        maxDrawdownPct: String(inputs.maxDrawdownPct),
        winRatePct: String(inputs.winRatePct),
        rewardToRiskRatio: String(inputs.rewardToRiskRatio),
        riskPerTradePct: String(inputs.riskPerTradePct),
      })}
      validateInputs={(inputs) => {
        if (inputs.startingBalance <= 0) return "Starting balance must be greater than zero.";
        if (inputs.targetProfitPct <= 0) return "Target profit % must be greater than zero.";
        if (inputs.maxDrawdownPct <= 0) return "Max drawdown % must be greater than zero.";
        if (inputs.winRatePct <= 0 || inputs.winRatePct >= 100) return "Win rate % must be between 1% and 99%.";
        if (inputs.rewardToRiskRatio <= 0) return "Reward to risk ratio must be greater than zero.";
        if (inputs.riskPerTradePct <= 0 || inputs.riskPerTradePct > 100) return "Risk per trade % must be between 0.1% and 100%.";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <NumberInput
            label="Starting Balance ($)"
            value={inputs.startingBalance}
            onChange={(val) => onChange("startingBalance", val)}
            min={1}
          />
          <NumberInput
            label="Profit Target (%)"
            value={inputs.targetProfitPct}
            onChange={(val) => onChange("targetProfitPct", val)}
            min={1}
            max={100}
          />
          <NumberInput
            label="Max Drawdown Allowance (%)"
            value={inputs.maxDrawdownPct}
            onChange={(val) => onChange("maxDrawdownPct", val)}
            min={1}
            max={100}
          />
          <NumberInput
            label="Historical Win Rate (%)"
            value={inputs.winRatePct}
            onChange={(val) => onChange("winRatePct", val)}
            min={1}
            max={99}
          />
          <NumberInput
            label="Reward-to-Risk Ratio (R:R)"
            value={inputs.rewardToRiskRatio}
            onChange={(val) => onChange("rewardToRiskRatio", val)}
            min={0.1}
            step={0.1}
          />
          <NumberInput
            label="Risk Per Trade (%)"
            value={inputs.riskPerTradePct}
            onChange={(val) => onChange("riskPerTradePct", val)}
            min={0.1}
            max={100}
            step={0.25}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = runChallengeSimulation(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-3 gap-3 text-center font-mono">
            <div className="p-3 rounded border border-positive/30 bg-positive/10">
              <span className="text-[10px] text-text-muted uppercase block">Pass Rate</span>
              <span className="text-xl font-bold text-positive">{res.passRatePct}%</span>
            </div>
            <div className="p-3 rounded border border-danger/30 bg-danger/10">
              <span className="text-[10px] text-text-muted uppercase block">Fail Rate</span>
              <span className="text-xl font-bold text-danger">{res.failRatePct}%</span>
            </div>
            <div className="p-3 rounded border border-border bg-surface-base">
              <span className="text-[10px] text-text-muted uppercase block">Timeout</span>
              <span className="text-xl font-bold text-text-muted">{res.timeoutRatePct}%</span>
            </div>
          </div>
        );
      }}
      renderVisual={(inputs) => {
        const res = runChallengeSimulation(inputs);
        if (!res) return null;
        return <MonteCarloHistogram result={res} />;
      }}
      getAssumptions={(inputs) => [
        { label: "Simulated Runs", value: "1,000 iterations", explanation: "Randomized trade sequence samples" },
        { label: "Win Rate & R:R", value: `${inputs.winRatePct}% @ 1:${inputs.rewardToRiskRatio}`, explanation: "Assumed strategy edge" },
        { label: "Risk Budget", value: `${inputs.riskPerTradePct}% per trade`, explanation: "Fixed percentage risk" },
      ]}
      explanationTitle="Understanding Monte Carlo Simulation in Prop Trading"
      explanationText={
        <>
          <p>
            A Monte Carlo simulation evaluates how trade sequence randomness (streak variance) impacts your probability of passing or breaching a prop firm challenge.
          </p>
          <p>
            Even with a strategy that has a positive expected value, suffering early losing streaks can trigger daily or max drawdown limits before reaching the profit target.
          </p>
          <p>
            This tool simulates 1,000 independent evaluation attempts using your exact win rate, reward-to-risk ratio, and position risk parameters to display an objective histogram distribution of pass, fail, and timeout outcomes.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function ChallengeSimulatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <ChallengeSimulatorContent />
    </Suspense>
  );
}
