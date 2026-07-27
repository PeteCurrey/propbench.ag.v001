import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PropBench",
  description:
    "[PLACEHOLDER: Terms of service governing the use of PropBench calculation tools and subscription services.]",
  alternates: {
    canonical: "https://propbench.com/terms",
  },
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          Terms &amp; Conditions
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-text-muted border-b border-border pb-4">
          [PLACEHOLDER: Effective Date &amp; Jurisdictional Governing Law]
        </p>
      </div>

      <div className="max-w-[70ch] text-text-muted text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          1. Acceptance of Terms
        </h2>
        <p>
          [PLACEHOLDER: Section 1 legal text establishing terms governing platform usage and account creation.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          2. Platform License &amp; Tool Usage
        </h2>
        <p>
          [PLACEHOLDER: Section 2 legal text outlining non-exclusive license for personal educational tool usage.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          3. Subscriptions &amp; Billing Terms
        </h2>
        <p>
          [PLACEHOLDER: Section 3 legal text covering recurring subscription billing, Stripe processing, and cancellation procedures.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          4. Governing Law &amp; Jurisdiction
        </h2>
        <p>
          [PLACEHOLDER: Section 4 legal text specifying jurisdiction under the laws of England and Wales.]
        </p>
      </div>
    </div>
  );
}
