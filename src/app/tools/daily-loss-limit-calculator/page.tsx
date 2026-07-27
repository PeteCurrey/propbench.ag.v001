"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { calculateDailyLossLimit, type DailyLossInput } from "@/lib/calc/daily-loss-limit";

const DEFAULT_INPUTS: DailyLossInput = {
  startOfDayBalance: 100000,
  currentEquity: 97500,
  dailyLossPct: 5,
};

const RELATED_TOOLS = [
  { slug: "drawdown-calculator", name: "Drawdown Calculator", description: "Monitor max drawdown breach limits." },
  { slug: "position-size-calculator", name: "Position Size Calculator", description: "Calculate exact lot sizes to stay under daily limits." },
  { slug: "reset-time-converter", name: "Reset Time Converter", description: "Convert daily reset times to local timezone." },
];

function DailyLossLimitCalculatorContent() {
  return (
    <CalculatorShell<DailyLossInput>
      title="Daily Loss Limit Calculator"
      subtitle="Calculate daily drawdown thresholds and remaining loss buffer relative to start-of-day equity."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        startOfDayBalance: Number(params.get("startOfDayBalance")) || DEFAULT_INPUTS.startOfDayBalance,
        currentEquity: Number(params.get("currentEquity")) || DEFAULT_INPUTS.currentEquity,
        dailyLossPct: Number(params.get("dailyLossPct")) || DEFAULT_INPUTS.dailyLossPct,
      })}
      formatSearchParams={(inputs) => ({
        startOfDayBalance: String(inputs.startOfDayBalance),
        currentEquity: String(inputs.currentEquity),
        dailyLossPct: String(inputs.dailyLossPct),
      })}
      validateInputs={(inputs) => {
        if (inputs.startOfDayBalance <= 0) return "Start of day balance must be greater than zero.";
        if (inputs.currentEquity < 0) return "Current equity cannot be negative.";
        if (inputs.dailyLossPct <= 0 || inputs.dailyLossPct > 100) return "Daily loss limit % must be between 0.1% and 100%.";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <NumberInput
            label="Start of Day Balance ($)"
            value={inputs.startOfDayBalance}
            onChange={(val) => onChange("startOfDayBalance", val)}
            min={1}
          />
          <NumberInput
            label="Current Account Equity ($)"
            value={inputs.currentEquity}
            onChange={(val) => onChange("currentEquity", val)}
            min={0}
          />
          <NumberInput
            label="Daily Loss Limit (%)"
            value={inputs.dailyLossPct}
            onChange={(val) => onChange("dailyLossPct", val)}
            min={0.1}
            max={100}
            step={0.5}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculateDailyLossLimit(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Daily Breach Floor" value={`$${res.breachThreshold.toLocaleString()}`} />
            <Stat label="Remaining Buffer" value={`$${res.remainingDailyBuffer.toLocaleString()}`} />
            <Stat label="Current Daily Loss" value={`$${res.currentDailyLoss.toLocaleString()}`} />
          </div>
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Start of Day Balance", value: `$${inputs.startOfDayBalance.toLocaleString()}`, explanation: "Reference balance at 17:00 NY reset" },
        { label: "Daily Loss Limit", value: `${inputs.dailyLossPct}%`, explanation: "Maximum permitted intraday loss" },
      ]}
      explanationTitle="Understanding Daily Loss Limits"
      explanationText={
        <>
          <p>
            The Daily Loss Limit is a hard risk rule enforced by prop trading firms. It resets every trading day (typically at 17:00 New York / Eastern Time).
          </p>
          <p>
            The limit is calculated from your equity or balance at the exact moment of the daily reset. If your equity falls below your calculated daily breach floor at any time during that 24-hour cycle, your account is breached.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function DailyLossLimitCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <DailyLossLimitCalculatorContent />
    </Suspense>
  );
}
