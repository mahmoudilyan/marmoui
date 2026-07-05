import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea as TextareaBase, Label as LabelBase } from '@marmoui/ui';

const Textarea = TextareaBase as any;
const Label = LabelBase as any;

const meta = {
	title: 'Components/Textarea',
	component: Textarea,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Textarea

A multi-line text input for longer form content.

## Features
- **Auto-resize**: Optionally grows with content
- **Variants**: Normal, destructive, success, warning
- **Accessible**: Works with Label component
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TextareaBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Textarea placeholder="Type your message here..." className="w-[350px]" />,
};

export const WithLabel: Story = {
	render: () => (
		<div className="w-[350px] space-y-2">
			<Label htmlFor="message">Your Message</Label>
			<Textarea id="message" placeholder="Type your message here..." />
			<p className="text-xs text-ink-light">Your message will be sent to the team.</p>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<Textarea disabled placeholder="This textarea is disabled" className="w-[350px]" />
	),
};
