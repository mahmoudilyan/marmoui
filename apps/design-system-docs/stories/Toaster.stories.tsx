import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster as ToasterBase, toaster, Button as ButtonBase } from '@marmoui/ui';

const Toaster = ToasterBase as any;
const Button = ButtonBase as any;

const meta = {
	title: 'Components/Toaster',
	component: Toaster,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Toaster

Toast notification system built on Sonner for showing brief messages.

## Features
- **Multiple types**: Success, error, warning, info
- **Auto-dismiss**: Configurable duration
- **Stackable**: Multiple toasts queue up
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ToasterBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="space-y-2">
			<Toaster />
			<div className="flex flex-wrap gap-2">
				<Button variant="outline" onClick={() => toaster.info('New update available')}>
					Info
				</Button>
				<Button variant="outline" onClick={() => toaster.success('Successfully saved!')}>
					Success
				</Button>
				<Button variant="outline" onClick={() => toaster.error('Something went wrong')}>
					Error
				</Button>
				<Button variant="outline" onClick={() => toaster.warning('Please check your input')}>
					Warning
				</Button>
			</div>
		</div>
	),
};

export const Loading: Story = {
	render: () => (
		<div>
			<Toaster />
			<Button
				variant="outline"
				onClick={() => toaster.loading('Processing your request...')}
			>
				Show Loading Toast
			</Button>
		</div>
	),
};
