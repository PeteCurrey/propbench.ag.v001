"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NumberInput } from "@/components/ui/NumberInput";
import { Select } from "@/components/ui/Select";
import { Stat } from "@/components/ui/Stat";
import { DrawdownZoneBar } from "@/components/calculators/DrawdownZoneBar";
import { calculateDrawdown, type DrawdownInput, type DrawdownType } from "@/lib/calc/drawdown";

const DEFAULT_INPUTS: DrawdownInput = {
  initialBalance: 100000,
  currentBalance: 98000,
  highWaterMark: 105000,
  maxDrawdownPct: 10,
  drawdownType: "static",
};

const RELATED_TOOLS = [
  { slug: "position-size-calculator", name: "Position Size Calculator", description: "Calculate exact lot sizes to protect your drawdown buffer." },
  { slug: "daily-loss-limit-calculator", name: "Daily Loss Limit Calculator", description: "Monitor daily loss limits relative to start-of-day equity." },
  { slug: "risk-of-ruin-calculator", name: "Risk of Ruin Calculator", description: "Model the probability of hitting your breach floor." },
];

function DrawdownCalculatorContent() {
  return (
    <CalculatorShell<DrawdownInput>
      title="Drawdown & Breach Floor Visualizer"
      subtitle="Calculate static and trailing drawdown breach limits, remaining equity buffer, and zone safety status."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        initialBalance: Number(params.get("initialBalance")) || DEFAULT_INPUTS.initialBalance,
        currentBalance: Number(params.get("currentBalance")) || DEFAULT_INPUTS.currentBalance,
        highWaterMark: Number(params.get("highWaterMark")) || DEFAULT_INPUTS.highWaterMark,
        maxDrawdownPct: Number(params.get("maxDrawdownPct")) || DEFAULT_INPUTS.maxDrawdownPct,
        drawdownType: (params.get("drawdownType") as DrawdownType) || DEFAULT_INPUTS.drawdownType,
      })}
      formatSearchParams={(inputs) => ({
        initialBalance: String(inputs.initialBalance),
        currentBalance: String(inputs.currentBalance),
        highWaterMark: String(inputs.highWaterMark),
        maxDrawdownPct: String(inputs.maxDrawdownPct),
        drawdownType: inputs.drawdownType,
      })}
      validateInputs={(inputs) => {
        if (inputs.initialBalance <= 0) return "Initial balance must be greater than zero.";
        if (inputs.currentBalance < 0) return "Current balance cannot be negative.";
        if (inputs.maxDrawdownPct <= 0 || inputs.maxDrawdownPct > 100)
          return "Max drawdown percentage must be between 0.1% and 100%.";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <NumberInput
            label="Initial Account Balance ($)"
            value={inputs.initialBalance}
            onChange={(val) => onChange("initialBalance", val)}
            min={1}
          />
          <NumberInput
            label="Current Account Equity ($)"
            value={inputs.currentBalance}
            onChange={(val) => onChange("currentBalance", val)}
            min={0}
          />
          <NumberInput
            label="Peak High Water Mark ($)"
            value={inputs.highWaterMark}
            onChange={(val) => onChange("highWaterMark", val)}
            min={1}
            helperText="Used when trailing drawdown is active"
          />
          <NumberInput
            label="Max Drawdown Allowance (%)"
            value={inputs.maxDrawdownPct}
            onChange={(val) => onChange("maxDrawdownPct", val)}
            min={0.1}
            max={100}
            step={0.5}
          />
          <Select
            label="Drawdown Type"
            value={inputs.drawdownType}
            onChange={(val) => onChange("drawdownType", val as DrawdownType)}
            options={[
              { value: "static", label: "Static (Fixed to Initial Balance)" },
              { value: "trailing_intraday", label: "Trailing Intraday (High Water Mark)" },
              { value: "trailing_eod", label: "Trailing End-of-Day (EOD Peak)" },
            ]}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = calculateDrawdown(inputs);
        if (!res) return null;

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Breach Floor" value={`$${res.breachFloor.toLocaleString()}`} />
            <Stat label="Remaining Buffer" value={`$${res.remainingBuffer.toLocaleString()}`} />
            <Stat label="Current Drawdown" value={`${res.currentDrawdownPct.toFixed(2)}%`} />
          </div>
        );
      }}
      renderVisual={(inputs) => {
        const res = calculateDrawdown(inputs);
        if (!res) return null;
        return (
          <DrawdownZoneBar
            result={res}
            drawdownType={inputs.drawdownType}
            initialBalance={inputs.initialBalance}
            highWaterMark={inputs.highWaterMark}
            currentBalance={inputs.currentBalance}
          />
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Reference Capital", value: `$${inputs.initialBalance.toLocaleString()}`, explanation: "Base capital used for calculation" },
        { label: "Drawdown Calculation Mode", value: inputs.drawdownType, explanation: "Static fixed vs trailing peak floor" },
        { label: "Max Loss Allowance", value: `${inputs.maxDrawdownPct}%`, explanation: "Maximum permitted drawdown before breach" },
      ]}
      explanationTitle="Understanding Prop Firm Drawdown Rules"
      explanationText={
        <>
          <p>
            Drawdown limits are the single most critical constraint on prop trading evaluation accounts. Prop firms generally enforce two distinct drawdown models: static drawdowns and trailing drawdowns.
          </p>
          <p>
            A <strong>Static Drawdown</strong> locks the breach floor to a fixed percentage of your starting balance. For example, a 10% static limit on a $100,000 account sets your termination floor at $90,000 indefinitely, regardless of profit earned.
          </p>
          <p>
            A <strong>Trailing Drawdown</strong> moves the breach floor upwards as your high water mark rises. If your equity climbs to $110,000 on a 10% trailing rule, your new breach floor rises to $99,000. Toggling between static and trailing modes above visibly demonstrates how trailing floors lock in risk as profits increase.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function DrawdownCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <DrawdownCalculatorContent />
    </Suspense>
  );
}
