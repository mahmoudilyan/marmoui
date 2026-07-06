---
description: Override an @marmoui/ui component or create a new custom component in the app's local ui/ folder — sets up the wrapper convention (src/ui/ re-exporting @marmoui/ui) on first run, then shadows or adds components without forking the package.
---

# /marmo-ui:override

Let this app customize the design system without forking it. All app code imports UI from a **local wrapper folder** (`src/ui/`, aliased as `@/ui`) that re-exports everything from `@marmoui/ui`; overriding a component means dropping a file in that folder and shadowing the package export. New app-specific components live in the same folder.

Two modes, inferred from the request:

- `/marmo-ui:override DataTable` — **override** an existing `@marmoui/ui` component.
- `/marmo-ui:override new InvoiceCard` (or any request that names a component the MCP doesn't know) — **create** a new custom component in the ui folder.

Follow the `marmo-ui` skill's MCP workflow throughout — `get_knowledge_version` + `get_design_guidelines` once per session, `get_component_info` for every `@marmoui/ui` primitive you touch, `review_generated_code` on the final output.

## Step 1 — Ensure the wrapper exists (first run only)

Check for `src/ui/index.ts` (also accept `src/components/ui/index.ts` or an existing `uiImportPath` in `DESIGN.md`). If missing:

1. Resolve the import alias from `tsconfig.json` `compilerOptions.paths` (usually `@/*` → `./src/*`). If no alias exists, add `"@/*": ["./src/*"]`.
2. Create `src/ui/index.ts`:

   ```ts
   // App UI entry point. Import all UI from '@/ui', never from '@marmoui/ui' directly.
   export * from '@marmoui/ui';

   // Local overrides — explicit exports below shadow the package's star export.
   // export { DataTable } from './data-table';
   ```

3. Record the path in `DESIGN.md` frontmatter so every agent knows the convention: `uiImportPath: "@/ui"`. Create a minimal `DESIGN.md` via `/marmo-ui:init` first if none exists and the user agrees; otherwise just add the key.
4. **Offer** (don't do silently) to migrate existing imports: replace `from '@marmoui/ui'` with `from '@/ui'` across `src/` (excluding `src/ui/` itself, which is the only place allowed to import the package).

ESM guarantees the shadowing: an explicit named export always wins over a name arriving via `export *`, so re-exporting `DataTable` from `./data-table` overrides the package's version everywhere the app imports `@/ui`.

## Step 2A — Override an existing component

1. `mcp__marmo-ui__get_component_info` for the component — you need its real prop contract to stay drop-in compatible.
2. **Wrap, don't fork** (default). Import the original under an alias and extend it:

   ```tsx
   // src/ui/data-table.tsx
   import { DataTable as MarmoDataTable } from '@marmoui/ui';
   import type { ComponentProps } from 'react';

   export function DataTable(props: ComponentProps<typeof MarmoDataTable>) {
     return <MarmoDataTable pageSize={25} {...props} />;
   }
   ```

   Wrapping keeps the app on the package's bug fixes and new props. Change defaults, inject analytics, add app-specific props — all possible from a wrapper.
3. **Fork only when wrapping can't express the change** (internal markup/behavior edits). Copy the relevant source (the package ships MIT source on GitHub), keep the public prop contract identical, and leave a header comment: `// Forked from @marmoui/ui@<version> — reconcile on major upgrades.`
4. Add the shadow export to `src/ui/index.ts`: `export { DataTable } from './data-table';`
5. If the override intentionally diverges from a documented MCP prop contract, say so explicitly in your report — future generation in this repo will follow the local version.

## Step 2B — Create a new custom component

1. `mcp__marmo-ui__search_components` first — confirm the design system doesn't already cover the need (don't build a custom `StatCard` when `KpiCard` exists).
2. Build it in `src/ui/<kebab-name>.tsx`, composing `@marmoui/ui` primitives (imported from `@marmoui/ui` inside the ui folder) and design tokens (`space-*`, `text-ink-*`, `bg-panel`, …) — never raw hex values or arbitrary pixel spacing.
3. Export it from `src/ui/index.ts` alongside the overrides.
4. Match the design system's conventions: flat exports (no namespace sub-components), prop-object actions, `className` passthrough via `cn`.

## Step 3 — Validate and report

1. `mcp__marmo-ui__review_generated_code` on every new/changed file. Files inside `src/ui/` legitimately import `@marmoui/ui`; app files must import `@/ui`. If the validator flags the `@/ui` import path itself, note it as the wrapper convention (declared via `uiImportPath` in DESIGN.md) rather than "fixing" it back to a package import.
2. Report: wrapper created or already present, component overridden/created, whether imports were migrated, and the one rule the team must follow from now on — **app code imports UI from `@/ui` only; `@marmoui/ui` appears only inside `src/ui/`**.

## User request

$ARGUMENTS
