import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";

/* ─── Fonts (self-hosted woff2, downloaded from Google Fonts) ────────────── */

const syne = localFont({
  src: [{ path: "./fonts/syne.woff2", weight: "600 800", style: "normal" }],
  variable: "--font-syne",
  display: "swap",
  preload: true,
});

const dmSans = localFont({
  src: [{ path: "./fonts/dm-sans.woff2", weight: "400 500", style: "normal" }],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

const dmMono = localFont({
  src: [
    { path: "./fonts/dm-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-mono",
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
    "[PLACEHOLDER: PropBench proprietary trading firm calculators, drawdown floor verification, and risk management analytics.]",
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
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        {/* Preload critical self-hosted woff2 fonts */}
        <link rel="preload" href="/fonts/syne.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/dm-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/dm-mono-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
