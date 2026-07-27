import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { firms } from "@/data/firms/index";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StalenessBadge } from "@/components/ui/StalenessBadge";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Verified Proprietary Trading Firms Directory | PropBench",
  description:
    "Browse objective evaluation rules, drawdown parameters, daily loss limits, and verification dates for 6 registered proprietary trading firms.",
  alternates: {
    canonical: "https://propbench.com/firms",
  },
  robots: "index, follow",
};

export default function FirmsDirectoryPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#1B2A4A] block">
          Prop Firm Benchmark Index
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
          Verified Proprietary Trading Firms
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
          Explore verified evaluation parameters, drawdown thresholds, and daily reset rules across registered proprietary trading firms. All figures are sourced directly from official T&amp;Cs with zero inferred estimates.
        </p>
      </div>

      {/* Compliance Notice */}
      <Callout variant="framework">
        All firm data displayed on PropBench carries a source verification link and date. Unknown or unpublished rules are stored as null and rendered as &quot;Not published by this firm — verify in your T&amp;Cs&quot;.
      </Callout>

      {/* Grid of Prop Firms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {firms.map((firm) => {
          const mainProgram = firm.programs[0];
          return (
            <Card
              key={firm.slug}
              className="flex flex-col justify-between p-6 space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display font-bold text-xl text-slate-900">
                      {firm.name}
                    </h2>
                    <a
                      href={firm.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-500 hover:text-slate-900 underline"
                    >
                      {new URL(firm.websiteUrl).hostname}
                    </a>
                  </div>
                  {mainProgram && (
                    <StalenessBadge verifiedDate={mainProgram.verifiedDate} />
                  )}
                </div>

                {mainProgram && (
                  <div className="space-y-3 pt-2 text-xs border-t border-slate-200">
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500 uppercase">Program:</span>
                      <span className="font-semibold text-slate-900">
                        {mainProgram.name}
                      </span>
                    </div>

                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500 uppercase">Account Sizes:</span>
                      <span className="font-semibold text-slate-900">
                        ${mainProgram.accountSizes[0]?.toLocaleString()} - ${mainProgram.accountSizes[mainProgram.accountSizes.length - 1]?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500 uppercase">Max Drawdown:</span>
                      <span className="font-semibold text-slate-900">
                        {mainProgram.maxDrawdownPct !== null
                          ? `${mainProgram.maxDrawdownPct}% (${mainProgram.maxDrawdownType?.replace(/_/g, " ")})`
                          : "Not published"}
                      </span>
                    </div>

                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500 uppercase">Daily Loss Limit:</span>
                      <span className="font-semibold text-slate-900">
                        {mainProgram.dailyLossPct !== null
                          ? `${mainProgram.dailyLossPct}% (${mainProgram.dailyLossBasis})`
                          : "Not published"}
                      </span>
                    </div>

                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500 uppercase">Profit Split:</span>
                      <span className="font-semibold text-slate-900">
                        {mainProgram.profitSplitPct !== null
                          ? `${mainProgram.profitSplitPct}%`
                          : "Not published"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <Link href={`/firms/${firm.slug}`} className="block">
                  <Button variant="primary" size="sm" className="w-full justify-center">
                    View Verified Rules &rarr;
                  </Button>
                </Link>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Calculators:</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/tools/drawdown-calculator/${firm.slug}`}
                      className="hover:text-slate-900 underline"
                    >
                      Drawdown
                    </Link>
                    <span>·</span>
                    <Link
                      href={`/tools/position-size-calculator/${firm.slug}`}
                      className="hover:text-slate-900 underline"
                    >
                      Position Size
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
