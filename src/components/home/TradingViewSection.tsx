import React from "react";
import { Button } from "@/components/ui/Button";

const TRADINGVIEW_AFFILIATE_URL = "https://www.tradingview.com/?aff_id=165855";

/**
 * TradingView Section Component — Custom dark corporate card featuring TradingView's
 * iconic branding, visual styling, logo mark, and charting integration benefits.
 */
export function TradingViewSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#131722] border border-slate-800 p-8 sm:p-12 text-white shadow-2xl text-left">
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2434_1px,transparent_1px),linear-gradient(to_bottom,#1f2434_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column — Text & Copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            {/* TradingView Iconic Logo Mark SVG */}
            <div className="flex items-center gap-2 bg-[#1E222D] border border-slate-700/60 px-3 py-1.5 rounded-lg">
              <svg
                width="24"
                height="16"
                viewBox="0 0 36 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 4L4 12H10V20L18 12H12V4Z"
                  fill="#2962FF"
                />
                <path
                  d="M24 4L16 12H22V20L30 12H24V4Z"
                  fill="#00E676"
                />
              </svg>
              <span className="font-display font-extrabold text-sm tracking-wider text-white uppercase">
                TradingView
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
              Technical Charting Partner
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Visualize PropBench risk floors directly on TradingView charts.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
            Pair PropBench calculation models with TradingView&apos;s world-class charting engine. Map maximum daily loss limits, drawdown breach thresholds, and exact position size stop levels directly onto live market price action.
          </p>

          {/* Feature Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#1E222D] border border-slate-800">
              <span className="text-[#2962FF] font-bold text-sm">✓</span>
              <div>
                <strong className="text-white block font-semibold">Drawdown Overlay</strong>
                <span className="text-slate-400 text-[11px]">Plot static &amp; trailing floors</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#1E222D] border border-slate-800">
              <span className="text-[#00E676] font-bold text-sm">✓</span>
              <div>
                <strong className="text-white block font-semibold">Position Sizing</strong>
                <span className="text-slate-400 text-[11px]">Exact pip &amp; lot size calculation</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#1E222D] border border-slate-800">
              <span className="text-[#2962FF] font-bold text-sm">✓</span>
              <div>
                <strong className="text-white block font-semibold">Pine Script Ready</strong>
                <span className="text-slate-400 text-[11px]">Export level coordinates</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#1E222D] border border-slate-800">
              <span className="text-[#00E676] font-bold text-sm">✓</span>
              <div>
                <strong className="text-white block font-semibold">Global Markets</strong>
                <span className="text-slate-400 text-[11px]">Forex, Futures, Indices &amp; Commodities</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={TRADINGVIEW_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block"
            >
              <Button
                variant="primary"
                size="lg"
                className="bg-[#2962FF] hover:bg-[#1E52D8] text-white border-0 shadow-lg font-semibold"
              >
                Open Charts on TradingView &rarr;
              </Button>
            </a>
            <span className="text-[11px] font-mono text-slate-400">
              Free &amp; Pro chart accounts supported
            </span>
          </div>
        </div>

        {/* Right Column — Simulated TradingView Chart Widget Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-[#1E222D] border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4 text-left font-mono text-xs">
            {/* Widget Bar Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">EURUSD</span>
                <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">1D</span>
                <span className="text-[10px] text-emerald-400 font-bold">1.08450</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase">TradingView Engine</span>
            </div>

            {/* Simulated Chart Candlestick Visual Graphic */}
            <div className="h-40 bg-[#131722] rounded-lg p-3 relative overflow-hidden flex flex-col justify-between border border-slate-800">
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>R:R 1:2.5</span>
                <span>PropBench Overlay</span>
              </div>

              {/* Simulated Level Lines */}
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between text-[10px] border-b border-dashed border-emerald-500/60 pb-1 text-emerald-400">
                  <span>Target Floor (+8%)</span>
                  <span>1.09250</span>
                </div>
                <div className="flex items-center justify-between text-[10px] border-b border-solid border-[#2962FF]/80 pb-1 text-blue-400">
                  <span>Current Entry Position</span>
                  <span>1.08450</span>
                </div>
                <div className="flex items-center justify-between text-[10px] border-b border-dashed border-rose-500/80 pb-1 text-rose-400">
                  <span>Max Drawdown Breach Level (-10%)</span>
                  <span>1.07450</span>
                </div>
              </div>

              <div className="text-[9px] text-slate-500 text-right">
                Live Data Feed • TradingView
              </div>
            </div>

            {/* Bottom Callout in Card */}
            <div className="p-3 rounded bg-[#131722] border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Risk Per Trade: 1.0%</span>
              <span className="text-[#00E676] font-bold">Passed Verification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
