import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#FFFFFF",
        "bg-raised": "#F8FAFC",
        "bg-inset": "#F1F5F9",
        "surface-base": "#FFFFFF",
        "surface-elevated": "#F8FAFC",
        "surface-inset": "#F1F5F9",
        border: "#E2E8F0",
        "border-strong": "#CBD5E1",
        "text-primary": "#0F172A",
        "text-secondary": "#334155",
        "text-muted": "#64748B",
        accent: "#1B2A4A",
        "accent-hover": "#0F172A",
        "accent-blue": "#2563EB",
        "accent-dim": "#94A3B8",
        positive: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        display: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
