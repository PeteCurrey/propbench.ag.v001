import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import { HeroMiniDrawdownCalc } from "@/components/home/HeroMiniDrawdownCalc";
import { getAllGuides } from "@/lib/guides";
import { firms } from "@/data/firms/index";
import { TOOLS_DIRECTORY } from "@/data/tools";
import { AffiliateDisclosure } from "@/components/layout/AffiliateDisclosure";

// Pure calculation functions for stat band
import { losingStreakTable, calculateRiskOfRuin } from "@/lib/calc/risk-of-ruin";
import { calculateChallengePlan } from "@/lib/calc/challenge-planner";

export const metadata: Metadata = {
  title: "PropBench — Prop Trading Calculators & Risk Analytics",
  description:
    "Benchmark proprietary trading firm rules, calculate drawdown floors, size positions, and model risk probability.",
  alternates: {
    canonical: "https://propbench.com",
  },
  robots: "index, follow",
};

export default function HomePage() {
  // Root JSON-LD
  const rootJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://propbench.com/#organization",
        name: "PropBench",
        url: "https://propbench.com",
        logo: "https://propbench.com/api/og?title=PropBench",
        description: "Proprietary trading firm verification, drawdown calculators, and risk analytics engine.",
      },
      {
        "@type": "WebSite",
        "@id": "https://propbench.com/#website",
        url: "https://propbench.com",
        name: "PropBench",
        publisher: {
          "@id": "https://propbench.com/#organization",
        },
      },
    ],
  };

  // Compute stats directly from pure functions in /lib/calc
  const streakLosses = losingStreakTable(100000, 5, 10, 8);
  const stat1CumulativeLossPct = streakLosses[7]?.cumulativeLossPct ?? 33.66;

  const rorResult = calculateRiskOfRuin({
    accountBalance: 100000,
    riskPerTradePct: 1,
    maxDrawdownPct: 10,
    winRatePct: 50,
    rewardToRiskRatio: 1.5,
  });
  const stat2LossesToBreach = rorResult?.maxLossesBeforeBreach ?? 10;

  const planResult = calculateChallengePlan({
    startingBalance: 100000,
    targetProfitPct: 8,
    tradingDays: 20,
  });
  const stat3DailyPacePct = planResult?.dailyTargetPct ?? 0.4;

  const recentGuides = getAllGuides().slice(0, 3);
  const coreTools = TOOLS_DIRECTORY.filter((t) =>
    [
      "drawdown-calculator",
      "position-size-calculator",
      "challenge-planner",
      "risk-of-ruin-calculator",
    ].includes(t.slug)
  );

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Root JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
      />

      {/* ── 1. Signal Centre Style Hero Section ────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 pb-10 border-b border-slate-200">
        <div className="lg:col-span-7 text-left space-y-7">
          {/* Signal Centre Live Intelligence Badge */}
          <div className="badge-pill">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PURE CALCULATION ENGINE</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">13 TOOLS ACTIVE</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-[1.1]">
            Market intelligence for prop traders.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-body">
            Pure calculation models and verified evaluation parameters across prop trading firms. Built for disciplined traders, prop desks, and evaluation participants who require mathematical precision over noise.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/tools">
              <Button variant="primary" size="lg">
                Explore All Tools &rarr;
              </Button>
            </Link>
            <Link href="/survival-kit">
              <Button variant="secondary" size="lg">
                Get Survival Kit (PDF)
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Miniature Drawdown Calculator in Hero */}
        <div className="lg:col-span-5">
          <HeroMiniDrawdownCalc />
        </div>
      </section>

      {/* ── 2. Signal Centre Divided Stat Grid Box ─────────────────────────── */}
      <section className="space-y-4">
        <div className="text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">
            Engine Computations
          </p>
          <h2 className="font-display font-bold text-xl text-slate-900">
            Why drawdown mathematics matter.
          </h2>
        </div>

        {/* Signal Centre Divided Grid Box */}
        <div className="grid grid-cols-1 md:grid-cols-4 border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 rounded-lg bg-white shadow-sm overflow-hidden p-2">
          <Stat
            label="8 Losses @ 5% Risk"
            value={`-${stat1CumulativeLossPct}%`}
            state="danger"
            sub="Cumulative drawdown"
          />
          <Stat
            label="Losses to Breach @ 1%"
            value={`${stat2LossesToBreach} trades`}
            state="warning"
            sub="Max consecutive losses"
          />
          <Stat
            label="Daily Return Pace"
            value={`+${stat3DailyPacePct}% / day`}
            state="positive"
            sub="8% target in 20 days"
          />
          <Stat
            label="Verified Firms"
            value={`${firms.length} Firms`}
            state="neutral"
            sub="Independent T&C audits"
          />
        </div>
      </section>

      {/* ── 3. Four Core Tools Cards ───────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">
            Primary Calculators
          </p>
          <h2 className="font-display font-bold text-2xl text-slate-900">
            Core Risk Calculators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
              <Card className="h-full flex flex-col justify-between p-6 transition-all group-hover:border-slate-400 group-hover:shadow-md">
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200 inline-block mb-3">
                    {tool.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 font-mono text-xs text-[#1B2A4A] font-bold flex items-center justify-between">
                  <span>Input: {tool.primaryInput}</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Open Calculator &rarr;
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. Verified Firms Strip ───────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">
            Firm Database
          </p>
          <h2 className="font-display font-bold text-xl text-slate-900">
            Verified Proprietary Trading Firms
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {firms.map((firm) => (
            <Link key={firm.slug} href={`/firms/${firm.slug}`} className="group block">
              <Card className="px-6 py-4 flex items-center gap-4 hover:border-slate-400 transition-all shadow-sm">
                <span className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  {firm.name}
                </span>
                <span className="font-mono text-[10px] text-slate-500 border border-slate-200 px-2 py-0.5 rounded bg-slate-50">
                  View Parameters &rarr;
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. The PDF Survival Kit Highlight Section ────────────────────── */}
      <section className="p-8 sm:p-10 rounded-xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 flex justify-center">
          {/* PDF Cover Mock */}
          <div className="w-48 h-64 bg-slate-900 border-2 border-slate-800 rounded-lg shadow-xl p-5 flex flex-col justify-between text-left text-white">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-blue-400 block font-bold">
                Reference Manual
              </span>
              <h4 className="font-display font-bold text-base text-white mt-2">
                Prop Trading Survival Kit
              </h4>
            </div>
            <div className="border-t border-slate-800 pt-2 font-mono text-[10px] text-slate-400">
              PDF Edition • 12 Chapters
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-5 text-left">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#1B2A4A] block">
            Digital Reference PDF
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            The Prop Trading Survival Kit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The definitive technical manual covering drawdown mechanics, position sizing tables, daily loss reset timing traps, and evaluation risk budgeting.
          </p>
          <div className="pt-2 flex items-center gap-5">
            <span className="font-mono text-2xl font-bold text-slate-900">
              £29
            </span>
            <Link href="/survival-kit">
              <Button variant="primary" size="lg">
                Preview &amp; Purchase PDF &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Recent Educational Guides ─────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-left">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">
              Research &amp; Guides
            </p>
            <h2 className="font-display font-bold text-2xl text-slate-900">
              Recent Educational Guides
            </h2>
          </div>
          <Link href="/guides" className="text-xs font-mono text-blue-700 font-semibold hover:underline">
            View All Guides &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentGuides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block">
              <Card className="h-full flex flex-col justify-between p-6 hover:border-slate-400 transition-all">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block mb-2 font-medium">
                    {guide.publishedDate}
                  </span>
                  <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{guide.description}</p>
                </div>
                <div className="pt-4 mt-5 border-t border-slate-200 text-xs font-mono text-[#1B2A4A] font-bold">
                  Read Guide &rarr;
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 7. Footer with Risk Warning & Affiliate Disclosure ───────────── */}
      <footer className="pt-10 border-t border-slate-200 space-y-6 text-left">
        <AffiliateDisclosure />

        <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2">
          <p className="font-mono uppercase text-[10px] text-amber-700 font-bold tracking-wider">
            FCA Financial Risk Warning Notice
          </p>
          <p>
            PropBench provides financial calculation tools and educational reference materials strictly for informational purposes. Trading leveraged financial instruments and participating in proprietary trading firm evaluations involves substantial risk of capital loss. PropBench does not offer investment advice, financial promotion, or performance guarantees.
          </p>
        </div>
      </footer>
    </div>
  );
}
