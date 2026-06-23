# patch → tsu — implementation handoff

Reskin the **patch** synth-preset editor (`tsu-ld/patch`, branch `production`) into the
**tsu** design system: warm beige monochrome, a single swappable accent, Fraunces display
serif + JetBrains Mono UI, flat corners, hairline frames instead of borders/shadows, and
grain + grid texture. The product does not change — every knob, switch, slider, CV jack,
the URL-as-preset codec, undo/reset/share, and routing stay exactly as they are. This is a
**skin**, not a rebuild.

> The guiding idea: **the MicroBrute panel is the art; tsu is the frame around it.** The dark
> instrument photo stays untouched (keep its printed Arturia branding). Everything *around*
> it — chrome, sidebar, landing, controls overlaid on the panel — becomes tsu.

---

## What's in this package

```
handoff/
├─ README.md                ← you are here: overview, install order, QA
├─ 01-token-layer.md        ← STEP 1 — drop in tsu tokens, remap config.css (does ~70% of the work)
├─ 02-components.md         ← STEP 2 — file-by-file React/CSS changes (Knob, Switch, Slider, Panel, Sidebar, nav)
├─ 03-landing.md            ← STEP 3 — rebuild the landing route
└─ reference/
   ├─ patch.html            ← the approved static reskin — the source of visual truth
   ├─ patch.js              ← vanilla port of the editor logic (read for exact CSS, not to copy wholesale)
   ├─ microbrute-panel.png  ← panel art (already in the repo at public/)
   ├─ fonts/                ← jetbrains-mono.woff2 (Fraunces is loaded via npm @fontsource-variable/fraunces)
   └─ tsu-tokens/           ← the six tsu token CSS files to vendor into src/styles/tsu/
```

**`reference/patch.html` is the spec.** When any doc here is ambiguous, open that file in a
browser, inspect the element, and match it. It is the design that was reviewed and approved.

---

## The stack you're working in

patch is **Vite + React + react-router**, styling via plain CSS files imported per-component.
Crucially, it **already uses a CSS custom-property token layer** (`src/styles/config.css`),
which is why this migration is mostly mechanical: you swap the *values* behind the existing
`--color-*` / `--space-*` / `--text-*` variables and add a few new ones. Most components keep
working with no markup change.

Relevant files in the repo:

| Area | File |
|---|---|
| Tokens | `src/styles/config.css` |
| Global element styles | `src/styles/controls.css`, `src/styles/layout.css`, `src/styles/typography.css` |
| Synth accent | `src/synths/microbrute/theme.css` |
| Controls | `src/components/Knob.jsx` + `Knob.css`, `Switch.jsx`, `SynthControl.jsx`, `PatchBay.jsx` |
| Panel | `src/components/Panel.jsx` |
| Sidebar | `src/components/ParamSidebar.jsx` + `ParamSidebar.css` |
| Routes | `src/routes/index.jsx` (landing), `src/routes/editor.jsx` |
| Synth data | `src/synths/microbrute/index.js` (control coords — **do not touch**) |

---

## Install order

Do these in sequence — each builds on the last. After each step the app should still run.

1. **`01-token-layer.md` — Tokens & fonts.** Vendor the six tsu token files, install Fraunces
   via `bun add @fontsource-variable/fraunces`, and rewrite `config.css` so patch's existing
   variables resolve to tsu values. **This alone reskins ~70% of the UI** (colors, type,
   spacing, focus rings).
2. **`02-components.md` — Components.** The structural tsu moves that tokens can't express:
   hairline frames (replace `border` + `border-radius` with `box-shadow: inset 0 0 0 1px`),
   the framed/captioned panel, accent-only knob indicators, the mono-uppercase sidebar, the
   nav wordmark in Fraunces, and the page texture overlays.
3. **`03-landing.md` — Landing.** Rebuild `routes/index.jsx`: two-column hero with the
   "the url is the preset" demo, the marquee, the how-it-works band, the instrument rack, and
   the tsu footer.

---

## Design rules (apply everywhere; tsu non-negotiables)

- **Flat corners.** Default `border-radius: 0`. The only round things are knobs, the switch
  track/nub, and CV jacks (physically circular). Kill every `--radius-md`/`--radius-lg` on
  chrome, cards, inputs, buttons.
- **Hairlines, not borders or shadows.** Use `box-shadow: inset 0 0 0 1px var(--border)` for
  frames; `var(--border)` is a 42%-opacity foreground hairline. Reserve `--shadow-drop` for
  truly floating elements (there are basically none here). Replace `1px solid` borders likewise.
- **Accent is seasoning, not paint.** `--primary` appears *only* on: knob indicator lines,
  patch cables, the active/modified value in the sidebar, switch nubs, focus rings, and the
  primary CTA/share button. Everything else is the warm monochrome. The accent is swappable —
  never hard-code its hex anywhere.
- **Type roles.** Display (headings, wordmark, synth names) = **Fraunces**, lowercase, tight
  tracking, set a `SOFT` axis via `font-variation-settings`. All UI/labels/metadata/values =
  **JetBrains Mono**, `text-transform: uppercase`, `letter-spacing: var(--track-ui)` (0.14em).
  Body copy in the tooltips/descriptions is mono but *not* uppercased.
- **Texture.** Add `.tsu-grid` + `.tsu-grain` fixed overlays once at the app root. They self-
  disable under 900px and respect `prefers-reduced-motion` via the token layer.
- **Motion.** Transitions use `var(--dur-fast)` + `var(--expo-out)`. Everything collapses to
  0ms under reduced-motion (already handled in `effects.css`).

---

## Definition of done — QA checklist

Run the app and verify against `reference/patch.html`:

- [ ] Page is warm beige (`#EBE7DF`), grain + grid texture visible (desktop), no pure white surfaces.
- [ ] `patch` wordmark renders in Fraunces serif, lowercase; nav + sidebar labels are mono uppercase, wide-tracked.
- [ ] No rounded corners anywhere except knobs / switch / jacks. No drop shadows on chrome.
- [ ] The MicroBrute panel sits inside a hairline frame with a caption row (`microbrute` / `analog · monophonic`); panel art itself is unmodified.
- [ ] Knob indicators, cables, switch nubs, modified sidebar values, focus rings, share button — and *only* these — carry the accent.
- [ ] Drag a knob → indicator rotates, sidebar value updates + turns accent, URL `#/editor?k=…` updates live.
- [ ] Click a switch → cycles; drag from an OUT jack to an IN jack → cable draws in accent; click a connected jack → disconnects.
- [ ] Undo reverts last change; reset returns to defaults (with confirm); share copies the URL and flashes "copied ✓".
- [ ] Open a shared URL cold → preset name, knob values, and cables all restore; a malformed URL shows the decode-error bar and falls back to defaults.
- [ ] Accent cycle (`◆`) and theme toggle (`☾`) in the nav work; dark mode keeps the warm hue.
- [ ] Landing: two-column hero with the URL-demo card, scrolling marquee, 3-step how-it-works band, instrument rack with hover `open →`, tsu footer. Collapses to one column under 980px.
- [ ] `prefers-reduced-motion`: marquee stops, transitions are instant, content is fully visible.
- [ ] No console errors; keyboard control on knobs/sliders (arrows, shift = coarse, Home/End) still works.

---

## Scope guardrails

- **Don't touch** `src/synths/microbrute/index.js` (control coordinates/params) or the
  URL-codec logic — the reskin is purely presentational.
- **Don't replace** the panel image or edit its printed branding.
- **Keep** all existing behavior, keyboard handlers, ARIA roles, and the react-router routes.
- If you find a control style that has no obvious tsu mapping, default to: hairline frame,
  mono uppercase label, accent only if it shows state. When in doubt, match `reference/patch.html`.
