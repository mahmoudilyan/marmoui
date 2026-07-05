import { createClient, type SanityClient } from 'next-sanity';

/**
 * Sanity is optional infrastructure: the site builds and runs without it.
 * When NEXT_PUBLIC_SANITY_PROJECT_ID is unset, every query helper returns
 * empty data and CMS-driven sections render nothing.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-01';

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
	if (!projectId) return null;
	if (!client) {
		client = createClient({
			projectId,
			dataset,
			apiVersion,
			useCdn: true,
			perspective: 'published',
		});
	}
	return client;
}

export const sanityConfigured = Boolean(projectId);
