import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { firms, getFirm } from "@/data/firms/index";
import { TOOLS_DIRECTORY, type ToolDef } from "@/data/tools";
import { validateFirmForTool } from "@/data/firmToolRequirements";
import type { FirmProgram } from "@/data/firms/schema";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Disclosure } from "@/components/ui/Disclosure";
import { StalenessBadge } from "@/components/ui/StalenessBadge";
import { Table } from "@/components/ui/Table";
import { AffiliateDisclosure } from "@/components/layout/AffiliateDisclosure";

// Import all calculator components
import DrawdownCalculatorPage from "@/app/tools/drawdown-calculator/page";
import PositionSizeCalculatorPage from "@/app/tools/position-size-calculator/page";
import ChallengePlannerPage from "@/app/tools/challenge-planner/page";
import RiskOfRuinCalculatorPage from "@/app/tools/risk-of-ruin-calculator/page";
import PipValueCalculatorPage from "@/app/tools/pip-value-calculator/page";
import LotSizeCalculatorPage from "@/app/tools/lot-size-calculator/page";
import ExpectancyCalculatorPage from "@/app/tools/expectancy-calculator/page";
import CompoundingCalculatorPage from "@/app/tools/compounding-calculator/page";
import ConsistencyRuleCheckerPage from "@/app/tools/consistency-rule-checker/page";
import DailyLossLimitCalculatorPage from "@/app/tools/daily-loss-limit-calculator/page";
import PayoutProjectorPage from "@/app/tools/payout-projector/page";
import ChallengeSimulatorPage from "@/app/tools/challenge-simulator/page";
import ResetTimeConverterPage from "@/app/tools/reset-time-converter/page";

/* ─── Static Params Generation with Build-Time Logging ──────────────────── */

export function generateStaticParams() {
  const validParams: Array<{ tool: string; firm: string }> = [];

  console.log("\n==========================================================");
  console.log(" [Firm Tool Preset Layer] Validating Static Route Generation");
  console.log("==========================================================\n");

  for (const tool of TOOLS_DIRECTORY) {
    for (const firm of firms) {
      const validation = validateFirmForTool(firm, tool.slug);

      if (validation.isValid) {
        validParams.push({ tool: tool.slug, firm: firm.slug });
        console.log(`  ✓ GENERATED: /tools/${tool.slug}/${firm.slug}`);
      } else {
        console.log(
          `  ✗ SKIPPED:   /tools/${tool.slug}/${firm.slug} — missing required field '${validation.missingField}'`
        );
      }
    }
  }

  console.log(
    `\nTotal generated combinations: ${validParams.length} of ${
      TOOLS_DIRECTORY.length * firms.length
    } total candidates.\n`
  );

  return validParams;
}

/* ─── Metadata & SEO ─────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string; firm: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug, firm: firmSlug } = await params;
  const firm = getFirm(firmSlug);
  const tool = TOOLS_DIRECTORY.find((t) => t.slug === toolSlug);

  if (!firm || !tool) return {};

  const title = `${firm.name} ${tool.name} — Preset Calculator`;
  const description = `Pre-loaded ${tool.name.toLowerCase()} tailored to ${firm.name}'s published terms. Includes risk parameters, rules breakdown, and live calculations.`;
  const canonicalUrl = `https://propbench.com/tools/${toolSlug}/${firmSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: "index, follow",
  };
}

/* ─── Factual Rule Explanation Generator ─────────────────────────────────── */

function generateFactualRuleExplanation(firmName: string, program: FirmProgram, toolSlug: string): string {
  switch (toolSlug) {
    case "drawdown-calculator":
      return `${firmName} specifies a ${program.maxDrawdownType?.replace("_", " ")} maximum loss allowance of ${program.maxDrawdownPct}% measured on an account ${program.maxDrawdownBasis} basis. Under this structure, your breach threshold ${
        program.maxDrawdownType === "static"
          ? "remains fixed relative to your starting balance"
          : "trails your peak high water mark"
      }.`;

    case "daily-loss-limit-calculator":
      return `${firmName} enforces a ${program.dailyLossPct}% maximum daily loss limit based on account ${program.dailyLossBasis}. Daily loss balances reset at ${program.dailyResetTime} ${program.dailyResetTimezone}.`;

    case "consistency-rule-checker":
      return `${firmName} applies a ${program.consistencyRulePct}% single-day profit cap. No single trading day may account for more than ${program.consistencyRulePct}% of your total generated profit during evaluation.`;

    case "payout-projector":
      return `${firmName} offers an ${program.profitSplitPct}% profit split with payouts processed every ${program.payoutFrequencyDays} days.`;

    case "reset-time-converter":
      return `${firmName}'s daily trading cycle resets at ${program.dailyResetTime} ${program.dailyResetTimezone}.`;

    default:
      return `${firmName} ${program.name} rules are pre-loaded into the calculation parameters below.`;
  }
}

/* ─── Calculator Component Mapper ────────────────────────────────────────── */

function renderToolComponent(toolSlug: string) {
  switch (toolSlug) {
    case "drawdown-calculator":
      return <DrawdownCalculatorPage />;
    case "position-size-calculator":
      return <PositionSizeCalculatorPage />;
    case "challenge-planner":
      return <ChallengePlannerPage />;
    case "risk-of-ruin-calculator":
      return <RiskOfRuinCalculatorPage />;
    case "pip-value-calculator":
      return <PipValueCalculatorPage />;
    case "lot-size-calculator":
      return <LotSizeCalculatorPage />;
    case "expectancy-calculator":
      return <ExpectancyCalculatorPage />;
    case "compounding-calculator":
      return <CompoundingCalculatorPage />;
    case "consistency-rule-checker":
      return <ConsistencyRuleCheckerPage />;
    case "daily-loss-limit-calculator":
      return <DailyLossLimitCalculatorPage />;
    case "payout-projector":
      return <PayoutProjectorPage />;
    case "challenge-simulator":
      return <ChallengeSimulatorPage />;
    case "reset-time-converter":
      return <ResetTimeConverterPage />;
    default:
      return null;
  }
}

/* ─── Page Component ─────────────────────────────────────────────────────── */

export default async function FirmToolPresetPage({
  params,
}: {
  params: Promise<{ tool: string; firm: string }>;
}) {
  const { tool: toolSlug, firm: firmSlug } = await params;
  const firm = getFirm(firmSlug);
  const tool = TOOLS_DIRECTORY.find((t) => t.slug === toolSlug);

  if (!firm || !tool) {
    notFound();
  }

  const validation = validateFirmForTool(firm, toolSlug);
  if (!validation.isValid || !validation.program) {
    notFound();
  }

  const program = validation.program;
  const factualExplanation = generateFactualRuleExplanation(firm.name, program, toolSlug);

  // Comparable firms for contextual navigation
  const comparableFirms = firms.filter((f) => f.slug !== firm.slug).slice(0, 2);

  // JSON-LD Structured Data
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${firm.name} ${tool.name}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the drawdown model for ${firm.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: factualExplanation,
        },
      },
      {
        "@type": "Question",
        name: `When were ${firm.name}'s rules last verified?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Rules were last verified on ${program.verifiedDate} directly from ${program.sourceUrl}.`,
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Preset Banner Header */}
      <div className="mb-8 p-4 rounded-lg bg-surface-elevated border border-accent-blue/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block mb-1">
            Pre-Filled Preset
          </span>
          <h1 className="font-display font-bold text-2xl text-text-primary">
            {firm.name} {tool.name}
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Pre-loaded with verified terms for <strong>{program.name}</strong>. All parameters can be overridden.
          </p>
        </div>
        <StalenessBadge verifiedDate={program.verifiedDate} />
      </div>

      {/* Factual Rule Structure Note */}
      <Callout variant="framework" className="mb-8">
        {factualExplanation}
      </Callout>

      {/* Embedded Calculator */}
      <div className="mb-12">{renderToolComponent(toolSlug)}</div>

      {/* Firm Rules Summary Table & Source Attribution */}
      <Card className="mb-12">
        <h2 className="font-display font-bold text-lg text-text-primary mb-4">
          {firm.name} {program.name} — Rules Summary
        </h2>

        <Table
          columns={[
            { key: "rule", header: "Rule Metric", align: "left" },
            { key: "value", header: "Published Value", numeric: true, align: "right" },
          ]}
          rows={[
            {
              rule: "Max Drawdown Allowance",
              value: program.maxDrawdownPct !== null ? `${program.maxDrawdownPct}%` : "Not published",
            },
            {
              rule: "Drawdown Type",
              value: program.maxDrawdownType ? program.maxDrawdownType.replace("_", " ") : "Not published",
            },
            {
              rule: "Daily Loss Limit",
              value: program.dailyLossPct !== null ? `${program.dailyLossPct}%` : "Not published",
            },
            {
              rule: "Profit Split",
              value: program.profitSplitPct !== null ? `${program.profitSplitPct}%` : "Not published",
            },
            {
              rule: "Payout Frequency",
              value: program.payoutFrequencyDays !== null ? `Every ${program.payoutFrequencyDays} days` : "Not published",
            },
          ]}
        />

        <div className="mt-4 pt-4 border-t border-border">
          <Disclosure
            source={new URL(program.sourceUrl).hostname}
            sourceUrl={program.sourceUrl}
            verifiedDate={program.verifiedDate}
          />
        </div>
      </Card>

      {/* Affiliate Link with Directly Adjacent AffiliateDisclosure */}
      {firm.affiliateUrl && (
        <Card className="mb-12 bg-surface-elevated/70 border-accent-blue/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-base text-text-primary">
                Visit {firm.name} Official Website
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Verify terms and launch your evaluation account directly on the firm&apos;s site.
              </p>
            </div>
            <a
              href={firm.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-md bg-accent-blue text-white font-mono text-xs font-bold hover:bg-accent-blue/90 transition-colors shrink-0"
            >
              Visit {firm.name} &rarr;
            </a>
          </div>

          {/* Adjacent Affiliate Disclosure Component (Not in footer) */}
          <div className="mt-4 pt-3 border-t border-border/60">
            <AffiliateDisclosure />
          </div>
        </Card>
      )}

      {/* Comparable Firms Section */}
      {comparableFirms.length > 0 && (
        <section className="pt-8 border-t border-border">
          <h3 className="font-display font-semibold text-base text-text-primary mb-4">
            Compare {tool.name} for Other Firms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comparableFirms.map((compFirm) => (
              <Link
                key={compFirm.slug}
                href={`/tools/${toolSlug}/${compFirm.slug}`}
                className="group block"
              >
                <Card className="hover:border-accent-blue/50 transition-colors">
                  <span className="font-mono text-[10px] uppercase text-text-muted block mb-1">
                    Preset Tool
                  </span>
                  <h4 className="font-display font-bold text-sm text-text-primary group-hover:text-accent-blue transition-colors">
                    {compFirm.name} {tool.name} &rarr;
                  </h4>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
