# Three changes

## 1. Remove all em dashes from copy

Sweep every visible string in `src/components/sohma/sections.tsx`, `Nav.tsx`, and `src/routes/index.tsx` (meta titles/descriptions included). Replace `—` with the most natural punctuation per sentence — usually a period, comma, or colon, never another em dash. Examples:

- "Signal, not decision. On-device. Auditable end to end." stays (no em dash here).
- "SOHMA closes that gap *safely, transparently,* and within governance boundaries the operator defines." (already fine.)
- "We read process signals — hesitation, retry loops, input timing, correction patterns — and output…" becomes "We read process signals such as hesitation, retry loops, input timing, and correction patterns, and output…"
- "SOHMA / Behavioral Intelligence Layer" stays (slash, not dash).
- Mono captions like `01 — HESITATION`, `STREAM OK`, `SIGNAL SCOPE · 04 CHANNELS · LIVE` in `SignalScope.tsx` → replace `—` with `/` or `·` to keep the instrument feel without an em dash.
- Numeric readout labels (`σ — 0.0024`) → `σ 0.0024`.
- Meta title "SOHMA — A research infrastructure…" → "SOHMA. Behavioral intelligence layer for AI."

I'll do this as a pure find-and-rewrite pass, preserving meaning and rhythm.

## 2. Bespoke visualization for Section 3 (Signal Layer / Capability)

The Capability section currently shows `SignalRings` (concentric rings) on the right. Replace it with a **bespoke `SignalField` visualization** that is visually distinct from the hero's `SignalScope` (waveforms) so the two sections don't echo each other.

**Concept: a live signal map.** A square canvas containing:

- A faint cartesian frame with mono tick labels on two axes: x = `Input timing variance`, y = `Retry density`.
- ~80 small dots drifting slowly in a 2D field, each dot representing a moment of interaction. Dots cluster into three soft zones labeled `CALM`, `ENGAGED`, `STRESS` (matching the three states already named in copy). Zone labels sit in the corners in mono caption style.
- A single highlighted "current" dot with a soft signal-colored glow that slowly migrates between the three zones, with a 1px trailing path showing the last ~40 positions. This is the "what's happening right now" reading.
- A bottom readout strip: `STATE: ENGAGED  ·  σ 0.0024  ·  Δ 41ms` that updates every ~800ms in sync with the migrating dot.
- A breathing `LIVE` dot in the top-right corner.

**Motion**: single `<canvas>`, ~30fps rAF loop, deterministic drift (sum of low-freq sines per dot), respects `prefers-reduced-motion` (renders static snapshot), pauses on tab hide.

**Interactivity**: hovering one of the three zone labels (`Calm` / `Engaged` / `Stress`) softly highlights dots belonging to that cluster (full opacity, others dim to ~20%) and shows a one-line description below the readout. Keyboard-accessible via focusable zone labels.

**Visual language**: uses existing tokens only (`--signal`, `--signal-soft`, `--foreground`, `--muted-foreground`, `--hairline`). 1px hairline frame, mono captions, no new colors. Sits in a ~440px square, replacing the `SignalRings` block in the right column of the Capability section.

Files:
- Create `src/components/sohma/SignalField.tsx` (self-contained, no deps).
- Edit `src/components/sohma/sections.tsx` → `Capability` section: swap `SignalRings` block for `SignalField`. The left-column copy stays.
- `SignalRings` and `SignalScope` are untouched.

## 3. Remove the "Built for contexts" section (Audiences)

- Remove `<Audiences />` from `src/routes/index.tsx`.
- Remove the `Audiences` export and the `AUDIENCES` array from `src/components/sohma/sections.tsx`.
- Remove the "Audiences" link from `Nav.tsx` if present.
- Renumber the subsequent section captions so they stay sequential: Governance becomes `04 — Governance & values` (currently `05`), and any other downstream numerals shift accordingly.

## Out of scope

- No changes to the hero `SignalScope`.
- No new dependencies, no real data, no backend.
- No copy rewrites beyond the em-dash sweep.
