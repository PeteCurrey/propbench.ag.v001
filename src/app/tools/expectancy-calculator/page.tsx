"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { calculateExpectancy, type ExpectancyInput } from "@/lib/calc/expectancy";

const DEFAULT_INPUTS: ExpectancyInput = {
  winRatePct: 55,
  avgWinAmount: 300,
  avgLossAmount: 200,
};

const RELATED_TOOLS = [
  { slug: "challenge-planner", name: "Challenge Target Planner", description: "Plan daily targets to hit evaluation goals." },
  { slug: "risk-of-ruin-calculator", name: "Risk of Ruin Calculator", description: "Calculate breach risk based on your edge." },
  { slug: "compounding-calculator", name: "Compounding Growth Simulator", description: "Project long term returns from positive expectancy." },
];

function ExpectancyCalculatorContent() {
  return (
    <CalculatorShell<ExpectancyInput>
      title="Trade Expectancy Calculator"
      subtitle="Calculate your mathematical edge per trade and projected return over 100 executed trades."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        winRatePct: Number(params.get("winRatePct")) || DEFAULT_INPUTS.winRatePct,
        avgWinAmount: Number(params.get("avgWinAmount")) || DEFAULT_INPUTS.avgWinAmount,
        avgLossAmount: Number(params.get("avgLossAmount")) || DEFAULT_INPUTS.avgLossAmount,
      })}
      formatSearchParams={(inputs) => ({
        winRatePct: String(inputs.winRatePct),
        avgWinAmount: String(inputs.avgWinAmount),
        avgLossAmount: String(inputs.avgLossAmount),
      })}
      validateInputs={(inputs) => {
        if (inputs.winRatePct <= 0 || inputs.winRatePct >= 100) return "Win rate must be between 0.1% and 99.9%.";
        if (inputs.avgWinAmount <= 0) return "Average win amount must be greater than zero.";
        if (inputs.avgLossAmount <= 0) return "Average loss amount must be greater than zero.";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <NumberInput
            label="Win Rate (%)"
            value={inputs.winRatePct}
            onChange={(val) => onChange("winRatePct", val)}
            min={1}
            max={99}
            step={1}
          />
          <NumberInput
            label="Average Win Amount ($)"
            value={inputs.avgWinAmount}
            onChange={(val) => onChange("avgWinAmount", val)}
            min={1}
          />
          <NumberInput
            label="Average Loss Amount ($)"
            value={inputs.avgLossAmount}
            onChange={(val) => onChange("avgLossAmount", val)}
            min={1}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculateExpectancy(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Expectancy per Trade" value={`$${res.expectedValuePerTrade.toFixed(2)}`} />
            <Stat label="Reward:Risk Ratio" value={`1:${res.rewardToRiskRatio}`} />
            <Stat label="Est. Return / 100 Trades" value={`$${res.expectedProfit100Trades.toLocaleString()}`} />
          </div>
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Win Rate", value: `${inputs.winRatePct}%`, explanation: "Percentage of winning trades" },
        { label: "Average Winner", value: `$${inputs.avgWinAmount}`, explanation: "Mean dollar profit on winning trade" },
        { label: "Average Loser", value: `$${inputs.avgLossAmount}`, explanation: "Mean dollar loss on losing trade" },
      ]}
      explanationTitle="Understanding Mathematical Expectancy (Edge)"
      explanationText={
        <>
          <p>
            Expectancy represents the average dollar amount you expect to win or lose per trade over a large sample size.
          </p>
          <p>
            The mathematical formula for expectancy is:
            <br />
            <code>EV = (Win Rate × Average Win) - (Loss Rate × Average Loss)</code>
          </p>
          <p>
            A positive expectancy indicates a true mathematical edge. Knowing your expectancy allows you to evaluate whether a strategy can comfortably pass a prop firm challenge without over-leveraging.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function ExpectancyCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <ExpectancyCalculatorContent />
    </Suspense>
  );
}
