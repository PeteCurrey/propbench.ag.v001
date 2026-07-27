"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function PurchaseResendPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/resend-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to request link.");
      }

      setMessage(data.message || "Fresh download link sent to your email.");
      setEmail("");
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || "Failed to request link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 text-left space-y-8">
      <Card className="max-w-md mx-auto p-8 space-y-6 bg-surface-elevated border border-border">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block mb-1">
            Download Link Recovery
          </span>
          <h1 className="font-display font-bold text-2xl text-text-primary">
            Request Fresh Download Link
          </h1>
          <p className="text-xs text-text-muted mt-2 leading-relaxed">
            If your 15-minute download token expired or you reached the 5-download cap, enter the email address used during purchase to receive a fresh link.
          </p>
        </div>

        {message && (
          <div className="p-3 rounded bg-positive/10 border border-positive/30 text-positive font-mono text-xs">
            {message}
          </div>
        )}

        {error && (
          <div className="p-3 rounded bg-danger/10 border border-danger/30 text-danger font-mono text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Purchaser Email Address"
            placeholder="buyer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button variant="primary" type="submit" className="w-full" disabled={loading}>
            {loading ? "Dispatching..." : "Send Fresh Download Link &rarr;"}
          </Button>
        </form>

        <div className="pt-4 border-t border-border text-center font-mono text-xs text-text-muted">
          <Link href="/survival-kit" className="hover:text-accent-blue transition-colors">
            &larr; Return to Survival Kit Product Page
          </Link>
        </div>
      </Card>
    </div>
  );
}
