import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer & Legal Notices | PropBench",
  description:
    "[PLACEHOLDER: Legal disclaimer and risk notices regarding financial calculation tools.]",
  alternates: {
    canonical: "https://propbench.com/disclaimer",
  },
  robots: "index, follow",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          Legal &amp; Regulatory Notices
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-4">
          Disclaimer &amp; Financial Risk Notice
        </h1>
        <p className="text-xs font-mono text-text-muted border-b border-border pb-4">
          [PLACEHOLDER: Last Updated Date &amp; Legal Reference]
        </p>
      </div>

      <div className="max-w-[70ch] text-text-muted text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          1. Educational &amp; Calculational Scope
        </h2>
        <p>
          [PLACEHOLDER: Section 1 legal text explaining that PropBench provides financial calculation engines and educational benchmark reference tools strictly for informational purposes.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          2. No Financial Advice or Promotion
        </h2>
        <p>
          [PLACEHOLDER: Section 2 legal text confirming that no content on PropBench constitutes investment advice, trading recommendation, or financial promotion under FCA rules.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          3. Independent Verification Required
        </h2>
        <p>
          [PLACEHOLDER: Section 3 legal text advising users that proprietary firm rules change and must be independently verified against each firm&apos;s official Terms &amp; Conditions.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          4. Limitation of Liability
        </h2>
        <p>
          [PLACEHOLDER: Section 4 legal text defining limitations of liability regarding calculation outputs and evaluation trading outcomes.]
        </p>
      </div>
    </div>
  );
}
