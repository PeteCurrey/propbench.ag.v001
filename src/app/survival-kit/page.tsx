"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Disclosure } from "@/components/ui/Disclosure";
import { Callout } from "@/components/ui/Callout";
import { PdfSamplePreview } from "@/components/pdf/PdfSamplePreview";

export default function SurvivalKitProductPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initialize checkout. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to checkout.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Product Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-border pb-12">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block">
            [PLACEHOLDER: PDF Manual Specification]
          </span>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
            [PLACEHOLDER: Prop Trading Survival Kit Headline]
          </h1>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl">
            [PLACEHOLDER: Detailed product overview explaining the mathematical and analytical scope of the manual, covering static/trailing drawdown, risk budgets, and evaluation pacing.]
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
            <div className="p-3 rounded bg-surface-inset border border-border">
              <span className="text-[10px] text-text-muted uppercase block">Page Count</span>
              <strong className="text-text-primary text-sm">124 Pages</strong>
            </div>
            <div className="p-3 rounded bg-surface-inset border border-border">
              <span className="text-[10px] text-text-muted uppercase block">Format</span>
              <strong className="text-text-primary text-sm">Digital PDF</strong>
            </div>
            <div className="p-3 rounded bg-surface-inset border border-border">
              <span className="text-[10px] text-text-muted uppercase block">Version</span>
              <strong className="text-text-primary text-sm">2025 Edition</strong>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <span className="font-mono text-3xl font-extrabold text-text-primary">
              £29.00
            </span>
            <Button variant="primary" size="lg" onClick={handleCheckout} disabled={loading}>
              {loading ? "Initializing..." : "Buy Manual Now — £29 &rarr;"}
            </Button>
          </div>
        </div>

        {/* Cover Mock */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-64 h-88 bg-surface-elevated border-2 border-accent-blue/50 rounded-xl shadow-2xl p-6 flex flex-col justify-between text-left">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent-blue block">
                [PLACEHOLDER: Reference Manual]
              </span>
              <h3 className="font-display font-bold text-xl text-text-primary mt-3 leading-snug">
                [PLACEHOLDER: Prop Trading Survival Kit]
              </h3>
              <p className="text-xs text-text-muted mt-2">
                [PLACEHOLDER: Mathematical &amp; Risk Frameworks]
              </p>
            </div>
            <div className="border-t border-border pt-3 font-mono text-xs text-text-muted">
              [PLACEHOLDER: PropBench PDF Edition]
            </div>
          </div>
        </div>
      </section>

      {/* Chapter & Contents Breakdown */}
      <section className="space-y-6 text-left">
        <h2 className="font-display font-bold text-2xl text-text-primary">
          [PLACEHOLDER: Contents Breakdown by Part and Chapter]
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block">
              Part I
            </span>
            <h3 className="font-display font-bold text-base text-text-primary">
              [PLACEHOLDER: Part 1 — Drawdown Mathematics &amp; Floor Models]
            </h3>
            <ul className="space-y-1.5 text-xs text-text-muted font-mono">
              <li>• Chapter 1: Static vs Trailing Breach Thresholds</li>
              <li>• Chapter 2: EOD Peak vs Intraday Floating High Water Marks</li>
              <li>• Chapter 3: Buffer Preservation &amp; Recovery Curves</li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block">
              Part II
            </span>
            <h3 className="font-display font-bold text-base text-text-primary">
              [PLACEHOLDER: Part 2 — Position Sizing &amp; Risk Budgets]
            </h3>
            <ul className="space-y-1.5 text-xs text-text-muted font-mono">
              <li>• Chapter 4: Calculating Position Size from Stop Distance</li>
              <li>• Chapter 5: Pip Value Variations Across Instruments</li>
              <li>• Chapter 6: Managing Streak Variance</li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block">
              Part III
            </span>
            <h3 className="font-display font-bold text-base text-text-primary">
              [PLACEHOLDER: Part 3 — Evaluation Planning &amp; Daily Resets]
            </h3>
            <ul className="space-y-1.5 text-xs text-text-muted font-mono">
              <li>• Chapter 7: Daily Loss Limit Calculation Baselines</li>
              <li>• Chapter 8: Server Reset Times &amp; Overnight Exposure</li>
              <li>• Chapter 9: The 20-Day Target Pacing Model</li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block">
              Part IV
            </span>
            <h3 className="font-display font-bold text-base text-text-primary">
              [PLACEHOLDER: Part 4 — Funded Account Management]
            </h3>
            <ul className="space-y-1.5 text-xs text-text-muted font-mono">
              <li>• Chapter 10: Consistency Rule Compliance</li>
              <li>• Chapter 11: Profit Split Allocations &amp; Fee Deductions</li>
              <li>• Chapter 12: Scaling Plans &amp; Buffer Retention</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Genuine Sample Preview: Chapter 1 */}
      <section className="space-y-4 text-left">
        <h2 className="font-display font-bold text-2xl text-text-primary">
          [PLACEHOLDER: Genuine Sample Preview — Read Chapter 1]
        </h2>
        <PdfSamplePreview />
      </section>

      {/* Scope Disclaimer ("What It Is Not") */}
      <Callout variant="warning" title="What This Manual Is Not">
        <p className="text-xs leading-relaxed">
          [PLACEHOLDER: This manual contains no income claims, no performance guarantees, no average payout figures, and no financial promotions. It is strictly an educational and analytical reference manual on risk management mathematics.]
        </p>
      </Callout>

      {/* Verbatim Risk Warning From the Book */}
      <section className="p-6 rounded-lg bg-surface-inset border border-border text-left space-y-3">
        <h3 className="font-mono text-xs uppercase text-warning font-bold">
          Verbatim Risk Warning Notice (From Manual)
        </h3>
        <p className="text-xs text-text-muted leading-relaxed font-sans">
          &quot;Trading leveraged financial instruments in proprietary firm evaluations involves significant financial risk. The analytical frameworks, tables, and mathematical formulas contained in this manual are provided strictly for educational purposes. No material herein constitutes investment advice, trading recommendation, or guarantee of evaluation passage.&quot;
        </p>
      </section>

      {/* FAQ Disclosure Accordions */}
      <section className="space-y-4 text-left">
        <h2 className="font-display font-bold text-2xl text-text-primary">
          [PLACEHOLDER: Frequently Asked Questions]
        </h2>

        <div className="space-y-3">
          <Disclosure title="What format is the manual delivered in?">
            <p className="text-xs text-text-muted">
              [PLACEHOLDER: Digital PDF format. Instant download access via email upon completed purchase.]
            </p>
          </Disclosure>

          <Disclosure title="What is the refund policy?">
            <p className="text-xs text-text-muted font-mono">
              [PLACEHOLDER: Read our full <Link href="/refund-policy" className="text-accent-blue underline">Digital Goods Refund Policy</Link>.]
            </p>
          </Disclosure>

          <Disclosure title="Are future edition updates included?">
            <p className="text-xs text-text-muted">
              [PLACEHOLDER: All purchasers receive free digital update notifications when firm rule frameworks are updated.]
            </p>
          </Disclosure>
        </div>
      </section>
    </div>
  );
}
