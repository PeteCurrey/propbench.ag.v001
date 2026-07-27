"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { PositionSizeHighlight } from "@/components/calculators/PositionSizeHighlight";
import { calculateLotSize, type LotSizeInput } from "@/lib/calc/lot-size";

const DEFAULT_INPUTS: LotSizeInput = {
  accountBalance: 100000,
  riskAmountOrPct: 500, // $500 cash risk
  isPercentage: false,
  stopLossPips: 25,
  pipValuePerLot: 10,
};

const RELATED_TOOLS = [
  { slug: "position-size-calculator", name: "Position Size Calculator", description: "Calculate lot sizes using percentage risk budget." },
  { slug: "pip-value-calculator", name: "Pip Value Calculator", description: "Determine pip values across different currency pairs." },
  { slug: "drawdown-calculator", name: "Drawdown Calculator", description: "Verify lot risk against drawdown thresholds." },
];

function LotSizeCalculatorContent() {
  return (
    <CalculatorShell<LotSizeInput>
      title="Lot Size & Risk Calculator"
      subtitle="Compute exact position lot sizes given a fixed dollar cash risk or fixed percentage risk."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        accountBalance: Number(params.get("accountBalance")) || DEFAULT_INPUTS.accountBalance,
        riskAmountOrPct: Number(params.get("riskAmountOrPct")) || DEFAULT_INPUTS.riskAmountOrPct,
        isPercentage: params.get("isPercentage") === "true",
        stopLossPips: Number(params.get("stopLossPips")) || DEFAULT_INPUTS.stopLossPips,
        pipValuePerLot: Number(params.get("pipValuePerLot")) || DEFAULT_INPUTS.pipValuePerLot,
      })}
      formatSearchParams={(inputs) => ({
        accountBalance: String(inputs.accountBalance),
        riskAmountOrPct: String(inputs.riskAmountOrPct),
        isPercentage: String(inputs.isPercentage),
        stopLossPips: String(inputs.stopLossPips),
        pipValuePerLot: String(inputs.pipValuePerLot),
      })}
      validateInputs={(inputs) => {
        if (inputs.accountBalance <= 0) return "Account balance must be greater than zero.";
        if (inputs.riskAmountOrPct <= 0) return "Risk amount must be greater than zero.";
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
            label="Dollar Cash Risk ($)"
            value={inputs.riskAmountOrPct}
            onChange={(val) => onChange("riskAmountOrPct", val)}
            min={1}
          />
          <NumberInput
            label="Stop Loss Distance (Pips)"
            value={inputs.stopLossPips}
            onChange={(val) => onChange("stopLossPips", val)}
            min={1}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculateLotSize(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Recommended Lots" value={`${res.recommendedLots}`} />
            <Stat label="Cash at Risk" value={`$${res.cashAtRisk.toLocaleString()}`} />
            <Stat label="Account Risk" value={`${res.riskPctOfAccount}%`} />
          </div>
        );
      }}
      renderVisual={(inputs) => {
        const res = calculateLotSize(inputs);
        if (!res) return null;
        return (
          <PositionSizeHighlight
            result={{
              cashAtRisk: res.cashAtRisk,
              positionSizeLots: res.recommendedLots,
              totalUnits: Math.round(res.recommendedLots * 100000),
              riskPerPip: Number((res.cashAtRisk / inputs.stopLossPips).toFixed(2)),
            }}
          />
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Account Size", value: `$${inputs.accountBalance.toLocaleString()}`, explanation: "Total account capital" },
        { label: "Fixed Cash Risk", value: `$${inputs.riskAmountOrPct}`, explanation: "Fixed cash amount at risk" },
        { label: "Stop Loss", value: `${inputs.stopLossPips} pips`, explanation: "Distance to stop loss level" },
      ]}
      explanationTitle="Fixed Cash Risk vs Percentage Risk"
      explanationText={
        <>
          <p>
            Traders can calculate position size either from a fixed percentage of equity (e.g. 1%) or a fixed dollar cash amount (e.g. $500 per trade).
          </p>
          <p>
            This lot size calculator takes your specified dollar risk and stop loss distance to return the exact standard lot volume to execute in your platform.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function LotSizeCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <LotSizeCalculatorContent />
    </Suspense>
  );
}
