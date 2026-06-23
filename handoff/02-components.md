# Step 2 — Components

These are the structural tsu moves the token swap can't express. Work top-down; after each
component, compare against `reference/patch.html` (inspect the matching element). All CSS below
references tsu tokens — never hard-code colors or the accent.

The single most repeated transform in this step:

> **Replace `border: 1px solid …` + `border-radius: …` with a flat hairline frame:**
> `box-shadow: inset 0 0 0 1px var(--border); border-radius: 0;`
> On hover/active/focus, swap the hairline color to `var(--primary)` or `var(--text)`.

---

## 2.0 — Mount the texture overlays (once)

In the root layout component (the app shell that wraps the router outlet), add the two tsu
overlays as the first children of the page, plus a couple of stacking rules:

```jsx
<>
  <div className="tsu-grid" aria-hidden="true" />
  <div className="tsu-grain" aria-hidden="true" />
  {/* …nav + routes… */}
</>
```

`.tsu-grid` sits at `z-index: 2`, `.tsu-grain` at `z-index: 40` (both `position: fixed`,
`pointer-events: none`, defined in `base.css`). Give your real content `position: relative;
z-index: 10` so it sits between grid and grain. Both overlays auto-hide under 900px.

---

## 2.1 — Global chrome: `controls.css`

Rewrite the element defaults so buttons/inputs/selects are flat hairline + mono uppercase.

```css
button {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: var(--track-ui);
  font-size: var(--type-label-sm);
  font-weight: 500;
  color: var(--text);
  background: transparent;
  border: none;
  box-shadow: inset 0 0 0 1px var(--border);
  border-radius: 0;
  padding: 7px 13px;
  cursor: pointer;
  transition: color var(--dur-fast) var(--expo-out),
              background var(--dur-fast) var(--expo-out),
              box-shadow var(--dur-fast) var(--expo-out),
              transform var(--dur-fast) var(--expo-out);
}
button:hover:not(:disabled) { color: var(--background); background: var(--foreground); box-shadow: inset 0 0 0 1px var(--foreground); }
button:active:not(:disabled) { transform: translateY(1px); }
button:disabled { opacity: 0.38; cursor: default; }

/* primary (share): accent outline that fills on hover */
button.primary { box-shadow: inset 0 0 0 1px var(--primary); color: var(--primary); }
button.primary:hover { color: var(--background); background: var(--primary); box-shadow: inset 0 0 0 1px var(--primary); }

input[type="text"], input[type="search"], textarea, select {
  font-family: var(--font-mono);
  font-size: var(--type-label-md);
  letter-spacing: 0.04em;
  color: var(--text);
  background: transparent;
  border: none;
  box-shadow: inset 0 0 0 1px var(--border);
  border-radius: 0;
  padding: 7px 12px;
}
input:focus-visible, textarea:focus-visible, select:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 1.5px var(--primary);
}
::placeholder { color: var(--text-faint); }
```

See `.btn`, `.preset-field`, `#shareBtn.primary` in `reference/patch.html` for the exact look,
including the share button's `copied ✓` success state (`.btn.ok`: filled foreground).

---

## 2.2 — Top nav

Structure: `patch` wordmark (Fraunces) · hairline separator · `microbrute` (mono uppercase) ···
preset-name input ··· `undo` `reset` `share` ··· `◆` accent-cycle + `☾` theme-toggle.

```css
nav.bar {
  display: flex; align-items: center; gap: var(--space-3xl);
  padding: var(--space-md) var(--space-4xl);
  border-bottom: 1px solid var(--border);
  background: var(--background); position: relative; z-index: 50;
}
.nav-home {                       /* the wordmark */
  font-family: var(--font-display);
  font-variation-settings: "SOFT" 50;
  font-size: 27px; line-height: 1; letter-spacing: -0.02em;
  color: var(--text); text-decoration: none;
}
.nav-home:hover { color: var(--primary); }
.nav-synth { font-family: var(--font-mono); text-transform: uppercase;
  letter-spacing: var(--track-ui); font-size: var(--type-label-md); color: var(--text-muted); }
```

**Accent cycle + theme toggle** (tsu motifs — wire to the two icon buttons):

```js
const ACCENTS = [
  "oklch(0.55 0.13 255)", // blue
  "oklch(0.6 0.14 145)",  // green
  "oklch(0.62 0.15 35)",  // amber
  "oklch(0.58 0.12 310)", // violet
];
let ai = 0;
accentBtn.onclick = () => {
  ai = (ai + 1) % ACCENTS.length;
  document.documentElement.style.setProperty("--primary", ACCENTS[ai]);
};
themeBtn.onclick = () => document.documentElement.classList.toggle("dark");
```

In React, hold `ai` / a `dark` flag in state and set the property / toggle the `html.dark`
class in an effect. `html.dark` is already handled by `colors.css` (keeps the warm hue, shifts
lightness only).

---

## 2.3 — The framed panel (`Panel.jsx`)

This is the signature move: **the instrument is art on a wall.** Wrap the panel image +
control overlay in a hairline frame with a dark mat and a caption row. **Do not modify the
image** — its printed Arturia/green branding stays.

```jsx
<div className="panel-frame">
  <div className="panel-caption">
    <span className="pc-name">microbrute</span>
    <span className="pc-meta">analog · monophonic</span>
  </div>
  <div className="panel-inner" /* container-type: inline-size */>
    <img className="panel-image" src="/microbrute-panel.png" alt="MicroBrute panel" />
    {/* control overlay + svg cable layer, absolutely positioned */}
  </div>
</div>
```

```css
.panel-frame { padding: 11px; background: var(--panel-bg); box-shadow: inset 0 0 0 1px var(--border); }
.panel-caption { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 9px; padding: 0 2px; }
.pc-name { font-family: var(--font-display); font-variation-settings: "SOFT" 27; font-size: 17px; color: var(--background); }
.pc-meta { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: var(--track-ui); font-size: var(--type-label-sm); color: rgba(235,231,223,0.5); }
.panel-inner { position: relative; container-type: inline-size; container-name: panel; line-height: 0; }
.panel-image { width: 100%; display: block; }
```

Add these dark-panel locals near `:root` (they're the only non-token colors, scoped to the
instrument photo):

```css
:root {
  --panel-bg:   #161412;
  --panel-knob: #221f1b;
  --panel-line: rgba(235, 231, 223, 0.20);
}
```

> **Why `container-type` matters:** the knob/switch/jack sizes in `reference/patch.html` use
> `cqw` units so controls scale with the panel width. Keep `container-name: panel` on
> `.panel-inner` and size controls in `cqw` (with `min-*` px floors) exactly as the reference
> does — this is what keeps the overlay aligned to the photo at any width.

---

## 2.4 — Knob (`Knob.jsx` + `Knob.css`)

Behavior is unchanged (vertical drag, keyboard, `-135°→+135°` sweep). Restyle the body as a
machined dark cap with an **accent indicator line** — the accent's primary home.

```css
.knob {
  width: 3.4cqw; height: 3.4cqw; border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, #2c2924, var(--panel-knob));
  box-shadow: inset 0 0 0 1px var(--panel-line);
  position: relative; cursor: grab; outline: none;
  transition: box-shadow var(--dur-fast) var(--expo-out);
}
.knob:hover    { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary) 70%, transparent); }
.knob.dragging { cursor: grabbing; box-shadow: inset 0 0 0 1px var(--primary); }
.knob:focus-visible { box-shadow: inset 0 0 0 1px var(--primary), 0 0 0 2px color-mix(in srgb, var(--primary) 55%, transparent); }
.knob-ind {           /* the pointer line — accent */
  position: absolute; bottom: 50%; left: 50%;
  width: 0.24cqw; min-width: 1.5px; height: 1.25cqw;
  background: var(--primary); transform-origin: bottom center;
}
/* JS sets: transform: translateX(-50%) rotate(<-135 + value*270>deg) */
```

A small **value readout** (`.knob-read`, accent text in a hairline chip) fades in only while
dragging — see the reference. Keep the existing rotation math; only the visuals change.

---

## 2.5 — Switch & Slider (`Switch.jsx`, the ADSR sliders in `SynthControl.jsx`)

**Switch** — a rounded dark track with an accent nub that snaps between option positions:

```css
.sw { width: 1.9cqw; min-width: 13px; height: 3.5cqw; min-height: 24px;
  background: var(--panel-knob); box-shadow: inset 0 0 0 1px var(--panel-line);
  border-radius: 999px; position: relative; cursor: pointer; }
.sw-nub { position: absolute; left: 50%; transform: translateX(-50%);
  width: 72%; height: 22%; background: var(--primary); border-radius: 999px;
  transition: top var(--dur-fast) var(--expo-out); }
/* JS sets nub `top` from the option index */
```

**Slider (ADSR)** — vertical track, light handle, translucent-accent fill below it:

```css
.sld { width: 1.5cqw; min-width: 11px; height: 8cqw; min-height: 54px;
  background: var(--panel-knob); box-shadow: inset 0 0 0 1px var(--panel-line);
  position: relative; cursor: ns-resize; }
.sld-fill   { position: absolute; left: 0; right: 0; bottom: 0;
  background: color-mix(in srgb, var(--primary) 30%, transparent); }
.sld-handle { position: absolute; left: -2px; right: -2px; height: 14%;
  background: #e9e4da; box-shadow: 0 0 0 1px var(--primary); transform: translateY(50%); }
```

Same hover/focus hairline-to-accent treatment as the knob. Logic unchanged.

---

## 2.6 — CV jacks & cables (`PatchBay.jsx`)

Jacks are dark recessed circles; a **connected** jack and every patch **cable** are accent.
Cables render in one `<svg class="cables" viewBox="0 0 100 100" preserveAspectRatio="none">`
overlaid on `.panel-inner`, as Bézier paths in panel-percentage coords:

```css
.jack { width: 2.2cqw; min-width: 14px; aspect-ratio: 1; border-radius: 50%;
  background: #100e0c; box-shadow: inset 0 0 0 1px var(--panel-line); cursor: crosshair; }
.jack::after { content: ""; position: absolute; inset: 30%; border-radius: 50%; background: rgba(235,231,223,0.12); }
.jack:hover      { box-shadow: inset 0 0 0 1px var(--primary); }
.jack.connected  { box-shadow: inset 0 0 0 1.5px var(--primary); }
.jack.connected::after { background: var(--primary); }

.cable { fill: none; stroke: var(--primary); stroke-width: 0.5; stroke-linecap: round; }
.cable--preview { stroke-dasharray: 1.4 1.4; opacity: 0.7; }
```

Cable path helper (matches the reference): for OUT `a`→IN `b`,
`M a.x a.y C a.x+dx a.y, b.x-dx b.y, b.x b.y` with `dx = |b.x-a.x|*0.45`. Drag from an OUT jack
shows a dashed preview cable to the cursor; drop on a free IN jack connects; click a connected
jack disconnects. Keep the existing drag/connect logic — only the stroke/fill becomes accent.

---

## 2.7 — Tooltips

Each control shows a tsu tooltip on hover/focus: a hairline-framed mono card with an uppercase
label and a non-uppercased description.

```css
.tip { position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  width: 168px; padding: 7px 9px; background: var(--background); color: var(--text);
  box-shadow: inset 0 0 0 1px var(--border); font-family: var(--font-mono);
  font-size: var(--type-label-sm); line-height: 1.5; text-transform: none;
  opacity: 0; visibility: hidden; transition: opacity var(--dur-fast) var(--expo-out); z-index: 60; }
.tip-label { display: block; text-transform: uppercase; letter-spacing: var(--track-ui);
  font-size: var(--type-label-xs); color: var(--text-muted); margin-bottom: 3px; }
.ctl:hover .tip, .ctl:focus-within .tip, .jack:hover .tip { opacity: 1; visibility: visible; }
```

---

## 2.8 — Param sidebar (`ParamSidebar.jsx` + `ParamSidebar.css`)

A hairline-framed column, sticky on desktop, grouped by section. Each row is `LABEL ········ VALUE`
in mono. **Modified** params brighten the label to full `--text` and turn the value `--primary`;
defaults stay faint. This is the live readout that makes the accent meaningful.

```css
.param-sidebar { box-shadow: inset 0 0 0 1px var(--border); padding: var(--space-3xl) var(--space-3xl) var(--space-md); position: sticky; top: var(--space-4xl); }
.pgroup-h { display: flex; justify-content: space-between; padding-bottom: var(--space-sm); margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--border); font-family: var(--font-mono); text-transform: uppercase;
  letter-spacing: var(--track-ui); font-size: var(--type-label-sm); color: var(--text-muted); }
.prow { display: flex; justify-content: space-between; gap: var(--space-xl); padding: 3px 0; }
.prow-l, .prow-v { font-family: var(--font-mono); font-size: var(--type-label-md); color: var(--text-faint); }
.prow.mod .prow-l { color: var(--text); }
.prow.mod .prow-v { color: var(--primary); }
```

Group order in the reference: Oscillator · Filter · Envelope · LFO · Controls · Mod Matrix.
The "is modified" test compares each value to its default (and for jacks, whether anything is
patched) — keep your existing derivation, just drive the `.mod` class from it.

---

## 2.9 — Editor layout & footer

```css
.editor-layout { display: grid; grid-template-columns: 1fr 296px; gap: var(--space-4xl);
  max-width: 1320px; margin: 0 auto; padding: var(--space-4xl); align-items: start; }
@media (min-width: 1600px) { .editor-layout { grid-template-columns: 1fr 340px; max-width: 1560px; } }
@media (max-width: 980px)  { .editor-layout { grid-template-columns: 1fr; } .param-sidebar { position: static; } }

footer.foot { max-width: 1320px; margin: 0 auto; padding: var(--space-4xl);
  display: flex; justify-content: space-between; gap: var(--space-3xl); flex-wrap: wrap;
  border-top: 1px solid var(--border); font-family: var(--font-mono);
  font-size: var(--type-label-sm); color: var(--text-faint); letter-spacing: 0.04em; }
```

The **decode-error bar** (`#decodeErr`) — shown when a shared URL can't be parsed — is a full
width strip: `background: var(--error); color: var(--background);` mono, centered. Keep it
hidden unless decode fails with a non-empty query.

Once the editor matches `reference/patch.html`, move on to **`03-landing.md`**.
