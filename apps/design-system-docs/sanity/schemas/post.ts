/**
 * Sanity schema — product update / blog post.
 * Copy these schema objects into your Sanity Studio project's schema index
 * (they are plain objects; no `sanity` import required here so the docs app
 * can ship them without depending on the studio toolchain).
 */
const post = {
	name: 'post',
	title: 'Post',
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

export default post;
