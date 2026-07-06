# Contributing to Marmo UI

Thanks for helping build the AI agentic designer. This guide covers workflow,
commit conventions, versioning, and how a change ships to npm.

## Repo map

| Path | What it is | Published |
| ---- | ---------- | --------- |
| `packages/ui` | `@marmoui/ui` — the React component library | npm (public, MIT) |
| `packages/cli` | `marmoui` — `npx marmoui init` agent setup | npm (public, MIT) |
| `apps/design-system-docs` | marmoui.com — docs + marketing site | deployed, not published |
| `tools/claude-plugin` | Claude Code plugin + marketplace | via `/plugin marketplace add` |

## Setup

```bash
git clone git@github.com:mahmoudilyan/marmoui.git
cd marmo-ui
pnpm install        # Node >= 20, pnpm 9
pnpm dev            # UI package + docs site (localhost:3002)
```

`pnpm install` wires the git hooks (husky) automatically.

## Workflow

1. Branch from `main`: `feat/data-table-row-selection`, `fix/toast-focus-trap`.
2. Make the change. Component guidelines live in
   [the docs](apps/design-system-docs/content/introduction/get-started.mdx);
   MDX/content guidelines in
   [CONTRIBUTING-MDX](apps/design-system-docs/CONTRIBUTING-MDX.md).
3. **If you touched `packages/ui` or `packages/cli`, add a changeset** (see below).
4. Open a PR against `main`. CI runs build, lint, and the changeset check.

## Commit messages — Conventional Commits (enforced)

The `commit-msg` hook runs commitlint. Format:

```
type(scope): subject

feat(ui): add DataTable row selection
fix(cli): merge into existing .cursor/mcp.json instead of overwriting
docs(docs): reposition install guide around npx marmoui init
```

Types: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`.
Scopes: `ui` `cli` `docs` `mcp` `plugin` `platform` `deps` `release` `repo`.

The pre-commit hook additionally regenerates `component-props.json` when
component source changes and validates the MCP knowledge base when docs
content changes — fix what it reports and re-stage.

## Versioning — semver via changesets

Every user-visible change to a published package needs a changeset:

```bash
pnpm changeset
```

Pick the package(s), pick the bump, describe the change (this text becomes the
CHANGELOG entry). Commit the generated `.changeset/*.md` with your PR.

| Bump | When |
| ---- | ---- |
| `patch` | Bug fix, no API change |
| `minor` | New component, new prop, new CLI flag — backwards compatible |
| `major` | Breaking: removed/renamed prop or export, changed default behavior |

No release-worthy change (internal refactor, tests)? `pnpm changeset --empty`
satisfies the CI check and ships nothing.

## How a release happens

Merges to `main` touching `packages/**` or `.changeset/**` trigger the
[release workflow](.github/workflows/ui-deploy.yml):

1. changesets/action collects pending changesets into a **"Version Packages"
   PR** — bumped versions + generated CHANGELOGs.
2. Merging that PR publishes to npm (`changeset publish`) and tags the release.

Nobody publishes from a laptop. `NPM_TOKEN` lives in repo secrets.

## What we don't accept

- Imports from `@chakra-ui/react`, `@radix-ui/*` in app-level examples — the
  public API surface is `@marmoui/ui`.
- New components without docs MDX (the docs are the MCP's knowledge source —
  an undocumented component is invisible to agents).
- Invented content in marketing/docs: no fake metrics, testimonials, or
  screenshots of things that don't exist.

## Questions

Open a GitHub issue or start a discussion. For docs-content questions see the
[roadmap](https://www.marmoui.com/docs/introduction/roadmap) and vote on what
matters to you.
