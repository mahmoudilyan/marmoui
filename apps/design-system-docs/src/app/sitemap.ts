import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { getPosts } from '@/sanity/queries';

const SITE_URL = 'https://www.marmoui.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const marketingPages: MetadataRoute.Sitemap = [
		{ url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
		{ url: `${SITE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.9 },
		{ url: `${SITE_URL}/components`, changeFrequency: 'weekly', priority: 0.8 },
		{ url: `${SITE_URL}/connect`, changeFrequency: 'monthly', priority: 0.6 },
		{ url: `${SITE_URL}/updates`, changeFrequency: 'weekly', priority: 0.6 },
	];

	const docsPages: MetadataRoute.Sitemap = source.getPages().map(page => ({
		url: `${SITE_URL}${page.url}`,
		changeFrequency: 'monthly',
		priority: 0.7,
	}));

	const posts = await getPosts();
	const updatePages: MetadataRoute.Sitemap = posts.map(post => ({
		url: `${SITE_URL}/updates/${post.slug}`,
		lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
		changeFrequency: 'monthly',
		priority: 0.5,
	}));

	return [...marketingPages, ...docsPages, ...updatePages];
}
