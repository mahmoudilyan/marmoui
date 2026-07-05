'use client';

import React, { useState } from 'react';
import { SelectMultiCategory } from '@marmoui/ui';

export function SelectMultiCategoryBasicPreview() {
	const [selected, setSelected] = useState<string[]>([]);

	return (
		<SelectMultiCategory
			categories={[
				{
					name: 'Lists',
					items: [
						{ label: 'Newsletter Subscribers', value: 'newsletter', description: '5,234 contacts' },
						{ label: 'Customers', value: 'customers', description: '12,891 contacts' },
						{ label: 'New Leads', value: 'leads', description: '2,456 contacts' },
					],
				},
				{
					name: 'Segments',
					items: [
						{ label: 'Highly Engaged', value: 'engaged', description: '3,456 contacts' },
						{ label: 'Inactive Users', value: 'inactive', description: '1,234 contacts' },
						{ label: 'VIP Customers', value: 'vip', description: '123 contacts' },
					],
				},
				{
					name: 'Tags',
					items: [
						{ label: 'Purchased Last 30 Days', value: 'recent-purchase' },
						{ label: 'Abandoned Cart', value: 'abandoned-cart' },
						{ label: 'Referred a Friend', value: 'referral' },
					],
				},
			]}
			value={selected}
			placeholder="Select recipients..."
			searchPlaceholder="Search..."
			onChange={setSelected}
		/>
	);
}
