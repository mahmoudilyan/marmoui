---
description: Initialize a project for on-brand Marmo UI generation — detect or interview for brand basics (layout, primary color, fonts, radius, spacing) and write a DESIGN.md if one doesn't exist.
---

# /marmo-ui:init

Bootstrap this project's design identity. If a `DESIGN.md` (or `design.md`) already exists at the project root, read it, report its brand name + primary color, and stop — never overwrite without an explicit ask. Otherwise: **detect what you can, interview for what you can't, then write `DESIGN.md`**.

The file follows the Stitch DESIGN.md structure (YAML frontmatter with design tokens, prose body with usage rules) so any agent — Claude, Cursor, Codex, Gemini — can generate on-brand UI from it. For Pro tenants the same file is what workspace ingestion uploads to the MCP.

## Step 1 — Detect before asking

Scan the project and pre-fill every token you can. Do not ask about anything you detected:

- **Colors** — `:root` custom properties in global CSS, `tailwind.config.*` `theme.extend.colors`, existing `tokens.css` / `tokens.json`.
- **Typography** — `next/font` imports, `@fontsource/*` deps, Google Fonts `<link>`s, `fontFamily` in Tailwind config.
- **Radius / spacing** — `--radius-*` / `--space-*` custom properties, Tailwind `borderRadius` / `spacing` extensions.
- **Layout** — presence of a sidebar shell (`SidebarProvider`, `app-shell` pattern) vs. topbar marketing layout in existing routes.
- **Dark mode** — `.dark` class usage, `next-themes`, `prefers-color-scheme` blocks.

## Step 2 — Interview for the gaps

Ask **only** the unanswered essentials, in one batch (AskUserQuestion if available; plain questions otherwise). Main questions, in priority order:

1. **Brand name** — what should the system be called?
2. **Primary color** — one hex value (or "pick for me" → propose 3 anchored options).
3. **Fonts** — display + body (or "system" / "pick for me").
4. **Layout** — app-with-sidebar, topbar-marketing, or both?
5. **Corner rounding** — sharp (2–4px), soft (6–10px), or pill-heavy?
6. **Spacing density** — compact, comfortable, or airy?
7. **Dark mode** — required, later, or never?

Accept partial answers; infer skipped fields from the brand color's temperature and the project's genre, and **state every inference** in your reply so the user can redirect.

## Step 3 — Write DESIGN.md

Compose the file at the project root. Frontmatter is the token source of truth; the body carries usage rules. Schema (Stitch-compatible):

```markdown
---
version: alpha
name: <brand name>
description: <one line>
colors:
  primary: "#RRGGBB"
  secondary: "#RRGGBB"
  tertiary: "#RRGGBB"          # optional accent
  paper: "#RRGGBB"
  ink: "#RRGGBB"
typography:
  h1:
    fontFamily: <Display Face>
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  body:
    fontFamily: <Body Face>
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: 12px
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    borderColor: "{colors.ink-10}"
---

# <Brand name> — design brief

<Short prose: voice, layout family, dark-mode stance, do/don't list.>
```

Token rules:

- **Color**: `#` + sRGB hex, quoted.
- **Dimension**: number + unit (`px`, `em`, `rem`).
- **Token reference**: `{path.to.token}` — always prefer references over repeated literals in `components:`.
- **Typography**: composite object (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`).
- `components:` entries are **overrides** on top of `@marmoui/ui` defaults — only list tokens that differ. Any component the MCP knows (`button-primary`, `card`, `input`, `badge`, `data-table`, …) can be overridden here.
- `uiImportPath` (optional, top-level): set to the app's local ui wrapper path (e.g. `"@/ui"`) when the project uses the override convention from `/marmo-ui:override`. If you detect `src/ui/index.ts` re-exporting `@marmoui/ui` during Step 1, include it automatically.

## Step 4 — Wire it up

1. Report: path written, brand name, primary color, fonts, and which values were detected vs. asked vs. inferred.
2. Tell the user: any agent reading this repo now generates on-brand; Pro tenants can upload it at `/connect` (workspace ingestion) so the MCP serves it to **every** connected agent automatically.
3. Treat `DESIGN.md` as the source of truth for all UI generation in this session.

## User request

$ARGUMENTS
