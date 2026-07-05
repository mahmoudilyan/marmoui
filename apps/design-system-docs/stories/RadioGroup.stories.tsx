import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio as RadioBase, Label as LabelBase } from '@marmoui/ui';

const Radio = RadioBase as any;
const Label = LabelBase as any;

const meta = {
	title: 'Components/RadioGroup',
	component: Radio,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Radio Group

A set of radio buttons for selecting a single option from a list.

## Features
- **Accessible**: Proper fieldset/legend semantics
- **Keyboard navigation**: Arrow keys to cycle options
- **Controlled/Uncontrolled**: Works both ways
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof RadioBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<fieldset className="space-y-3">
			<legend className="text-sm font-medium mb-2">Notification preference</legend>
			<div className="flex items-center space-x-2">
				<input type="radio" id="email" name="notification" value="email" defaultChecked className="accent-primary" />
				<Label htmlFor="email">Email</Label>
			</div>
			<div className="flex items-center space-x-2">
				<input type="radio" id="sms" name="notification" value="sms" className="accent-primary" />
				<Label htmlFor="sms">SMS</Label>
			</div>
			<div className="flex items-center space-x-2">
				<input type="radio" id="push" name="notification" value="push" className="accent-primary" />
				<Label htmlFor="push">Push notification</Label>
			</div>
		</fieldset>
	),
};
