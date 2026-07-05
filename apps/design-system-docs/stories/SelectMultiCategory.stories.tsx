import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectMultiCategory as SelectMultiCategoryBase } from '@marmoui/ui';

const SelectMultiCategory = SelectMultiCategoryBase as any;

const categories = [
	{
		label: 'Frontend',
		options: [
			{ value: 'react', label: 'React' },
			{ value: 'vue', label: 'Vue.js' },
			{ value: 'angular', label: 'Angular' },
		],
	},
	{
		label: 'Backend',
		options: [
			{ value: 'node', label: 'Node.js' },
			{ value: 'python', label: 'Python' },
			{ value: 'go', label: 'Go' },
		],
	},
	{
		label: 'Database',
		options: [
			{ value: 'postgres', label: 'PostgreSQL' },
			{ value: 'mysql', label: 'MySQL' },
			{ value: 'mongo', label: 'MongoDB' },
		],
	},
];

const meta = {
	title: 'Components/SelectMultiCategory',
	component: SelectMultiCategory,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# SelectMultiCategory

A multi-select dropdown organized by categories.

## Features
- **Categorized options**: Options grouped by category
- **Multi-select**: Select from different categories
- **Searchable**: Filter across all categories
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SelectMultiCategoryBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [values, setValues] = React.useState<string[]>([]);
		return (
			<div className="w-72">
				<SelectMultiCategory
					value={values}
					onChange={setValues}
					categories={categories}
					placeholder="Select technologies..."
				/>
			</div>
		);
	},
};
