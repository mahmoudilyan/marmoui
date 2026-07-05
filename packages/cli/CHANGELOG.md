# marmoui

## 0.1.0

### Minor Changes

- Initial release. `npx marmoui init` writes the Marmo UI MCP server entry
  into every detected client config — Claude Code (`.mcp.json`), Cursor
  (`.cursor/mcp.json`), VS Code (`.vscode/mcp.json`), Gemini CLI
  (`.gemini/settings.json`) — merging into existing files without touching
  anything else. `--global` adds user-level configs (Windsurf); `--token`
  wires a Pro bearer token.
