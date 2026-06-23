# Step 3 — Landing route

Rebuild `src/routes/index.jsx` to the approved one-page landing. Structure, top to bottom:

1. **Nav** — `patch` wordmark (Fraunces) on the left; `◆` accent-cycle + `☾` theme-toggle on
   the right. (Same nav component as the editor, minus the editor tools.)
2. **Hero** — two columns: copy + CTA on the left, the "url is the preset" demo card on the right.
3. **Marquee** — a single-line scrolling ticker, reduced-motion-safe.
4. **How-it-works** — a 3-column bordered band with hairline dividers.
5. **Instruments** — a section header with a count, then the instrument rack (cards).
6. **Footer** — `patch` wordmark + the tsu `mañana es mejor` motif + two meta columns.

The full, working markup + CSS is in `reference/patch.html` (the `#landing` block and the
`/* ── landing ── */` style section). Port it into JSX. Key pieces below.

---

## 3.1 — Hero (two columns)

Left column: kicker (`synth preset sharing · no backend`, the last word in accent), the `patch`
wordmark in Fraunces at `SOFT 67`, a serif tagline, then the CTA row.

```jsx
<header className="hero">
  <div className="hero-left">
    <div className="hero-kicker">synth preset sharing · <b>no backend</b></div>
    <h1 className="hero-name">patch</h1>
    <p className="hero-tag">your patches, shareable as a link.</p>
    <div className="hero-actions">
      <Link className="cta" to="/editor">open the editor <span className="cta-arr">→</span></Link>
      <span className="cta-note">free · no account · works on any device</span>
    </div>
  </div>
  <aside className="demo" aria-hidden="true">{/* 3.2 */}</aside>
</header>
```

```css
.hero { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: var(--space-5xl);
  align-items: end; padding: clamp(36px, 7vh, 80px) 0 var(--space-5xl); }
.hero-name { font-family: var(--font-display); font-variation-settings: "SOFT" 67;
  font-size: clamp(78px, 15vw, 210px); line-height: 0.8; letter-spacing: -0.03em; color: var(--text); margin: 0; }
.hero-tag { font-family: var(--font-display); font-variation-settings: "SOFT" 40;
  font-size: clamp(22px, 3.4vw, 38px); line-height: 1.05; color: var(--text-muted); max-width: 18ch; }
.cta { display: inline-flex; align-items: center; gap: var(--space-md);
  font-family: var(--font-mono); text-transform: uppercase; letter-spacing: var(--track-ui);
  font-size: var(--type-label-md); font-weight: 500; text-decoration: none;
  color: var(--background); background: var(--foreground); padding: 11px 18px; box-shadow: inset 0 0 0 1px var(--foreground); }
.cta:hover { background: var(--primary); box-shadow: inset 0 0 0 1px var(--primary); }
.cta:hover .cta-arr { transform: translateX(3px); }
```

---

## 3.2 — The "url is the preset" demo card

This is the conceptual centerpiece — it *shows* the thesis rather than asserting it: a framed
URL bar (with the encoded query, the `&j=…` segment in accent) above a dark strip of mini-knobs
that echo the real panel.

```jsx
<aside className="demo" aria-hidden="true">
  <div className="demo-head"><span>the url is the preset</span><span className="demo-live">◆ live</span></div>
  <div className="demo-url">
    <span className="u-base">patch.app/#/editor?</span>
    <span className="u-k">k=500.0.1000.0.620…</span>
    <span className="u-j">&amp;j=lfo▸cutoff</span>
  </div>
  <div className="demo-strip">
    <div className="mk-row">
      {/* five .mk knobs with a static rotated .mk-dot + one .mk.mk-sw switch */}
    </div>
  </div>
  <div className="demo-foot">every knob, switch &amp; cable encoded into the link — copy it, paste it, the sound rebuilds.</div>
</aside>
```

The mini-knobs are decorative (`aria-hidden`); each `.mk-dot` just gets a fixed
`transform: translateX(-50%) rotate(<deg>deg)`. Copy the exact values + the `.demo*` / `.mk*`
CSS from `reference/patch.html`. The dark strip reuses `--panel-bg` / `--panel-line` so it ties
back to the instrument.

---

## 3.3 — Marquee

```jsx
<div className="marquee" aria-hidden="true">
  <div className="marquee-track">
    <span>no accounts ◇ no backend ◇ no uploads ◇ the link is the preset ↺ build → break → share ↺ &nbsp;</span>
    <span>{/* duplicate the span verbatim for a seamless loop */}</span>
  </div>
</div>
```

```css
.marquee { overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: var(--space-md) 0; }
.marquee-track { display: flex; width: max-content; animation: marq 34s linear infinite; }
.marquee-track span { font-family: var(--font-mono); text-transform: uppercase;
  letter-spacing: var(--track-ui); font-size: var(--type-label-md); color: var(--text-faint); white-space: nowrap; padding-right: var(--space-md); }
@keyframes marq { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
```

Two identical spans + a `-50%` translate = a seamless loop.

---

## 3.4 — How-it-works band

Three steps (`01 pick a synth` / `02 dial it in` / `03 share the link`) in a single bordered
band with hairline dividers between columns (no card backgrounds).

```css
.how { display: grid; grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.how-step { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-5xl) var(--space-4xl); }
.how-step + .how-step { border-left: 1px solid var(--border); }
.how-n { font-family: var(--font-mono); letter-spacing: var(--track-ui); font-size: var(--type-label-md); color: var(--primary); }
.how-l { font-family: var(--font-display); font-variation-settings: "SOFT" 20; font-size: 25px; color: var(--text); }
.how-d { font-family: var(--font-mono); font-size: var(--type-label-md); line-height: 1.6; color: var(--text-muted); }
```

Under 980px the columns stack and the dividers move from `border-left` to `border-top`.

---

## 3.5 — Instruments rack

A section header (`instruments` + a `01 / 01 live` count), then a responsive card grid. The
live MicroBrute card links to `/editor`, shows the panel thumb on a dark mat, a hover `open →`
badge, an `analog` type tag, the description, and a `34 parameters · 8 cv jacks` meta line. A
second muted `◆ more soon` card hints at the roadmap.

```css
.synth-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-4xl); }
.synth-card { display: block; text-decoration: none; color: inherit; box-shadow: inset 0 0 0 1px var(--border);
  transition: box-shadow var(--dur-fast) var(--expo-out), transform var(--dur-enter) var(--expo-out); }
.synth-card:hover { box-shadow: inset 0 0 0 1px var(--primary); transform: translateY(-2px); }
.synth-thumb { background: var(--panel-bg); padding: 10px; position: relative; overflow: hidden; }
.card-open { position: absolute; top: var(--space-md); right: var(--space-md);
  font-family: var(--font-mono); text-transform: uppercase; letter-spacing: var(--track-ui);
  font-size: var(--type-label-xs); color: var(--background); background: var(--primary); padding: 4px 8px;
  opacity: 0; transform: translateY(-4px); transition: opacity var(--dur-fast) var(--expo-out), transform var(--dur-fast) var(--expo-out); }
.synth-card:hover .card-open { opacity: 1; transform: translateY(0); }
.synth-name { font-family: var(--font-display); font-variation-settings: "SOFT" 25; font-size: 24px; color: var(--text); }
.synth-tag { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: var(--track-ui);
  font-size: var(--type-label-xs); color: var(--text-faint); box-shadow: inset 0 0 0 1px var(--border); padding: 3px 7px; }
```

Full markup for both cards is in the reference `#landing` block.

---

## 3.6 — Footer

```jsx
<footer className="foot foot-landing">
  <div className="foot-brand">
    <span className="foot-name">patch</span>
    <span className="foot-es">mañana es mejor</span>
  </div>
  <div className="foot-col"><span className="f-mark">the url is the preset</span><span>no accounts · no backend · no uploads</span></div>
  <div className="foot-col"><span className="f-mark">reskinned in tsu</span><span>built with taste, intention &amp; love</span></div>
</footer>
```

`.foot-name` is Fraunces; `.foot-es` is the italic Fraunces tsu signature. Stacks to a column
under 980px.

---

## 3.7 — Responsive

The single breakpoint at **980px** collapses: hero → one column, how-it-works → stacked with
top dividers, footer → column. The grid texture/grain already self-disable under 900px. Verify
the whole page against `reference/patch.html` at desktop and mobile widths.
