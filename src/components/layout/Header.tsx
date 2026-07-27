import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/firms", label: "Firms" },
  { href: "/pdf", label: "The PDF" },
] as const;

/**
 * Site header — sticky, backdrop-blurred, max-w-content centred.
 * Sign-in slot renders nothing for v1 (placeholder comment only).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border header-backdrop">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" aria-label="PropBench home">
            <Wordmark size="sm" />
          </Link>

          {/* Primary nav */}
          <nav aria-label="Primary navigation">
            <ul className="hidden sm:flex items-center gap-6 list-none">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors duration-150 font-body"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sign-in slot — renders nothing for v1 */}
          {/* <SignInButton /> */}
          <div aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
