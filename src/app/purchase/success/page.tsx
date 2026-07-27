"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function PurchaseSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const sessionId = resolvedParams.session_id;
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    if (sessionId) {
      window.location.href = `/api/download?session_id=${encodeURIComponent(sessionId)}`;
    } else {
      window.location.href = `/survival-kit`;
    }
  };

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 text-left space-y-8">
      <Card className="max-w-xl mx-auto p-8 space-y-6 bg-surface-elevated border border-border">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-positive font-bold block">
            Payment Confirmed
          </span>
          <h1 className="font-display font-bold text-2xl text-text-primary">
            Thank You for Your Order
          </h1>
          <p className="text-xs text-text-muted leading-relaxed">
            Your purchase of the Prop Trading Survival Kit (PDF) has been processed successfully.
          </p>
        </div>

        <div className="p-4 rounded bg-surface-inset border border-border space-y-2 font-mono text-xs">
          <div className="flex justify-between text-text-muted">
            <span>Product:</span>
            <strong className="text-text-primary">Prop Trading Survival Kit</strong>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Price Paid:</span>
            <strong className="text-text-primary">£29.00</strong>
          </div>
          {sessionId && (
            <div className="flex justify-between text-text-muted truncate">
              <span>Session Ref:</span>
              <span className="text-text-muted/80 truncate max-w-[200px]">{sessionId}</span>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <Button variant="primary" size="lg" className="w-full" onClick={handleDownload} disabled={downloading}>
            {downloading ? "Preparing Signed PDF..." : "Download PDF Manual Now &rarr;"}
          </Button>

          <p className="text-[11px] font-mono text-text-muted text-center">
            A download link has also been sent to your email address. Downloads are valid for 15 minutes and capped at 5 attempts per purchase.
          </p>
        </div>

        <div className="pt-4 border-t border-border flex justify-between items-center text-xs font-mono text-text-muted">
          <Link href="/purchase/resend" className="hover:text-accent-blue transition-colors">
            Request Fresh Link
          </Link>
          <Link href="/" className="hover:text-accent-blue transition-colors">
            Return to PropBench &rarr;
          </Link>
        </div>
      </Card>
    </div>
  );
}
