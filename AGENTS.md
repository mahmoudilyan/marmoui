# Marmo UI — Agent Project Memory

Auto-loaded by Codex, Cursor, Gemini, and other agents for sessions in this repo. Same conventions as [CLAUDE.md](CLAUDE.md).

## Stack

- **React 19**, **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS 4**.
- **UI library:** [`@marmoui/ui`](packages/ui) — published to the public npm registry (MIT).
- **Icons:** user-selected library, default [`@phosphor-icons/react`](https://phosphoricons.com/). Also supported: `react-icons/md`, `lucide-react`, `@tabler/icons-react`, `@heroicons/react`, `react-icons/fi`.
- **Tables:** TanStack Table v8 (via `DataTable` from `@marmoui/ui`).
- **State:** Zustand for shared client state.
- **Tooling:** pnpm workspaces, Turborepo, Changesets (semver), husky + commitlint (Conventional Commits).

## Where things live

| What | Where |
|---|---|
| Component source | [packages/ui/src/components/](packages/ui/src/components/) |
| Component docs (MDX) | [apps/design-system-docs/content/components/](apps/design-system-docs/content/components/) |
| Generated props JSON | [apps/design-system-docs/src/data/component-props.json](apps/design-system-docs/src/data/component-props.json) |
| `marmoui` CLI (`npx marmoui init`) | [packages/cli/](packages/cli/) |
| Claude Code plugin + marketplace | [tools/claude-plugin/](tools/claude-plugin/) |

The MCP server, composition patterns, and platform services live in a separate private repository and are consumed here only through the **hosted MCP** and the published npm package.

## Source of truth

The **Marmo UI MCP** (`https://mcp.marmoui.com/mcp` — connect via `npx marmoui init`) is the single source of truth for component APIs, props, patterns, and generation rules.

**Never guess prop names, variants, imports, or composition shapes.** If you didn't get it from the MCP, you don't know it.

## Required workflow for UI code

1. **Verify freshness.** `get_knowledge_version` once per session.
2. **Read the rules.** `get_design_guidelines` once per session.
3. **Find the right primitive.** Known multi-component layout → `get_pattern`; otherwise `search_components` + `get_component_info`.
4. **Write the code.** Imports only from `@marmoui/ui` and the chosen icon library.
5. **Validate.** `review_generated_code` on the final output; fix every error and warning before reporting done.

## Hard rules (never violate)

- **Imports:** only `@marmoui/ui` (components) and the chosen icon library. Never `@chakra-ui/react`, `@radix-ui/*`, or `@/components/ui/*`. Pass `iconLibrary` to `get_design_guidelines` and `review_generated_code`.
- **No namespace sub-components.** `Tabs.List`, `Dialog.Content`, `Select.Item` don't exist — use flat exports: `TabsList`, `DialogContent`, `SelectItem`.
- **`PageSection` is self-closing.** Sticky toolbar/header, not a wrapper.
- **Full pages need `SidebarProvider`.** No single `<Sidebar>` export; see `get_pattern("app-shell")`.
- **No invented props.** If `get_component_info` doesn't list it, it doesn't exist.

## Contributing mechanics

- Conventional Commits enforced by the commit-msg hook (see [CONTRIBUTING.md](CONTRIBUTING.md)).
- Changes to `packages/ui` or `packages/cli` need a changeset (`pnpm changeset`).
- The pre-commit hook regenerates `component-props.json` when component source changes — stage the regenerated file.
- Docs MDX is the MCP's knowledge source: keep `## Patterns` / `## Common Mistakes` sections accurate. Authoring rules: [apps/design-system-docs/CONTRIBUTING-MDX.md](apps/design-system-docs/CONTRIBUTING-MDX.md).

## When the design system changes

Merged MDX flows to the hosted MCP automatically (CI → image rebuild → re-index). If `get_knowledge_version` returns a `gitSha` older than latest `main`, the deploy is in flight — retry in a minute.
