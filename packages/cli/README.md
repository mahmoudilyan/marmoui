# marmoui

One command to set up Marmo UI for your AI agent:

```bash
npx marmoui init
```

Writes the `marmo-ui` MCP server entry into every detected client config —
Claude Code (`.mcp.json`), Cursor (`.cursor/mcp.json`), VS Code
(`.vscode/mcp.json`), Gemini CLI (`.gemini/settings.json`) — merging into
existing files without touching anything else. `--global` adds user-level
configs (Windsurf). `--token <token>` wires your Pro bearer token.

Then restart your agent and prompt: *"Build a billing dashboard with Marmo UI."*
