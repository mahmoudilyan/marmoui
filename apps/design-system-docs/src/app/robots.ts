import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.marmoui.com';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/account', '/signin', '/api/', '/t/', '/unlock', '/oauth/'],
			},
			// Explicitly invite AI search/citation crawlers.
			{ userAgent: 'GPTBot', allow: '/' },
			{ userAgent: 'OAI-SearchBot', allow: '/' },
			{ userAgent: 'ClaudeBot', allow: '/' },
			{ userAgent: 'PerplexityBot', allow: '/' },
			{ userAgent: 'Google-Extended', allow: '/' },
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
