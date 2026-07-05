import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea as ScrollAreaBase } from '@marmoui/ui';

const ScrollArea = ScrollAreaBase as any;

const meta = {
	title: 'Components/ScrollArea',
	component: ScrollArea,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# ScrollArea

A custom scrollable container with styled scrollbars.

## Features
- **Custom scrollbars**: Consistent cross-browser appearance
- **Accessible**: Standard scroll behavior preserved
- **Lightweight**: Minimal performance impact
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ScrollAreaBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ScrollArea className="h-72 w-48 rounded-md border">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
				{Array.from({ length: 50 }).map((_, i) => (
					<div key={i} className="text-sm py-1">
						Tag {i + 1}
					</div>
				))}
			</div>
		</ScrollArea>
	),
};

export const HorizontalScroll: Story = {
	render: () => (
		<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
			<div className="flex w-max space-x-4 p-4">
				{Array.from({ length: 20 }).map((_, i) => (
					<div
						key={i}
						className="shrink-0 w-32 h-20 rounded-md bg-muted flex items-center justify-center text-sm"
					>
						Item {i + 1}
					</div>
				))}
			</div>
		</ScrollArea>
	),
};
