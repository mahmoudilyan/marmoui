# Marmo Claude Plugins

Internal Claude Code [plugin marketplace](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces) for the Marmo engineering team. The marketplace catalog lives at [`/.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json) at the monorepo root; this folder holds the plugin source(s) it ships.

Currently one plugin: `marmo-ui`. Add more as sibling folders under `plugins/`.

## What's where

```
mahmoudilyan/marmoui/                          # this monorepo (= the marketplace repo)
├── .claude-plugin/
│   └── marketplace.json                        # marketplace catalog (lists plugins)
└── tools/claude-plugin/                        # ← you are here
    ├── README.md                                # this file
    ├── CHANGELOG.md
    └── plugins/
        └── marmo-ui/                           # the plugin
            ├── .claude-plugin/
            │   └── plugin.json                  # manifest + userConfig (token prompt)
            ├── .mcp.json                        # MCP server, references ${user_config.*}
            ├── skills/
            │   └── marmo-ui/SKILL.md           # model-invoked workflow
            └── commands/
                ├── init.md                      # /marmo-ui:init — detect/interview brand, write DESIGN.md
                ├── marmo-build.md              # explicit /marmo-ui:marmo-build slash command
                ├── override.md                  # /marmo-ui:override — local ui/ wrapper: override or add components
                ├── design-md.md                 # /marmo-ui:design-md — portable DESIGN.md generator
                └── prototype.md                 # /marmo-ui:prototype — shareable Netlify prototype
```

## Install (per developer, one time)

In Claude Code, in any repo:

```
/plugin marketplace add mahmoudilyan/marmoui
/plugin install marmo-ui@marmoui-plugins
```

Claude Code prompts for `marmo_mcp_token` (the team-wide bearer token) at install time and stores it in your OS keychain. The `marmo-ui` MCP starts automatically, the workflow skill is registered, and `/marmo-ui:marmo-build` becomes available.

That's it. **No env vars, no shell config, no `curl | bash`, no per-repo `.mcp.json`.**

> Devs need GitHub read access to `mahmoudilyan/marmoui` for `/plugin marketplace add` to clone the repo.

### One-paste alternative (no interactive prompt)

If you'd rather skip the prompt, paste this with the token already filled in:

```bash
CLAUDE_PLUGIN_OPTION_MARMO_MCP_TOKEN=<paste-team-token-here> \
  claude plugin marketplace add mahmoudilyan/marmoui && \
CLAUDE_PLUGIN_OPTION_MARMO_MCP_TOKEN=<paste-team-token-here> \
  claude plugin install marmo-ui@marmoui-plugins
```

Same end state (token in keychain, never written to disk).

## Verify

In any repo:

```
/plugin                       # list plugins → confirm marmo-ui is enabled
/mcp                          # confirm marmo-ui MCP is connected
```

Then ask Claude:

> Build a settings page with @marmoui/ui

The skill should auto-load and walk Claude through `get_knowledge_version` → `get_design_guidelines` → `get_pattern` / `search_components` + `get_component_info` → write code → `review_generated_code`.

## Update

Because the plugin uses git-SHA versioning (no `version` field in `plugin.json`), every push to this monorepo's default branch is a new version. To pull updates:

```
/plugin marketplace update marmoui-plugins
/plugin update marmo-ui@marmoui-plugins
```

Pure component or MDX changes don't require a plugin update — the hosted MCP rebuilds its index on every deploy. Plugin updates are only needed when the **skill, command, or `.mcp.json` itself** changes.

## Re-prompt for the token (rotated key, wrong key, etc.)

```
/plugin uninstall marmo-ui@marmoui-plugins
/plugin install marmo-ui@marmoui-plugins
```

Claude Code re-prompts for `marmo_mcp_token`. The previous keychain entry is replaced.

## Add a second plugin later

1. Create `plugins/<new-plugin>/.claude-plugin/plugin.json`
2. Add the components (`skills/`, `commands/`, `agents/`, `.mcp.json`, `hooks/`, etc.)
3. Add an entry to `plugins` in [`/.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json) — `source` is relative to the monorepo root, so use `./tools/claude-plugin/plugins/<new-plugin>`.
4. Push. Devs run `/plugin marketplace update marmoui-plugins && /plugin install <new-plugin>@marmoui-plugins`.

## Local development

To iterate on the plugin without going through the marketplace round-trip:

```bash
cd /path/to/some/repo
claude --plugin-dir /Users/<you>/Sites/marmo-ui/tools/claude-plugin/plugins/marmo-ui
```

Then `/reload-plugins` after each edit. See [Test your plugins locally](https://docs.claude.com/en/docs/claude-code/plugins#test-your-plugins-locally).

## Why use this monorepo as the marketplace?

Marketplaces are just git repos with a `.claude-plugin/marketplace.json` at the root. Co-locating the plugin with the design-system source it describes means:

- **Atomic commits.** A component change in `packages/ui/`, the MDX update in `apps/design-system-docs/`, and any matching tweak to the skill/command all land in one PR.
- **Single source of truth.** The MCP server (`apps/design-system-mcp/`) and the skill that drives it are tightly coupled — they ship together.
- **No second repo to maintain.** One CI, one access model, one place for issues.

Devs don't pay for this — `/plugin marketplace add` clones once and `git pull`s incrementally on `/plugin marketplace update`.

## Related

- Hosted MCP server (production): [`apps/design-system-mcp/`](../../apps/design-system-mcp/)
- Component source of truth: [`packages/ui/`](../../packages/ui/)
- Setup / token / Cursor instructions: [`apps/design-system-mcp/SETUP.md`](../../apps/design-system-mcp/SETUP.md)
- Claude Code plugin docs: <https://docs.claude.com/en/docs/claude-code/plugins>
