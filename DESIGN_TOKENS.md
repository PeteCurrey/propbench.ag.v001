# Signal Centre Design System Tokens (PropBench Theme Specification)

This document specifies the exact visual design tokens extracted from the Signal Centre institutional corporate design system (`signal-centre-ag-v001-one.vercel.app`). These tokens govern all typography, color palettes, spacing, borders, status badges, and component layouts across both the public-facing platform and internal operational dashboard.

---

## 1. Color Palette Tokens

### Institutional Neutral Palette
| Token Name | CSS Variable | Hex Code | Primary Usage |
| :--- | :--- | :--- | :--- |
| `bg-base` / `surface-base` | `--color-bg-base` | `#FFFFFF` | Page base background, primary white card container |
| `bg-raised` / `surface-elevated` | `--color-bg-raised` | `#F8FAFC` | Elevated card panels, table header backgrounds |
| `bg-inset` / `surface-inset` | `--color-bg-inset` | `#F1F5F9` | Inset metric cards, form background panels |
| `border` | `--color-border` | `#E2E8F0` | Default razor-sharp hairline borders |
| `border-strong` | `--color-border-strong` | `#CBD5E1` | Interactive element hover borders, focus boundaries |

### Typography Colors
| Token Name | CSS Variable | Hex Code | Primary Usage |
| :--- | :--- | :--- | :--- |
| `text-primary` | `--color-text-primary` | `#0F172A` | Primary headlines, strong titles, key metrics |
| `text-secondary` | `--color-text-secondary` | `#334155` | Secondary section headers, form labels |
| `text-muted` | `--color-text-muted` | `#64748B` | Body copy, muted captions, table metadata |

### Institutional Brand Accents & Semantic States
| Token Name | CSS Variable | Hex Code | Primary Usage |
| :--- | :--- | :--- | :--- |
| `accent` | `--color-accent` | `#1B2A4A` | Corporate Dark Navy — primary CTAs, active pills |
| `accent-hover` | `--color-accent-hover` | `#0F172A` | Primary CTA hover state |
| `accent-blue` | `--color-accent-[#2563EB]` | `#2563EB` | Secondary link focus, signal indicators |
| `positive` | `--color-positive` | `#16A34A` | Profit targets, safe zones, compliant status |
| `warning` | `--color-warning` | `#D97706` | Warning proximity zones, legal notices |
| `danger` | `--color-danger` | `#DC2626` | Drawdown breach floors, danger zones |

---

## 2. Typography Specification

- **Display & Headline Font**: `Inter` (weights: 600, 700, 800) with tracking `-0.02em` (`tracking-tight`).
- **Body & Copy Font**: `Inter` (weights: 400, 500) with line-height `1.6`.
- **Numeric & Monospace Font**: `DM Mono` (weights: 400, 500) with `font-variant-numeric: tabular-nums` enforced site-wide for tabular alignment.

---

## 3. Component Design System & Layout Standards

### Live Intelligence Pill Badges (`.badge-pill`)
```css
.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: #F1F5F9;
  border: 1px solid #E2E8F0;
  font-family: var(--font-dm-mono), monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #334155;
}
```

### Signal Centre Divided Stat Grid Box
Single container box divided into equal columns with razor-sharp vertical hairline dividers (`border border-slate-200 divide-x divide-slate-200 rounded-lg bg-white shadow-sm`). Large tabular numbers on top (`font-mono text-2xl font-bold text-slate-900`), uppercase tracked labels below.

### Buttons & Interactive Controls
- **Primary Button**: Solid Corporate Dark Navy (`bg-[#1B2A4A] text-white hover:bg-[#0F172A]`) with uppercase tracked mono typography (`text-xs font-mono font-medium tracking-wide uppercase`).
- **Secondary Button**: Clean White Outline (`bg-white border border-slate-300 text-slate-800 hover:bg-slate-50`).

---

## 4. Strict Data & Stat Policy (Rule 1 & Rule 4)

1. **Zero Fabricated Stats**: No static hardcoded numbers or contradictory mock copy (e.g. "47 Instruments Monitored" / "0 Active").
2. **Dynamic Sourcing**: Every stat displayed on the public website and ops dashboard must originate directly from the live data layer (`firms.length`, registered tools count) or pure calculation functions in `/lib/calc`.
3. **Honest Omission**: If a stat cannot be backed by verified live data or pure calculation logic, it is omitted rather than simulated.
