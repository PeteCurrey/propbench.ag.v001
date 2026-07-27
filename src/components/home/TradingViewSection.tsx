import React from "react";
import { Button } from "@/components/ui/Button";

const TRADINGVIEW_AFFILIATE_URL = "https://www.tradingview.com/?aff_id=165855";

/**
 * TradingView Section Component — Custom dark corporate section built using official TradingView
 * brand identity, official TV vector logo mark, signature TradingView Blue (#2962FF), and authentic
 * candlestick chart visual elements.
 */
export function TradingViewSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#131722] border border-[#2A2E39] p-8 sm:p-12 text-white shadow-2xl text-left">
      {/* TradingView Dark Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E222D_1px,transparent_1px),linear-gradient(to_bottom,#1E222D_1px,transparent_1px)] bg-[size:1.75rem_1.75rem] opacity-50 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column — Brand Header, Copy, Features & CTA */}
        <div className="lg:col-span-7 space-y-6">
          {/* Official TradingView Logo Badge */}
          <div className="flex items-center gap-3">
            <a
              href={TRADINGVIEW_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-3 bg-[#1E222D] hover:bg-[#2A2E39] border border-[#2A2E39] px-4 py-2 rounded-xl transition-colors group"
            >
              {/* Official TradingView Logo Mark SVG */}
              <svg
                width="36"
                height="24"
                viewBox="0 0 36 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                aria-label="TradingView Logo"
              >
                <path
                  d="M12 0H0V6H12V0ZM24 0H36V6H24V0ZM12 6H24V24H18V12H12V6Z"
                  fill="#2962FF"
                />
                <path d="M0 6H6V24H0V6Z" fill="#FFFFFF" />
              </svg>
              <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                TradingView
              </span>
            </a>

            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 bg-[#1E222D] px-3 py-1.5 rounded-lg border border-[#2A2E39]">
              Technical Charting Engine
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Overlay PropBench risk floors onto official TradingView charts.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
            Connect PropBench&apos;s pure calculation models with TradingView&apos;s world-leading financial charting platform. Plot static and trailing drawdown breach levels, daily loss boundaries, and exact position stop distances directly on live market candles.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1E222D] border border-[#2A2E39]">
              <span className="text-[#2962FF] font-bold text-base mt-0.5">◆</span>
              <div>
                <strong className="text-white block font-semibold text-sm">Drawdown Levels</strong>
                <span className="text-slate-400 text-[11px]">Static &amp; trailing floor overlays</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1E222D] border border-[#2A2E39]">
              <span className="text-[#089981] font-bold text-base mt-0.5">◆</span>
              <div>
                <strong className="text-white block font-semibold text-sm">Position Sizing</strong>
                <span className="text-slate-400 text-[11px]">Exact pip &amp; lot size calculation</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1E222D] border border-[#2A2E39]">
              <span className="text-[#2962FF] font-bold text-base mt-0.5">◆</span>
              <div>
                <strong className="text-white block font-semibold text-sm">Pine Script™ Export</strong>
                <span className="text-slate-400 text-[11px]">Custom indicator level scripts</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1E222D] border border-[#2A2E39]">
              <span className="text-[#089981] font-bold text-base mt-0.5">◆</span>
              <div>
                <strong className="text-white block font-semibold text-sm">Multi-Asset Feeds</strong>
                <span className="text-slate-400 text-[11px]">Forex, Futures, Stock &amp; Crypto</span>
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
                className="bg-[#2962FF] hover:bg-[#1E52D8] text-white border-0 shadow-lg font-semibold px-6 py-3"
              >
                Open TradingView Platform &rarr;
              </Button>
            </a>
            <span className="text-[11px] font-mono text-slate-400">
              Free &amp; Premium accounts supported
            </span>
          </div>
        </div>

        {/* Right Column — Authentic TradingView Chart Window Graphic */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-[#1E222D] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden text-left font-mono text-xs">
            {/* TradingView Top Chart Bar Header */}
            <div className="flex items-center justify-between bg-[#131722] border-b border-[#2A2E39] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white text-sm">EURUSD</span>
                <span className="text-[10px] text-slate-300 px-2 py-0.5 rounded bg-[#1E222D] border border-[#2A2E39]">
                  1D
                </span>
                <span className="text-[11px] text-[#089981] font-bold">
                  1.08450 <span className="text-[9px] text-[#089981] font-normal">+0.31%</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-[#1E222D] border border-[#2A2E39] text-[#2962FF] font-bold">
                  ƒ(x) Risk Overlay
                </span>
              </div>
            </div>

            {/* TradingView Ticker Ribbon */}
            <div className="flex items-center gap-3 bg-[#181C27] border-b border-[#2A2E39] px-4 py-2 text-[10px] text-slate-400 overflow-x-auto">
              <span className="text-white font-bold">EURUSD</span>
              <span className="text-emerald-400">1.08450</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">GBPUSD</span>
              <span className="text-emerald-400">1.29820</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">US500</span>
              <span className="text-rose-400">5420.5</span>
            </div>

            {/* TradingView Authentic Candlestick Chart Canvas Visual */}
            <div className="h-56 bg-[#131722] p-4 relative flex flex-col justify-between overflow-hidden">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E222D_1px,transparent_1px),linear-gradient(to_bottom,#1E222D_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-60" />

              {/* Candlestick SVG Graphic */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
                preserveAspectRatio="none"
                viewBox="0 0 400 160"
              >
                {/* Candle 1 (Green) */}
                <line x1="40" y1="90" x2="40" y2="130" stroke="#089981" strokeWidth="1.5" />
                <rect x="35" y="100" width="10" height="20" fill="#089981" />

                {/* Candle 2 (Red) */}
                <line x1="80" y1="80" x2="80" y2="120" stroke="#F23645" strokeWidth="1.5" />
                <rect x="75" y="90" width="10" height="25" fill="#F23645" />

                {/* Candle 3 (Green) */}
                <line x1="120" y1="60" x2="120" y2="110" stroke="#089981" strokeWidth="1.5" />
                <rect x="115" y="70" width="10" height="30" fill="#089981" />

                {/* Candle 4 (Green) */}
                <line x1="160" y1="40" x2="160" y2="90" stroke="#089981" strokeWidth="1.5" />
                <rect x="155" y="50" width="10" height="30" fill="#089981" />

                {/* Candle 5 (Red) */}
                <line x1="200" y1="45" x2="200" y2="85" stroke="#F23645" strokeWidth="1.5" />
                <rect x="195" y="55" width="10" height="20" fill="#F23645" />

                {/* Candle 6 (Green) */}
                <line x1="240" y1="30" x2="240" y2="75" stroke="#089981" strokeWidth="1.5" />
                <rect x="235" y="40" width="10" height="25" fill="#089981" />

                {/* Candle 7 (Green - Current) */}
                <line x1="280" y1="20" x2="280" y2="65" stroke="#089981" strokeWidth="1.5" />
                <rect x="275" y="30" width="10" height="25" fill="#089981" />

                {/* PropBench Overlay Horizontal Price Lines */}
                {/* Profit Target Line */}
                <line x1="0" y1="25" x2="400" y2="25" stroke="#089981" strokeWidth="1.5" strokeDasharray="4 4" />
                
                {/* Entry Level Line */}
                <line x1="0" y1="65" x2="400" y2="65" stroke="#2962FF" strokeWidth="2" />
                
                {/* Max Loss Breach Line */}
                <line x1="0" y1="135" x2="400" y2="135" stroke="#F23645" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>

              {/* Price Tag Labels Overlay */}
              <div className="relative z-10 space-y-7">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="bg-[#089981]/20 text-[#089981] border border-[#089981]/50 px-2 py-0.5 rounded font-semibold">
                    Target Profit (+8.0%)
                  </span>
                  <span className="font-bold text-[#089981] bg-[#131722]/90 px-1.5 py-0.5 rounded">1.09250</span>
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="bg-[#2962FF]/20 text-[#2962FF] border border-[#2962FF]/50 px-2 py-0.5 rounded font-semibold">
                    Entry Position (1.0 Lot)
                  </span>
                  <span className="font-bold text-[#2962FF] bg-[#131722]/90 px-1.5 py-0.5 rounded">1.08450</span>
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="bg-[#F23645]/20 text-[#F23645] border border-[#F23645]/50 px-2 py-0.5 rounded font-semibold">
                    Max Drawdown Floor (-10.0%)
                  </span>
                  <span className="font-bold text-[#F23645] bg-[#131722]/90 px-1.5 py-0.5 rounded">1.07450</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-400 pt-2 border-t border-[#2A2E39]">
                <span>Data Feed: TradingView Realtime</span>
                <span className="text-[#089981] font-bold">● Active Engine</span>
              </div>
            </div>

            {/* TradingView Bottom Status Strip */}
            <div className="bg-[#1E222D] p-3.5 border-t border-[#2A2E39] text-[11px] text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2962FF]" />
                <span>Risk/Reward Ratio: <strong className="text-white">1:2.5</strong></span>
              </span>
              <a
                href={TRADINGVIEW_AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="text-[#2962FF] hover:underline font-bold"
              >
                Chart on TradingView &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
