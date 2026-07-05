import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton as SkeletonBase } from '@marmoui/ui';

const Skeleton = SkeletonBase as any;

const meta = {
	title: 'Components/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Skeleton

A placeholder loading component that mimics the shape of content being loaded.

## Features
- **Flexible dimensions**: Customizable width and height
- **Pulse animation**: Subtle animation to indicate loading
- **Composable**: Build complex loading states
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SkeletonBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Skeleton className="h-4 w-[250px]" />,
};

export const CardSkeleton: Story = {
	render: () => (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	),
};

export const FormSkeleton: Story = {
	render: () => (
		<div className="space-y-4 w-[350px]">
			<div className="space-y-2">
				<Skeleton className="h-4 w-[80px]" />
				<Skeleton className="h-10 w-full" />
			</div>
			<div className="space-y-2">
				<Skeleton className="h-4 w-[120px]" />
				<Skeleton className="h-10 w-full" />
			</div>
			<div className="space-y-2">
				<Skeleton className="h-4 w-[100px]" />
				<Skeleton className="h-24 w-full" />
			</div>
			<Skeleton className="h-10 w-[120px]" />
		</div>
	),
};

export const TableSkeleton: Story = {
	render: () => (
		<div className="w-[500px] space-y-3">
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
		</div>
	),
};
