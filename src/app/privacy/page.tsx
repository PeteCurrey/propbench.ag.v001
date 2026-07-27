import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PropBench",
  description:
    "Privacy policy outlining data protection and privacy compliance under UK GDPR and Data Protection Act 2018.",
  alternates: {
    canonical: "https://propbench.com/privacy",
  },
  robots: "index, follow",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
          Data Protection &amp; Privacy
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-slate-500 border-b border-slate-200 pb-4">
          Effective Date: 2025 Edition • UK GDPR &amp; DPA 2018 Compliance
        </p>
      </div>

      <div className="max-w-[70ch] text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          1. Information We Collect
        </h2>
        <p>
          We collect minimal personal data necessary to provide service access. This includes email addresses provided for passwordless magic link authentication, purchase fulfillment, and saved account dashboard features.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          2. How Your Information Is Used
        </h2>
        <p>
          Your information is used strictly to authenticate your session, deliver digital purchases, send single-use download links, process Stripe subscription transactions, and allow you to save your prop account parameters securely.
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          3. Analytics &amp; Privacy-Preserving Telemetry
        </h2>
        <p>
          We use cookieless analytics powered by Plausible. We do not use persistent tracking cookies, sell user data, or share personal data with third-party advertisers. All telemetry contains zero personally identifiable information (PII).
        </p>

        <h2 className="font-display font-bold text-xl text-slate-900 mt-6">
          4. Your Data Rights (UK GDPR)
        </h2>
        <p>
          Under UK GDPR, you have the right to access, rectify, port, or request erasure of your personal data at any time by contacting our support team or deleting your account from the dashboard.
        </p>
      </div>
    </div>
  );
}
