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
	// Lemon Squeezy hosted checkout for the Pro variant. Rendered as an on-site
	// overlay by <BuyProButton /> (lemon.js + ?embed=1). Checkout success →
	// webhook writes the entitlement; buyer finishes at /welcome.
	buyNowUrl:
		process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL ||
		'https://marmoui.lemonsqueezy.com/checkout/buy/338fd171-5f47-4396-b617-940a7931aab3',
	previewUrl: 'https://www.figma.com/design/fy2xB61FibtkLoGKLy4DM3/Marmo---UI',
	docsUrl: '/docs/introduction/get-started',
	connectUrl: '/connect',
	pricingUrl: '/pricing',
	updatesUrl: '/updates',
	componentsUrl: '/components',
};

export default siteConfig;
