---
description: Scaffold a shareable Marmo prototype with the comments + AI-edit overlay pre-wired. Deploys to Netlify and returns a public URL reviewers can sign into with Claude.
---

# /marmo-ui:prototype

Scaffold a new prototype using `@marmoui/ui`, wire up the
`@marmoui/prototype-overlay` (Anthropic OAuth sign-in + inline comments
+ owner-only select-mode prompt-to-clipboard), and deploy to Netlify.

Run every step. Don't skip the MCP validation pass — prototypes are read by
reviewers from outside the engineering team and any hallucinated prop or
broken composition is going to surface in a comment thread inside an hour.

## Steps

1. **Confirm prerequisites.**
   - `node --version` ≥ 20
   - `pnpm --version` ≥ 9
   - `netlify --version` (suggest `npm i -g netlify-cli` if missing)
   - `NPM_TOKEN` set (required to install `@marmoui/*` from GH Packages)
   - `MARMO_PROTOTYPE_OAUTH_CLIENT_ID` and `MARMO_PROTOTYPE_COMMENTS_API`
     set in shell env (provisioned once per developer, point at the team
     Supabase project and Anthropic OAuth client). If missing, print the
     one-time setup instructions from
     `apps/prototype-starter/README.md` and stop.

2. **Choose a target directory** outside the monorepo. Default:
   `~/Sites/marmo-prototype-<kebab-case-name>`. If the dir exists and is
   non-empty, ask for a different name.

3. **Copy the starter template.** Source = `apps/prototype-starter/`
   in the `marmo-ui` monorepo (resolve via
   `mcp__marmo-ui__get_knowledge_version().repoRoot` if available,
   otherwise ask the user for the path). Copy excluding `node_modules`,
   `dist`, `.turbo`. Rewrite the `package.json` `name` field to match
   the new directory.

4. **Wire env vars.** Create `.env.local` from `.env.example` with:
   ```
   VITE_COMMENTS_API=$MARMO_PROTOTYPE_COMMENTS_API
   VITE_ANTHROPIC_OAUTH_CLIENT_ID=$MARMO_PROTOTYPE_OAUTH_CLIENT_ID
   ```

5. **Generate the screen** from the user's `$ARGUMENTS` description.
   - Call `mcp__marmo-ui__get_knowledge_version` once.
   - Call `mcp__marmo-ui__get_design_guidelines` once.
   - Pick the closest pattern via `mcp__marmo-ui__get_pattern` if one
     matches; otherwise `mcp__marmo-ui__search_components` and
     `mcp__marmo-ui__get_component_info` per component.
   - Write the JSX into `src/App.tsx`, replacing the placeholder.
   - Imports only from `@marmoui/ui` + `react-icons/md`.
   - Run `mcp__marmo-ui__review_generated_code` on the final file. Fix
     every error and warning until `valid: true`. Never ship code with
     errors.

6. **Install + smoke-test.**
   - `pnpm install`
   - `pnpm dev` in the background, wait for "Local:" line, fetch the URL
     once, kill the dev server. Confirm 200.

7. **Deploy.**
   - If a Netlify site isn't linked, run `netlify init` (interactive — let
     the user pick the team).
   - `pnpm share` (= `vite build && netlify deploy --prod --dir=dist`).
   - Capture the deployed URL from CLI output.

8. **Print the share message** to the user:
   ```
   Prototype deployed: <url>

   Reviewers: open the URL and click "Sign in with Claude". Any
   @marmoui.com user can leave comments.

   Owner: claim the prototype on first visit. After that you'll see an
   "Edit with Claude" button — click an element, write a prompt, paste
   the clipboard payload into a local Claude Code session in this repo.
   ```

## User request

$ARGUMENTS
