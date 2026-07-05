import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch as SwitchBase, Label as LabelBase } from '@marmoui/ui';

const Switch = SwitchBase as any;
const Label = LabelBase as any;

const meta = {
	title: 'Components/Switch',
	component: Switch,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Switch

A toggle switch component for binary on/off settings.

## Features
- **Accessible**: Full keyboard and screen reader support
- **Controlled/Uncontrolled**: Works both ways
- **Label support**: Pairs with Label component
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SwitchBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Switch />,
};

export const WithLabel: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Switch id="airplane-mode" />
			<Label htmlFor="airplane-mode">Airplane Mode</Label>
		</div>
	),
};

export const SettingsExample: Story = {
	render: () => (
		<div className="w-[350px] space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium">Email notifications</p>
					<p className="text-xs text-ink-light">Receive emails about account activity</p>
				</div>
				<Switch defaultChecked />
			</div>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium">Push notifications</p>
					<p className="text-xs text-ink-light">Receive push notifications on your device</p>
				</div>
				<Switch />
			</div>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium">Marketing emails</p>
					<p className="text-xs text-ink-light">Receive emails about new products and features</p>
				</div>
				<Switch />
			</div>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			<div className="flex items-center space-x-2">
				<Switch disabled />
				<Label className="text-ink-light">Disabled Off</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Switch disabled defaultChecked />
				<Label className="text-ink-light">Disabled On</Label>
			</div>
		</div>
	),
};
