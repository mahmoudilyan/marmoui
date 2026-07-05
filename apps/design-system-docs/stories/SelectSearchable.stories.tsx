import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectSearchable as SelectSearchableBase } from '@marmoui/ui';

const SelectSearchable = SelectSearchableBase as any;

const options = [
	{ value: 'us', label: 'United States' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'ca', label: 'Canada' },
	{ value: 'au', label: 'Australia' },
	{ value: 'de', label: 'Germany' },
	{ value: 'fr', label: 'France' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'br', label: 'Brazil' },
	{ value: 'in', label: 'India' },
	{ value: 'mx', label: 'Mexico' },
];

const meta = {
	title: 'Components/SelectSearchable',
	component: SelectSearchable,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# SelectSearchable

A searchable dropdown select with filtering capabilities.

## Features
- **Search filter**: Type to filter options
- **Keyboard navigation**: Arrow keys and enter
- **Clearable**: Optional clear button
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SelectSearchableBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = React.useState('');
		return (
			<div className="w-72">
				<SelectSearchable
					value={value}
					onChange={setValue}
					options={options}
					placeholder="Select a country..."
				/>
			</div>
		);
	},
};
