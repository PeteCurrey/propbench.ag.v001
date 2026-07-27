"use client";

import React, { Suspense } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResetClockDisplay } from "@/components/calculators/ResetClockDisplay";
import { convertResetTime, type ResetTimeInput } from "@/lib/calc/reset-time";

const DEFAULT_INPUTS: ResetTimeInput = {
  firmResetTime: "17:00",
  firmTimezone: "America/New_York",
  userTimezone: "Europe/London",
};

const RELATED_TOOLS = [
  { slug: "daily-loss-limit-calculator", name: "Daily Loss Limit Calculator", description: "Calculate remaining daily loss buffers." },
  { slug: "drawdown-calculator", name: "Drawdown Calculator", description: "Monitor static vs trailing breach floors." },
  { slug: "consistency-rule-checker", name: "Consistency Rule Checker", description: "Check single-day profit cap rules." },
];

function ResetTimeConverterContent() {
  return (
    <CalculatorShell<ResetTimeInput>
      title="Daily Reset Time Converter"
      subtitle="Convert a firm's daily reset time and timezone into your local time, with a live countdown clock showing time remaining until reset."
      defaultInputs={DEFAULT_INPUTS}
      parseInputs={(params) => ({
        firmResetTime: params.get("firmResetTime") || DEFAULT_INPUTS.firmResetTime,
        firmTimezone: params.get("firmTimezone") || DEFAULT_INPUTS.firmTimezone,
        userTimezone: params.get("userTimezone") || DEFAULT_INPUTS.userTimezone,
      })}
      formatSearchParams={(inputs) => ({
        firmResetTime: inputs.firmResetTime,
        firmTimezone: inputs.firmTimezone,
        userTimezone: inputs.userTimezone || "Europe/London",
      })}
      validateInputs={(inputs) => {
        if (!/^\d{2}:\d{2}$/.test(inputs.firmResetTime)) return "Please enter reset time in HH:MM format (e.g. 17:00).";
        return null;
      }}
      renderInputPanel={(inputs, onChange) => (
        <div className="space-y-4">
          <Input
            label="Firm Reset Time (HH:MM)"
            value={inputs.firmResetTime}
            onChange={(e) => onChange("firmResetTime", e.target.value)}
            placeholder="17:00"
          />
          <Select
            label="Firm Timezone"
            value={inputs.firmTimezone}
            onChange={(val) => onChange("firmTimezone", val)}
            options={[
              { value: "America/New_York", label: "Eastern Time (New York / 17:00 standard)" },
              { value: "Europe/London", label: "London / GMT / BST" },
              { value: "Europe/Prague", label: "Central European Time (CET/CEST - FTMO)" },
              { value: "Asia/Tokyo", label: "Tokyo (JST)" },
              { value: "Australia/Sydney", label: "Sydney (AEST)" },
            ]}
          />
          <Select
            label="Your Local Timezone"
            value={inputs.userTimezone ?? "Europe/London"}
            onChange={(val) => onChange("userTimezone", val)}
            options={[
              { value: "Europe/London", label: "Europe/London (GMT/BST)" },
              { value: "America/New_York", label: "America/New_York (ET)" },
              { value: "America/Chicago", label: "America/Chicago (CT)" },
              { value: "America/Los_Angeles", label: "America/Los_Angeles (PT)" },
              { value: "Europe/Berlin", label: "Europe/Berlin (CET)" },
              { value: "Asia/Dubai", label: "Asia/Dubai (GST)" },
              { value: "Asia/Singapore", label: "Asia/Singapore (SGT)" },
            ]}
          />
        </div>
      )}
      renderResultsPanel={(inputs) => {
        const res = convertResetTime(inputs);
        if (!res) return null;

        return (
          <ResetClockDisplay
            initialResult={res}
            firmResetTime={inputs.firmResetTime}
            firmTimezone={inputs.firmTimezone}
          />
        );
      }}
      getAssumptions={(inputs) => [
        { label: "Firm Reset", value: `${inputs.firmResetTime} (${inputs.firmTimezone})`, explanation: "Scheduled EOD reset time" },
        { label: "Local Target", value: inputs.userTimezone || "Europe/London", explanation: "Target timezone for conversion" },
      ]}
      explanationTitle="Why Daily Reset Time Precision Matters"
      explanationText={
        <>
          <p>
            Most prop trading firms calculate daily loss limits based on account balance or equity at the exact second of their server daily reset (most commonly 17:00 Eastern Time / New York time).
          </p>
          <p>
            If you hold open positions or enter trades right around the reset time, floating losses can suddenly count against the new day's daily loss allowance.
          </p>
          <p>
            This tool converts the firm's server reset time into your local timezone and maintains a live ticking countdown clock so you always know exactly how much time remains before the daily reset event.
          </p>
        </>
      }
      relatedTools={RELATED_TOOLS}
    />
  );
}

export default function ResetTimeConverterPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-text-muted">Loading calculator...</div>}>
      <ResetTimeConverterContent />
    </Suspense>
  );
}
