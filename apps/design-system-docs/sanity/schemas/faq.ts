/** Sanity schema — FAQ item (optional CMS override for the landing FAQ). */
const faq = {
	name: 'faq',
	title: 'FAQ item',
	type: 'document',
	fields: [
		{ name: 'question', title: 'Question', type: 'string', validation: (r: any) => r.required() },
		{ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r: any) => r.required() },
		{ name: 'order', title: 'Order', type: 'number', initialValue: 0 },
	],
	orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};

export default faq;
