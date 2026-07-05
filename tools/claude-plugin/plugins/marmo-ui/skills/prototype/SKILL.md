---
name: prototype
description: Use when the user wants to build a shareable Marmo prototype with reviewer comments and AI-edit support. Triggers on phrases like "spin up a prototype", "prototype this", "build a prototype I can share", "let people comment on this", "scaffold an onboarding prototype", or when the user asks for a Netlify-shippable mockup using Marmo UI. Walks through scaffolding from apps/prototype-starter, wiring the @marmoui/prototype-overlay (Anthropic OAuth + inline comments + owner-only select-mode), and deploying to Netlify.
---

# Prototype scaffolding + review-overlay workflow

You are about to scaffold a brand-new Marmo prototype. A prototype is a
standalone Vite + React + Tailwind 4 + `@marmoui/ui` app that lives
**outside** the monorepo and ships to Netlify. The `@marmoui/prototype-overlay`
package is pre-wired into the starter so reviewers can sign in with Claude
and leave inline comments, and the owner can click an element, write a
prompt, and copy a payload (file + line + selector + prompt) to the
clipboard for paste into a local Claude Code session.

If the user just wants to add a UI component to an existing Marmo product
app, use the `marmo-ui` skill instead — not this one.

## Required steps (in order)

### 1. Verify the MCP is fresh

```
mcp__marmo-ui__get_knowledge_version
```

If this errors, surface it. Don't fall back to guessing component APIs.

### 2. Confirm prerequisites

Run in parallel:

- `node --version` (need ≥ 20)
- `pnpm --version` (need ≥ 9)
- `netlify --version` (suggest `npm i -g netlify-cli` if missing)
- `echo $NPM_TOKEN | head -c 4` (must not be empty — required for GH Packages)
- `echo $MARMO_PROTOTYPE_OAUTH_CLIENT_ID | head -c 4`
- `echo $MARMO_PROTOTYPE_COMMENTS_API | head -c 4`

If either `MARMO_PROTOTYPE_*` env var is missing, print this and stop:

> Set these once in your shell rc:
>
> ```bash
> export MARMO_PROTOTYPE_COMMENTS_API="https://<proj>.supabase.co/functions/v1/comments-api"
> export MARMO_PROTOTYPE_OAUTH_CLIENT_ID="<from anthropic console>"
> ```
>
> Ask the Design Systems team for the current values.

### 3. Choose a target directory

Default: `~/Sites/marmo-prototype-<kebab-case-name-from-prompt>`. If it
exists and contains anything, ask for an alternative.

### 4. Copy the starter

Source = `apps/prototype-starter/` inside the `mahmoudilyan/marmo-ui`
monorepo. The user should have it cloned; if not, clone shallow:

```bash
git clone --depth 1 https://github.com/mahmoudilyan/marmo-ui /tmp/marmo-ui-template
cp -R /tmp/marmo-ui-template/apps/prototype-starter <target-dir>
rm -rf /tmp/marmo-ui-template
```

After copying:
- Rewrite `package.json` `name` to match the directory name.
- Delete `node_modules`, `dist`, `.turbo` if present.
- Replace the `workspace:*` versions in `package.json` with the latest
  published versions (`@marmoui/ui` and `@marmoui/prototype-overlay`).
  Look these up via `npm view <pkg> version --registry=https://npm.pkg.github.com`.

### 5. Wire env

```bash
cp .env.example .env.local
```

Then write the values from `$MARMO_PROTOTYPE_*` into `.env.local`. Never
commit `.env.local`.

### 6. Generate the screen

Pick the right primitive using the MCP, exactly like the `marmo-ui` skill:

- **Ask the user which icon library they want** (default: `phosphor`; also `material`, `lucide`, `tabler`, `heroicons`, `feather`). Pass that `iconLibrary` to every MCP call below.
- Known pattern (login, dashboard, settings, app-shell, onboarding) →
  `mcp__marmo-ui__get_pattern`
- Otherwise → `mcp__marmo-ui__search_components` + `get_component_info`

Write the JSX into `src/App.tsx`, replacing the placeholder. UI imports only
from `@marmoui/ui`; icons only from the chosen library (default
`@phosphor-icons/react`). Ensure the starter has the icon library's package
installed (add it to `package.json` if it isn't already).

Run `mcp__marmo-ui__review_generated_code` on the final `App.tsx` with the same
`iconLibrary`. Fix every error and warning — wrong-library icon imports are
errors. Never ship code with errors — reviewers will see those errors before
you do.

### 7. Smoke-test

```bash
pnpm install
pnpm dev &  # background
# wait for "Local:" line
curl -fsS http://localhost:5173 > /dev/null && echo OK
kill %1
```

If the page errors, look at terminal output and fix before deploying.

### 8. Deploy

If no Netlify site is linked yet (`netlify status` shows none):

```bash
netlify init
```

Then:

```bash
pnpm share
```

Capture the deployed URL.

### 9. Report

Print the share message in this exact shape (substitute the URL):

```
Prototype deployed: https://<site>.netlify.app

Reviewers: open the URL and click "Sign in with Claude". Any
@marmoui.com user can leave inline comments — pin on any element,
reply, resolve.

Owner: first visit, click "Claim as owner" in the toolbar. After that
you'll see an "Edit with Claude" button. Click an element, write a
prompt, paste the clipboard payload into a local Claude Code session
running in this directory. That's the round-trip loop.
```

## When NOT to use this skill

- The user wants to add UI to an existing product app (use `marmo-ui`).
- The user wants to edit the design system itself (`packages/ui`).
- The user wants a backend service (no UI involved).
- The user wants to deploy to anywhere other than Netlify (this skill is
  hard-wired to Netlify because that's what `pnpm share` does).
