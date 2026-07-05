---
description: Generate a portable DESIGN.md (brand color, type, tokens, component inventory) at the project root so any AI agent can generate on-brand UI.
---

# /marmo-ui:design-md

Generate a portable `DESIGN.md` for this project using the `marmo-ui` MCP server. The file captures the design system's brand color, typography, tokens, and component inventory in one agent-readable brief — the free, portable wedge that lets **any** agent (Claude, Cursor, Codex) generate on-brand UI without the MCP.

## Steps

1. Call `mcp__marmo-ui__get_design_md` (default `format: "markdown"`). The result is the full DESIGN.md content as a string.
2. Write that content verbatim to a `DESIGN.md` file at the project root. Overwrite any existing `DESIGN.md`.
3. Treat `DESIGN.md` as the source of truth for all subsequent UI generation in this session: use its brand color, typography, tokens, component inventory, and usage rules.
4. Report the path written, the brand name and primary color, and the number of components captured.

## Notes

- Do not edit the generated content — it is deterministic and matches the authenticated tenant's theme.
- If you need structured data instead of markdown (e.g. to drive a script), call the tool with `format: "json"`.
- No MCP auth / no tenant yet? Use `/marmo-ui:init` instead — it detects or interviews for brand basics and writes a starter `DESIGN.md` locally.

## User request

$ARGUMENTS
