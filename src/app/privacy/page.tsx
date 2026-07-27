import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PropBench",
  description:
    "[PLACEHOLDER: Privacy policy outlining data protection and processing compliance under UK GDPR.]",
  alternates: {
    canonical: "https://propbench.com/privacy",
  },
  robots: "index, follow",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left space-y-8">
      <div className="max-w-[70ch]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          Data Protection &amp; Privacy
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-text-muted border-b border-border pb-4">
          [PLACEHOLDER: Last Updated Date &amp; UK GDPR Reference]
        </p>
      </div>

      <div className="max-w-[70ch] text-text-muted text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          1. Information We Collect
        </h2>
        <p>
          [PLACEHOLDER: Section 1 legal text explaining account registration details (email for magic links) and non-PII analytics event telemetry.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          2. How Your Information Is Used
        </h2>
        <p>
          [PLACEHOLDER: Section 2 legal text covering authentication, saved account synchronization, order fulfillment, and service delivery.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          3. Analytics &amp; Privacy-Preserving Telemetry
        </h2>
        <p>
          [PLACEHOLDER: Section 3 legal text detailing cookieless Plausible analytics and zero personal tracking.]
        </p>

        <h2 className="font-display font-bold text-xl text-text-primary mt-6">
          4. Your Data Subject Rights (UK GDPR)
        </h2>
        <p>
          [PLACEHOLDER: Section 4 legal text covering user rights to access, rectify, port, or erase stored account records.]
        </p>
      </div>
    </div>
  );
}
