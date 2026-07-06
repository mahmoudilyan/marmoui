# Changelog

All notable changes to plugins in this marketplace are tracked here. The marketplace itself uses git-SHA versioning, so every commit on `main` is automatically a new version for installers.

## marmo-ui

### Unreleased (git-SHA)
- Initial release.
- Marketplace catalog lives at [`/.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json) at the monorepo root; install via `/plugin marketplace add mahmoudilyan/marmoui`.
- Skill: `marmo-ui` — model-invoked workflow for building UI with `@marmoui/ui`.
- Slash command: `/marmo-ui:marmo-build` — explicit invocation of the same workflow.
- Skill: `prototype` — model-invoked workflow for scaffolding a shareable prototype outside the monorepo with the comments + AI-edit overlay pre-wired.
- Slash command: `/marmo-ui:prototype` — explicit prototype scaffolding 
- MCP server: `marmo-ui` (HTTP) — auto-starts when the plugin is enabled. Configurable via `marmo_mcp_token` and `mcp_url` (default points to the Hetzner-hosted server). Token persists in `~/.claude/settings.json` after first prompt — no re-prompt on subsequent sessions. Removed root `.mcp.json` to avoid duplicate prompts; the plugin owns the server registration.
