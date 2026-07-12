/**
 * Sanity schema — evergreen blog/comparison article, distinct from `post`
 * (product-update/changelog entries shown at /updates). Rendered at
 * /blog/<slug>. Copy this object into your Sanity Studio project's schema
 * index (plain object; no `sanity` import required so the docs app can
 * ship it without depending on the studio toolchain).
 */
const article = {
	name: 'article',
	title: 'Article',
	type: 'document',
	fields: [
		{ name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (r: any) => r.required(),
		},
		{ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
		{ name: 'seoTitle', title: 'SEO title', type: 'string' },
		{ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 },
		{
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			validation: (r: any) => r.required(),
		},
		{
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
		},
	],
	orderings: [
		{
			title: 'Published, newest first',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
	],
};

export default article;
