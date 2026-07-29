import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";

/* ─── Fonts — IBM Plex Sans + IBM Plex Mono (exact Signal Centre match) ─────
 *  Confirmed from live CSS bundle: signal-centre-ag-v001-one.vercel.app
 *  --font-sans: "IBM Plex Sans", system-ui, -apple-system, sans-serif
 *  --font-mono: "IBM Plex Mono", "Courier New", monospace
 * ─────────────────────────────────────────────────────────────────────────── */

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://propbench.com"
  ),
  title: {
    template: "%s | PropBench",
    default: "PropBench — Prop Trading Calculators & Risk Analytics",
  },
  description:
    "Pure calculation engines and rule verification analytics for proprietary trading firm evaluations. Model drawdown floors, position sizing, and risk probability.",
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── Root layout ────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased bg-white text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
