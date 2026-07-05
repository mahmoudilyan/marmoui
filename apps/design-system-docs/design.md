# Design — Marmo UI docs site

A locked design system for this app's marketing + docs surfaces. Every page
redesign reads this file before emitting code. Extend or amend this file when
the system needs to grow — do not regenerate per page.

## Positioning (copy voice)

Marmo is the **AI agentic designer**: point the agent you already use — Claude
Code, Codex, Cursor, Gemini CLI — at Marmo's MCP and it builds production
applications and dashboards in minutes. Not AI slop: the MCP serves real
component APIs, patterns, and your own design tokens, and validates generated
code before it ships. "Define your own style" — tokens + DESIGN.md + Tenant
on-brand generation (Pro).

Copy rules:
- No invented metrics, no fake testimonials, no star ratings, no "trusted by
  N teams". Social proof only from Sanity CMS (real entries) — sections render
  nothing when the CMS is empty.
- Verbs over adjectives. "Connect your agent" not "Unleash the power of AI".
- Name the actual tools: Claude Code, Codex, Cursor, Gemini CLI, Windsurf.

## Genre

modern-minimal (developer tool / AI infra).

## Macrostructure family

- Marketing pages: Marquee Hero — left-anchored headline + real-component
  collage (`HeroBentoGrid`, actual `@marmoui/ui` previews, never screenshots).
  Section rhythm: full-width bands alternating `bg-bg` / `bg-panel`, one dark
  band max per page (FAQ or final CTA).
- Content pages (docs): Fumadocs defaults; typography only, no enrichment.
- App pages (connect/unlock): Workbench — function carries the page.

## Theme

The marketing site consumes `@marmoui/ui` semantic tokens — the site itself is
the design-system demo. Use utility classes bound to tokens, never raw hex:

- Paper: `bg-bg` (near-white) · `bg-panel` (raised surface)
- Ink: `text-ink-dark` (headings) · `text-ink` (body) · `text-ink-light` /
  `text-ink-muted` (secondary)
- Rules: `border-border-secondary`
- Accent: violet `text-primary` / `bg-primary` (≈ oklch(58% 0.15 295), the
  existing brand #8569ce family). ≤ 5% of any viewport.
- Dark band: `#0d0d0d`→`#141422` range, one per page max (footer + at most one
  section).

Raw hex allowed only inside third-party brand logos (Figma, Claude, etc.).

## Typography

- Display: "Plus Jakarta Sans", 600–700, tracking -0.02em to -0.03em
- Body: system stack (existing `globals.css` body), 400
- Mono: ui-monospace stack for code/config snippets
- Hero headline ≤ 7 words. No gradient-clipped text.

## Spacing

Tailwind 4-pt scale. Section padding `py-20 md:py-28`. Container
`max-w-7xl px-4 md:px-6`.

## Motion

- Easing: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`; durations 200–300ms
- transform/opacity only; reduced-motion collapses to opacity ≤150ms
- Max 3 microinteraction primitives per page (accordion reveal, hover lift,
  copy-button feedback)

## Microinteractions stance

- Silent success (copy buttons flip icon, no toast)
- Hover tooltips 800ms delay, focus 0ms
- `:focus-visible` ring, never animated

## CTA voice

- Primary: solid dark (`bg-[#141422]`/ink token), `rounded-[6px]`, h-11,
  15px/600, verb-first copy ("Connect your agent", "Get Pro")
- Secondary: white w/ `border-border-secondary`, same geometry
- Never more than 2 CTAs side-by-side

## Per-page allowances

- Landing: HeroBentoGrid collage + real component previews only
- Pricing: typography + cards, no enrichment
- Updates (Sanity): typography only
- Docs: fumadocs defaults

## What pages MUST share

- Wordmark, accent violet + placement discipline, Plus Jakarta Sans display,
  CTA voice, section heading rhythm (kicker 14px/600 accent → 40/48px bold
  ink heading → 18–20px ink-light standfirst).

## What pages MAY differ on

- Section composition within Marquee Hero family; dark-band placement;
  pricing cards vs. prose.
