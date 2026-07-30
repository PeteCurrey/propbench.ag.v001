# Signal Centre Design System Tokens (PropBench Theme Specification)

This document specifies the exact visual design tokens extracted from the Signal Centre institutional corporate design system (`signal-centre-ag-v001-one.vercel.app`). These tokens govern all typography, color palettes, spacing, borders, status badges, and component layouts across both the public-facing platform and internal operational dashboard.

---

## 1. Color Palette Tokens

### Institutional Neutral Palette
| Token Name | CSS Variable | Hex Code | Primary Usage |
| :--- | :--- | :--- | :--- |
| `bg-base` / `surface-base` | `--color-bg-base` | `#FFFFFF` | Page base background, primary white card container |
| `bg-raised` / `surface-elevated` | `--color-bg-raised` | `#FAFAF8` | Elevated warm off-white card panels, table headers |
| `bg-inset` / `surface-inset` | `--color-bg-inset` | `#F3F3F1` | Inset metric cards, stone background panels |
| `border` | `--color-border` | `#E0DFDB` | Default razor-sharp hairline borders |
| `border-strong` | `--color-border-strong` | `#C8C7C3` | Interactive element hover borders, focus boundaries |

### Typography Colors
| Token Name | CSS Variable | Hex Code | Primary Usage |
| :--- | :--- | :--- | :--- |
| `text-primary` | `--color-text-primary` | `#172436` | Primary headlines, strong titles, key metrics |
| `text-secondary` | `--color-text-secondary` | `#3E4B5C` | Secondary section headers, form labels |
| `text-muted` | `--color-text-muted` | `#738091` | Body copy, muted captions, table metadata |
| `text-disabled` | `--color-text-disabled` | `#B0B8C0` | Placeholders, inactive labels, muted dates |

### Institutional Brand Accents & Semantic States
| Token Name | CSS Variable | Hex Code | Primary Usage |
| :--- | :--- | :--- | :--- |
| `accent` | `--color-accent` | `#234166` | Corporate Deep Navy — primary CTAs, active active links |
| `accent-hover` | `--color-accent-hover` | `#345C8F` | Navy light hover state |
| `accent-blue` | `--color-accent-blue` | `#345C8F` | Link focus, indicators |
| `positive` | `--color-positive` | `#2F5D50` | Profit targets, safe zones, compliant status (Hunter Green) |
| `warning` | `--color-warning` | `#8B6914` | Warning proximity zones, legal notices (Amber) |
| `danger` | `--color-danger` | `#5B2C2C` | Drawdown breach floors, danger zones (Burgundy) |

---

## 2. Typography Specification

- **Display & Headline Font**: `IBM Plex Sans` (weights: 300, 400, 500, 600, 700) with tracking `-0.015em`.
- **Body & Copy Font**: `IBM Plex Sans` (weights: 400, 500) with line-height `1.6`.
- **Numeric & Monospace Font**: `IBM Plex Mono` (weights: 400, 500, 600) with `font-variant-numeric: tabular-nums` enforced site-wide for tabular alignment.

---

## 3. Component Design System & Layout Standards

### Live Intelligence Pill Badges (`.badge-pill`)
```css
.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 12px;
  border-radius: 0;
  background-color: var(--color-bg-raised);
  border: 1px solid var(--color-border);
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
```

### Signal Centre Divided Stat Grid Box
Single container box divided into equal columns with razor-sharp vertical hairline dividers (`border-t border-l border-border bg-bg-base`). Large tabular numbers on top (`font-mono text-2xl font-medium text-accent`), uppercase tracked labels below. Each inner cell has `border-r border-b border-border` to form a seamless grid layout.

### Buttons & Interactive Controls
- **Primary Button**: Solid Corporate Navy (`bg-accent text-bg-base hover:bg-accent-hover`) with sharp corner layout (`rounded-none`) and sans-serif typography (`font-sans text-sm tracking-wide`).
- **Secondary Button**: Clean White Outline (`bg-transparent border border-border-strong text-text-secondary hover:border-text-secondary rounded-none`).

---

## 4. Strict Data & Stat Policy (Rule 1 & Rule 4)

1. **Zero Fabricated Stats**: No static hardcoded numbers or contradictory mock copy (e.g. "47 Instruments Monitored" / "0 Active").
2. **Dynamic Sourcing**: Every stat displayed on the public website and ops dashboard must originate directly from the live data layer (`firms.length`, registered tools count) or pure calculation functions in `/lib/calc`.
3. **Honest Omission**: If a stat cannot be backed by verified live data or pure calculation logic, it is omitted rather than simulated.
