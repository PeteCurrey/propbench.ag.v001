"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { calculatePayoutProjector, type PayoutProjectorInput } from "@/lib/calc/payout-projector";

const DEFAULT_INPUTS: PayoutProjectorInput = {
  grossProfit: 5000,
  profitSplitPct: 80,
  feeDeductions: 50,
};

const RELATED_TOOLS = [
  { slug: "consistency-rule-checker", name: "Consistency Rule Checker", description: "Verify best day profit cap rules." },
  { slug: "compounding-calculator", name: "Compounding Growth Simulator", description: "Simulate multi-period profit reinvestment." },
  { slug: "challenge-planner", name: "Challenge Target Planner", description: "Plan targets to reach payout thresholds." },
];

function PayoutProjectorContent() {
  return (
    <CalculatorShell<PayoutProjectorInput>
      title="Payout & Profit Split Calculator"
      subtitle="Calculate net profit split allocations and fee adjustments in pure educational framing."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        grossProfit: Number(params.get("grossProfit")) || DEFAULT_INPUTS.grossProfit,
        profitSplitPct: Number(params.get("profitSplitPct")) || DEFAULT_INPUTS.profitSplitPct,
        feeDeductions: Number(params.get("feeDeductions")) || DEFAULT_INPUTS.feeDeductions,
      })}
      formatSearchParams={(inputs) => ({
        grossProfit: String(inputs.grossProfit),
        profitSplitPct: String(inputs.profitSplitPct),
        feeDeductions: String(inputs.feeDeductions ?? 0),
      })}
      validateInputs={(inputs) => {
        if (inputs.grossProfit <= 0) return "Gross profit must be greater than zero.";
        if (inputs.profitSplitPct <= 0 || inputs.profitSplitPct > 100) return "Profit split % must be between 1% and 100%.";
        if ((inputs.feeDeductions ?? 0) < 0) return "Fee deductions cannot be negative.";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <NumberInput
            label="Gross Profit Generated ($)"
            value={inputs.grossProfit}
            onChange={(val) => onChange("grossProfit", val)}
            min={1}
          />
          <NumberInput
            label="Trader Profit Split (%)"
            value={inputs.profitSplitPct}
            onChange={(val) => onChange("profitSplitPct", val)}
            min={1}
            max={100}
            step={5}
          />
          <NumberInput
            label="Wire / Processing Fee Deductions ($)"
            value={inputs.feeDeductions ?? 0}
            onChange={(val) => onChange("feeDeductions", val)}
            min={0}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculatePayoutProjector(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Trader Share" value={`$${res.traderShare.toLocaleString()}`} />
            <Stat label="Net Payout" value={`$${res.netPayout.toLocaleString()}`} />
            <Stat label="Effective Split" value={`${res.effectiveSplitPct.toFixed(1)}%`} />
          </div>
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Gross Profit", value: `$${inputs.grossProfit.toLocaleString()}`, explanation: "Total account gain" },
        { label: "Contractual Split", value: `${inputs.profitSplitPct}%`, explanation: "Trader's percentage share" },
        { label: "Fee Deductions", value: `$${inputs.feeDeductions ?? 0}`, explanation: "Wire & transaction fees" },
      ]}
      explanationTitle="Understanding Profit Split Mechanics"
      explanationText={
        <>
          <p>
            Proprietary trading firms allocate a percentage of profits to funded traders according to their contractual profit split (typically 80% to 90%).
          </p>
          <p>
            This calculator provides a mathematical breakdown of gross profit, trader allocation, firm share, and net received funds after processing fee deductions.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function PayoutProjectorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <PayoutProjectorContent />
    </Suspense>
  );
}
