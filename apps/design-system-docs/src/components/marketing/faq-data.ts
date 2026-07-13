export const faqItems = [
	{
		q: 'What is Marmo?',
		a: 'An open-source React design system (@marmoui/ui) plus a hosted MCP server. The components are what your app ships; the MCP is what makes your AI agent good at using them — live props, composition patterns, and generation rules instead of guesses.',
	},
	{
		q: 'Which AI tools does it work with?',
		a: 'Anything that speaks MCP: Claude Code, Codex, Cursor, Gemini CLI, Windsurf, and most agent frameworks. One config block connects it — there is no separate Marmo app to learn.',
	},
	{
		q: 'How is this different from asking an agent to build UI from scratch?',
		a: 'An unassisted agent improvises: invented props, mismatched spacing, template-shaped pages. With Marmo connected, it reads real component APIs and validated patterns, and its output is checked before it reports done. Same agent, dramatically better screens.',
	},
	{
		q: 'What does “no AI slop” actually mean here?',
		a: 'Three concrete things: the agent can only use components and props that exist; every screen inherits your design tokens instead of improvised styling; and generated code passes a review step that rejects wrong imports and invented APIs.',
	},
	{
		q: 'Can it match my brand?',
		a: 'Yes — that is the Pro tier. You feed the MCP your DESIGN.md (brand color, type, tokens, component inventory) and every connected agent generates UI in your style. Free tier generates with the default Marmo look.',
	},
	{
		q: 'Do I own the generated code?',
		a: 'Fully. Generation happens in your own agent, with your own LLM tokens, and the code lands in your repo. The components are MIT. Nothing is locked behind our runtime.',
	},
	{
		q: 'What about accessibility?',
		a: 'Components are built on accessible primitives: keyboard navigation, focus states, and ARIA roles are in place, and motion respects reduced-motion settings. Generated screens inherit all of it.',
	},
];
