# Contributing — Component & Pattern MDX

This is the canonical guide for authoring component and pattern documentation in `apps/design-system-docs/content/`. The MDX files here drive **two** consumers:

1. **The docs website** (Fumadocs / Next.js) that engineers read in a browser.
2. **The Marmo UI MCP server** (hosted; source in the private platform repo) that AI agents consume programmatically.

Most authoring decisions are dictated by what the MCP parser can extract reliably. Read this guide once before writing your first MDX file.

---

## TL;DR

- **Components** live in `content/components/<name>.mdx`.
- **Patterns** live in `content/patterns/<id>.mdx`.
- Frontmatter is **mandatory and structured** — the MCP keys off the title (components) or id (patterns).
- "When to use" guidance must be **at top-level**, not buried in `<Accordion>` blocks. The parser only reads structured sections.
- Every component MDX should include a **"Choosing the right alternative" table** that cross-references neighbours.
- Run `pnpm validate:knowledge` before pushing. The pre-commit hook will run it for you on staged files.

---

## How the MCP parses your MDX

The MCP's MDX parser extracts these fields from each component MDX. **If the AI is going to use it, it has to land in one of these fields:**

| Source in MDX | MCP field |
|---|---|
| Frontmatter `title`, `description`, `category`, `status`, `keywords`, `lastUpdated` | `metadata` |
| `<CodeExample title="..." description="..." code={\`...\`} />` JSX block | `examples` |
| `<Guideline type="do" title="...">…</Guideline>` + bullets under `## Best Practices` / `## Guidelines` | `bestPractices` |
| `<Guideline type="dont" title="...">…</Guideline>` + bullets under `## Common Mistakes` / `## Avoid` / `## Don't` | `commonMistakes` |
| Code blocks under `## Patterns` (each with a `### Sub-heading`) | `patterns` |
| Code blocks under `## Recipes` / `## Cookbook` / `## Examples` | `recipes` |
| Bullets under `## Accessibility` | `accessibility` |
| Generated from `packages/ui/src/components/*` JSDoc | `props` (via `component-props.json`) |

> ⚠️ **Anything else is just raw content** — visible to humans on the docs site, but not surfaced as a discrete field to the AI. In particular, content inside `<Accordion>`, `<Accordions>`, or `<InfoCallout>` blocks is **not** extracted as `bestPractices` / `commonMistakes`. Hoist it to top-level sections.

For patterns (`pattern-loader.ts`), the parser extracts:

| Source | Pattern field |
|---|---|
| Frontmatter `id` (or filename) | `id` (the slug for `get_pattern("...")`) |
| Frontmatter `title`, `description`, `components` (array), `tags` (array) | `title`, `description`, `components`, `tags` |
| Text under `## Overview` | `overview` |
| All fenced `tsx` / `jsx` / `ts` / `js` code blocks, labelled by their nearest preceding heading | `code` (single string with `// ─── Heading ───` dividers if multiple) |

---

## Component MDX template

```mdx
---
title: Switch                              # PascalCase if multi-word; matches the React component name
description: Toggle for binary on/off settings.
category: Components                       # always "Components" for component MDX
status: stable                             # stable | beta | deprecated
keywords:                                  # what devs search for; aliases included
  - switch
  - toggle
  - on/off
lastUpdated: 2026-04-29
---

import { Switch, Field } from '@marmoui/ui';

## When to use

<GuidelinesGrid>
  <Guideline type="do" title="Use for binary on/off state that takes effect immediately">
    Notification preferences, dark mode, feature flags. The change should not require a form save.
  </Guideline>
  <Guideline type="do" title="Wrap in a Field for label + helper text">
    `<Field label="Email me weekly"><Switch /></Field>` keeps spacing and a11y consistent.
  </Guideline>
  <Guideline type="dont" title="Don't use when the change takes effect on form submit">
    If the user has to click "Save" for the toggle to apply, use a **Checkbox** instead.
  </Guideline>
  <Guideline type="dont" title="Don't use for mutually exclusive choices">
    Pick one of two options → **RadioGroup**. Pick one of many → **Select**.
  </Guideline>
</GuidelinesGrid>

## Choosing the right alternative

| You want… | Use this |
|---|---|
| Form-style opt-in with explicit save | `Checkbox` |
| Mutually exclusive choice (2+) | `RadioGroup` |
| Compact icon trigger | `IconButton` |
| Slider for a continuous value | `Slider` |

## Examples

<CodeExample
  title="Notifications setting"
  description="Toggle wrapped in a Field"
  code={`<Field label="Weekly summary">
  <Switch defaultChecked />
</Field>`}
/>

## Best Practices

<GuidelinesGrid>
  <Guideline type="do" title="Persist the value optimistically">
    Update the UI before the network request lands. Switches feel sluggish if they wait.
  </Guideline>
</GuidelinesGrid>

## Common Mistakes

The wrong half goes in prose so the validator doesn't reject it; the right half goes in a fenced `tsx` block:

- **Switch inside a form that requires explicit save.** Use `Checkbox` instead — the user expects to commit changes via Save, not by toggling.

```tsx
<form>
  <Field label="Subscribe to newsletter">
    <Checkbox />
  </Field>
  <Button type="submit">Save</Button>
</form>
```

## Accessibility

- Activates with **Space** when focused.
- Always provide a label (via `Field` or an explicit `<label>`); `aria-label` if the label is visual-only.
- The active/inactive state must not rely solely on colour — Marmo's Switch uses position + colour together.
```

### Required sections (in this order)

1. **Frontmatter** — title, description, category, status, keywords, lastUpdated.
2. **`## When to use`** — with `<GuidelinesGrid>` containing `<Guideline type="do" />` and `<Guideline type="dont" />`.
3. **`## Choosing the right alternative`** — table cross-referencing neighbours. **This is the single biggest win for AI selection accuracy.**
4. **`## Examples`** — at least one `<CodeExample />` showing canonical usage.
5. **`## Best Practices`** — additional `<Guideline>` blocks for nuanced guidance.
6. **`## Common Mistakes`** — wrong → right code blocks the AI explicitly avoids.
7. **`## Accessibility`** — bulleted list of keyboard, screen reader, contrast notes.
8. **`## Props`** — table (often hand-written; `component-props.json` covers the rest automatically).

---

## Pattern MDX template

```mdx
---
id: pricing-table                         # kebab-case; becomes the get_pattern() argument
title: Pricing table
description: Three-tier comparison with featured plan and CTA.
components: [Card, Badge, Button, Heading, Text]   # exact PascalCase names
tags: [marketing, pricing, comparison]
---

## Overview

**Apply this pattern when** the user's prompt mentions:
- "pricing table", "plan comparison", "tier comparison"
- pricing, billing tiers, subscription plans

**Don't use this for:**
- Single-plan landing pages → use a hero CTA + `Card`
- In-app upgrade prompts → use a `Dialog`, not a full pricing comparison

**Hard rules:**
- One `featured` plan per table maximum (the recommended tier).
- Each plan card uses the same `<Card>` height — the layout is symmetric.

## Code

### Default — three-tier with featured middle plan
```tsx
'use client';
import { Card, Badge, Button } from '@marmoui/ui';
// ... working component
```

## Common mistakes

```tsx
// ❌ WRONG — three primary CTAs
<Button variant="primary">Choose</Button>
<Button variant="primary">Choose</Button>
<Button variant="primary">Choose</Button>
// ✅ CORRECT — one primary on the featured plan, secondary on the others
```
```

### Required sections

1. **Frontmatter** — id, title, description, components, tags.
2. **`## Overview`** — `Apply this pattern when` / `Don't use this for` / `Hard rules`. Plain markdown is fine.
3. **`## Code`** — at least one fenced `tsx` block. Variants get `### Variant name` headings.
4. **`## Common mistakes`** (optional but recommended) — **prose only**, not a fenced tsx block. See the warning below.

> ⚠️ **Important: never put intentionally-wrong JSX inside a fenced `tsx` block in a pattern MDX.** The MCP validator (`validate:knowledge`) parses *every* tsx code block and validates it against the live `@marmoui/ui` exports + props schema. A counter-example like `<PageSection>…</PageSection>` will be flagged as a real error and fail the build. Use **prose with inline `<code>` spans** for the wrong half, and keep fenced tsx blocks reserved for the canonical, copy-pasteable example.

---

## The "When to use" pattern in detail

This is the highest-leverage thing in any component MDX. The format that works best for AI consumption:

```mdx
## When to use

<GuidelinesGrid>
  <Guideline type="do" title="<concrete situation 1>">
    <one-sentence reason; reference the user-facing trigger>
  </Guideline>
  <Guideline type="do" title="<concrete situation 2>">
    ...
  </Guideline>
  <Guideline type="dont" title="<contrasting situation>">
    Use **<AlternativeComponent>** instead.
  </Guideline>
</GuidelinesGrid>
```

The bold `**ComponentName**` cross-references in `<Guideline type="dont">` are critical — they tell the AI exactly where to pivot when the current component is the wrong choice. Without them, the AI just knows "don't use this here" with no recovery path.

---

## The "Choosing the right alternative" table in detail

Every component MDX should have this table immediately after `## When to use`. Format:

```mdx
## Choosing the right alternative

| You want… | Use this |
|---|---|
| <concrete user goal> | `<ComponentName>` |
| <concrete user goal> | `<ComponentName>` (with `<prop>` configuration) |
```

The left column is **the user's goal in plain language**. The right column is the canonical Marmo UI component. The AI scans rows looking for a match against the prompt; whichever row hits, it uses the recommended component.

Example clusters that should each have a cross-ref table:

- **Buttons:** Button vs IconButton vs Link vs Switch vs RadioGroup
- **Inputs:** Input vs Textarea vs Select vs SelectSearchable vs NumberInput vs DatePicker
- **Feedback:** Toast vs Alert vs Dialog vs ConfirmationDialog vs Banner
- **Layout:** PageSection vs Card vs SidebarPanel
- **Selection:** Checkbox vs Switch vs RadioGroup vs Select

If two components have any chance of being confused, both files need the cross-ref entry. **Bidirectional references are not redundant — they're how the AI navigates.**

---

## Validation

Before pushing, run:

```bash
pnpm validate:knowledge
```

This is the same script CI runs (and the same one the pre-commit hook runs on staged MDX). It validates every code block in every component and pattern MDX against the live Marmo UI exports + props schema. Errors must be fixed before merge.

If you change component source code in `packages/ui/`, also run:

```bash
pnpm generate:props
git add apps/design-system-docs/src/data/component-props.json
```

The pre-commit hook will fail the commit if `component-props.json` drifted and you didn't stage the regenerated file.

---

## Pre-commit hook

This monorepo uses [husky](https://typicode.github.io/husky/) to run automatic checks before commits. The hook lives at [`.husky/pre-commit`](../../.husky/pre-commit) and:

- Runs `validate:knowledge` when MDX, component source, or MCP source changes.
- Runs `generate:props` and fails on drift when component source changes.
- Skips entirely for commits that don't touch design-system content.

If the hook hasn't been installed on your machine yet, run:

```bash
pnpm install
```

Husky's `prepare` script runs automatically and wires up `.git/hooks/`. To bypass the hook for a particular commit (very rare; only for emergency hotfixes), use `git commit --no-verify` — but expect to fix the underlying issue immediately after.

---

## Adding a new pattern (full checklist)

1. Pick a **kebab-case id** that's unique within `content/patterns/` (e.g. `empty-state`).
2. Create `apps/design-system-docs/content/patterns/<id>.mdx` from the template above.
3. Fill in frontmatter, especially `tags` — the AI uses these to match prompts.
4. Add the `## Overview` with **Apply when** / **Don't use for** / **Hard rules**.
5. Add the `## Code` block(s). Multiple variants → multiple `### Heading`-prefixed blocks; the parser concatenates them with section labels.
6. (Optional) Add `## Common mistakes` with wrong → right examples.
7. Register the slug in [`content/patterns/meta.json`](./content/patterns/meta.json) `pages` array (for the docs sidebar).
8. Add a row to the catalog table in [`content/patterns/index.mdx`](./content/patterns/index.mdx) with title / use when / don't / status.
9. Run `pnpm validate:knowledge` — fix any errors.
10. Open a PR. The CI will re-run validation; the hosted MCP redeploys on merge to `main` and re-indexes within ~2 min.

---

## Adding a new component (full checklist)

1. Implement the component in `packages/ui/src/components/<name>/`.
2. Run `pnpm generate:props` — regenerates `apps/design-system-docs/src/data/component-props.json`.
3. Create `apps/design-system-docs/content/components/<name>.mdx` from the template above.
4. **Most important:** add the cross-references — both ways. Update neighbours so they point to your new component too.
5. Register the slug in [`content/components/meta.json`](./content/components/meta.json) `pages` array.
6. Run `pnpm validate:knowledge`.
7. Open a PR.

---

## Audit backlog (tracked elsewhere)

Many existing component MDX files still wrap "When to use" content in `<Accordion>` or `<InfoCallout>` blocks, which the MCP parser doesn't extract as structured fields. Refactoring these to the template above is an ongoing audit — see the issue tagged `mdx-audit` (or open one if it's not there yet).

When picking up an audit ticket:

1. Hoist the `<Accordion title="Overview">` content out of the accordion into top-level `## When to use` with `<GuidelinesGrid>` + `<Guideline>` blocks.
2. Add a `## Choosing the right alternative` table immediately after.
3. Make sure every "don't use this for X" explicitly names the alternative component in **bold**.
4. Run `pnpm validate:knowledge` and submit a PR labelled `mdx-audit`.

---

## Why all this structure?

Because the AI is the primary consumer. Humans get the same content rendered prettily on the docs site, but the AI only "sees" what the parser extracts. A beautifully-written paragraph inside an `<Accordion>` block reaches no one. A boring bullet under `## Best Practices` reaches every developer who ever asks Claude to build UI.

When in doubt, **structure beats prose**. Tables beat paragraphs. `<Guideline>` blocks beat free-form sections. Cross-references beat solo definitions.
