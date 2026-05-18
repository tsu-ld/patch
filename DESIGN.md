---
name: synth-preset-maker
description: Visual synth preset creation and sharing — URL-first, panel-driven, per-synth theming
colors:
  gallery-wall: "oklch(96% 0.007 80)"
  gallery-surface: "oklch(99% 0.004 80)"
  gallery-secondary: "oklch(93% 0.008 80)"
  gallery-border: "oklch(87% 0.006 80)"
  ink: "oklch(18% 0.008 265)"
  slate: "oklch(50% 0.007 265)"
  precision-blue: "oklch(42% 0.14 268)"
  precision-blue-dim: "oklch(75% 0.08 268)"
  alert-red: "oklch(50% 0.20 27)"
  confirm-green: "oklch(48% 0.17 148)"
typography:
  body:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
  heading:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "25px"
    fontWeight: 600
    lineHeight: 1.3
  subheading:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
  code:
    fontFamily: "'Geist Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
components:
  button-default:
    backgroundColor: "{colors.gallery-secondary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    typography: "{typography.label}"
  button-default-hover:
    textColor: "{colors.precision-blue}"
    border: "1px solid {colors.precision-blue}"
  input-field:
    backgroundColor: "{colors.gallery-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    typography: "{typography.label}"
  knob:
    backgroundColor: "{colors.gallery-surface}"
    rounded: "50%"
    size: "38px"
  switch-track:
    backgroundColor: "{colors.gallery-surface}"
    rounded: "10px"
    width: "20px"
    height: "36px"
---

# Design System: synth-preset-maker

## 1. Overview

**Creative North Star: "The Gallery Frame"**

The interface is a white-walled gallery. The synth panel is the art — it carries color, texture, identity. The app chrome is the frame: minimal, precise, receding. It provides structure without demanding attention.

The base palette is light — warm off-white backgrounds, near-white surfaces, near-black text with a cool-blue micro-tint. A chromatic blue accent signals interactivity sparingly. Per-synth themes override this entirely, so the editor snaps to each instrument's visual identity the moment the theme loads.

**What this system rejects.** No cyberpunk neon-on-black in the base chrome (per-synth themes carry their own character). No vintage retro skeuomorphism. No corporate SaaS dashboard patterns. No decorative motion, no glassmorphism, no gradient text.

**Key Characteristics:**
- Monochrome base with per-synth theme injection via `[data-theme]`
- Geist Variable (sans) + Geist Mono Variable (mono) — a single-family pairing, precise and technical without sterility
- Borders for structure, never shadows
- Knobs and switches that feel physical: pointer-drag-driven and keyboard-accessible, ARIA-labeled
- URL-encoded presets with no backend — every state is a shareable link
- Error-resilient: malformed preset URLs fall back to defaults with a visible notice

## 2. Colors

A warm off-white base with cool-tinted type and a single chromatic blue accent. The warmth comes from the background layer (hue 80, amber direction); the type and accent lean cool (hue 265–268, blue-violet direction). The tension between warm ground and cool figure gives the gallery its precision without feeling cold.

### Neutral
- **Gallery Wall** (oklch(96% 0.007 80)): Page background. Warm off-white, the primary canvas.
- **Gallery Surface** (oklch(99% 0.004 80)): Card and control surfaces. Near-white, slightly warmer than pure white.
- **Gallery Secondary** (oklch(93% 0.008 80)): Button backgrounds, code blocks, secondary areas.
- **Gallery Border** (oklch(87% 0.006 80)): All 1px borders and dividers. Visible but quiet.
- **Ink** (oklch(18% 0.008 265)): Primary text. Near-black with a cool-blue micro-tint — reads as black, never is.
- **Slate** (oklch(50% 0.007 265)): Secondary text, labels, captions, muted copy.

### Primary
- **Precision Blue** (oklch(42% 0.14 268)): The accent. Used for knob indicators, switch nubs, button hover states (border + text), and range slider accent. Dark enough to read on any light surface; chromatic enough to signal intent. Limited to ≤10% of any given surface.
- **Precision Blue Dim** (oklch(75% 0.08 268)): Muted accent variant, reserved for backgrounds or disabled accent contexts.

### Functional
- **Alert Red** (oklch(50% 0.20 27)): Error states and destructive actions. Clear signal on light backgrounds.
- **Confirm Green** (oklch(48% 0.17 148)): Confirmation and success states (e.g. "Copied!" feedback).

### Per-Synth Themes
Each synth injects its own palette via `[data-theme='<id>']` in `src/synths/<name>/theme.css`. The theme overrides the neutral and accent tokens. Example (MicroBrute): accent shifts to `#6dff3c` (alien green), surfaces darken further.

## 3. Typography

**Font Stack:** Geist Variable (`'Geist Variable', system-ui, sans-serif`) + Geist Mono Variable (`'Geist Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`). One family pairing by the same designer (Vercel / Basement Studio) — the sans carries headings, buttons, labels, and body; the mono is reserved for code, numeric readouts, and drag-feedback values.

**Character:** Technical precision with warmth. Geist is geometric and modern without feeling cold; Geist Mono is crisp and engineered for values that need to align. The variable fonts load a single WOFF2 per family (weight range 100–900) via `@fontsource-variable` self-hosted packages.

### Hierarchy
- **Title** (700, 32px, 1.2): Page-level headings. Appears on the landing hero and top-level headers.
- **Heading** (600, 25px, 1.3): Section headings, nav titles. Currently used for synth name in the editor nav.
- **Subheading** (600, 20px, 1.4): Card headings, synth names in the landing grid.
- **Body** (400, 16px, 1.6): Paragraphs, descriptions, landing copy.
- **Label** (400, 13px, 1.4): Button text, input text, form elements. The workhorse size for controls.
- **Caption** (400, 11px, 1.4): Tooltip text, meta information, fine print.
- **Code** (400, 13px, 1.5): Inline code, calibration coordinates, numeric overlay during drag.

### Named Rules
**The Geist Family Rule.** One designer, one family pairing. Geist Variable covers all sans-serif roles; Geist Mono Variable covers all monospace roles. No third family in the base styles. Per-synth themes may inject a heading font via their theme.css, but the base uses only the Geist pair. The type scale follows a ~1.25 ratio between steps (11→13→16→20→25→32).

## 4. Elevation

**Philosophy: Pure Flat.** No shadows. Depth is communicated through color contrast and borders alone. Surfaces are distinguished by their background luminance relative to the page.

No shadow tokens exist in the base design system. Per-synth `theme.css` files may define a `--glow-accent` token for synth-specific identity (the MicroBrute uses it), but this never appears in the base chrome.

### Named Rules
**The No-Shadow Rule.** Surfaces never use box-shadow for elevation. Color difference and borders are the only depth mechanisms. The glow-accent token is permitted only in per-synth theme.css files for synth-specific identity, never in the base chrome.

## 5. Components

### Buttons
**Character:** Technical and precise. Buttons feel like instrument controls — deliberate borders, no shadows, clean hover transitions.

- **Shape:** Rounded corners (8px radius).
- **Default:** Gallery secondary background (oklch(93% 0.008 80)), 1px gallery border, ink text (oklch(18% 0.008 265)), padding 8px 16px, label size (13px).
- **Hover:** Border and text shift to precision blue (oklch(42% 0.14 268)). Transition: border-color 150ms, color 150ms.
- **Active:** Opacity 0.8.
- **Disabled:** Cursor default.

### Inputs / Fields
**Character:** Clean edged containers that suggest precision. Same border vocabulary as buttons.

- **Style:** Gallery surface background (oklch(99% 0.004 80)), 1px gallery border, 8px radius, padding 8px 12px, label size (13px), full width.
- **Focus:** No special treatment (native focus outline).
- **Range inputs:** Accent color applied via `accent-color`. Vertical orientation via `writing-mode: vertical-lr`.

### Knobs
**Character:** The signature component. Circular, physical, pointer-drag-driven. The indicator rotates as a visual analog of the value. Keyboard-accessible via arrow keys.

- **Shape:** Circle (50% radius), default 38px × 38px, 2px gallery border.
- **Style:** Gallery surface background (oklch(99% 0.004 80)), cursor: grab.
- **Indicator:** 2px wide, 12px tall vertical bar in precision blue (oklch(42% 0.14 268)). Origin at bottom center, rotates -135deg to +135deg (270deg total sweep) mapped to 0–1 value range.
- **Drag behavior:** Vertical pointer movement maps to value. Cursor hidden during drag. Numeric readout (mono, 0–100%) appears alongside during interaction.
- **Keyboard:** `role="slider"`, `aria-valuenow/min/max`. ArrowUp/Right = +1%, ArrowDown/Left = -1%, Shift+Arrow = ±5%, Home = 100%, End = 0%.
- **States:** Default (grab cursor), dragging (cursor hidden, readout visible, pointer captured), focused (native focus ring).

### Switches
**Character:** Vertical toggle, stepped positions, click-cycles through options. Keyboard accessible.

- **Shape:** Vertical pill (width 20px, height 36px, 10px radius).
- **Style:** Gallery surface background (oklch(99% 0.004 80)), 1px gallery border.
- **Nub:** Precision blue (oklch(42% 0.14 268)), width 14px (within 3px side margins), height 10px, 5px radius. Positioned by percentage along the track matching the selected option index.
- **Behavior:** Click or Space/Enter cycles to next option. Nub animates vertically (transition: top 120ms).
- **Accessibility:** `role="button"`, `tabIndex={0}`, `aria-label` includes current option name.

### Tooltips
**Character:** Contextual descriptions revealed on hover or focus. Above-control placement, minimal footprint.

- **Style:** Gallery surface background (oklch(99% 0.004 80)), 1px gallery border, 4px radius, padding 4px 8px, caption size (11px).
- **Position:** Above the control (bottom: 120%), centered horizontally (left: 50%, translateX -50%).
- **Behavior:** Hidden by default, shown on parent hover or focus-within. White-space: nowrap. z-index 10.

### Navigation
**Character:** Top bar, border-divided, clean alignment.

- **Style:** Flex, space-between, padding 16px 24px, bottom border 1px gallery border (oklch(87% 0.006 80)).
- **Layout:** Synth name (heading weight) left, action buttons right.
- **Responsive:** Currently static. No mobile collapse pattern yet.

### Select
**Character:** Same input vocabulary as text fields.

- **Style:** Gallery surface background, gallery border, 8px radius, padding 8px 12px, label size (13px).

## 6. Do's and Don'ts

### Do:
- **Do** use the Geist family pairing (`'Geist Variable', system-ui, sans-serif` for sans, `'Geist Mono Variable', ui-monospace, ...` for mono) for all base chrome text.
- **Do** inject per-synth identity through `[data-theme]` CSS custom property overrides in `src/synths/<name>/theme.css`.
- **Do** use borders and background color difference as the sole depth mechanism — never shadows in the base chrome.
- **Do** keep button and input vocabulary consistent across all screens.
- **Do** use the mono stack for numeric values, code, and drag-feedback overlays.
- **Do** provide keyboard accessibility and ARIA labels on all interactive controls (knobs, switches, sliders).

### Don't:
- **Don't** use cyberpunk / neon-on-black in the base app chrome. Synth themes can go loud; the frame stays quiet.
- **Don't** add vintage retro skeuomorphism (fake wood, 70s synth nostalgia, brushed metal textures).
- **Don't** introduce a second font family in the base styles. One stack covers everything.
- **Don't** use box-shadow for elevation on base components. Color difference and borders only.
- **Don't** create corporate SaaS dashboard patterns — no data tables, no enterprise chrome, no metric cards.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on any component.
- **Don't** use gradient text (`background-clip: text`) anywhere.
- **Don't** use glassmorphism or backdrop-filter blur for decorative effect.
- **Don't** add decorative motion that doesn't convey a state change.
