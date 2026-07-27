import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Goods Refund Policy | PropBench",
  description:
    "Documented refund policy for digital downloads under UK Consumer Contracts Regulations.",
  alternates: {
    canonical: "https://propbench.com/refund-policy",
  },
  robots: "index, follow",
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          Legal &amp; Consumer Disclosures
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-4">
          Digital Goods Refund Policy
        </h1>
        <p className="text-xs font-mono text-text-muted border-b border-border pb-4">
          Last Updated: 25 January 2025 • Governed by UK Consumer Contracts Regulations
        </p>
      </div>

      <div className="max-w-[70ch] text-text-muted text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          1. UK Consumer Rights for Digital Content
        </h2>
        <p>
          Under the UK Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, consumers typically have a 14-day statutory right to cancel a contract for distance purchases.
        </p>
        <p>
          However, for digital content supplied immediately via download (such as the <em>Prop Trading Survival Kit PDF</em>), your statutory right to cancel is waived once download or access has commenced, provided you explicitly consented to immediate delivery prior to purchase.
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          2. Immediate Access &amp; Waiver Consent
        </h2>
        <p>
          By completing your purchase of the <em>Prop Trading Survival Kit PDF</em> and accessing the immediate download link on the checkout confirmation page or via receipt email, you acknowledge and agree that digital delivery begins immediately and that your 14-day right to cancel is lost.
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          3. Damaged or Defective Content
        </h2>
        <p>
          If the digital file received is corrupted, incomplete, or technically defective, you are entitled to a replacement digital copy or repair. If we are unable to provide a functional replacement within 14 days, a full refund will be issued.
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          4. Contacting Customer Support
        </h2>
        <p>
          For billing inquiries, file access issues, or defect reports, please contact support at support@propbench.com with your purchase reference or Stripe session ID.
        </p>
      </div>
    </div>
  );
}
