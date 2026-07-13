const SITE_URL = 'https://www.marmoui.com';

const body = `# Marmo UI

> Marmo UI is an open-source React component library (@marmoui/ui) plus a hosted MCP server that gives AI coding agents (Claude Code, Codex, Cursor, Gemini CLI, Windsurf) live component APIs, composition patterns, and your own design tokens — so agent-generated UI matches a real design system instead of improvised markup.

## Getting started
- [Get started](${SITE_URL}/docs/introduction/get-started): connect an agent to the MCP and install the component package
- [Install the agent](${SITE_URL}/docs/introduction/install-agent): per-client MCP connection steps (Claude Code, Codex, Cursor, Gemini CLI)
- [Roadmap](${SITE_URL}/docs/introduction/roadmap)

## Product
- [Components](${SITE_URL}/components): full component library
- [Pricing](${SITE_URL}/pricing): Free tier (open-source components + Core MCP, $0 forever) and Pro tier ($9.99/mo, 14-day trial — on-brand generation from your own DESIGN.md, composition patterns, Pro blocks)
- [Updates](${SITE_URL}/updates): changelog
- [Blog](${SITE_URL}/blog): component comparisons and guides

## Foundation
- [Design tokens & colors](${SITE_URL}/docs/foundation/colors)
- [Typography](${SITE_URL}/docs/foundation/typography)
- [Spacing](${SITE_URL}/docs/foundation/spacing)

## Docs
- [DESIGN.md for AI agents](${SITE_URL}/docs/tools/design-md): the file format that lets an agent generate on-brand output
- [Sitemap](${SITE_URL}/sitemap.xml)

Source: MIT licensed, open source at github.com/mahmoudilyan/marmoui.
`;

export function GET() {
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
