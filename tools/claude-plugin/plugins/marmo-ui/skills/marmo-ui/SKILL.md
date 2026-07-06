---
name: marmo-ui
description: Use whenever building, editing, or reviewing UI code that imports from @marmoui/ui (Marmo's internal design system). Triggers on requests involving @marmoui/ui, Marmo components, "build a form/page/dashboard with our design system", "use Marmo UI", "make this look like our app", any UI/component task in a Marmo product app, OR when the prompt mentions analytics/tracking/PostHog/telemetry/events alongside UI work. Walks through the MCP-backed workflow that prevents hallucinated props, wrong imports, and broken compositions, and layers in PostHog instrumentation when the prompt asks for tracking.
---

# Marmo UI workflow

You are working on a Marmo product app that consumes `@marmoui/ui`, Marmo's internal design system. The `marmo-ui` MCP server (auto-started by this plugin) is the source of truth — every prop, variant, and pattern. **Never guess. Always look it up.**

If the `marmo-ui` MCP tools aren't available (calls to `mcp__marmo-ui__*` fail with "tool not found"), stop and tell the user to run `/plugin` and confirm `marmo-ui` is enabled. If the token is wrong (`401 Unauthorized` on any tool call), tell them to disable and reinstall the plugin (`/plugin uninstall marmo-ui@marmoui-plugins` then `/plugin install marmo-ui@marmoui-plugins`) — Claude Code will re-prompt for `marmo_mcp_token`. Don't fall back to writing components from memory.

## Required steps (in order)

### 1. Verify the MCP is fresh

```
mcp__marmo-ui__get_knowledge_version
```

Logs the `gitSha`, `indexedAt`, `componentCount`, and `patternCount`. Confirms you're talking to a healthy MCP. If it errors, surface the error to the user — don't silently fall back to guessing.

### 2. Read the rules (once per session)

```
mcp__marmo-ui__get_design_guidelines  iconLibrary="<library>"
```

Returns import rules, color tokens, icon conventions, and the mandatory generation checklist. Skim it. The hard rules below are a summary.

**Icon library selection (do this before writing any UI code):** Ask the user which icon library they want. Default (no preference): **Phosphor** (`phosphor`). Supported: `phosphor`, `material` (react-icons/md), `lucide`, `tabler`, `heroicons`, `feather`. Pass the chosen `iconLibrary` to `get_design_guidelines` AND to `review_generated_code` — the validator rejects icons imported from any other library as errors. Don't mix libraries within one project.

### 3. Find the right primitive

**If the task is a known multi-component layout** (full app shell, data-table-with-filters, confirmation-dialog, dialogs-for-other-actions, form-with-validation, posthog-tracking):

```
mcp__marmo-ui__get_pattern  patternId="<the-pattern>"
```

The returned code is already validated — adapt it, don't rewrite it from scratch.

**If the prompt mentions analytics, tracking, PostHog, telemetry, events, or "track this":**

```
mcp__marmo-ui__get_pattern  patternId="posthog-tracking"
```

Layer the returned instrumentation **on top of** whatever other pattern or component you're building. The `posthog-tracking` pattern is additive — call it together with `app-shell`, `data-table-with-filters`, `form-with-validation`, etc.

**Otherwise** (single-component or unfamiliar task):

```
mcp__marmo-ui__search_components  query="<keyword>"
mcp__marmo-ui__get_component_info  componentName="<Component>"
```

Call `get_component_info` for **every** component you'll use — even ones you think you remember. Prop signatures change.

### 4. Write the code

- Imports from `@marmoui/ui` only (UI).
- Icons from the user's chosen icon library only (default: `@phosphor-icons/react`). Use the icon name map returned by `get_design_guidelines({ iconLibrary })` for the correct names, and set `weight="duotone"` for two-tone icons when using Phosphor.
- Use the exact prop names, variants, and shapes returned by `get_component_info`.
- Use the layout from `get_pattern` for full pages — don't roll your own sidebar.

### 5. Validate before returning

```
mcp__marmo-ui__review_generated_code  code="<your full output>"  iconLibrary="<library>"
```

Pass the SAME `iconLibrary` you passed to `get_design_guidelines`. Wrong-library icon imports are reported as **errors**. If `valid: false`, fix every error and re-run. Warnings are advisory but read them. **Never return code with errors to the user.**

---

## Hard constraints (the design system doesn't bend)

- **Imports.** `@marmoui/ui` for components; the user's chosen icon library for icons (default `@phosphor-icons/react`; also `react-icons/md`, `lucide-react`, `@tabler/icons-react`, `@heroicons/react`, `react-icons/fi`). Never `@chakra-ui/react`, `@radix-ui/*` directly, `@mui/*`, or an invented `@/components/ui/*`, and never mix icon libraries.
  - **Exception — local ui wrapper.** If the project declares `uiImportPath` in `DESIGN.md` frontmatter (or has a `src/ui/index.ts` that re-exports `@marmoui/ui`), import components from that path (usually `@/ui`) instead — it's the app's override layer (see `/marmo-ui:override`). Only files inside `src/ui/` import `@marmoui/ui` directly. Component props still come from the MCP; local overrides keep the same contracts unless the wrapper file says otherwise.
- **No namespace sub-components.** `Tabs.List`, `Dialog.Content`, `Select.Item` do **not** exist. Always use flat exports: `TabsList`, `TabsTrigger`, `TabsContent`, `DialogContent`, `SelectItem`, etc.
- **`PageSection` is self-closing.** It is a sticky toolbar/header. Never wrap content in it. Correct: `<PageSection pageTitle="..." primaryAction={{...}} />`. Wrong: `<PageSection>...</PageSection>`.
- **The page's main CTA goes in `primaryAction`.** Never render the primary button ("Import CSV", "Create X") in a toolbar row inside the page body — pass it as `primaryAction={{ label, onClick }}` so it sits in the header next to the title. DataTable already ships its own search/columns/filters toolbar and count text; don't rebuild any of it above the table.
- **Full pages require `SidebarProvider`.** There is no `<Sidebar>` component — wrap the layout in `SidebarProvider` and use `SidebarPanel` for navigation. Always start a full page by calling `get_pattern("app-shell")`.
- **Card is not a visual grouping box.** Before adding a `Card`, ask: "Could this block stand alone as a widget anywhere on a dashboard?" If the answer is no, use a plain `<div>` or `<section>` instead.
  - **NOT cards:** agent/plan selector sections, prompt/textarea input areas, wizard steps, settings sections, filter panels, or any section that spans the full page width or is the primary page content.
  - **ARE cards:** stat counters, contact/entity summary panels, analytics widgets, recent-activity feeds, dashboard tiles, media/preview thumbnails.
  - Stats cards are compact and use `CardContent className="px-space-md py-space-md"` (16px on all sides).
  - Use `CardHeader` when a title anchors the card content; put actions in the header only when they affect that card's content (filter, configure, refresh, manage).
- **Breadcrumbs are contextual, not sidebar-derived.** Use breadcrumbs for real hierarchy such as module analytics detail pages, single contact/entity pages, file-manager folder/file paths, or grouped module folders. Use `pageTitle` for ordinary sidebar destinations.
- **Wizard footers sit at the bottom.** Wizard pages should use a `flex min-h-0 flex-1 flex-col` body, scroll the step content, and place the footer after the content with `mt-auto` or sticky bottom styling.
- **DialogHeader is selective.** Use `DialogHeader` for long forms, panels, or large dialogs. For simple confirmations, put `DialogTitle` and `DialogDescription` directly in the content. When `DialogHeader` is used, usually omit `DialogDescription` and put explanatory copy in the body.
- **No invented props.** If `get_component_info` doesn't list it, it doesn't exist. Don't write `variant="danger"` on `Badge` (it's `destructive`). Don't write `size="lg"` on `Text` (use `variant="heading-md"` etc.).

---

## Why this workflow exists

Component props, variants, and composition patterns change as the design system evolves. The MCP rebuilds its knowledge index every time the design-system team merges to `main`. By calling the MCP every time, you get the current truth — not whatever shape was correct last month, and not whatever the model guessed from training data. Skipping these steps is the single biggest cause of broken `@marmoui/ui` code.

This skill ships inside the `marmo-ui` plugin: install once with `/plugin install marmo-ui@marmoui-plugins` and it triggers in every Marmo product repo you open in Claude Code. Updates arrive automatically on `/plugin update` (or every commit, since this plugin uses git-SHA versioning).
