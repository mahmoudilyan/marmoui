/** Sanity schema — landing-page testimonial. Only `published == true` entries render. */
const testimonial = {
	name: 'testimonial',
	title: 'Testimonial',
	type: 'document',
	fields: [
		{ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (r: any) => r.required() },
		{ name: 'name', title: 'Name', type: 'string', validation: (r: any) => r.required() },
		{ name: 'role', title: 'Role / company', type: 'string', validation: (r: any) => r.required() },
		{
			name: 'published',
			title: 'Published',
			type: 'boolean',
			initialValue: false,
			description: 'Only published testimonials appear on the landing page.',
		},
	],
};

export default testimonial;
