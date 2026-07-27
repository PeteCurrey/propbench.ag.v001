"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Disclosure } from "@/components/ui/Disclosure";
import { Callout } from "@/components/ui/Callout";
import { RelatedTools, type RelatedToolItem } from "./RelatedTools";

export interface AssumptionItem {
  label: string;
  value: string | number;
  explanation: string;
}

export interface CalculatorShellProps<TInputs extends Record<string, any>> {
  title: string;
  subtitle: string;
  defaultInputs: TInputs;
  parseInputs: (params: URLSearchParams) => TInputs;
  formatSearchParams: (inputs: TInputs) => Record<string, string>;
  validateInputs: (inputs: TInputs) => string | null; // returns error message or null
  renderInputPanel: (
    inputs: TInputs,
    onChange: <K extends keyof TInputs>(key: K, val: TInputs[K]) => void
  ) => React.ReactNode;
  renderResultsPanel: (inputs: TInputs) => React.ReactNode;
  renderVisual?: (inputs: TInputs) => React.ReactNode;
  getAssumptions: (inputs: TInputs) => AssumptionItem[];
  explanationTitle: string;
  explanationText: React.ReactNode;
  relatedTools: RelatedToolItem[];
}

export function CalculatorShell<TInputs extends Record<string, any>>({
  title,
  subtitle,
  defaultInputs,
  parseInputs,
  formatSearchParams,
  validateInputs,
  renderInputPanel,
  renderResultsPanel,
  renderVisual,
  getAssumptions,
  explanationTitle,
  explanationText,
  relatedTools,
}: CalculatorShellProps<TInputs>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  // Hydrate initial state from URL or defaults
  const [inputs, setInputs] = useState<TInputs>(() => {
    if (searchParams && searchParams.size > 0) {
      return parseInputs(searchParams);
    }
    return defaultInputs;
  });

  const [debouncedInputs, setDebouncedInputs] = useState<TInputs>(inputs);

  // Debounce input changes by 150ms & update URL searchParams
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputs(inputs);

      // Serialize inputs to URL searchParams without triggering full page reload
      const formatted = formatSearchParams(inputs);
      const params = new URLSearchParams();
      Object.entries(formatted).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
          params.set(k, v);
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      startTransition(() => {
        router.replace(newUrl, { scroll: false });
      });
    }, 150);

    return () => clearTimeout(handler);
  }, [inputs, pathname, router, formatSearchParams]);

  const handleInputChange = <K extends keyof TInputs>(key: K, val: TInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  const validationError = validateInputs(debouncedInputs);
  const assumptions = getAssumptions(debouncedInputs);

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-left">
      {/* Header section */}
      <div className="mb-10 text-left">
        <p className="font-mono text-[11px] uppercase tracking-widest font-semibold text-slate-500 mb-2">
          Interactive Calculators &bull; Rule Engines
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">{subtitle}</p>
      </div>

      {/* Main 2-column layout (Left input / Right results & visual) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="font-display font-semibold text-base text-slate-900">Input Parameters</h2>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>

            {renderInputPanel(inputs, handleInputChange)}
          </Card>
        </div>

        {/* Right Column: Results & Interactive Visual */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {validationError ? (
            <Callout variant="warning" title="Invalid Parameters">
              {validationError}
            </Callout>
          ) : (
            <>
              {/* Stat Results Card */}
              <Card variant="default" className="flex flex-col gap-6">
                <h2 className="font-display font-semibold text-base text-slate-900 border-b border-slate-200 pb-3">
                  Calculation Results
                </h2>
                {renderResultsPanel(debouncedInputs)}
              </Card>

              {/* Per-Calculator Visual Element Slot */}
              {renderVisual && (
                <Card className="flex flex-col gap-4">
                  <h3 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    Visual Analysis
                  </h3>
                  {renderVisual(debouncedInputs)}
                </Card>
              )}
            </>
          )}

          {/* Assumptions Disclosure */}
          <Disclosure title="Calculation Assumptions & Model Details">
            <div className="space-y-3 pt-2 text-xs">
              <p className="text-slate-600 mb-2">
                This calculation relies strictly on the parameters provided below:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                {assumptions.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="text-slate-500 block text-[10px] uppercase font-medium">{item.label}</span>
                    <span className="text-slate-900 font-bold text-sm">{item.value}</span>
                    <span className="text-slate-500 block text-[11px] mt-1 italic font-sans">
                      {item.explanation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Disclosure>
        </div>
      </div>

      {/* Below the Fold: Educational & Interpretive Copy */}
      <section className="mt-16 pt-10 border-t border-slate-200 max-w-3xl">
        <h2 className="font-display font-bold text-xl text-slate-900 mb-4">{explanationTitle}</h2>
        <div className="prose text-sm text-slate-600 space-y-4 leading-relaxed">
          {explanationText}
        </div>
      </section>

      {/* Contextual Related Tools Footer */}
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
