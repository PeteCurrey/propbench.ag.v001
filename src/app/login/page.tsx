"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const origin = window.location.origin;

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${origin}/dashboard`,
        },
      });

      if (signInError) throw signInError;

      setMessage("Magic link dispatched! Please check your email inbox to complete sign-in.");
      setEmail("");
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || "Failed to send magic link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 text-left space-y-8">
      <Card className="max-w-md mx-auto p-8 space-y-6 bg-surface-elevated border border-border">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block mb-1">
            Passwordless Magic Link
          </span>
          <h1 className="font-display font-bold text-2xl text-text-primary">
            Sign In to PropBench
          </h1>
          <p className="text-xs text-text-muted mt-2 leading-relaxed">
            Enter your email to receive a secure, one-click magic link. No passwords required.
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

        <form onSubmit={handleMagicLink} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="trader@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button variant="primary" type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending Link..." : "Send Magic Link &rarr;"}
          </Button>
        </form>

        <div className="pt-4 border-t border-border text-center font-mono text-xs text-text-muted">
          <Link href="/" className="hover:text-accent-blue transition-colors">
            &larr; Return to PropBench Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
