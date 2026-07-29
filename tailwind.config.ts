import type { Config } from "tailwindcss";

// Signal Centre design tokens confirmed from live CSS bundle at:
// https://signal-centre-ag-v001-one.vercel.app/_next/static/chunks/33e6so_jd4x5z.css
//
// Exact CSS variables from Signal Centre:
//   --font-sans: "IBM Plex Sans", system-ui, -apple-system, sans-serif
//   --font-mono: "IBM Plex Mono", "Courier New", monospace
//   --text-primary: #172436
//   --text-secondary: #3e4b5c
//   --text-muted: #738091
//   --navy: #234166
//   --border: #e0dfdb
//   --bg-base: #fff
//   --bg-warm: #fafaf8
//   --bg-stone: #f3f3f1

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact Signal Centre palette
        "bg-base": "#FFFFFF",
        "bg-warm": "#FAFAF8",
        "bg-stone": "#F3F3F1",
        "bg-subtle": "#EEEDEA",

        // Surface aliases
        "surface-base": "#FFFFFF",
        "surface-elevated": "#FAFAF8",
        "surface-inset": "#F3F3F1",

        // Borders — Signal Centre exact
        border: "#E0DFDB",
        "border-strong": "#C8C7C3",

        // Typography — Signal Centre exact
        "text-primary": "#172436",
        "text-secondary": "#3E4B5C",
        "text-muted": "#738091",
        "text-disabled": "#B0B8C0",

        // Brand accents — Signal Centre exact
        accent: "#234166",        // --navy
        "accent-hover": "#345C8F", // --navy-light
        "accent-blue": "#234166",  // use navy as the primary accent
        "accent-dim": "#E8EFF5",   // --navy-muted

        // Semantic states — Signal Centre exact
        positive: "#2F5D50",       // --green
        warning: "#8B6914",        // --amber
        danger: "#5B2C2C",         // --burgundy

        // Legacy aliases for component compatibility
        "bg-raised": "#FAFAF8",
        "bg-inset": "#F3F3F1",
      },
      fontFamily: {
        // IBM Plex Sans — exact Signal Centre display & body font
        display: ["var(--font-sans)", "IBM Plex Sans", "system-ui", "-apple-system", "sans-serif"],
        body: ["var(--font-sans)", "IBM Plex Sans", "system-ui", "-apple-system", "sans-serif"],
        // IBM Plex Mono — exact Signal Centre monospace / data font
        mono: ["var(--font-mono)", "IBM Plex Mono", "Courier New", "monospace"],
      },
      maxWidth: {
        content: "1440px", // Signal Centre --max-width: 1440px
      },
      letterSpacing: {
        tighter: "-0.02em",  // Signal Centre h1 heading tracking
        tight: "-0.015em",   // Signal Centre h2-h3 tracking
      },
    },
  },
  plugins: [],
};

export default config;
