import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label as LabelBase, Input as InputBase, Switch as SwitchBase } from '@marmoui/ui';

const Label = LabelBase as any;
const Input = InputBase as any;
const Switch = SwitchBase as any;

const meta = {
	title: 'Components/Label',
	component: Label,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Label

An accessible label component for form controls.

## Features
- **Accessibility**: Proper htmlFor association
- **Required indicator**: Optional asterisk
- **Composable**: Pairs with any form control
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof LabelBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Label>Email address</Label>,
};

export const WithInput: Story = {
	render: () => (
		<div className="space-y-2 w-[300px]">
			<Label htmlFor="email">Email</Label>
			<Input id="email" type="email" placeholder="m@example.com" />
		</div>
	),
};

export const WithSwitch: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Switch id="terms" />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</div>
	),
};
