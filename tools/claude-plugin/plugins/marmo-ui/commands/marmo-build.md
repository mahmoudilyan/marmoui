---
description: Build UI with @marmoui/ui following the full MCP-backed workflow. Use for explicit "build this Marmo way" requests.
---

# /marmo-ui:marmo-ui-build

Build UI using `@marmoui/ui` (Marmo's internal design system) and the `marmo-ui` MCP server bundled with this plugin. Run the full validated workflow regardless of how simple the request looks. Works in any Marmo product repo.

## Steps

1. Call `mcp__marmo-ui__get_knowledge_version` and log the result.
2. **Ask the user which icon library they want** (default: `phosphor` / Phosphor Icons; also `material`, `lucide`, `tabler`, `heroicons`, `feather`). Then call `mcp__marmo-ui__get_design_guidelines` with that `iconLibrary`.
3. If the user's request matches a known pattern, call `mcp__marmo-ui__get_pattern` with the closest `patternId` (and the same `iconLibrary`). Otherwise call `mcp__marmo-ui__search_components` with relevant keywords, then `mcp__marmo-ui__get_component_info` for each component selected.
4. Write the code. UI imports only from `@marmoui/ui`; icons only from the chosen library (use the icon name map returned by `get_design_guidelines`).
5. Call `mcp__marmo-ui__review_generated_code` on the final output with the same `iconLibrary`. Fix all errors (wrong-library icon imports are errors). Re-run until `valid: true`.
6. Return the code with a one-line note describing which pattern/components and icon library were used.

## User request

$ARGUMENTS
