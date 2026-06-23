# synth-preset-maker

## Stack
- Vite 6 + React 19 SPA
- Bun runtime (use `bun`, `bunx`, not npm/pnpm/yarn)
- No router library — custom glob-based router
- React Compiler (babel plugin)

## Commands
| Command | Action |
|---|---|
| `bun run dev` | Start Vite dev server |
| `bun run build` | Production build (outDir: `../dist`) |
| `bun run lint` | ESLint with auto-fix |
| `bunx eslint src` | ESLint check without fix |

Vite root is `src/`. CLI commands run from project root.

## File structure
```
src/
  App.jsx                      ← entry, renders <Grid/> <Grain/> <Router/>
  components/
    atoms/                     ← stateless visual primitives
    molecules/                 ← own state OR composes 2+ atoms with behavior
    organisms/                 ← page-level sections, composes molecules/atoms
    *.jsx + *.module.css       ← flat files for stateless helpers
  hooks/
  providers/
    router/                    ← custom glob-based router
  routes/
    Landing/{index.jsx, styles.module.css}
    Editor/{index.jsx, styles.module.css}
    calibrate.jsx              ← flat — DEV-only, no styles
  styles/
    tokens/{colors,spacing,motion}.css
    reset.css
    base.css
    elements.css
    index.css                  ← @imports above in order
  synths/
    {synthId}/theme.css        ← per-synth CSS variables
```

**Atomic classification rule**: Atom = indivisible visual primitive. Molecule = has own state OR composes 2+ atoms with behavior. Organism = page-level section composing multiple molecules/atoms.

## Import alias
`@/` resolves to `src/`. Use absolute `@/components/...`, `@/hooks/...`, `@/routes/...`, `@/styles/...`, `@/synths/...`. Relative imports only for same-directory module CSS files (`./styles.module.css`).

## Per-component folder pattern
Create a folder with `{index.jsx, styles.module.css}` only when the component has styles. JSX-only stays flat.

- CSS modules use **camelCase** class names
- Variants via plain template literals — no clsx, no classnames
- No generic folders (`utils`, `helpers`, `services`, `common`, `shared`)

## CSS architecture
Three layers:
1. **Tokens** (`styles/tokens/`) — CSS custom properties only, no selectors
   - Colors: OKLCH only (`oklch(L C H)` or `oklch(L C H / alpha)`)
   - Spacing: unified `--2xs` (2px) through `--8xl` (48px) scale
   - Motion: `--dur-fast`, `--dur-enter`, `--expo-out`
2. **Base** (`styles/reset.css`, `base.css`, `elements.css`) — element selectors, reset, typography, form controls
3. **Module** (`component/styles.module.css`) — scoped to component

Token scale: `--2xs: 2px`, `--xs: 4px`, `--sm: 6px`, `--md: 8px`, `--lg: 10px`, `--xl: 12px`, `--2xl: 14px`, `--3xl: 16px`, `--4xl: 18px`, `--5xl: 22px`, `--6xl: 24px`, `--7xl: 32px`, `--8xl: 48px`. Single scale for spacing, font-size, border-radius.

Monospace everywhere: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`.

## Per-synth theming
- `useSynthTheme` in `src/hooks/useSynthPreset.jsx` sets `document.body.dataset.theme = synthId` and dynamically imports `synths/${synthId}/theme.css`
- Theme files are global CSS (not modules) under `src/synths/{id}/theme.css`
- Selector: `[data-theme="..."] { --primary: oklch(...) }`
- Synth ID must match the directory name and the value passed to the router via `?synth=` query param

## Router
- `import.meta.glob('../../routes/**/*.jsx')` auto-discovers route files
- URL pattern overrides for folder-based routes live in `src/providers/router/index.jsx` (`ROUTE_OVERRIDES`)
- To add a route: create `src/routes/{name}/index.jsx` and add an override mapping
