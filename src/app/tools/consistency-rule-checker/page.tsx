"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { calculateConsistencyRule, type ConsistencyRuleInput } from "@/lib/calc/consistency-rule";

const DEFAULT_INPUTS: ConsistencyRuleInput = {
  totalProfit: 10000,
  bestDayProfit: 4500,
  consistencyCapPct: 40,
};

const RELATED_TOOLS = [
  { slug: "challenge-planner", name: "Challenge Target Planner", description: "Plan consistent daily targets." },
  { slug: "payout-projector", name: "Payout Projector", description: "Calculate net payout splits." },
  { slug: "daily-loss-limit-calculator", name: "Daily Loss Limit Calculator", description: "Monitor daily loss limits." },
];

function ConsistencyRuleCheckerContent() {
  return (
    <CalculatorShell<ConsistencyRuleInput>
      title="Consistency Rule Checker"
      subtitle="Verify whether your single best trading day complies with prop firm single-day profit cap rules."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        totalProfit: Number(params.get("totalProfit")) || DEFAULT_INPUTS.totalProfit,
        bestDayProfit: Number(params.get("bestDayProfit")) || DEFAULT_INPUTS.bestDayProfit,
        consistencyCapPct: Number(params.get("consistencyCapPct")) || DEFAULT_INPUTS.consistencyCapPct,
      })}
      formatSearchParams={(inputs) => ({
        totalProfit: String(inputs.totalProfit),
        bestDayProfit: String(inputs.bestDayProfit),
        consistencyCapPct: String(inputs.consistencyCapPct),
      })}
      validateInputs={(inputs) => {
        if (inputs.totalProfit <= 0) return "Total profit must be greater than zero.";
        if (inputs.bestDayProfit < 0) return "Best day profit cannot be negative.";
        if (inputs.consistencyCapPct <= 0 || inputs.consistencyCapPct > 100)
          return "Consistency cap % must be between 1% and 100%.";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <NumberInput
            label="Total Profit Earned ($)"
            value={inputs.totalProfit}
            onChange={(val) => onChange("totalProfit", val)}
            min={1}
          />
          <NumberInput
            label="Single Best Day Profit ($)"
            value={inputs.bestDayProfit}
            onChange={(val) => onChange("bestDayProfit", val)}
            min={0}
          />
          <NumberInput
            label="Firm Consistency Cap (%)"
            value={inputs.consistencyCapPct}
            onChange={(val) => onChange("consistencyCapPct", val)}
            min={1}
            max={100}
            step={5}
            helperText="Standard firm cap is typically 30%, 40%, or 50%"
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculateConsistencyRule(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat
              label="Compliance Status"
              value={res.isCompliant ? "COMPLIANT" : "NON-COMPLIANT"}
            />
            <Stat label="Best Day %" value={`${res.actualBestDayPct}%`} />
            <Stat label="Max Allowed" value={`$${res.maxAllowedBestDayProfit.toLocaleString()}`} />
          </div>
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Total Profit", value: `$${inputs.totalProfit.toLocaleString()}`, explanation: "Cumulative account profit" },
        { label: "Best Day Profit", value: `$${inputs.bestDayProfit.toLocaleString()}`, explanation: "Single day maximum gain" },
        { label: "Firm Cap Rule", value: `${inputs.consistencyCapPct}%`, explanation: "Maximum single-day profit share allowed" },
      ]}
      explanationTitle="Understanding Prop Firm Consistency Rules"
      explanationText={
        <>
          <p>
            Many prop trading firms enforce a <strong>Consistency Rule</strong> to prevent traders from passing evaluations or requesting payouts through a single lucky or over-leveraged trade.
          </p>
          <p>
            For example, under a 40% consistency rule, no single trading day can account for more than 40% of your total generated profit. If your best day is $4,500 out of a $10,000 total profit (45%), you are non-compliant until you generate additional profit on other trading days to lower that percentage.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function ConsistencyRuleCheckerPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <ConsistencyRuleCheckerContent />
    </Suspense>
  );
}
