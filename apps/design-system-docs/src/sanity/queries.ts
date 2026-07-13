import { getSanityClient } from './client';

export type Testimonial = {
	quote: string;
	name: string;
	role: string;
};

export type Post = {
	title: string;
	slug: string;
	excerpt?: string;
	publishedAt: string;
	body?: unknown;
};

const TESTIMONIALS_QUERY = /* groq */ `
	*[_type == "testimonial" && published == true] | order(_createdAt desc)[0...6]{
		quote,
		name,
		role
	}
`;

const POSTS_QUERY = /* groq */ `
	*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...50]{
		title,
		"slug": slug.current,
		excerpt,
		publishedAt
	}
`;

const POST_QUERY = /* groq */ `
	*[_type == "post" && slug.current == $slug][0]{
		title,
		"slug": slug.current,
		excerpt,
		publishedAt,
		body
	}
`;

/** Revalidate CMS content every 5 minutes. */
export const SANITY_REVALIDATE_SECONDS = 300;

const fetchOptions = { next: { revalidate: SANITY_REVALIDATE_SECONDS } };

export async function getTestimonials(): Promise<Testimonial[]> {
	const client = getSanityClient();
	if (!client) return [];
	try {
		return await client.fetch<Testimonial[]>(TESTIMONIALS_QUERY, {}, fetchOptions);
	} catch {
		return [];
	}
}

export async function getPosts(): Promise<Post[]> {
	const client = getSanityClient();
	if (!client) return [];
	try {
		return await client.fetch<Post[]>(POSTS_QUERY, {}, fetchOptions);
	} catch {
		return [];
	}
}

export async function getPost(slug: string): Promise<Post | null> {
	const client = getSanityClient();
	if (!client) return null;
	try {
		return await client.fetch<Post | null>(POST_QUERY, { slug }, fetchOptions);
	} catch {
		return null;
	}
}

export type Article = {
	title: string;
	slug: string;
	excerpt?: string;
	seoTitle?: string;
	seoDescription?: string;
	publishedAt: string;
	body?: unknown;
};

const ARTICLES_QUERY = /* groq */ `
	*[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...50]{
		title,
		"slug": slug.current,
		excerpt,
		publishedAt
	}
`;

const ARTICLE_QUERY = /* groq */ `
	*[_type == "article" && slug.current == $slug][0]{
		title,
		"slug": slug.current,
		excerpt,
		seoTitle,
		seoDescription,
		publishedAt,
		body
	}
`;

export async function getArticles(): Promise<Article[]> {
	const client = getSanityClient();
	if (!client) return [];
	try {
		return await client.fetch<Article[]>(ARTICLES_QUERY, {}, fetchOptions);
	} catch {
		return [];
	}
}

export async function getArticle(slug: string): Promise<Article | null> {
	const client = getSanityClient();
	if (!client) return null;
	try {
		return await client.fetch<Article | null>(ARTICLE_QUERY, { slug }, fetchOptions);
	} catch {
		return null;
	}
}
