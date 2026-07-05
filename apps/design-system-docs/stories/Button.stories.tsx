import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from '@marmoui/ui';
import { MdCalendarMonth } from 'react-icons/md';

const meta = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'primary',
				'destructive',
				'secondary',
				'ghost',
				'ghost-body',
				'ghost-destructive',
				'link',
			],
		},
		size: { control: 'select', options: ['md', 'sm', 'lg', 'xs'] },
		disabled: { control: 'boolean' },
		loading: { control: 'boolean' },
		loadingText: { control: 'text' },
		leftIcon: { control: 'text' },
		rightIcon: { control: 'text' },
		children: { control: 'text' },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		onClick: fn(),
		size: 'md',
		variant: 'primary',
		children: 'Button',
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /button/i });

		// Test button is rendered
		await expect(button).toBeInTheDocument();

		// Test click handler is called
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalledTimes(1);
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /button/i });

		await expect(button).toBeInTheDocument();
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /button/i });

		await expect(button).toBeInTheDocument();
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /button/i });

		await expect(button).toBeInTheDocument();
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');

		// Button should be disabled when loading
		await expect(button).toBeDisabled();
	},
};

export const LoadingWithText: Story = {
	args: {
		loading: true,
		loadingText: 'Loading...',
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');

		// Should show loading text
		await expect(button).toHaveTextContent('Loading...');
		await expect(button).toBeDisabled();
	},
};

export const LeftIcon: Story = {
	args: {
		leftIcon: <MdCalendarMonth />,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /button/i });

		// Button should contain an SVG icon
		await expect(button).toBeInTheDocument();
		await expect(button.querySelector('svg')).toBeInTheDocument();
	},
};

export const RightIcon: Story = {
	args: {
		rightIcon: <MdCalendarMonth />,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /button/i });

		await expect(button).toBeInTheDocument();
		await expect(button.querySelector('svg')).toBeInTheDocument();
	},
};

// Additional test stories
export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-3">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="ghost-body">Ghost Body</Button>
			<Button variant="ghost-destructive">Ghost Destructive</Button>
			<Button variant="link">Link</Button>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// All variant buttons should be rendered
		await expect(canvas.getByRole('button', { name: /^primary$/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /^secondary$/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /^destructive$/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /^ghost$/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /ghost body/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /ghost destructive/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /^link$/i })).toBeInTheDocument();
	},
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<Button size="xs">Extra Small</Button>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByRole('button', { name: /extra small/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /^small$/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /medium/i })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: /large/i })).toBeInTheDocument();
	},
};

export const DisabledState: Story = {
	args: {
		disabled: true,
		children: 'Disabled Button',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /disabled button/i });

		await expect(button).toBeDisabled();
	},
};
