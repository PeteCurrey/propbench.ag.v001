import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { AffiliateDisclosure } from "@/components/layout/AffiliateDisclosure";

/**
 * Site footer — Signal Centre style corporate footer with persistent FCA risk warning.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 mt-24 bg-slate-50/50">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col gap-8 text-left">
          <Wordmark size="md" />

          {/* Persistent Risk Warning Notice */}
          <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-sm space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold">
              Persistent Risk Warning Notice
            </p>
            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              Prop trading firm evaluations and trading leveraged financial instruments involve significant risk of capital loss. All calculation logic on PropBench is provided strictly for educational and analytical reference purposes. PropBench does not offer investment advice, financial promotion, or performance guarantees. Always verify firm parameters against official T&amp;Cs prior to entry.
            </p>
          </div>

          <AffiliateDisclosure />

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 text-xs font-mono text-slate-500">
            <div className="flex flex-wrap gap-4">
              <Link href="/disclaimer" className="hover:text-slate-900 transition-colors">
                Disclaimer
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/affiliate-disclosure" className="hover:text-slate-900 transition-colors">
                Affiliate Disclosure
              </Link>
              <span>•</span>
              <Link href="/survival-kit" className="hover:text-slate-900 transition-colors">
                Survival Kit (PDF)
              </Link>
            </div>

            <p className="text-[11px] text-slate-400">
              &copy; {new Date().getFullYear()} PropBench. All rights reserved. Pure Calculation Engine.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
