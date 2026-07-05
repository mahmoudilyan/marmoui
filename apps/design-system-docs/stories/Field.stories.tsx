import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field as FieldBase, Input as InputBase, Textarea as TextareaBase } from '@marmoui/ui';

const Field = FieldBase as any;
const Input = InputBase as any;
const Textarea = TextareaBase as any;

const meta = {
	title: 'Components/Field',
	component: Field,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Field

A form field wrapper that provides label, helper text, and error messaging.

## Features
- **Label**: Built-in label with required indicator
- **Helper text**: Additional context below the input
- **Error state**: Error message display with styling
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof FieldBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="w-[350px]">
			<Field label="Email">
				<Input placeholder="m@example.com" />
			</Field>
		</div>
	),
};

export const Required: Story = {
	render: () => (
		<div className="w-[350px]">
			<Field label="Full Name" required>
				<Input placeholder="John Doe" />
			</Field>
		</div>
	),
};

export const WithHelperText: Story = {
	render: () => (
		<div className="w-[350px]">
			<Field label="Username" helperText="This will be your public display name.">
				<Input placeholder="johndoe" />
			</Field>
		</div>
	),
};

export const WithError: Story = {
	render: () => (
		<div className="w-[350px]">
			<Field label="Email" error="Please enter a valid email address." required>
				<Input variant="destructive" placeholder="m@example.com" />
			</Field>
		</div>
	),
};

export const FormExample: Story = {
	render: () => (
		<div className="w-[350px] space-y-4 p-6 border border-border rounded-lg">
			<h3 className="text-lg font-semibold">Contact Form</h3>
			<Field label="Name" required>
				<Input placeholder="Your name" />
			</Field>
			<Field label="Email" required helperText="We'll never share your email.">
				<Input type="email" placeholder="you@example.com" />
			</Field>
			<Field label="Message" required>
				<Textarea placeholder="Tell us about your project..." />
			</Field>
		</div>
	),
};
