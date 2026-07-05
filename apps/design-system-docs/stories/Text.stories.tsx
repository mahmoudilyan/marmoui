import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text as TextBase } from '@marmoui/ui';

const Text = TextBase as any;

const meta = {
	title: 'Components/Text',
	component: Text,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Text

A polymorphic text component with preset typography styles.

## Features
- **Multiple variants**: Heading, body, caption, label sizes
- **Polymorphic**: Renders as any HTML element
- **Consistent**: Enforces design system typography
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TextBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'The quick brown fox jumps over the lazy dog.',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-3">
			<Text variant="heading-lg">Heading Large</Text>
			<Text variant="heading-md">Heading Medium</Text>
			<Text variant="heading-sm">Heading Small</Text>
			<Text variant="body-lg">Body Large</Text>
			<Text variant="body-md">Body Medium</Text>
			<Text variant="body-sm">Body Small</Text>
			<Text variant="caption">Caption text</Text>
			<Text variant="label">Label text</Text>
		</div>
	),
};

export const AsElement: Story = {
	render: () => (
		<div className="space-y-2">
			<Text as="h1" variant="heading-lg">Rendered as h1</Text>
			<Text as="p" variant="body-md">Rendered as paragraph</Text>
			<Text as="span" variant="caption">Rendered as span</Text>
			<Text as="label" variant="label">Rendered as label</Text>
		</div>
	),
};
