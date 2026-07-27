"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { PositionSizeHighlight } from "@/components/calculators/PositionSizeHighlight";
import { calculatePositionSize, type PositionSizeInput } from "@/lib/calc/position-size";

const DEFAULT_INPUTS: PositionSizeInput = {
  accountBalance: 100000,
  riskPct: 1,
  stopLossPips: 20,
  pipValuePerLot: 10,
};

const RELATED_TOOLS = [
  { slug: "drawdown-calculator", name: "Drawdown Calculator", description: "Verify your position size won't breach your remaining buffer." },
  { slug: "lot-size-calculator", name: "Lot Size Calculator", description: "Calculate exact lot sizes from fixed dollar risk amounts." },
  { slug: "pip-value-calculator", name: "Pip Value Calculator", description: "Calculate exact pip values across different currency pairs." },
];

function PositionSizeCalculatorContent() {
  return (
    <CalculatorShell<PositionSizeInput>
      title="Position Size Calculator"
      subtitle="Determine recommended position lot sizes and cash-at-risk based on account balance and stop loss distance."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        accountBalance: Number(params.get("accountBalance")) || DEFAULT_INPUTS.accountBalance,
        riskPct: Number(params.get("riskPct")) || DEFAULT_INPUTS.riskPct,
        stopLossPips: Number(params.get("stopLossPips")) || DEFAULT_INPUTS.stopLossPips,
        pipValuePerLot: Number(params.get("pipValuePerLot")) || DEFAULT_INPUTS.pipValuePerLot,
      })}
      formatSearchParams={(inputs) => ({
        accountBalance: String(inputs.accountBalance),
        riskPct: String(inputs.riskPct),
        stopLossPips: String(inputs.stopLossPips),
        pipValuePerLot: String(inputs.pipValuePerLot),
      })}
      validateInputs={(inputs) => {
        if (inputs.accountBalance <= 0) return "Account balance must be greater than zero.";
        if (inputs.riskPct <= 0 || inputs.riskPct > 100) return "Risk percentage must be between 0.1% and 100%.";
        if (inputs.stopLossPips <= 0) return "Stop loss pips must be greater than zero.";
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
            value={inputs.riskPct}
            onChange={(val) => onChange("riskPct", val)}
            min={0.1}
            max={100}
            step={0.25}
          />
          <NumberInput
            label="Stop Loss Distance (Pips)"
            value={inputs.stopLossPips}
            onChange={(val) => onChange("stopLossPips", val)}
            min={1}
          />
          <NumberInput
            label="Pip Value Per Standard Lot ($)"
            value={inputs.pipValuePerLot ?? 10}
            onChange={(val) => onChange("pipValuePerLot", val)}
            min={0.1}
            helperText="Standard Forex pairs (USD quote) = $10 / pip / lot"
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculatePositionSize(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Cash at Risk" value={`$${res.cashAtRisk.toLocaleString()}`} />
            <Stat label="Recommended Lots" value={`${res.positionSizeLots}`} />
            <Stat label="Risk per Pip" value={`$${res.riskPerPip.toFixed(2)}`} />
          </div>
        );
      }}
      renderVisual={(inputs) => {
        const res = calculatePositionSize(inputs);
        if (!res) return null;
        return <PositionSizeHighlight result={res} />;
      }}
      getAssumptions={(inputs) => [
        { label: "Account Size", value: `$${inputs.accountBalance.toLocaleString()}`, explanation: "Total account capital" },
        { label: "Risk Budget", value: `${inputs.riskPct}%`, explanation: "Percentage of capital risked on this trade" },
        { label: "Stop Loss", value: `${inputs.stopLossPips} pips`, explanation: "Distance to stop loss level" },
      ]}
      explanationTitle="Managing Risk with Position Sizing"
      explanationText={
        <>
          <p>
            Proper position sizing is the core foundation of risk management in prop firm trading. Rather than trading fixed lot sizes, professional traders calculate lot size dynamically based on account balance and stop loss distance.
          </p>
          <p>
            This calculator converts your percentage risk budget into an exact dollar amount, then divides by your stop loss distance to yield the precise standard lot size required.
          </p>
          <p>
            Keeping risk per trade to 0.5% – 1.0% helps ensure that even an unexpected series of consecutive losses will not breach daily or max drawdown limits.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function PositionSizeCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <PositionSizeCalculatorContent />
    </Suspense>
  );
}
