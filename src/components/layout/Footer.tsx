import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { AffiliateDisclosure } from "@/components/layout/AffiliateDisclosure";

/**
 * Site footer — persistent FCA risk warning, affiliate disclosure, and legal disclosures.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-24 bg-surface-base">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-6 text-left">
          <Wordmark size="sm" />

          {/* Persistent Risk Warning Notice */}
          <div className="p-4 rounded-lg bg-surface-inset border border-border space-y-2">
            <p className="text-[10px] font-mono uppercase text-warning font-bold">
              Persistent Risk Warning Notice
            </p>
            <p className="text-[12px] text-text-muted/80 leading-relaxed">
              Prop trading firm evaluations and trading leveraged financial instruments involve significant risk of capital loss. All calculation logic on PropBench is provided strictly for educational and analytical reference purposes. PropBench does not offer investment advice, financial promotion, or performance guarantees. Always verify firm parameters against official T&amp;Cs prior to entry.
            </p>
          </div>

          <AffiliateDisclosure />

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap gap-4 pt-2 border-t border-border/60 text-xs font-mono text-text-muted">
            <Link href="/disclaimer" className="hover:text-accent-blue transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-accent-blue transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-accent-blue transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/affiliate-disclosure" className="hover:text-accent-blue transition-colors">
              Affiliate Disclosure
            </Link>
            <span>•</span>
            <Link href="/survival-kit" className="hover:text-accent-blue transition-colors">
              Survival Kit (PDF)
            </Link>
          </div>

          <p className="text-[11px] font-mono text-text-muted/50">
            &copy; {new Date().getFullYear()} PropBench. All rights reserved. Pure Calculation Engine.
          </p>
        </div>
      </div>
    </footer>
  );
}
