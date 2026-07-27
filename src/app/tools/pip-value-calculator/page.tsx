"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { Input } from "@/components/ui/Input";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { calculatePipValue, type PipValueInput } from "@/lib/calc/pip-value";

const DEFAULT_INPUTS: PipValueInput = {
  instrument: "EURUSD",
  tradeSizeLots: 1.0,
  accountCurrency: "USD",
};

const RELATED_TOOLS = [
  { slug: "position-size-calculator", name: "Position Size Calculator", description: "Size your position based on calculated pip value." },
  { slug: "lot-size-calculator", name: "Lot Size Calculator", description: "Convert cash risk into exact recommended lot sizes." },
  { slug: "drawdown-calculator", name: "Drawdown Calculator", description: "Monitor drawdown limits relative to pip risk." },
];

function PipValueCalculatorContent() {
  return (
    <CalculatorShell<PipValueInput>
      title="Pip Value Calculator"
      subtitle="Calculate exact cash value per pip for various forex currency pairs, metals, and lot sizes."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        instrument: params.get("instrument") || DEFAULT_INPUTS.instrument,
        tradeSizeLots: Number(params.get("tradeSizeLots")) || DEFAULT_INPUTS.tradeSizeLots,
        accountCurrency: (params.get("accountCurrency") as "USD") || DEFAULT_INPUTS.accountCurrency,
      })}
      formatSearchParams={(inputs) => ({
        instrument: inputs.instrument,
        tradeSizeLots: String(inputs.tradeSizeLots),
        accountCurrency: inputs.accountCurrency || "USD",
      })}
      validateInputs={(inputs) => {
        if (!inputs.instrument || inputs.instrument.trim().length === 0) return "Please enter a valid instrument symbol.";
        if (inputs.tradeSizeLots <= 0) return "Trade size in lots must be greater than zero.";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <Input
            label="Trading Instrument"
            value={inputs.instrument}
            onChange={(e) => onChange("instrument", e.target.value)}
            placeholder="e.g. EURUSD, GBPUSD, XAUUSD, USDJPY"
          />
          <NumberInput
            label="Position Size (Standard Lots)"
            value={inputs.tradeSizeLots}
            onChange={(val) => onChange("tradeSizeLots", val)}
            min={0.01}
            step={0.1}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculatePipValue(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Pip Value" value={`$${res.pipValue.toFixed(2)}`} />
            <Stat label="1 Lot Pip Value" value={`$${res.oneLotPipValue.toFixed(2)}`} />
            <Stat label="Pip Size" value={`${res.pipSize}`} />
          </div>
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Instrument", value: inputs.instrument.toUpperCase(), explanation: "Target trading pair or commodity" },
        { label: "Volume", value: `${inputs.tradeSizeLots} standard lots`, explanation: "Traded volume size" },
      ]}
      explanationTitle="How Pip Value Belongs in Risk Calculations"
      explanationText={
        <>
          <p>
            A pip (point in percentage) measures price movement in currency pairs. For standard forex pairs with USD as the quote currency (such as EURUSD or GBPUSD), one standard lot (100,000 units) has a pip value of exactly $10.00.
          </p>
          <p>
            For pairs involving the Japanese Yen (JPY) or gold (XAUUSD), pip sizes and contract unit multipliers vary. Calculating pip value accurately ensures your stop loss distance converts into the correct dollar risk.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function PipValueCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <PipValueCalculatorContent />
    </Suspense>
  );
}
