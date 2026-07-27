"use client";

import type { Metadata } from "next";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/ui/Stat";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { Disclosure } from "@/components/ui/Disclosure";

/* ─── Section helper ─────────────────────────────────────────────────────── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 border-b border-border last:border-0">
      <h2 className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start gap-4">{children}</div>
  );
}

/* ─── Example table data ─────────────────────────────────────────────────── */
type ExampleRow = {
  firm: string;
  accountSize: number | null;
  drawdown: number | null;
  published: string;
};

const exampleRows: ExampleRow[] = [
  {
    firm: "Example Firm A [example]",
    accountSize: 100000,
    drawdown: 10,
    published: "Yes",
  },
  {
    firm: "Example Firm B [example]",
    accountSize: 50000,
    drawdown: null,
    published: "Not published",
  },
  {
    firm: "Example Firm C [example]",
    accountSize: 200000,
    drawdown: 8,
    published: "Yes",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function KitchenSinkPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16">
      {/* Page header */}
      <div className="mb-16 pb-8 border-b border-border">
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">
          /kitchen-sink — noindex
        </p>
        <h1 className="font-display font-extrabold text-4xl text-text-primary tracking-tight mb-2">
          Component Gallery
        </h1>
        <p className="text-text-muted text-sm max-w-xl">
          Every UI primitive in every variant. All values marked{" "}
          <span className="font-mono text-accent">[example]</span> are
          demonstration data only — not real firm data.
        </p>
      </div>

      {/* ── 1. Brand ───────────────────────────────────────────────────── */}
      <Section title="1 · Brand · Wordmark">
        <Row>
          <div className="flex flex-col gap-6">
            <div className="flex items-end gap-8 flex-wrap">
              <div>
                <p className="font-mono text-[10px] text-text-muted mb-2">size=sm</p>
                <Wordmark size="sm" />
              </div>
              <div>
                <p className="font-mono text-[10px] text-text-muted mb-2">size=md</p>
                <Wordmark size="md" />
              </div>
              <div>
                <p className="font-mono text-[10px] text-text-muted mb-2">size=lg</p>
                <Wordmark size="lg" />
              </div>
            </div>
          </div>
        </Row>
      </Section>

      {/* ── 2. Button ──────────────────────────────────────────────────── */}
      <Section title="2 · Button">
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-mono text-[10px] text-text-muted mb-3">Variants</p>
            <Row>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </Row>
          </div>
          <div>
            <p className="font-mono text-[10px] text-text-muted mb-3">Sizes — primary</p>
            <Row>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </Row>
          </div>
          <div>
            <p className="font-mono text-[10px] text-text-muted mb-3">Disabled state</p>
            <Row>
              <Button variant="primary" disabled>Primary disabled</Button>
              <Button variant="secondary" disabled>Secondary disabled</Button>
              <Button variant="ghost" disabled>Ghost disabled</Button>
            </Row>
          </div>
        </div>
      </Section>

      {/* ── 3. Card ────────────────────────────────────────────────────── */}
      <Section title="3 · Card">
        <Row>
          <Card className="w-64">
            <p className="font-mono text-[10px] text-text-muted mb-1">variant=default</p>
            <p className="text-sm text-text-primary">bg-raised card content</p>
          </Card>
          <Card variant="inset" className="w-64">
            <p className="font-mono text-[10px] text-text-muted mb-1">variant=inset</p>
            <p className="text-sm text-text-primary">bg-inset card content</p>
          </Card>
        </Row>
      </Section>

      {/* ── 4. Input ───────────────────────────────────────────────────── */}
      <Section title="4 · Input">
        <div className="flex flex-col gap-6 max-w-sm">
          <Input
            id="input-default"
            label="Default input"
            placeholder="Enter a value"
          />
          <Input
            id="input-error"
            label="Error state"
            placeholder="Enter a value"
            defaultValue="bad value"
            error="This field is required and must be valid."
          />
        </div>
      </Section>

      {/* ── 5. Select ──────────────────────────────────────────────────── */}
      <Section title="5 · Select">
        <div className="flex flex-col gap-6 max-w-sm">
          <Select
            id="select-default"
            label="Account type [example]"
            options={[
              { value: "", label: "Select an option" },
              { value: "challenge", label: "Challenge account" },
              { value: "funded", label: "Funded account" },
              { value: "instant", label: "Instant funding" },
            ]}
          />
          <Select
            id="select-error"
            label="Error state"
            error="Please select an option."
            options={[
              { value: "", label: "Select an option" },
              { value: "a", label: "Option A" },
            ]}
          />
        </div>
      </Section>

      {/* ── 6. NumberInput ─────────────────────────────────────────────── */}
      <Section title="6 · NumberInput">
        <div className="flex flex-col gap-6 max-w-sm">
          <NumberInput
            id="num-balance"
            label="Account balance [example]"
            placeholder="100000"
            unit="USD"
          />
          <NumberInput
            id="num-risk"
            label="Risk per trade [example]"
            placeholder="1.0"
            unit="%"
          />
          <NumberInput
            id="num-error"
            label="Error state"
            placeholder="0"
            unit="USD"
            error="Value must be greater than zero."
          />
        </div>
      </Section>

      {/* ── 7. Stat ────────────────────────────────────────────────────── */}
      <Section title="7 · Stat">
        <Row>
          <Stat value="$10,000" label="Account size [example]" state="neutral" />
          <Stat value="4.2%" label="Drawdown used [example]" state="positive" sub="Safe zone" />
          <Stat value="7.8%" label="Drawdown used [example]" state="warning" sub="Warning zone" />
          <Stat value="10.1%" label="Drawdown used [example]" state="danger" sub="Breach" />
          <Stat value={null} label="Max daily loss [example]" />
        </Row>
        <p className="mt-4 text-[11px] text-text-muted/60 font-mono">
          Null value → em-dash (Rule 1: no hardcoded fallback)
        </p>
      </Section>

      {/* ── 8. Callout ─────────────────────────────────────────────────── */}
      <Section title="8 · Callout">
        <div className="flex flex-col gap-4 max-w-xl">
          <Callout variant="insight" title="How trailing drawdown works [example]">
            Trailing drawdown follows your peak balance, not your starting
            balance. The breach level rises as your account grows.
          </Callout>
          <Callout variant="warning" title="Verify with your firm [example]">
            Rules shown here reflect published terms as of the verified date.
            Firms can change rules without notice — always check your T&Cs.
          </Callout>
          <Callout variant="framework" title="Framework note [example]">
            This calculation uses the standard EOD drawdown model. Your firm
            may use a different measurement window.
          </Callout>
        </div>
      </Section>

      {/* ── 9. Table ───────────────────────────────────────────────────── */}
      <Section title="9 · Table">
        <Table<ExampleRow>
          caption="Example firm comparison — all values are demonstration data only"
          columns={[
            { key: "firm", header: "Firm", align: "left" },
            {
              key: "accountSize",
              header: "Account size [example]",
              numeric: true,
              align: "right",
              render: (v) =>
                v === null ? (
                  <span className="text-text-muted/50 italic text-xs">
                    Not published by this firm — verify in your T&amp;Cs
                  </span>
                ) : (
                  `$${Number(v).toLocaleString()}`
                ),
            },
            {
              key: "drawdown",
              header: "Max drawdown [example]",
              numeric: true,
              align: "right",
              render: (v) =>
                v === null ? (
                  <span className="text-text-muted/50 italic text-xs">
                    Not published by this firm — verify in your T&amp;Cs
                  </span>
                ) : (
                  `${v}%`
                ),
            },
            { key: "published", header: "Published", align: "center" },
          ]}
          rows={exampleRows}
        />
        <p className="mt-2 text-[11px] text-text-muted/60 font-mono">
          Null → "Not published by this firm" (Rule 3: no inferred values)
        </p>
      </Section>

      {/* ── 10. Disclosure ─────────────────────────────────────────────── */}
      <Section title="10 · Disclosure">
        <div className="flex flex-col gap-6 max-w-xl">
          <Card>
            <p className="text-sm text-text-primary mb-2">
              Max daily drawdown: 5% [example]
            </p>
            <Disclosure
              source="Example Firm A — Terms & Conditions [example]"
              sourceUrl="https://example.com/terms"
              verifiedDate="2025-01-15"
            />
          </Card>
          <Card>
            <p className="text-sm text-text-primary mb-2">
              Trailing drawdown model [example]
            </p>
            <Disclosure
              source="Example Firm B — FAQ [example]"
              sourceUrl="https://example.com/faq"
              verifiedDate="2025-03-01"
            />
          </Card>
        </div>
      </Section>

      {/* ── 11. Colour tokens ──────────────────────────────────────────── */}
      <Section title="11 · Colour tokens">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { name: "bg-base", cls: "bg-bg-base", hex: "#0A0A0B" },
            { name: "bg-raised", cls: "bg-bg-raised", hex: "#131315" },
            { name: "bg-inset", cls: "bg-bg-inset", hex: "#0E0E10" },
            { name: "border", cls: "bg-border", hex: "#232326" },
            { name: "text-primary", cls: "bg-text-primary", hex: "#F4F4F5" },
            { name: "text-muted", cls: "bg-text-muted", hex: "#8A8A93" },
            { name: "accent", cls: "bg-accent", hex: "#D9A441" },
            { name: "accent-dim", cls: "bg-accent-dim", hex: "#8A6A2B" },
            { name: "positive", cls: "bg-positive", hex: "#4ADE80" },
            { name: "warning", cls: "bg-warning", hex: "#FBBF24" },
            { name: "danger", cls: "bg-danger", hex: "#F87171" },
          ].map(({ name, cls, hex }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <div
                className={`h-10 rounded-md border border-border ${cls}`}
              />
              <p className="font-mono text-[10px] text-text-muted">{name}</p>
              <p className="font-mono text-[10px] text-text-muted/50">{hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 12. Typography ─────────────────────────────────────────────── */}
      <Section title="12 · Typography">
        <div className="flex flex-col gap-4 max-w-xl">
          <p className="font-display font-extrabold text-4xl tracking-tighter text-text-primary">
            Syne 800 — Display heading
          </p>
          <p className="font-display font-semibold text-2xl tracking-tight text-text-primary">
            Syne 600 — Sub-heading
          </p>
          <p className="font-body font-normal text-base text-text-primary">
            DM Sans 400 — Body text. Traders use these tools on phones mid-session.
          </p>
          <p className="font-body font-medium text-base text-text-muted">
            DM Sans 500 — Body medium, muted.
          </p>
          <p className="font-mono text-base text-text-primary tabular-nums" data-numeric>
            DM Mono 400 — 100,000.00 USD — all numeric output
          </p>
          <p className="font-mono font-medium text-base text-accent tabular-nums" data-numeric>
            DM Mono 500 — $1,234.56 — accented numeric
          </p>
        </div>
      </Section>
    </div>
  );
}
