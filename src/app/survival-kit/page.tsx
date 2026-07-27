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
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 text-left">
      {/* Product Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-slate-200 pb-12">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#1B2A4A] block">
            Digital Technical Manual
          </span>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Prop Trading Survival Kit
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-body">
            The definitive mathematical reference manual for proprietary firm evaluation participants. Detailed analytical frameworks covering drawdown floor mechanics, position sizing models, daily loss reset traps, and evaluation pacing.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase block font-medium">Page Count</span>
              <strong className="text-slate-900 text-sm font-bold">124 Pages</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase block font-medium">Format</span>
              <strong className="text-slate-900 text-sm font-bold">Digital PDF</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase block font-medium">Version</span>
              <strong className="text-slate-900 text-sm font-bold">2025 Edition</strong>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-5">
            <span className="font-mono text-3xl font-extrabold text-slate-900">
              £29.00
            </span>
            <Button variant="primary" size="lg" onClick={handleCheckout} disabled={loading}>
              {loading ? "Initializing..." : "Buy Manual Now — £29 &rarr;"}
            </Button>
          </div>
        </div>

        {/* Cover Mock */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-64 h-88 bg-slate-900 border-2 border-slate-800 rounded-xl shadow-xl p-6 flex flex-col justify-between text-left text-white">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400 font-bold block">
                Reference Manual
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-3 leading-snug">
                Prop Trading Survival Kit
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Mathematical &amp; Risk Frameworks
              </p>
            </div>
            <div className="border-t border-slate-800 pt-3 font-mono text-xs text-slate-400">
              PropBench PDF Edition
            </div>
          </div>
        </div>
      </section>

      {/* Chapter & Contents Breakdown */}
      <section className="space-y-6 text-left">
        <h2 className="font-display font-bold text-2xl text-slate-900">
          Contents Breakdown by Part and Chapter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1B2A4A] font-semibold block">
              Part I
            </span>
            <h3 className="font-display font-bold text-base text-slate-900">
              Part 1 — Drawdown Mathematics &amp; Floor Models
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
              <li>• Chapter 1: Static vs Trailing Breach Thresholds</li>
              <li>• Chapter 2: EOD Peak vs Intraday Floating High Water Marks</li>
              <li>• Chapter 3: Buffer Preservation &amp; Recovery Curves</li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1B2A4A] font-semibold block">
              Part II
            </span>
            <h3 className="font-display font-bold text-base text-slate-900">
              Part 2 — Position Sizing &amp; Risk Budgets
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
              <li>• Chapter 4: Calculating Position Size from Stop Distance</li>
              <li>• Chapter 5: Pip Value Variations Across Instruments</li>
              <li>• Chapter 6: Managing Streak Variance</li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1B2A4A] font-semibold block">
              Part III
            </span>
            <h3 className="font-display font-bold text-base text-slate-900">
              Part 3 — Evaluation Planning &amp; Daily Resets
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
              <li>• Chapter 7: Daily Loss Limit Calculation Baselines</li>
              <li>• Chapter 8: Server Reset Times &amp; Overnight Exposure</li>
              <li>• Chapter 9: The 20-Day Target Pacing Model</li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1B2A4A] font-semibold block">
              Part IV
            </span>
            <h3 className="font-display font-bold text-base text-slate-900">
              Part 4 — Funded Account Management
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
              <li>• Chapter 10: Consistency Rule Compliance</li>
              <li>• Chapter 11: Profit Split Allocations &amp; Fee Deductions</li>
              <li>• Chapter 12: Scaling Plans &amp; Buffer Retention</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Genuine Sample Preview: Chapter 1 */}
      <section className="space-y-4 text-left">
        <h2 className="font-display font-bold text-2xl text-slate-900">
          Sample Preview — Read Chapter 1
        </h2>
        <PdfSamplePreview />
      </section>

      {/* Scope Disclaimer ("What It Is Not") */}
      <Callout variant="warning" title="What This Manual Is Not">
        <p className="text-xs leading-relaxed text-amber-900">
          This manual contains no income claims, no performance guarantees, no average payout figures, and no financial promotions. It is strictly an educational and analytical reference manual on risk management mathematics under UK FCA standards.
        </p>
      </Callout>

      {/* Verbatim Risk Warning From the Book */}
      <section className="p-6 rounded-lg bg-slate-50 border border-slate-200 text-left space-y-3">
        <h3 className="font-mono text-xs uppercase text-amber-700 font-bold">
          Verbatim Risk Warning Notice (From Manual)
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          &quot;Trading leveraged financial instruments in proprietary firm evaluations involves significant financial risk. The analytical frameworks, tables, and mathematical formulas contained in this manual are provided strictly for educational purposes. No material herein constitutes investment advice, trading recommendation, or guarantee of evaluation passage.&quot;
        </p>
      </section>

      {/* FAQ Disclosure Accordions */}
      <section className="space-y-4 text-left">
        <h2 className="font-display font-bold text-2xl text-slate-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <Disclosure title="What format is the manual delivered in?">
            <p className="text-xs text-slate-600">
              Digital PDF format. Upon completed purchase, an instant download link valid for 15 minutes is delivered to your email address, allowing up to 5 downloads.
            </p>
          </Disclosure>

          <Disclosure title="What is the refund policy?">
            <p className="text-xs text-slate-600 font-mono">
              Read our full <Link href="/refund-policy" className="text-blue-700 underline font-semibold">Digital Goods Refund Policy</Link>.
            </p>
          </Disclosure>

          <Disclosure title="Are future edition updates included?">
            <p className="text-xs text-slate-600">
              All purchasers receive free digital update notifications when proprietary firm rule frameworks or calculation models are updated.
            </p>
          </Disclosure>
        </div>
      </section>
    </div>
  );
}
