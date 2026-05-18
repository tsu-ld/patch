---
target: src/routes/editor.jsx + src/synths/microbrute/theme.css
total_score: 26
p0_count: 2
p1_count: 2
timestamp: 2026-05-17T22-22-30Z
slug: src-routes-editor-jsx
---
# Critique: Editor Route + MicroBrute Theme

**Target**: `src/routes/editor.jsx` + `src/synths/microbrute/theme.css`  
**Register**: PRODUCT — app UI / tool  
**Date**: 2026-05-17

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Knob drag readout works well; no loading indicator for panel image |
| 2 | Match Between System and Real World | 4 | Panel photo + positioned controls — perfect mental model |
| 3 | User Control and Freedom | 2 | Reset exists but no undo, no per-param default restore |
| 4 | Consistency and Standards | 3 | Preset name input uses border-bottom style while other inputs use bordered boxes |
| 5 | Error Prevention | 2 | No confirmation on reset; no navigation guard for unsaved changes |
| 6 | Recognition Rather Than Recall | 3 | Panel makes controls instantly recognizable; tooltips reveal descriptions on hover |
| 7 | Flexibility and Efficiency of Use | 3 | Direct-drag knobs, URL sharing is frictionless; no keyboard shortcuts, no fine-tune mode |
| 8 | Aesthetic and Minimalist Design | 4 | Extremely clean — the panel IS the UI, minimal chrome, restrained color |
| 9 | Help Users Recognize, Diagnose, Recover | 1 | No error states visible; no validation feedback; no error recovery paths shown |
| 10 | Help and Documentation | 1 | No help button, no onboarding, no usage guidance beyond per-param tooltips |

**Total: 26/40 — Acceptable range. Solid foundation, significant gaps in error handling and help.**

---

## Anti-Patterns Verdict

**LLM assessment**: This design passes the AI slop test. The base theme uses OKLCH color space, warm-tinted off-white backgrounds, and system fonts exclusively — all clear human-design signals. The panel-as-interface pattern (photo + absolute-positioned controls) is domain-specific and original. No gradient text, no glassmorphism, no side-stripe borders, no decorative motion, no hero-metric layouts.

The MicroBrute theme flirts with one AI tell — neon green (`#6dff3c`) glow on dark — but this is explicitly permitted by the DESIGN.md ("per-synth themes can go loud") and intentionally mirrors the hardware's aggressive identity.

**Deterministic scan**: `impeccable detect` returned zero findings (`[]`) — the codebase is clean against all 27 automated detection patterns.

---

## Overall Impression

A sharply focused, restraint-driven tool. The warm off-white "Gallery Frame" base recedes so the synth panel can dominate, and the MicroBrute theme injection is a genuine moment of personality. The panel-as-interface pattern is the defining strength.

The single biggest gap is discoverability: a first-time user will see a synth photo and not know what's interactive. A 30-second onboarding cue would close the gap between expert tool and accessible product.

---

## What's Working

1. **Panel-as-interface pattern** (`Panel.jsx` + `SynthControl.jsx`): Controls positioned via `x`/`y` percentages directly on the synth photo. Maps 1:1 to physical hardware. Zero mental translation.

2. **CSS custom property architecture** (`config.css`): Design tokens centralized in `:root`, overridden per-synth via `[data-theme]`. OKLCH color space. Theme swap is instant — no JS color math, no class toggling.

3. **Visual restraint in the shell**: No shadows, no gradients, no motion. Depth via border + background layering. The 15ms transitions on interactive elements are just enough to feel alive. The knob drag percentage readout appears only during interaction — precise feedback, zero visual noise when idle.

---

## Priority Issues

### [P0] No error prevention on destructive actions
- **What**: Reset button (`editor.jsx:22`) clears all parameter changes with no confirmation.
- **Why it matters**: 15 minutes of sound design can be lost with one misclick. This is the highest-stakes emotional valley in the experience.
- **Fix**: Add a `window.confirm()` guard, or implement undo history as a safety net.

### [P0] No panel image loading/error state
- **What**: `Panel.jsx` renders `<img>` with no `onLoad`/`onError` handling. If the image fails, controls float in empty space.
- **Why it matters**: The panel IS the interface. Without it, the tool is unusable and the state is unrecoverable.
- **Fix**: Show a loading placeholder during fetch, an error message on failure.

### [P1] MicroBrute muted text fails WCAG AA contrast
- **What**: `--color-text-muted: #555555` on `--color-bg: #0a0a0a` ≈ 3.2:1. WCAG AA requires 4.5:1.
- **Why it matters**: Sam's low vision. Sidebar labels, footer text, synth name — all at 11px — become illegible.
- **Fix**: Change `--color-text-muted` to `#999999` (≈7.5:1) or `#888888` (≈5.7:1). Preserve the dim feel through saturation, not luminance drop.

### [P1] No help or discoverability for first-time users
- **What**: Zero onboarding. No hint that knobs are draggable, no indication tooltips exist, no help resource.
- **Why it matters**: Jordan opens the editor, sees a synth photo, doesn't know what to do. Bounces in seconds.
- **Fix**: Dismissible tooltip on first visit ("Drag the knobs to shape your sound") appearing after 5s of inactivity. Or a `?` icon linking to a short guide.

### [P2] No undo mechanism
- **What**: No history stack. One accidental drag overwrites a value with no way back except full Reset.
- **Why it matters**: Alex expects undo in any creative tool. It raises the cost of experimentation and freezes the user into conservative tweaking.
- **Fix**: Track a history stack in `useSynthPreset`. Even 10 levels of undo transforms editing confidence.

---

## Persona Red Flags

**Alex (Power User)**: No undo, no keyboard shortcuts, no fine-tune mode (shift+drag). Would use the tool but complain within 5 minutes. The panel interface itself is excellent for him — immediately graspable — but the editing experience lacks power features.

**Jordan (First-Timer)**: Zero onboarding. Doesn't know knobs are draggable. The 25+ controls are overwhelming. No help resource. Would bounce in 10 seconds unless curious enough to click around randomly. The panel photo is intuitive once discovered, but nothing guides discovery.

**Sam (Accessibility User)**: MicroBrute muted text fails AA (3.2:1). Knob interaction is pointer-only — no keyboard alternative. Switch is click-only. No `aria-label` on controls. Tooltips use `display: none` so they're never in the accessibility tree. Base theme contrast is adequate, but the synth theme is problematic.

---

## Cognitive Load

**Failures: 2** (chunking: sections exceed 4 items; progressive disclosure: all 25+ controls visible at once)

Rating: Low-Medium for the target audience (synth users who already know the hardware). Would be high for general audiences. The physical layout of controls on the panel photo naturally chunks by location, partially offsetting the raw count.

---

## Minor Observations

- `SynthControl.jsx:7` passes `key` as a prop on a `<div>` — React strips it, harmless but semantically off.
- Footer "Made with ♥ by tsu" is the single most common AI footer template. It's benign but recognizable.
- `.how-it-works` 3-column numbered steps is a mild AI-tell pattern. Tastefully done here.
- `Knob.jsx` dragging overlay uses hardcoded `left: 120%` — could overflow offscreen on narrow containers.
- 15ms transition duration is intentional and works as debounce, not animation.
- `--glow-accent` token is defined in the theme but unused in any component CSS.
