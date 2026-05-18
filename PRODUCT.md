# Product

## Register

product

## Users

Synth enthusiasts, hobbyist sound designers, and musicians who want to create, browse, and share synthesizer presets. Casual and exploratory — they're tweaking sounds, not doing critical studio work. Anyone can land on a shared preset URL and immediately see the panel with all knob positions.

## Product Purpose

Create and share synthesizer presets visually. Instead of opaque patch files or MIDI dumps, every preset is a panel image with knobs and switches overlaid — readable at a glance, shareable as a URL. No accounts, no backend, no uploads. The URL is the preset.

## Brand Personality

Clean, bright, modern. The base interface disappears into the task — a quiet frame around the synth panel. Per-synth themes inject identity (the MicroBrute brings its UFO aesthetic), but the chrome itself stays minimal and professional.

## Anti-references

- No cyberpunk / neon-on-black aesthetic in the base styles. Per-synth themes can go loud, but the app shell should not.
- No vintage retro synth skeuomorphism (fake wood, 70s nostalgia).
- No corporate SaaS dashboard patterns (data tables, enterprise chrome).
- No DAW-style complexity — this is a preset viewer and sharer, not a full editor replacement.

## Design Principles

1. **URL is the preset.** Every preset is a shareable URL. No accounts, no database, no login walls. Copy the URL, send it to a friend, done.
2. **The panel is the source of truth.** Synth panel images carry the visual identity. Controls sit on top, positioned precisely. The interface adds chrome, not character.
3. **Immediate, then immersive.** Default state shows a ready-to-tweak preset. Zero friction to start turning knobs. Depth (tooltips, descriptions, per-synth theming) reveals itself on engagement.
4. **Synth-first theming.** Each synth brings its own visual identity via theme.css. The base app shell is a clean, bright, neutral frame that recedes.
5. **Preserve the knob feel.** Physical interaction matters — drag behavior, visual feedback, and indicator rotation should feel direct and analog, not abstract or mouse-y.

## Accessibility & Inclusion

Basic accessibility: semantic HTML, keyboard reachable controls, standard focus indicators, no reliance on hover-only interactions. No formal WCAG target.
