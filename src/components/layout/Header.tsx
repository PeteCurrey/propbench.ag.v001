import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/firms/ftmo", label: "Firms" },
  { href: "/guides", label: "Guides" },
  { href: "/survival-kit", label: "Survival Kit" },
] as const;

/**
 * Site header — Signal Centre style sticky light navbar with corporate CTAs.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 header-backdrop bg-white/90">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" aria-label="PropBench home" className="hover:opacity-90 transition-opacity">
            <Wordmark size="md" />
          </Link>

          {/* Primary nav */}
          <nav aria-label="Primary navigation">
            <ul className="hidden sm:flex items-center gap-8 list-none">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs font-mono tracking-wide uppercase text-slate-600 hover:text-slate-900 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                Dashboard &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
