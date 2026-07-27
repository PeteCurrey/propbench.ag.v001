import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getFirm, firms } from "@/data/firms/index";
import type { FirmProgram } from "@/data/firms/schema";
import { Stat } from "@/components/ui/Stat";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Disclosure } from "@/components/ui/Disclosure";
import { StalenessBadge } from "@/components/ui/StalenessBadge";

/* ─── Static params ───────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return firms.map((f) => ({ slug: f.slug }));
}

/* ─── Metadata ────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const firm = getFirm(slug);
  if (!firm) return {};
  return {
    title: firm.name,
    robots: "index, follow",
  };
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const NOT_PUBLISHED =
  "Not published by this firm — verify in your T&Cs";

function NullValue() {
  return (
    <span className="text-text-muted/50 italic text-sm">{NOT_PUBLISHED}</span>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-border last:border-0">
      <dt className="text-xs font-mono uppercase tracking-widest text-text-muted sm:w-52 shrink-0 pt-0.5">
        {label}
      </dt>
      <dd className="flex-1">{children}</dd>
    </div>
  );
}

function BoolValue({ value }: { value: boolean | null }) {
  if (value === null) return <NullValue />;
  return (
    <span
      className={`font-mono text-sm ${value ? "text-positive" : "text-danger"}`}
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

function ProgramDetail({ program }: { program: FirmProgram }) {
  return (
    <Card className="mb-8">
      {/* Program header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6 pb-4 border-b border-border">
        <div>
          <h2 className="font-display font-semibold text-xl text-text-primary tracking-tight">
            {program.name}
          </h2>
          <p className="text-xs font-mono text-text-muted mt-1">
            {program.currency} ·{" "}
            {program.accountSizes
              .map((s) => `$${s.toLocaleString()}`)
              .join(", ")}
          </p>
        </div>
        <StalenessBadge verifiedDate={program.verifiedDate} />
      </div>

      {/* Phases */}
      <section aria-labelledby={`phases-${program.slug}`} className="mb-6">
        <h3
          id={`phases-${program.slug}`}
          className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-3"
        >
          Phases
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {program.phases.map((phase, i) => (
            <Card key={i} variant="inset" className="flex flex-col gap-3">
              <p className="text-xs font-mono uppercase tracking-widest text-text-muted">
                Phase {i + 1} — {phase.name}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <Stat
                  value={
                    phase.profitTargetPct !== null
                      ? `${phase.profitTargetPct}%`
                      : null
                  }
                  label="Profit target"
                />
                <Stat
                  value={
                    phase.minTradingDays !== null
                      ? `${phase.minTradingDays}d`
                      : null
                  }
                  label="Min days"
                />
                <Stat
                  value={
                    phase.maxDays !== null ? `${phase.maxDays}d` : null
                  }
                  label="Max days"
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* All rule fields */}
      <section aria-labelledby={`rules-${program.slug}`}>
        <h3
          id={`rules-${program.slug}`}
          className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-3"
        >
          Published rules
        </h3>

        <dl>
          <FieldRow label="Max drawdown">
            {program.maxDrawdownPct !== null ? (
              <span className="font-mono text-sm text-text-primary">
                {program.maxDrawdownPct}%
                {program.maxDrawdownType && (
                  <span className="text-text-muted ml-2">
                    ({program.maxDrawdownType.replace(/_/g, " ")},{" "}
                    {program.maxDrawdownBasis ?? "basis not published"})
                  </span>
                )}
              </span>
            ) : (
              <NullValue />
            )}
          </FieldRow>

          <FieldRow label="Daily loss limit">
            {program.dailyLossPct !== null ? (
              <span className="font-mono text-sm text-text-primary">
                {program.dailyLossPct}%
                {program.dailyLossBasis && (
                  <span className="text-text-muted ml-2">
                    (of {program.dailyLossBasis})
                  </span>
                )}
              </span>
            ) : (
              <NullValue />
            )}
          </FieldRow>

          <FieldRow label="Daily reset">
            {program.dailyResetTime !== null ? (
              <span className="font-mono text-sm text-text-primary">
                {program.dailyResetTime}{" "}
                {program.dailyResetTimezone ?? ""}
              </span>
            ) : (
              <NullValue />
            )}
          </FieldRow>

          <FieldRow label="Consistency rule">
            {program.consistencyRulePct !== null ? (
              <span className="font-mono text-sm text-text-primary">
                {program.consistencyRulePct}%
              </span>
            ) : (
              <NullValue />
            )}
          </FieldRow>

          <FieldRow label="Profit split">
            {program.profitSplitPct !== null ? (
              <span className="font-mono text-sm text-text-primary">
                {program.profitSplitPct}% to trader
              </span>
            ) : (
              <NullValue />
            )}
          </FieldRow>

          <FieldRow label="Payout frequency">
            {program.payoutFrequencyDays !== null ? (
              <span className="font-mono text-sm text-text-primary">
                Every {program.payoutFrequencyDays} days
              </span>
            ) : (
              <NullValue />
            )}
          </FieldRow>

          <FieldRow label="News trading">
            <BoolValue value={program.newsTradingAllowed} />
          </FieldRow>

          <FieldRow label="Weekend holding">
            <BoolValue value={program.weekendHoldingAllowed} />
          </FieldRow>
        </dl>
      </section>

      {/* Source disclosure */}
      <div className="mt-6 pt-4 border-t border-border">
        <Disclosure
          source={new URL(program.sourceUrl).hostname}
          sourceUrl={program.sourceUrl}
          verifiedDate={program.verifiedDate}
        />
      </div>
    </Card>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function FirmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const firm = getFirm(slug);

  if (!firm) {
    notFound();
  }

  const linkUrl = firm.affiliateUrl ?? firm.websiteUrl;

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16">
      {/* Page header */}
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          Firms /
        </p>
        <h1 className="font-display font-extrabold text-4xl text-text-primary tracking-tight mb-4">
          {firm.name}
        </h1>
        <p className="text-sm text-text-muted">
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="underline underline-offset-2 hover:text-text-primary transition-colors"
          >
            {linkUrl}
          </a>
        </p>
      </div>

      {/* Risk / data-accuracy callout */}
      <Callout variant="framework" className="mb-10">
        All figures below are sourced directly from this firm&apos;s published
        terms. Fields marked &ldquo;{NOT_PUBLISHED}&rdquo; are absent from the
        firm&apos;s public documentation — they are not inferred or estimated.
        Always verify current rules in your own account T&amp;Cs before trading.
      </Callout>

      {/* Programs */}
      {firm.programs.map((program) => (
        <ProgramDetail key={program.slug} program={program} />
      ))}
    </div>
  );
}
