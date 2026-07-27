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
    "[PLACEHOLDER: Benchmark proprietary trading firm rules, calculate drawdown floors, size positions, and model risk probability.]",
  alternates: {
    canonical: "https://propbench.com",
  },
  robots: "index, follow",
};

export default function HomePage() {
  // Organization & WebSite JSON-LD
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

  // Compute the 3 stat band figures directly from pure functions in /lib/calc
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

      {/* ── 1. Hero Section ───────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6 pb-8 border-b border-border">
        <div className="lg:col-span-6 text-left space-y-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-blue">
            [PLACEHOLDER: PropBench Platform Badge]
          </p>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
            [PLACEHOLDER: Single Sentence Positioning Headline Here]
          </h1>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-xl">
            [PLACEHOLDER: Introductory positioning paragraph explaining the purpose of PropBench risk tools, drawdown models, and evaluation calculators.]
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/tools">
              <Button variant="primary" size="lg">
                [PLACEHOLDER: Explore All Tools &rarr;]
              </Button>
            </Link>
            <Link href="/survival-kit">
              <Button variant="secondary" size="lg">
                [PLACEHOLDER: Get Survival Kit PDF]
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Miniature Drawdown Calculator in Hero */}
        <div className="lg:col-span-6">
          <HeroMiniDrawdownCalc />
        </div>
      </section>

      {/* ── 2. Four Core Tools Large Cards ───────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">
            [PLACEHOLDER: Tools Subtitle]
          </p>
          <h2 className="font-display font-bold text-2xl text-text-primary">
            [PLACEHOLDER: Core Risk Calculators Headline]
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
              <Card className="h-full flex flex-col justify-between p-6 transition-colors group-hover:border-accent-blue/60 group-hover:bg-surface-elevated/80">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-surface-inset text-text-muted border border-border block w-max mb-3">
                    {tool.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-accent-blue transition-colors mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-border/60 font-mono text-xs text-accent-blue font-bold flex items-center justify-between">
                  <span>Input: {tool.primaryInput}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    Open Calculator &rarr;
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. "Why These Numbers Matter" Stat Band (Computed via /lib/calc) ── */}
      <section className="p-8 rounded-xl bg-surface-elevated border border-border space-y-6">
        <div className="text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-blue mb-1">
            [PLACEHOLDER: Engine Computations]
          </p>
          <h2 className="font-display font-bold text-xl text-text-primary">
            [PLACEHOLDER: Why These Numbers Matter Headline]
          </h2>
          <p className="text-xs text-text-muted mt-1">
            [PLACEHOLDER: All three stats below are computed dynamically from pure functions in /lib/calc]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <Card variant="inset" className="space-y-2">
            <Stat label="8 Losses @ 5% Risk" value={`-${stat1CumulativeLossPct}%`} state="danger" />
            <p className="text-[11px] text-text-muted italic">
              [PLACEHOLDER: Cumulative account drawdown after 8 consecutive losses]
            </p>
          </Card>
          <Card variant="inset" className="space-y-2">
            <Stat label="Losses to Breach @ 1% Risk" value={`${stat2LossesToBreach} trades`} state="warning" />
            <p className="text-[11px] text-text-muted italic">
              [PLACEHOLDER: Max consecutive losses before reaching 10% breach floor]
            </p>
          </Card>
          <Card variant="inset" className="space-y-2">
            <Stat label="Daily Target for 8% in 20 Days" value={`+${stat3DailyPacePct}% / day`} state="positive" />
            <p className="text-[11px] text-text-muted italic">
              [PLACEHOLDER: Required daily return pace to reach 8% evaluation target]
            </p>
          </Card>
        </div>
      </section>

      {/* ── 4. Firms Strip ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">
            [PLACEHOLDER: Firm Coverage]
          </p>
          <h2 className="font-display font-bold text-lg text-text-primary">
            [PLACEHOLDER: Verified Proprietary Trading Firms]
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {firms.map((firm) => (
            <Link key={firm.slug} href={`/firms/${firm.slug}`} className="group block">
              <Card className="px-6 py-4 flex items-center gap-3 hover:border-accent-blue/60 transition-colors">
                <span className="font-display font-bold text-sm text-text-primary group-hover:text-accent-blue transition-colors">
                  {firm.name}
                </span>
                <span className="font-mono text-[10px] text-text-muted border border-border px-1.5 py-0.5 rounded">
                  [PLACEHOLDER: View Firm &rarr;]
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. The PDF Survival Kit Highlight Section ────────────────────── */}
      <section className="p-8 rounded-xl bg-surface-inset border border-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 flex justify-center">
          {/* PDF Cover Mock */}
          <div className="w-48 h-64 bg-surface-elevated border-2 border-accent-blue/40 rounded-lg shadow-2xl p-4 flex flex-col justify-between text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-accent-blue block">
                [PLACEHOLDER: Manual]
              </span>
              <h4 className="font-display font-bold text-base text-text-primary mt-2">
                [PLACEHOLDER: Prop Trading Survival Kit]
              </h4>
            </div>
            <div className="border-t border-border pt-2 font-mono text-[10px] text-text-muted">
              [PLACEHOLDER: PDF Edition]
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4 text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block">
            [PLACEHOLDER: Digital PDF Guide]
          </span>
          <h2 className="font-display font-bold text-2xl text-text-primary">
            [PLACEHOLDER: Prop Trading Survival Kit PDF Headline]
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            [PLACEHOLDER: Detailed overview paragraph of the PDF manual contents, covering drawdown mathematics, position sizing tables, daily loss reset traps, and evaluation planning.]
          </p>
          <div className="pt-2 flex items-center gap-4">
            <span className="font-mono text-xl font-bold text-text-primary">
              [PLACEHOLDER: £29]
            </span>
            <Link href="/survival-kit">
              <Button variant="primary">
                [PLACEHOLDER: Learn More &amp; Preview PDF &rarr;]
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Recent Guides ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-left">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">
              [PLACEHOLDER: Educational Articles]
            </p>
            <h2 className="font-display font-bold text-xl text-text-primary">
              [PLACEHOLDER: Recent Educational Guides]
            </h2>
          </div>
          <Link href="/guides" className="text-xs font-mono text-accent-blue hover:underline">
            [PLACEHOLDER: View All Guides &rarr;]
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentGuides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block">
              <Card className="h-full flex flex-col justify-between p-5 hover:border-accent-blue/60 transition-colors">
                <div>
                  <span className="text-[10px] font-mono text-text-muted block mb-2">
                    {guide.publishedDate}
                  </span>
                  <h3 className="font-display font-bold text-base text-text-primary group-hover:text-accent-blue transition-colors mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-3">{guide.description}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-border text-[11px] font-mono text-accent-blue font-bold">
                  [PLACEHOLDER: Read Article &rarr;]
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 7. Footer with Risk Warning & Affiliate Disclosure ───────────── */}
      <footer className="pt-10 border-t border-border space-y-6 text-left">
        <AffiliateDisclosure />

        <div className="p-4 rounded-lg bg-surface-inset border border-border text-[11px] text-text-muted/80 leading-relaxed space-y-2">
          <p className="font-mono uppercase text-[10px] text-warning font-bold">
            [PLACEHOLDER: FCA Financial Risk Warning Notice]
          </p>
          <p>
            [PLACEHOLDER: PropBench provides financial calculation tools and educational reference materials strictly for informational purposes. Trading leveraged financial instruments and participating in proprietary trading firm evaluations involves substantial risk of capital loss. PropBench does not offer investment advice, financial promotion, or performance guarantees.]
          </p>
        </div>
      </footer>
    </div>
  );
}
