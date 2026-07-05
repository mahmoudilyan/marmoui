'use client';

import React, { useState } from 'react';
import { SelectCheckboxSearchable } from '@marmoui/ui';

/** Basic searchable multi-select */
export function SelectCheckboxSearchableBasicPreview() {
	const [selected, setSelected] = useState<string[]>([]);

	return (
		<SelectCheckboxSearchable
			items={[
				{ label: 'Marketing', value: 'marketing' },
				{ label: 'Sales', value: 'sales' },
				{ label: 'Engineering', value: 'engineering' },
				{ label: 'Design', value: 'design' },
				{ label: 'Support', value: 'support' },
			]}
			value={selected}
			placeholder="Select teams..."
			searchPlaceholder="Search teams..."
			onChange={setSelected}
		/>
	);
}
