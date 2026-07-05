import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@marmoui/ui';
import { MdCheck, MdWarning, MdInfo, MdClose, MdStar } from 'react-icons/md';

const meta = {
	title: 'Components/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Badge

A versatile badge component for displaying status, categories, or metadata. Built with accessibility in mind and supporting various visual styles.

## Features

- **Multiple variants**: Default, success, warning, alert, destructive
- **Two sizes**: Small and medium
- **Icon support**: Left and right icon placement
- **Accessible**: Proper color contrast and semantic meaning
- **Flexible**: Works inline or as standalone elements

## Usage

\`\`\`tsx
import { Badge } from '@marmoui/ui';

// Basic badge
<Badge>New</Badge>

// With variant and icon
<Badge variant="success" leftIcon={<MdCheck />}>
  Completed
</Badge>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'alert', 'destructive'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md'],
		},
		children: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Badge',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="normal">Default</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="info">Alert</Badge>
			<Badge variant="destructive">Destructive</Badge>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<div className="flex flex-col items-center gap-2">
				<Badge size="sm">Small</Badge>
				<span className="text-xs text-ink-light">Small</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Badge size="md">Medium</Badge>
				<span className="text-xs text-ink-light">Medium</span>
			</div>
		</div>
	),
};

export const WithIcons: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Badge variant="success" leftIcon={<MdCheck className="h-3 w-3" />}>
				Completed
			</Badge>
			<Badge variant="warning" leftIcon={<MdWarning className="h-3 w-3" />}>
				Warning
			</Badge>
			<Badge variant="info" leftIcon={<MdInfo className="h-3 w-3" />}>
				Information
			</Badge>
			<Badge variant="destructive" leftIcon={<MdClose className="h-3 w-3" />}>
				Failed
			</Badge>
			<Badge variant="normal" rightIcon={<MdStar className="h-3 w-3" />}>
				Featured
			</Badge>
		</div>
	),
};

export const StatusBadges: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h4 className="text-sm font-medium mb-2">Task Status</h4>
				<div className="flex gap-2">
					<Badge variant="normal">Contacted</Badge>
					<Badge variant="info">Lead</Badge>
					<Badge variant="warning">Qualified</Badge>
					<Badge variant="success">Converted</Badge>
				</div>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-2">Priority Levels</h4>
				<div className="flex gap-2">
					<Badge variant="destructive" size="sm">
						High
					</Badge>
					<Badge variant="warning" size="sm">
						Medium
					</Badge>
					<Badge variant="normal" size="sm">
						Low
					</Badge>
				</div>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-2">User Roles</h4>
				<div className="flex gap-2">
					<Badge variant="success">Admin</Badge>
					<Badge variant="info">Editor</Badge>
					<Badge variant="normal">Viewer</Badge>
				</div>
			</div>
		</div>
	),
};

export const NotificationBadges: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h4 className="text-sm font-medium mb-2">System Notifications</h4>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<Badge variant="success" leftIcon={<MdCheck className="h-3 w-3" />}>
							Email Delivery Complete
						</Badge>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="warning" leftIcon={<MdWarning className="h-3 w-3" />}>
							Email Delivery Failed
						</Badge>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="destructive" leftIcon={<MdClose className="h-3 w-3" />}>
							Email Delivery Failed
						</Badge>
					</div>
				</div>
			</div>
		</div>
	),
};

export const InteractiveBadges: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h4 className="text-sm font-medium mb-2">Removable Tags</h4>
				<div className="flex flex-wrap gap-2">
					<Badge
						variant="normal"
						rightIcon={<MdClose className="h-3 w-3 cursor-pointer hover:text-ink-dark" />}
						className="cursor-default hover:bg-muted"
					>
						Contacted
					</Badge>
					<Badge
						variant="success"
						rightIcon={<MdClose className="h-3 w-3 cursor-pointer hover:text-ink-dark" />}
						className="cursor-default hover:bg-green-200"
					>
						Lead
					</Badge>
					<Badge
						variant="info"
						rightIcon={<MdClose className="h-3 w-3 cursor-pointer hover:text-ink-dark" />}
						className="cursor-default hover:bg-blue-200"
					>
						Qualified
					</Badge>
				</div>
			</div>
		</div>
	),
};
