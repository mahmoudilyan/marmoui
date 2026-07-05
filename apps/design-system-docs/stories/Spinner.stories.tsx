import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner as SpinnerBase } from '@marmoui/ui';

const Spinner = SpinnerBase as any;

const meta = {
	title: 'Components/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Spinner

A loading spinner component to indicate async operations in progress.

## Features
- **Multiple sizes**: Small, medium, large
- **Customizable color**: Inherits text color or custom
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
	},
} satisfies Meta<typeof SpinnerBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<div className="flex flex-col items-center gap-2">
				<Spinner size="sm" />
				<span className="text-xs text-ink-light">Small</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Spinner size="md" />
				<span className="text-xs text-ink-light">Medium</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Spinner size="lg" />
				<span className="text-xs text-ink-light">Large</span>
			</div>
		</div>
	),
};

export const InButton: Story = {
	render: () => (
		<button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md" disabled>
			<Spinner size="sm" />
			Loading...
		</button>
	),
};
