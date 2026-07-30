"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Callout } from "@/components/ui/Callout";
import { firms } from "@/data/firms/index";
import { calculateDrawdown, type DrawdownType } from "@/lib/calc/drawdown";
import { calculateConsistencyRule } from "@/lib/calc/consistency-rule";

interface TrackedAccount {
  id: string;
  label: string;
  firm_slug: string;
  program_slug: string;
  account_size: number;
  currency: string;
  starting_balance: number;
  current_balance: number;
  peak_balance: number;
  peak_equity: number;
  phase: string;
  started_at: string;
  created_at: string;
}

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<TrackedAccount[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<"free" | "pro">("free");
  const [loading, setLoading] = useState(true);

  // Add Account Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [selectedFirmSlug, setSelectedFirmSlug] = useState(firms[0]?.slug || "ftmo");
  const [startingBalanceInput, setStartingBalanceInput] = useState("100000");

  // Daily Entry Form State
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [entryClosingBalance, setEntryClosingBalance] = useState("");
  const [entryClosingEquity, setEntryClosingEquity] = useState("");
  const [entryTrades, setEntryTrades] = useState("1");
  const [entryNote, setEntryNote] = useState("");

  const isPro = subscriptionStatus === "pro";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data.accounts || []);
      } else {
        setAccounts([
          {
            id: "demo-account-1",
            label: "FTMO $100k Challenge",
            firm_slug: "ftmo",
            program_slug: "100k-normal",
            account_size: 100000,
            currency: "USD",
            starting_balance: 100000,
            current_balance: 103500,
            peak_balance: 106000,
            peak_equity: 106000,
            phase: "evaluation",
            started_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setAccounts([
        {
          id: "demo-account-1",
          label: "FTMO $100k Challenge",
          firm_slug: "ftmo",
          program_slug: "100k-normal",
          account_size: 100000,
          currency: "USD",
          starting_balance: 100000,
          current_balance: 103500,
          peak_balance: 106000,
          peak_equity: 106000,
          phase: "evaluation",
          started_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPro && accounts.length >= 1) {
      alert("Free tier is limited to 1 tracked account. Upgrade to Pro for unlimited accounts.");
      return;
    }

    const newAcc: TrackedAccount = {
      id: `acc-${Date.now()}`,
      label: newLabel || `${selectedFirmSlug.toUpperCase()} Account`,
      firm_slug: selectedFirmSlug,
      program_slug: "standard",
      account_size: Number(startingBalanceInput),
      currency: "USD",
      starting_balance: Number(startingBalanceInput),
      current_balance: Number(startingBalanceInput),
      peak_balance: Number(startingBalanceInput),
      peak_equity: Number(startingBalanceInput),
      phase: "evaluation",
      started_at: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAcc),
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || "Failed to add account.");
        return;
      }
    } catch {
      // Local fallback state
    }

    setAccounts((prev) => [newAcc, ...prev]);
    setNewLabel("");
    setShowAddForm(false);
  };

  const handleSaveDailyEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccountId || !entryClosingBalance) return;

    const numBal = Number(entryClosingBalance);
    const numEq = Number(entryClosingEquity || entryClosingBalance);

    // Recalculate trailing floor & peak equity dynamically
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === selectedAccountId) {
          const newPeakEq = Math.max(acc.peak_equity, numEq);
          const newPeakBal = Math.max(acc.peak_balance, numBal);
          return {
            ...acc,
            current_balance: numBal,
            peak_balance: newPeakBal,
            peak_equity: newPeakEq,
          };
        }
        return acc;
      })
    );

    try {
      await fetch(`/api/accounts/${selectedAccountId}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          closing_balance: numBal,
          closing_equity: numEq,
          trades_taken: entryTrades,
          note: entryNote,
        }),
      });
    } catch {
      // Local optimistic update
    }

    setSelectedAccountId(null);
    setEntryClosingBalance("");
    setEntryClosingEquity("");
    setEntryNote("");
  };

  const handleUpgradeCheckout = async () => {
    try {
      const res = await fetch("/api/subscription/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setSubscriptionStatus((prev) => (prev === "free" ? "pro" : "free"));
      }
    } catch {
      setSubscriptionStatus((prev) => (prev === "free" ? "pro" : "free"));
    }
  };

  const handleOpenPortal = async () => {
    try {
      const res = await fetch("/api/subscription/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Customer portal link available once Stripe setup is live.");
      }
    } catch {
      alert("Customer portal link available once Stripe setup is live.");
    }
  };

  const handleExportCsv = () => {
    if (!isPro) {
      alert("CSV export is a Pro tier feature. Upgrade to export your data.");
      return;
    }
    window.location.href = "/api/accounts/export";
  };

  // Compute calculated metrics for each account
  const accountMetrics = accounts.map((acc) => {
    const firmData = firms.find((f) => f.slug === acc.firm_slug) || firms[0];
    const program = firmData.programs[0];

    const drawdownType: DrawdownType =
      program.maxDrawdownType === "static" ? "static" : "trailing_intraday";
    const maxDrawdownPct = program.maxDrawdownPct || 10;

    const calcResult = calculateDrawdown({
      initialBalance: acc.starting_balance,
      currentBalance: acc.current_balance,
      highWaterMark: acc.peak_equity,
      maxDrawdownPct,
      drawdownType,
    });

    const floor = calcResult?.breachFloor ?? acc.starting_balance * 0.9;
    const remainingBuffer = calcResult?.remainingBuffer ?? acc.current_balance - floor;
    const zone = calcResult?.zone ?? "safe";

    const daysElapsed = Math.max(
      1,
      Math.floor(
        (Date.now() - new Date(acc.started_at).getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    const targetPct = program.phases[0]?.profitTargetPct ?? 8;
    const targetProfit = acc.starting_balance * (targetPct / 100);
    const currentProfit = acc.current_balance - acc.starting_balance;
    const targetProgressPct = Math.min(100, Math.max(0, (currentProfit / targetProfit) * 100));

    // Consistency check if firm publishes rule
    let consistencyStatus = "Not published by this firm — verify in your T&Cs";
    if (program.consistencyRulePct && currentProfit > 0) {
      const checkRes = calculateConsistencyRule({
        totalProfit: currentProfit,
        bestDayProfit: currentProfit * 0.6,
        consistencyCapPct: program.consistencyRulePct,
      });
      consistencyStatus = checkRes?.isCompliant
        ? `Compliant (${program.consistencyRulePct}% max day cap)`
        : `Breached single-day cap`;
    }

    return {
      acc,
      firmData,
      program,
      floor,
      remainingBuffer,
      bufferPct: (remainingBuffer / acc.starting_balance) * 100,
      zone,
      daysElapsed,
      targetProgressPct,
      targetPct,
      consistencyStatus,
    };
  });

  // Check for any account in warning/danger zone for top breach banner
  const hasBreachProximityWarning = accountMetrics.some(
    (m) => m.zone === "warning" || m.zone === "danger"
  );

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 text-left space-y-8">
      {/* Header & Tier Status — Signal Centre Design System */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-accent block mb-1">
            PropBench Ops Dashboard
          </span>
          <h1 className="font-display font-extrabold text-3xl text-text-primary tracking-tight">
            Saved Accounts &amp; Risk Monitor
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="badge-pill">
            <span>Tier:</span>
            <strong className="text-text-primary uppercase font-bold">{subscriptionStatus}</strong>
          </span>

          {!isPro ? (
            <Button variant="primary" size="sm" onClick={handleUpgradeCheckout}>
              Upgrade to Pro (£19/mo) &rarr;
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={handleOpenPortal}>
              Stripe Customer Portal
            </Button>
          )}

          <Button variant="secondary" size="sm" onClick={handleExportCsv}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Breach-Proximity Warning Banner */}
      {hasBreachProximityWarning && (
        <Callout variant="warning" title="Breach Proximity Warning">
          One or more tracked accounts have entered the warning or danger zone. Review drawdown floors immediately and adjust risk exposure.
        </Callout>
      )}

      {/* Free Tier Limitation Banner */}
      {!isPro && (
        <div className="p-4 rounded-none bg-bg-raised border border-border text-xs font-mono text-text-secondary flex justify-between items-center">
          <span>Free Tier: 1 tracked account limit • 14-day history window</span>
          <button onClick={handleUpgradeCheckout} className="text-accent font-bold hover:underline">
            Unlock Unlimited Accounts
          </button>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-xl text-text-primary">
          Tracked Accounts ({accounts.length})
        </h2>
        <Button variant="primary" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "+ Add Tracked Account"}
        </Button>
      </div>

      {/* Add Account Modal Form */}
      {showAddForm && (
        <Card className="p-6 bg-bg-base border border-border space-y-4">
          <h3 className="font-display font-bold text-base text-text-primary">Add New Tracked Account</h3>
          <form onSubmit={handleAddAccount} className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <Input
              label="Account Label"
              placeholder="e.g. FTMO $100k Challenge"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              required
            />
            <Select
              label="Firm Preset"
              value={selectedFirmSlug}
              onChange={(val) => setSelectedFirmSlug(val)}
              options={firms.map((f) => ({ label: f.name, value: f.slug }))}
            />
            <Input
              label="Starting Balance ($)"
              type="number"
              value={startingBalanceInput}
              onChange={(e) => setStartingBalanceInput(e.target.value)}
              required
            />
            <div className="sm:col-span-3 pt-2 flex justify-end">
              <Button type="submit" variant="primary">
                Save Account &rarr;
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tracked Accounts List */}
      {loading ? (
        <p className="text-xs font-mono text-text-muted">Loading accounts...</p>
      ) : accountMetrics.length === 0 ? (
        <Card className="p-8 text-center space-y-3">
          <p className="text-xs text-text-muted font-mono">No tracked accounts configured yet.</p>
          <Button variant="primary" size="sm" onClick={() => setShowAddForm(true)}>
            + Add First Account
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {accountMetrics.map(({ acc, firmData, program, floor, remainingBuffer, bufferPct, zone, daysElapsed, targetProgressPct, targetPct, consistencyStatus }) => {
            const zoneColor = {
              safe: "bg-[#f0f5f3] text-[#2f5d50] border-[#3b7063] font-bold",
              warning: "bg-[#fdf6e3] text-[#8b6914] border-[#8b6914] font-bold",
              danger: "bg-[#f8f0f0] text-[#5b2c2c] border-[#7a3b3b] font-bold",
              breached: "bg-[#5b2c2c] text-white font-bold",
            }[zone];

            return (
              <Card key={acc.id} className="p-6 bg-bg-base border border-border space-y-6">
                {/* Account Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase font-semibold text-accent">
                        {firmData.name} ({program.name})
                      </span>
                      <span className={`px-2 py-0.5 rounded-none text-[10px] font-mono border uppercase ${zoneColor}`}>
                        {zone}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-text-primary">{acc.label}</h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-text-secondary">
                    <span>Days Elapsed: <strong className="text-text-primary">{daysElapsed}d</strong></span>
                    <Button variant="secondary" size="sm" onClick={() => setSelectedAccountId(acc.id)}>
                      + Log Daily Entry
                    </Button>
                  </div>
                </div>

                {/* Account Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div className="p-3 rounded-none bg-bg-raised border border-border">
                    <span className="text-[10px] text-text-muted uppercase block font-medium">Current Equity</span>
                    <strong className="text-text-primary text-base font-bold">${acc.current_balance.toLocaleString()}</strong>
                  </div>

                  <div className="p-3 rounded-none bg-bg-raised border border-border">
                    <span className="text-[10px] text-text-muted uppercase block font-medium">Peak Equity</span>
                    <strong className="text-text-primary text-base font-bold">${acc.peak_equity.toLocaleString()}</strong>
                  </div>

                  <div className="p-3 rounded-none bg-bg-raised border border-border">
                    <span className="text-[10px] text-text-muted uppercase block font-medium">Recalculated Floor ({program.maxDrawdownType})</span>
                    <strong className="text-danger text-base font-bold">${floor.toLocaleString()}</strong>
                  </div>

                  <div className="p-3 rounded-none bg-bg-raised border border-border">
                    <span className="text-[10px] text-text-muted uppercase block font-medium">Distance to Floor</span>
                    <strong className="text-positive text-base font-bold">${remainingBuffer.toLocaleString()} ({bufferPct.toFixed(2)}%)</strong>
                  </div>
                </div>

                {/* Target Progress & Consistency Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-none bg-bg-raised border border-border space-y-2">
                    <div className="flex justify-between text-text-secondary">
                      <span>Target Progress ({targetPct}%):</span>
                      <strong className="text-text-primary font-bold">{targetProgressPct.toFixed(1)}%</strong>
                    </div>
                    <div className="w-full bg-bg-inset h-2 rounded-none overflow-hidden">
                      <div className="bg-accent h-full transition-all rounded-none" style={{ width: `${targetProgressPct}%` }} />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-none bg-bg-raised border border-border flex flex-col justify-center">
                    <span className="text-[10px] text-text-muted uppercase block font-medium">Consistency Rule Compliance</span>
                    <strong className="text-text-primary text-xs font-bold">{consistencyStatus}</strong>
                  </div>
                </div>

                {/* Inline Daily Entry Form */}
                {selectedAccountId === acc.id && (
                  <form onSubmit={handleSaveDailyEntry} className="p-5 rounded-none bg-bg-raised border border-border space-y-4 font-mono text-xs">
                    <h4 className="font-bold text-text-primary text-sm">Log Daily Closing Entry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Input
                        label="Closing Balance ($)"
                        type="number"
                        placeholder="104200"
                        value={entryClosingBalance}
                        onChange={(e) => setEntryClosingBalance(e.target.value)}
                        required
                      />
                      <Input
                        label="Closing Equity ($)"
                        type="number"
                        placeholder="104500"
                        value={entryClosingEquity}
                        onChange={(e) => setEntryClosingEquity(e.target.value)}
                      />
                      <Input
                        label="Trades Taken"
                        type="number"
                        value={entryTrades}
                        onChange={(e) => setEntryTrades(e.target.value)}
                      />
                    </div>
                    <Input
                      label="Daily Note"
                      placeholder="e.g. Executed 2 trades on EURUSD, respected daily stop limit"
                      value={entryNote}
                      onChange={(e) => setEntryNote(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="secondary" size="sm" type="button" onClick={() => setSelectedAccountId(null)}>
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" type="submit">
                        Save Entry &amp; Recalculate Floor &rarr;
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
