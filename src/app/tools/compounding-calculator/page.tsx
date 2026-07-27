"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { calculateCompounding, type CompoundingInput } from "@/lib/calc/compounding";

const DEFAULT_INPUTS: CompoundingInput = {
  startingBalance: 100000,
  returnPerPeriodPct: 5,
  numberOfPeriods: 12,
  reinvestPct: 80,
};

const RELATED_TOOLS = [
  { slug: "challenge-planner", name: "Challenge Target Planner", description: "Plan short term daily evaluation targets." },
  { slug: "expectancy-calculator", name: "Expectancy Calculator", description: "Calculate trade expectancy and mathematical edge." },
  { slug: "payout-projector", name: "Payout Projector", description: "Calculate net payout splits after fees." },
];

function CompoundingCalculatorContent() {
  return (
    <CalculatorShell<CompoundingInput>
      title="Compounding Growth Simulator"
      subtitle="Project multi-period equity compounding with configurable reinvestment vs withdrawal splits."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        startingBalance: Number(params.get("startingBalance")) || DEFAULT_INPUTS.startingBalance,
        returnPerPeriodPct: Number(params.get("returnPerPeriodPct")) || DEFAULT_INPUTS.returnPerPeriodPct,
        numberOfPeriods: Number(params.get("numberOfPeriods")) || DEFAULT_INPUTS.numberOfPeriods,
        reinvestPct: Number(params.get("reinvestPct")) || DEFAULT_INPUTS.reinvestPct,
      })}
      formatSearchParams={(inputs) => ({
        startingBalance: String(inputs.startingBalance),
        returnPerPeriodPct: String(inputs.returnPerPeriodPct),
        numberOfPeriods: String(inputs.numberOfPeriods),
        reinvestPct: String(inputs.reinvestPct),
      })}
      validateInputs={(inputs) => {
        if (inputs.startingBalance <= 0) return "Starting balance must be greater than zero.";
        if (inputs.numberOfPeriods <= 0 || inputs.numberOfPeriods > 365) return "Number of periods must be between 1 and 365.";
        if ((inputs.reinvestPct ?? 100) < 0 || (inputs.reinvestPct ?? 100) > 100) return "Reinvestment % must be between 0% and 100%.";
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
            label="Return Per Period (%)"
            value={inputs.returnPerPeriodPct}
            onChange={(val) => onChange("returnPerPeriodPct", val)}
            step={0.5}
          />
          <NumberInput
            label="Number of Periods (e.g. months)"
            value={inputs.numberOfPeriods}
            onChange={(val) => onChange("numberOfPeriods", val)}
            min={1}
            max={365}
          />
          <NumberInput
            label="Reinvestment Percentage (%)"
            value={inputs.reinvestPct ?? 100}
            onChange={(val) => onChange("reinvestPct", val)}
            min={0}
            max={100}
            step={5}
            helperText="100% = full compounding; <100% simulates partial profit withdrawals"
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculateCompounding(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Final Balance" value={`$${res.finalBalance.toLocaleString()}`} />
            <Stat label="Total Profit" value={`$${res.totalProfit.toLocaleString()}`} />
            <Stat label="Total Withdrawn" value={`$${res.totalWithdrawn.toLocaleString()}`} />
          </div>
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Starting Capital", value: `$${inputs.startingBalance.toLocaleString()}`, explanation: "Base capital" },
        { label: "Periodic Return", value: `${inputs.returnPerPeriodPct}%`, explanation: "Assumed growth rate per period" },
        { label: "Reinvestment Rate", value: `${inputs.reinvestPct}%`, explanation: "Percentage of profit reinvested" },
      ]}
      explanationTitle="Compounding & Reinvestment Dynamics"
      explanationText={
        <>
          <p>
            Compounding allows trading profits to generate exponential account growth over multiple periods.
          </p>
          <p>
            In prop trading scaling plans, reinvesting a portion of your profits increases your account size, which in turn expands your absolute dollar drawdown allowance.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function CompoundingCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <CompoundingCalculatorContent />
    </Suspense>
  );
}
