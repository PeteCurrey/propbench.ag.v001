# Signal Centre Design System Tokens (PropBench Theme Specification)

Tokens verified directly from the live CSS bundle at:
`https://signal-centre-ag-v001-one.vercel.app/_next/static/chunks/33e6so_jd4x5z.css`

---

## 1. Typography — Confirmed Fonts

| Role | Font Family | CSS Variable |
| :--- | :--- | :--- |
| **Display & Body** | `IBM Plex Sans` (weights 300, 400, 500, 600, 700) | `--font-sans` |
| **Monospace & Data** | `IBM Plex Mono` (weights 400, 500, 600) | `--font-mono` |

**Source in CSS bundle:**
```css
--font-sans: "IBM Plex Sans", system-ui, -apple-system, sans-serif;
--font-mono: "IBM Plex Mono", "Courier New", monospace;
```

**Heading style:**
- `font-weight: 500` (not bold — this is the key institutional distinction)
- `letter-spacing: -0.015em`
- `line-height: 1.25`

---

## 2. Color Palette — Confirmed Hex Values

### Backgrounds
| Token | CSS Variable | Hex | Usage |
| :--- | :--- | :--- | :--- |
| Base white | `--bg-base` | `#FFFFFF` | Page background |
| Warm off-white | `--bg-warm` | `#FAFAF8` | Section alternates, badge bg |
| Stone | `--bg-stone` | `#F3F3F1` | Inset panels, form bg |
| Subtle | `--bg-subtle` | `#EEEDEA` | Deep inset |

### Typography
| Token | CSS Variable | Hex | Usage |
| :--- | :--- | :--- | :--- |
| Primary text | `--text-primary` | `#172436` | Headlines, key data |
| Secondary text | `--text-secondary` | `#3E4B5C` | Body copy |
| Muted text | `--text-muted` | `#738091` | Labels, captions |
| Disabled text | `--text-disabled` | `#B0B8C0` | Inactive elements |

### Brand
| Token | CSS Variable | Hex | Usage |
| :--- | :--- | :--- | :--- |
| Navy (primary) | `--navy` | `#234166` | CTAs, active states |
| Navy light | `--navy-light` | `#345C8F` | Hover state |
| Navy muted | `--navy-muted` | `#E8EFF5` | Selection bg |

### Semantic States
| Token | CSS Variable | Hex | Usage |
| :--- | :--- | :--- | :--- |
| Positive / Green | `--green` | `#2F5D50` | Safe zones, compliant |
| Amber / Warning | `--amber` | `#8B6914` | Caution states |
| Burgundy / Danger | `--burgundy` | `#5B2C2C` | Breach / danger zones |

### Borders & Neutrals
| Token | CSS Variable | Hex | Usage |
| :--- | :--- | :--- | :--- |
| Default border | `--border` | `#E0DFDB` | Hairline dividers |
| Strong border | `--border-strong` | `#C8C7C3` | Interactive borders |
| Platinum | `--platinum` | `#D9D9D6` | Separator lines |

---

## 3. Spacing Scale
Signal Centre uses a fixed `--space-N` scale (rem units):

| Token | Value |
| :--- | :--- |
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-12` | `3rem` |
| `--space-16` | `4rem` |
| `--space-20` | `5rem` |
| `--space-24` | `6rem` |

---

## 4. Component Design System

### Live Intelligence Pill Badge (`.badge-pill`)
```css
display: inline-flex;
align-items: center;
gap: 0.75rem;
padding: 4px 12px;
border: 1px solid var(--border);        /* #E0DFDB */
background-color: var(--bg-warm);       /* #FAFAF8 */
font-family: var(--font-mono);          /* IBM Plex Mono */
font-size: 0.6875rem;
font-weight: 500;
letter-spacing: 0.08em;
text-transform: uppercase;
color: var(--text-muted);              /* #738091 */
```

### Divided Stat Grid Box
Single border container with hairline internal dividers:
```css
border: 1px solid var(--border);
border-left: 1px solid var(--border);
border-top: 1px solid var(--border);
/* Each cell: */
border-right: 1px solid var(--border);
border-bottom: 1px solid var(--border);
padding: var(--space-6);
```
Numbers: `font-family: var(--font-mono); font-size: 1.5rem; font-weight: 500; color: var(--navy)`
Labels: `font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.01em`

### Primary Button (CTA)
```css
background-color: var(--navy);        /* #234166 */
color: var(--bg-base);
padding: 12px 28px;
font-size: 0.875rem;
font-weight: 500;
letter-spacing: 0.03em;
/* No border-radius — sharp corners */
```

### Secondary Button (Outline)
```css
border: 1px solid var(--border-strong);  /* #C8C7C3 */
background-color: transparent;
color: var(--text-secondary);
padding: 12px 28px;
font-size: 0.875rem;
font-weight: 400;
letter-spacing: 0.03em;
/* No border-radius — sharp corners */
```

### Section Overline Label
```css
font-size: 0.6875rem;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
color: var(--text-muted);
```

---

## 5. Strict Data & Stat Policy (Rule 1 & Rule 4)

1. **Zero Fabricated Stats**: No static hardcoded numbers (e.g. "47 Instruments Monitored" / "0 INSTRUMENTS ACTIVE" contradiction in old build).
2. **Dynamic Sourcing Only**: Every number displayed must come from the live data layer (`firms.length`, `TOOLS_DIRECTORY.length`) or pure calculation functions in `/lib/calc`.
3. **Honest Omission**: If a stat cannot be backed by verified live data, it is dropped rather than invented.
