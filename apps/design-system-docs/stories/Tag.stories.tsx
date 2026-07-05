import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag as TagBase } from '@marmoui/ui';
import { MdClose } from 'react-icons/md';

const Tag = TagBase as any;

const meta = {
	title: 'Components/Tag',
	component: Tag,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Tag

A small label component for categorization, filtering, or displaying metadata.

## Features
- **Multiple variants**: Various color options
- **Closeable**: Optional remove button
- **Compact**: Designed for inline use
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TagBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Tag',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Tag variant="default">Default</Tag>
			<Tag variant="primary">Primary</Tag>
			<Tag variant="success">Success</Tag>
			<Tag variant="warning">Warning</Tag>
			<Tag variant="destructive">Destructive</Tag>
			<Tag variant="info">Info</Tag>
		</div>
	),
};

export const Closeable: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Tag closable onClose={() => {}}>Removable</Tag>
			<Tag variant="primary" closable onClose={() => {}}>Primary</Tag>
			<Tag variant="success" closable onClose={() => {}}>Success</Tag>
		</div>
	),
};

export const TagGroup: Story = {
	render: () => (
		<div className="space-y-3">
			<div>
				<span className="text-sm font-medium mb-1 block">Categories</span>
				<div className="flex flex-wrap gap-1">
					<Tag variant="primary">Marketing</Tag>
					<Tag variant="success">Active</Tag>
					<Tag variant="info">Newsletter</Tag>
				</div>
			</div>
			<div>
				<span className="text-sm font-medium mb-1 block">Tags</span>
				<div className="flex flex-wrap gap-1">
					<Tag closable onClose={() => {}}>react</Tag>
					<Tag closable onClose={() => {}}>typescript</Tag>
					<Tag closable onClose={() => {}}>tailwind</Tag>
				</div>
			</div>
		</div>
	),
};
