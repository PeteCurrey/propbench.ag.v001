"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { LosingStreakTable } from "@/components/calculators/LosingStreakTable";
import { calculateRiskOfRuin, type RiskOfRuinInput } from "@/lib/calc/risk-of-ruin";

const DEFAULT_INPUTS: RiskOfRuinInput = {
  accountBalance: 100000,
  riskPerTradePct: 1,
  maxDrawdownPct: 10,
  winRatePct: 50,
  rewardToRiskRatio: 1.5,
};

const RELATED_TOOLS = [
  { slug: "drawdown-calculator", name: "Drawdown Calculator", description: "Monitor static and trailing drawdown breach limits." },
  { slug: "position-size-calculator", name: "Position Size Calculator", description: "Calculate exact lot sizes for risk management." },
  { slug: "expectancy-calculator", name: "Expectancy Calculator", description: "Calculate trade expectancy and mathematical edge." },
];

function RiskOfRuinCalculatorContent() {
  return (
    <CalculatorShell<RiskOfRuinInput>
      title="Risk of Ruin & Losing Streak Table"
      subtitle="Model the mathematical probability of account breach and inspect a 1 to 20 trade losing streak table."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        accountBalance: Number(params.get("accountBalance")) || DEFAULT_INPUTS.accountBalance,
        riskPerTradePct: Number(params.get("riskPerTradePct")) || DEFAULT_INPUTS.riskPerTradePct,
        maxDrawdownPct: Number(params.get("maxDrawdownPct")) || DEFAULT_INPUTS.maxDrawdownPct,
        winRatePct: Number(params.get("winRatePct")) || DEFAULT_INPUTS.winRatePct,
        rewardToRiskRatio: Number(params.get("rewardToRiskRatio")) || DEFAULT_INPUTS.rewardToRiskRatio,
      })}
      formatSearchParams={(inputs) => ({
        accountBalance: String(inputs.accountBalance),
        riskPerTradePct: String(inputs.riskPerTradePct),
        maxDrawdownPct: String(inputs.maxDrawdownPct),
        winRatePct: String(inputs.winRatePct),
        rewardToRiskRatio: String(inputs.rewardToRiskRatio),
      })}
      validateInputs={(inputs) => {
        if (inputs.accountBalance <= 0) return "Account balance must be greater than zero.";
        if (inputs.riskPerTradePct <= 0 || inputs.riskPerTradePct > 100) return "Risk per trade % must be between 0.1% and 100%.";
        if (inputs.maxDrawdownPct <= 0 || inputs.maxDrawdownPct > 100) return "Max drawdown % must be between 0.1% and 100%.";
        if (inputs.winRatePct <= 0 || inputs.winRatePct >= 100) return "Win rate % must be between 0.1% and 99.9%.";
        if (inputs.rewardToRiskRatio <= 0) return "Reward to risk ratio must be greater than zero.";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <NumberInput
            label="Account Balance ($)"
            value={inputs.accountBalance}
            onChange={(val) => onChange("accountBalance", val)}
            min={1}
          />
          <NumberInput
            label="Risk Per Trade (%)"
            value={inputs.riskPerTradePct}
            onChange={(val) => onChange("riskPerTradePct", val)}
            min={0.1}
            max={100}
            step={0.25}
          />
          <NumberInput
            label="Max Allowed Drawdown (%)"
            value={inputs.maxDrawdownPct}
            onChange={(val) => onChange("maxDrawdownPct", val)}
            min={0.1}
            max={100}
            step={0.5}
          />
          <NumberInput
            label="Historical Win Rate (%)"
            value={inputs.winRatePct}
            onChange={(val) => onChange("winRatePct", val)}
            min={1}
            max={99}
            step={1}
          />
          <NumberInput
            label="Reward-to-Risk Ratio (R:R)"
            value={inputs.rewardToRiskRatio}
            onChange={(val) => onChange("rewardToRiskRatio", val)}
            min={0.1}
            step={0.1}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculateRiskOfRuin(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Risk of Ruin" value={`${res.riskOfRuinPct}%`} />
            <Stat label="Losses to Breach" value={`${res.maxLossesBeforeBreach} consecutive`} />
          </div>
        );
      }}
      renderVisual={(inputs) => {
        const res = calculateRiskOfRuin(inputs);
        if (!res) return null;
        return <LosingStreakTable rows={res.losingStreakTable} />;
      }}
      getAssumptions={(inputs) => [
        { label: "Trade Risk", value: `${inputs.riskPerTradePct}%`, explanation: "Percentage of account risked per trade" },
        { label: "Win Rate & R:R", value: `${inputs.winRatePct}% @ 1:${inputs.rewardToRiskRatio}`, explanation: "Edge parameters" },
        { label: "Drawdown Cap", value: `${inputs.maxDrawdownPct}%`, explanation: "Breach threshold percentage" },
      ]}
      explanationTitle="Understanding Risk of Ruin & Streak Probability"
      explanationText={
        <>
          <p>
            Risk of Ruin is a statistical measure of the probability that a trading strategy will suffer a drawdown large enough to breach an account threshold before reaching a target profit.
          </p>
          <p>
            Even strategies with a positive expected value (such as a 50% win rate with a 1:1.5 reward-to-risk ratio) experience losing streaks due to natural variance.
          </p>
          <p>
            The losing streak table above displays how many consecutive losing trades your account can survive before hitting the firm drawdown limit. Reducing risk per trade from 2% down to 0.5% dramatically increases the number of consecutive losses needed to breach your account.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function RiskOfRuinCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <RiskOfRuinCalculatorContent />
    </Suspense>
  );
}
