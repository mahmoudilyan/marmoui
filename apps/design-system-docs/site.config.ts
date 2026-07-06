const siteConfig = {
	title: 'Marmo UI',
	description:
		'The AI agentic designer. Point Claude, Codex, Cursor, or Gemini at the Marmo MCP and ship production dashboards and apps in minutes — real components, your own style, no AI slop.',
	keywords: [
		'ai design system',
		'mcp',
		'agentic ui',
		'claude code',
		'codex',
		'cursor',
		'gemini',
		'react',
		'design system',
		'components',
		'dashboards',
		'marmo',
		'next.js',
	],
	githubMainUrl: 'https://github.com/mahmoudilyan/marmoui',
	storybookMainUrl: 'https://68d5b2258627ede6122d680b-jbyxhbjayc.chromatic.com',
	figmaUrl: 'https://www.figma.com/design/fy2xB61FibtkLoGKLy4DM3/Marmo---UI',
	// Lemon Squeezy hosted checkout for the Pro variant
	// (https://<store>.lemonsqueezy.com/buy/<variant-uuid>). Set the env var in
	// Vercel; until then Pro CTAs land on the pricing page. Checkout success →
	// webhook writes the entitlement; buyer returns via /welcome.
	buyNowUrl: process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL || '/pricing',
	previewUrl: 'https://www.figma.com/design/fy2xB61FibtkLoGKLy4DM3/Marmo---UI',
	docsUrl: '/docs/introduction/get-started',
	connectUrl: '/connect',
	pricingUrl: '/pricing',
	updatesUrl: '/updates',
	componentsUrl: '/components',
};

export default siteConfig;
