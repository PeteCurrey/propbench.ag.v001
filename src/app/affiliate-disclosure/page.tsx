import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate & Commercial Disclosure | PropBench",
  description:
    "[PLACEHOLDER: Plain English affiliate disclosure outlining referral commission relationships.]",
  alternates: {
    canonical: "https://propbench.com/affiliate-disclosure",
  },
  robots: "index, follow",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          Commercial Disclosures
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-4">
          Affiliate &amp; Commercial Link Disclosure
        </h1>
        <p className="text-xs font-mono text-text-muted border-b border-border pb-4">
          [PLACEHOLDER: Transparency &amp; Independence Statement]
        </p>
      </div>

      <div className="max-w-[70ch] text-text-muted text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          1. Plain English Affiliate Notice
        </h2>
        <p>
          [PLACEHOLDER: Section 1 text explaining that certain links on PropBench linking to proprietary trading firms are affiliate referral links. If you purchase an evaluation or sign up through an affiliate link, PropBench may earn a referral commission at no additional cost to you.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          2. No Impact on Pricing or Rule Data
        </h2>
        <p>
          [PLACEHOLDER: Section 2 text confirming that affiliate relationships do not alter evaluation prices paid by users, nor do they influence data publishing or calculation rule accuracy.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          3. Independent Calculation Integrity
        </h2>
        <p>
          [PLACEHOLDER: Section 3 text affirming that all calculation logic, drawdown formulas, and firm rule data remain strictly objective and uninfluenced by commercial partnerships.]
        </p>
      </div>
    </div>
  );
}
