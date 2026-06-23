# AGENTS.md — patch

## Runtime & toolchain
- **Bun**, not Node. Install: `bun install`. Scripts: `bun run dev | build | preview | lint`.
- **Vite** with root at `src/` (not the repo root). The HTML entry is `src/index.html`.
- **React 19** with **React Compiler** (`babel-plugin-react-compiler`, target 19) via Vite plugin.
- **`@` path alias** resolves to `src/` (defined in `vite.config.js`).
- **No TypeScript** — everything is JSX. File extensions: `.js`, `.jsx`, `.css`.

## Commands
| Command | What |
|---------|------|
| `bun run dev` | Vite dev server |
| `bun run build` | Production build into `src/dist/` |
| `bun run lint` | ESLint on `src/` |

There is no test command, no typecheck, and no CI.

## Architecture
```
index.html → App.jsx → Router (providers/router/index.jsx)
  └─ auto-discovers route pages via import.meta.glob('../../routes/**/*.jsx')
  └─ file-based: routes/editor.jsx → /editor, routes/index.jsx → /
  └─ no external router library
```

- **Routes** live in `src/routes/`. Add a `.jsx` file there, it becomes a route automatically. Dynamic segments: `[id].jsx` → `/:id`.
- **Router** uses `history.pushState` and listens to `popstate`. Navigation via `<Link>` component or `useRouter()` hook. Route matching is regex-based and ignores query strings.
- **  definitions** live in `src/synths/<name>/index.js` as data objects (not components). Each has `id`, `name`, `panel` (image path), and a `params` map of knobs/switches/sliders/jacks with `x`/`y` positions and `default` values. Register new synths in `src/synths/index.js`.
- **Synth themes** go in `src/synths/<name>/theme.css` and are applied via `[data-theme='<id>']` on `<body>`. Theme CSS loads dynamically; the editor layout is hidden until the CSS resolves, preventing a flash of unthemed UI.
- **No backend.** All preset data is encoded in the URL query string (`?synth=...&preset=<base64 JSON>`). The `useSynthPreset` hook reads/writes the URL.
- **Components** dispatch on `param.type` in `ControlRenderer.jsx`: `'knob'` → Knob, `'switch'` → Switch, `'jack'` → null (rendered separately by PatchBay), anything else → native range input.

## PatchBay (Mod Matrix)
- Synth params can include `type: 'jack'` entries with `direction: 'in' | 'out'`.
- Jacks are rendered by `PatchBay.jsx` as a drag-to-connect cable patching system over an SVG overlay.
- **Cable state** is stored in preset values under `__cables`: output jacks store an array of connected input keys; input jacks store their single connected source key.
- Each input jack accepts at most one cable. Clicking a connected input removes the cable. Clicking a connected output removes all its cables.

## Value encoding quirks
- **Switch values** are stored as normalized 0–1 floats (`index / (options.length - 1)`), not the option strings. `buildDefaults` handles the conversion from option string to index.
- **Jack values** are arrays (for outputs), strings (for inputs), or `null` when disconnected.
- Preset data is base64-encoded JSON in the URL `preset` query param. Malformed base64 falls back to defaults with a visible error banner.

## Undo history
- `useUndoHistory(30)` stores a stack of full preset snapshots (30 max). `setValue` pushes the prior state before applying changes.
- Undo pops the last snapshot; there is no redo. Switching synths clears the undo stack.

## CSS conventions
- Plain CSS with custom properties in `src/styles/config.css` (light theme by default; synth themes override via `[data-theme]`).
- Import order matters: `fonts → reset → config → typography → layout → controls`.
- Fonts are Geist Variable (sans) and Geist Mono Variable, self-hosted via `@fontsource-variable/geist` and `@fontsource-variable/geist-mono`.
- Control sizing is driven by CSS custom properties (`--knob-size`, `--switch-w`, etc.).
- Type scale: 11px / 13px / 16px / 20px / 25px / 32px (~1.25 ratio).
- **No shadows** in base chrome. Depth is communicated through color contrast and borders only. Per-synth themes may use shadows.
- Design system documentation: `DESIGN.md`. Product context: `PRODUCT.md`.

## Accessibility
- All interactive controls (knobs, switches) are keyboard-operable and ARIA-labeled.
- Tooltips reveal on both hover and focus-within.

## Lint rules to know
- **Single quotes** (not double).
- **`max-depth: 2`** — no deeply nested control flow.
- **`max-params: 3`** — functions take at most 3 parameters.
- **`max-lines-per-function: 45`** (skipBlankLines, skipComments).
- **`complexity: warn 15`** — warns on high cyclomatic complexity.
- **`no-else-return`**, **`no-nested-ternary`**, **`no-unneeded-ternary`**, **`no-param-reassign`** enforced.
- **`no-console` is off** — console.log is allowed.
- These files are **ignored** by ESLint: `src/styles/reset.css`, `src/dist/**`, `src/routes/calibrate.jsx`. Don't lint them.

## Calibrate page
- `/calibrate` is a developer tool for visually positioning synth controls on the panel image. It's ignored by lint — don't refactor or lint it unless asked.

## No-go patterns
- Don't add a router library; the custom file-based router is the convention.
- Don't add useCallback, useMemo, or other unnecessary optimization; these are handled by React Compiler.
- Don't mutate state values directly — always use `setValue` from `useSynthPreset`.
- Don't add a backend or database — presets are URL-serializable by design.
