---
target: src/components/
total_score: 24
p0_count: 1
p1_count: 2
timestamp: 2026-05-17T22-37-04Z
slug: src-components
---
# Design Critique: src/components/ — synth-preset-maker

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading states, no save confirmation, no undo feedback |
| 2 | Match System / Real World | 4 | Knobs/switches feel physical; domain language is spot-on |
| 3 | User Control and Freedom | 2 | Reset exists but no undo, no keyboard escape from drag |
| 4 | Consistency and Standards | 3 | Uniform vocabulary; osc_overtone_switch typed as knob is a lie |
| 5 | Error Prevention | 2 | Malformed preset base64 crashes app; reset has no confirmation |
| 6 | Recognition Rather Than Recall | 3 | Controls are visible, but no labels on controls without hover |
| 7 | Flexibility and Efficiency of Use | 1 | Zero keyboard support; pointer-only interaction model |
| 8 | Aesthetic and Minimalist Design | 4 | Gallery frame concept executed cleanly |
| 9 | Error Recovery | 2 | Malformed URLs are unhandled; no inline error guidance |
| 10 | Help and Documentation | 1 | Tooltips only; no onboarding, no help page |
| **Total** | | **24/40** | **Acceptable** |

## Anti-Patterns Verdict

No AI slop detected. The gallery frame aesthetic is distinctive. Deterministic scan: clean (0 findings across 20 files).

## What's Working

1. Knob drag interaction: hidden cursor, mono readout, direct 1:1 pointer-to-value mapping — best-in-class web knob.
2. Gallery frame aesthetic: warm off-white backgrounds, cool-blue single accent, borders for depth, base chrome recedes properly.
3. Param sidebar: section grouping, mono value readouts, modified-state dots with accent color — clear information architecture.

## Priority Issues

- P0: Zero keyboard accessibility — knobs and switches are pointer-only, tooltips hover-only. App is completely unusable for keyboard/screen-reader users.
- P1: Malformed preset URLs crash the app — no try/catch around atob/JSON.parse in useSynthPreset.
- P1: Typography is invisible default — system-ui everywhere, uneven scale, mono font is bare "monospace".
- P2: Theme CSS loads async with no loading state — causes flash of unthemed UI.
- P2: Synth card grid is mechanically identical — needs visual rhythm for multi-synth presentation.

## Persona Red Flags

- Alex (Power User): Zero keyboard shortcuts, no tab-through controls, must mouse-drag everything.
- Jordan (First-Timer): Jargon-heavy sidebar, tooltips invisible without hover, no guidance prompt.
- Sam (Screen Reader): No ARIA labels, knobs are opaque divs, switches are unlabeled clickable divs.
