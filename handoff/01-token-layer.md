# Step 1 — Token layer & fonts

This step does the heavy lifting. patch already centralizes its design decisions in
`src/styles/config.css`, so by pointing those variables at tsu values (and adding a handful of
new tokens) the whole app shifts to the tsu palette, type, and spacing with almost no markup
changes. Do this first and the app will already look ~70% reskinned.

---

## 1.1 — Vendor the tsu tokens & fonts

Copy from `reference/` in this package into the repo:

```
reference/tsu-tokens/*.css   →   src/styles/tsu/   (colors, typography, spacing, effects, base, fonts)
```

**Fonts are loaded via npm** (no woff2 files to copy):

```
bun add @fontsource-variable/fraunces
```

In the app entry (`src/main.jsx`), add the import alongside the existing Geist imports:

```js
import '@fontsource-variable/fraunces';
```

Fraunces is a free, open-source variable serif font by Undercase Type Foundry (OFL licensed).
It has a custom `SOFT` axis (0 = sharp/crisp, 100 = max softness/roundness) that gives
expressive control — much like Exposure's `EXPO` axis but free and on npm.

---

## 1.2 — Import order

The token files must load **before** `config.css` and all component CSS, so the cascade
resolves correctly. In your app entry (`src/main.jsx` or wherever styles are imported), order:

```js
import "@fontsource-variable/fraunces";              // ← npm package, no local @font-face needed
import "./styles/tsu/colors.css";
import "./styles/tsu/typography.css";
import "./styles/tsu/spacing.css";
import "./styles/tsu/effects.css";
import "./styles/tsu/base.css";
import "./styles/config.css";      // ← now a thin alias layer (1.3)
import "./styles/controls.css";
import "./styles/layout.css";
import "./styles/typography.css";
// …component css as before
```

`base.css` binds `body` to the warm bg, JetBrains Mono, and inverted text selection, and
defines the `.tsu-grid` / `.tsu-grain` overlay utilities you'll mount in 02.

---

## 1.3 — Rewrite `config.css` as an alias layer

Replace the **values** in `src/styles/config.css` so patch's existing variable names resolve
to tsu tokens. Keeping the names means every component that already references `--color-*`,
`--space-*`, `--text-*` keeps working. Here is the full remap:

```css
/* src/styles/config.css — patch vars, now pointing at tsu tokens */
:root {
  /* ── colors ─────────────────────────────────────────────── */
  --color-bg:         var(--background);       /* warm beige page  (#EBE7DF) */
  --color-surface:    var(--background);       /* no more white cards — surfaces = page + hairline */
  --color-surface-2:  var(--background-deep);  /* deeper surface   (#DBD4C8) */
  --color-border:     var(--border);           /* 42% foreground hairline */
  --color-text:       var(--text);             /* #302D2A */
  --color-text-muted: var(--text-muted);       /* #4D4945 */
  --color-accent:     var(--primary);          /* swappable accent — DO NOT hard-code */
  --color-accent-dim: color-mix(in srgb, var(--primary) 45%, transparent);
  --color-error:      var(--error);
  --color-success:    oklch(0.48 0.17 148);    /* keep, or map to a tsu green if added */

  /* ── spacing (patch 4-step → tsu scale) ─────────────────── */
  --space-1:  var(--space-xs);   /* 4  */
  --space-2:  var(--space-md);   /* 8  */
  --space-3:  var(--space-xl);   /* 12 */
  --space-4:  var(--space-3xl);  /* 16 */
  --space-6:  24px;              /* tsu tops out at 22; 24/32/48/64 stay literal */
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;

  /* ── type ───────────────────────────────────────────────── */
  --font-sans: var(--font-display);  /* Geist → Fraunces for display roles */
  --font-mono: var(--font-mono);     /* Geist Mono → JetBrains Mono (same var name, new value) */
  --text-xs:   var(--type-label-md); /* 11 */
  --text-sm:   var(--type-body-md);  /* 12 */
  --text-base: 14px;
  --text-lg:   18px;
  --text-xl:   24px;
  --text-2xl:  32px;

  /* ── shape: flat by default ─────────────────────────────── */
  --radius-sm: 0;   /* tsu principle: flat corners. Round is opt-in per-element. */
  --radius-md: 0;
  --radius-lg: 0;

  --nav-h: 56px;
}
```

Notes:
- `--color-surface` intentionally collapses to the page color. tsu does not use raised white
  cards — separation comes from **hairline frames**, which you add in step 02.
- Setting the three `--radius-*` to `0` flattens every corner that used them. The few genuinely
  round elements (knob, switch, jack) set their own `border-radius: 50%` / `999px` locally, so
  they're unaffected.
- `--color-accent-dim` becomes a translucent accent (used for slider fills etc.) rather than a
  light tint, which reads better on the dark panel.

---

## 1.4 — Replace the Geist `@font-face`

patch currently references Geist / Geist Mono via `@fontsource-variable` imports. Keep those
imports removed — Fraunces replaces Geist for display roles (`--font-display`), and JetBrains
Mono handles UI/mono. Update the alias in `config.css` so `--font-sans` resolves to
`var(--font-display)` as shown in 1.3.

---

## 1.5 — Synth accent (`microbrute/theme.css`)

The repo overrides `--color-accent` per-synth here. Repoint it at a tsu-friendly accent. For
this deployment the reviewed default is a darker cool blue that reads on the black panel:

```css
/* src/synths/microbrute/theme.css */
:root {
  --primary: oklch(0.55 0.13 255);   /* MicroBrute accent — legible on the dark panel */
}
```

(Leave `--color-accent: var(--primary)` from 1.3 to pick this up. The nav accent-cycle in 02
overrides `--primary` at runtime, so keep this as the *initial* value only.)

---

## After step 1

The app should now be warm beige, set in Fraunces + JetBrains Mono, with flat corners and
accent-blue focus rings — but chrome will still look like bordered boxes and the panel won't be
framed yet. That structural pass is **`02-components.md`**.
