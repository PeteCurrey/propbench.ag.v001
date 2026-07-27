import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer & Legal Notices | PropBench",
  description:
    "Legal disclaimer and risk notices regarding PropBench calculation tools and educational reference materials.",
  alternates: {
    canonical: "https://propbench.com/disclaimer",
  },
  robots: "index, follow",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
          Legal &amp; Regulatory Notices
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
          Disclaimer &amp; Financial Risk Notice
        </h1>
        <p className="text-xs font-mono text-slate-500 border-b border-slate-200 pb-4">
          Last Updated: 2025 Edition • UK Financial Conduct Authority (FCA) Alignment
        </p>
      </div>

      <div className="max-w-[70ch] text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          1. Educational &amp; Calculational Scope
        </h2>
        <p>
          PropBench provides financial calculation engines, drawdown models, and educational benchmark reference tools strictly for informational and analytical purposes. No content or calculation output on PropBench constitutes investment advice, trading recommendations, or financial promotions.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          2. No Financial Advice or Performance Claims
        </h2>
        <p>
          In accordance with UK FCA rules, PropBench makes zero income claims, zero performance claims, and zero promises or assurances of evaluation passage or trading profitability. Proprietary trading involves substantial risk of capital loss.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          3. Independent Verification Required
        </h2>
        <p>
          Proprietary firm rules, drawdown parameters, and terms of service change frequently. All data displayed on PropBench carries a source verification link and date. Users must independently verify rule parameters directly against each firm&apos;s official T&amp;Cs before entering an evaluation.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          4. Limitation of Liability
        </h2>
        <p>
          PropBench accepts no liability for trading decisions, evaluation breaches, or financial losses incurred through the use of our calculation tools or reference materials.
        </p>
      </div>
    </div>
  );
}
