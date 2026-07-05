import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectCheckboxSearchable as SelectCheckboxSearchableBase } from '@marmoui/ui';

const SelectCheckboxSearchable = SelectCheckboxSearchableBase as any;

const options = [
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue.js' },
	{ value: 'angular', label: 'Angular' },
	{ value: 'svelte', label: 'Svelte' },
	{ value: 'nextjs', label: 'Next.js' },
	{ value: 'nuxt', label: 'Nuxt' },
	{ value: 'remix', label: 'Remix' },
	{ value: 'astro', label: 'Astro' },
];

const meta = {
	title: 'Components/SelectCheckboxSearchable',
	component: SelectCheckboxSearchable,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# SelectCheckboxSearchable

A multi-select dropdown with checkboxes and search filtering.

## Features
- **Multi-select**: Select multiple options via checkboxes
- **Searchable**: Filter options by typing
- **Chip display**: Selected items shown as chips
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SelectCheckboxSearchableBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [values, setValues] = React.useState<string[]>([]);
		return (
			<div className="w-72">
				<SelectCheckboxSearchable
					value={values}
					onChange={setValues}
					options={options}
					placeholder="Select frameworks..."
				/>
			</div>
		);
	},
};

export const WithPreselected: Story = {
	render: () => {
		const [values, setValues] = React.useState<string[]>(['react', 'nextjs']);
		return (
			<div className="w-72">
				<SelectCheckboxSearchable
					value={values}
					onChange={setValues}
					options={options}
					placeholder="Select frameworks..."
				/>
			</div>
		);
	},
};
