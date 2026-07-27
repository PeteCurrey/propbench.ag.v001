import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PropBench",
  description:
    "Terms of service governing the use of PropBench calculation tools, digital products, and subscription services.",
  alternates: {
    canonical: "https://propbench.com/terms",
  },
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
          Terms &amp; Conditions
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-slate-500 border-b border-slate-200 pb-4">
          Effective Date: 2025 Edition • English Law &amp; Jurisdiction
        </p>
      </div>

      <div className="max-w-[70ch] text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using PropBench, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our website or calculation tools.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          2. Intellectual Property &amp; License
        </h2>
        <p>
          All calculation engines, software code, design systems, and digital PDF publications are the exclusive intellectual property of PropBench. You are granted a personal, non-exclusive license to use tools for individual reference purposes.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          3. Subscriptions &amp; Billing Terms
        </h2>
        <p>
          Pro subscriptions are processed via Stripe and renew monthly until canceled. You may cancel your subscription at any time via the Stripe Customer Portal in your dashboard. Access remains active until the end of your prepaid billing period.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          4. Governing Law &amp; Jurisdiction
        </h2>
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of England and Wales, and the courts of England shall have exclusive jurisdiction over any disputes.
        </p>
      </div>
    </div>
  );
}
