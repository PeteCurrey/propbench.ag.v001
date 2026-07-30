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
        "bg-raised": "#FAFAF8",
        "bg-inset": "#F3F3F1",
        "surface-base": "#FFFFFF",
        "surface-elevated": "#FAFAF8",
        "surface-inset": "#F3F3F1",
        border: "#E0DFDB",
        "border-strong": "#C8C7C3",
        "text-primary": "#172436",
        "text-secondary": "#3E4B5C",
        "text-muted": "#738091",
        accent: "#234166",
        "accent-hover": "#345C8F",
        "accent-blue": "#345C8F",
        "accent-dim": "#B0B8C0",
        positive: "#2F5D50",
        warning: "#8B6914",
        danger: "#5B2C2C",
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
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
