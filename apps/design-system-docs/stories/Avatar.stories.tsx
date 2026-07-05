import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Avatar as AvatarBase,
	AvatarImage as AvatarImageBase,
	AvatarFallback as AvatarFallbackBase,
	AvatarStack as AvatarStackBase,
} from '@marmoui/ui';

// Type assertions to fix React 19 compatibility
const Avatar = AvatarBase as any;
const AvatarImage = AvatarImageBase as any;
const AvatarFallback = AvatarFallbackBase as any;
const AvatarStack = AvatarStackBase as any;

const meta = {
	title: 'Components/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Avatar

A flexible avatar component that supports multiple variants, sizes, status indicators, and badge notifications. Perfect for user profiles, team members, and contact lists.

## Features

- **Multiple sizes**: xs, sm, md, lg, xl
- **Status indicators**: success, warning, error
- **Badge notifications**: numerical badges with 99+ overflow
- **Fallback support**: initials or icon when no image
- **Accessibility**: proper alt text and ARIA labels

## Usage

\`\`\`tsx
import { Avatar, AvatarImage, AvatarFallback } from '@marmoui/ui';

// Basic avatar with initials
<Avatar size="md">
  <AvatarFallback size="md">JL</AvatarFallback>
</Avatar>

// Avatar with image and status
<Avatar size="lg" showStatus statusColor="success">
  <AvatarImage src="/user.jpg" alt="John Doe" />
  <AvatarFallback size="lg">JD</AvatarFallback>
</Avatar>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
		showStatus: {
			control: 'boolean',
		},
		statusColor: {
			control: 'select',
			options: ['success', 'warning', 'error'],
		},
		badgeCount: {
			control: { type: 'number', min: 0, max: 999 },
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: 'md',
	},
	render: args => (
		<Avatar {...args}>
			<AvatarFallback size={args.size}>JL</AvatarFallback>
		</Avatar>
	),
};

export const WithImage: Story = {
	args: {
		size: 'lg',
	},
	render: args => (
		<Avatar {...args}>
			<AvatarImage src="https://api.dicebear.com/9.x/lorelei/svg" alt="User Avatar" />
			<AvatarFallback size={args.size}>CN</AvatarFallback>
		</Avatar>
	),
};

export const WithStatus: Story = {
	args: {
		size: 'md',
		showStatus: true,
		statusColor: 'success',
	},
	render: args => (
		<Avatar {...args}>
			<AvatarImage src="https://api.dicebear.com/9.x/lorelei/svg" alt="User Avatar" />
			<AvatarFallback size={args.size}>CN</AvatarFallback>
		</Avatar>
	),
};

export const WithBadge: Story = {
	args: {
		size: 'md',
		badgeCount: 5,
	},
	render: args => (
		<Avatar {...args}>
			<AvatarFallback size={args.size}>JL</AvatarFallback>
		</Avatar>
	),
};

export const WithStatusAndBadge: Story = {
	args: {
		size: 'lg',
		showStatus: true,
		statusColor: 'success',
		badgeCount: 12,
	},
	render: args => (
		<Avatar {...args}>
			<AvatarImage src="https://api.dicebear.com/9.x/lorelei/svg" alt="User Avatar" />
			<AvatarFallback size={args.size}>CN</AvatarFallback>
		</Avatar>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-end gap-4">
			{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
				<div key={size} className="flex flex-col items-center gap-2">
					<Avatar size={size}>
						<AvatarFallback size={size}>JL</AvatarFallback>
					</Avatar>
					<span className="text-xs text-ink-light">{size}</span>
				</div>
			))}
		</div>
	),
};

export const AllStatusColors: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			{(['success', 'warning', 'error'] as const).map(statusColor => (
				<div key={statusColor} className="flex flex-col items-center gap-2">
					<Avatar size="md" showStatus statusColor={statusColor}>
						<AvatarFallback size="md">JL</AvatarFallback>
					</Avatar>
					<span className="text-xs text-ink-light capitalize">{statusColor}</span>
				</div>
			))}
		</div>
	),
};

export const BadgeOverflow: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			{[5, 25, 99, 100, 999, 1000].map(count => (
				<div key={count} className="flex flex-col items-center gap-2">
					<Avatar size="md" badgeCount={count}>
						<AvatarFallback size="md">JL</AvatarFallback>
					</Avatar>
					<span className="text-xs text-ink-light">{count}</span>
				</div>
			))}
		</div>
	),
};

export const WithIcon: Story = {
	render: () => (
		<div className="flex items-end gap-4">
			{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
				<div key={size} className="flex flex-col items-center gap-2">
					<Avatar size={size}>
						<AvatarFallback size={size} showIcon />
					</Avatar>
					<span className="text-xs text-ink-light">{size}</span>
				</div>
			))}
		</div>
	),
};

export const TeamAvatars: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<Avatar size="md" showStatus statusColor="success">
				<AvatarImage src="https://api.dicebear.com/9.x/lorelei/svg" alt="John Doe" />
				<AvatarFallback size="md">JD</AvatarFallback>
			</Avatar>
			<Avatar size="md" showStatus statusColor="warning" badgeCount={3}>
				<AvatarFallback size="md">SM</AvatarFallback>
			</Avatar>
			<Avatar size="md" showStatus statusColor="error">
				<AvatarFallback size="md">AL</AvatarFallback>
			</Avatar>
			<Avatar size="md" badgeCount={15}>
				<AvatarFallback size="md" showIcon />
			</Avatar>
		</div>
	),
};

export const AvatarStackExample: Story = {
	render: () => (
		<AvatarStack max={4} size="md">
			<Avatar size="md">
				<AvatarImage src="https://api.dicebear.com/9.x/lorelei/svg" alt="User 1" />
				<AvatarFallback size="md">U1</AvatarFallback>
			</Avatar>
			<Avatar size="md">
				<AvatarFallback size="md">U2</AvatarFallback>
			</Avatar>
			<Avatar size="md">
				<AvatarFallback size="md">U3</AvatarFallback>
			</Avatar>
			<Avatar size="md">
				<AvatarFallback size="md">U4</AvatarFallback>
			</Avatar>
		</AvatarStack>
	),
};
