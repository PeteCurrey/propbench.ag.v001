"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { ChallengePlannerChart } from "@/components/calculators/ChallengePlannerChart";
import { calculateChallengePlan, type ChallengePlanInput } from "@/lib/calc/challenge-planner";

const DEFAULT_INPUTS: ChallengePlanInput = {
  startingBalance: 100000,
  targetProfitPct: 10,
  tradingDays: 10,
};

const RELATED_TOOLS = [
  { slug: "challenge-simulator", name: "Challenge Simulator", description: "Run Monte Carlo simulations of your challenge pass probability." },
  { slug: "expectancy-calculator", name: "Expectancy Calculator", description: "Calculate expected profit over 100 executed trades." },
  { slug: "position-size-calculator", name: "Position Size Calculator", description: "Size your trades to meet daily profit targets safely." },
];

function ChallengePlannerContent() {
  return (
    <CalculatorShell<ChallengePlanInput>
      title="Challenge Target Planner"
      subtitle="Calculate daily profit targets and plot a projected day-by-day equity line over your evaluation period."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        startingBalance: Number(params.get("startingBalance")) || DEFAULT_INPUTS.startingBalance,
        targetProfitPct: Number(params.get("targetProfitPct")) || DEFAULT_INPUTS.targetProfitPct,
        tradingDays: Number(params.get("tradingDays")) || DEFAULT_INPUTS.tradingDays,
      })}
      formatSearchParams={(inputs) => ({
        startingBalance: String(inputs.startingBalance),
        targetProfitPct: String(inputs.targetProfitPct),
        tradingDays: String(inputs.tradingDays),
      })}
      validateInputs={(inputs) => {
        if (inputs.startingBalance <= 0) return "Starting balance must be greater than zero.";
        if (inputs.targetProfitPct <= 0) return "Target profit percentage must be greater than zero.";
        if (inputs.tradingDays <= 0) return "Trading days must be at least 1 day.";
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
            min={0.1}
            max={100}
            step={1}
          />
          <NumberInput
            label="Available Trading Days"
            value={inputs.tradingDays}
            onChange={(val) => onChange("tradingDays", val)}
            min={1}
            max={120}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculateChallengePlan(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Target Profit ($)" value={`+$${res.targetProfitAmount.toLocaleString()}`} />
            <Stat label="Target Daily Profit" value={`+$${res.targetDailyProfit.toLocaleString()}`} />
            <Stat label="Daily Target (%)" value={`+${res.dailyTargetPct}%`} />
          </div>
        );
      }}
      renderVisual={(inputs) => {
        const res = calculateChallengePlan(inputs);
        if (!res) return null;
        return <ChallengePlannerChart result={res} />;
      }}
      getAssumptions={(inputs) => [
        { label: "Account Size", value: `$${inputs.startingBalance.toLocaleString()}`, explanation: "Evaluation starting capital" },
        { label: "Evaluation Target", value: `${inputs.targetProfitPct}%`, explanation: "Required profit target to pass phase" },
        { label: "Target Days", value: `${inputs.tradingDays} days`, explanation: "Days allocated to achieve target" },
      ]}
      explanationTitle="Structuring Your Prop Challenge Progress"
      explanationText={
        <>
          <p>
            Passing a prop firm evaluation requires breaking down a high-level profit target (such as 8% or 10%) into manageable daily expectations.
          </p>
          <p>
            By dividing the total profit target by your planned trading days, this tool calculates the steady daily profit pace needed to hit your goal without over-leveraging.
          </p>
          <p>
            Aiming for smaller, consistent daily returns significantly reduces emotional pressure and keeps daily drawdowns well within firm limits.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function ChallengePlannerPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <ChallengePlannerContent />
    </Suspense>
  );
}
