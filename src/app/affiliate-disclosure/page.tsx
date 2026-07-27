import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate & Commercial Disclosure | PropBench",
  description:
    "Plain English affiliate disclosure outlining referral commission relationships and independent calculation integrity.",
  alternates: {
    canonical: "https://propbench.com/affiliate-disclosure",
  },
  robots: "index, follow",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
          Commercial Disclosures
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
          Affiliate &amp; Commercial Link Disclosure
        </h1>
        <p className="text-xs font-mono text-slate-500 border-b border-slate-200 pb-4">
          Transparency &amp; Independent Algorithm Integrity Statement
        </p>
      </div>

      <div className="max-w-[70ch] text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          1. Plain English Affiliate Notice
        </h2>
        <p>
          Certain links on PropBench linking to external proprietary trading firm platforms are referral links. If you purchase an evaluation or sign up through an affiliate link, PropBench may receive a referral commission at no additional cost to you.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          2. Zero Impact on Pricing or Firm Rule Data
        </h2>
        <p>
          Affiliate relationships do not alter evaluation prices paid by users, nor do they influence firm rule verification, data publishing, or calculations. Proprietary firm rules are published objectively based on verified T&amp;Cs.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          3. Independent Calculation Integrity
        </h2>
        <p>
          All calculation logic, drawdown formulas, and risk algorithms remain strictly objective and uninfluenced by commercial partnerships or affiliate agreements.
        </p>
      </div>
    </div>
  );
}
