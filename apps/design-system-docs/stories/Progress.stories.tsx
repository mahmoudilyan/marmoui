import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress as ProgressBase } from '@marmoui/ui';

const Progress = ProgressBase as any;

const meta = {
	title: 'Components/Progress',
	component: Progress,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Progress

A progress bar component to indicate completion status.

## Features
- **Customizable value**: 0-100 percentage
- **Variants**: Different color options
- **Accessible**: Proper ARIA attributes
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ProgressBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Progress value={60} className="w-[350px]" />,
};

export const AllStates: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-[350px]">
			<div>
				<span className="text-sm text-ink-light mb-1 block">0%</span>
				<Progress value={0} />
			</div>
			<div>
				<span className="text-sm text-ink-light mb-1 block">25%</span>
				<Progress value={25} />
			</div>
			<div>
				<span className="text-sm text-ink-light mb-1 block">50%</span>
				<Progress value={50} />
			</div>
			<div>
				<span className="text-sm text-ink-light mb-1 block">75%</span>
				<Progress value={75} />
			</div>
			<div>
				<span className="text-sm text-ink-light mb-1 block">100%</span>
				<Progress value={100} />
			</div>
		</div>
	),
};
