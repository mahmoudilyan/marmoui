import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	InputGroup as InputGroupBase,
	InputGroupAddon as InputGroupAddonBase,
	InputGroupInput as InputGroupInputBase,
	InputGroupButton as InputGroupButtonBase,
	InputGroupText as InputGroupTextBase,
} from '@marmoui/ui';
import { MdSearch, MdLink, MdContentCopy, MdAttachMoney } from 'react-icons/md';

const InputGroup = InputGroupBase as any;
const InputGroupAddon = InputGroupAddonBase as any;
const InputGroupInput = InputGroupInputBase as any;
const InputGroupButton = InputGroupButtonBase as any;
const InputGroupText = InputGroupTextBase as any;

const meta = {
	title: 'Components/InputGroup',
	component: InputGroup,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# InputGroup

A compound input with addons, icons, and buttons for complex input scenarios.

## Features
- **Addons**: Text, icons, or buttons before/after input
- **Sizes**: Small, medium, large
- **Composable**: Mix and match addon types
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof InputGroupBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
	render: () => (
		<InputGroup className="w-72">
			<InputGroupAddon>
				<MdSearch size={16} />
			</InputGroupAddon>
			<InputGroupInput placeholder="Search..." />
		</InputGroup>
	),
};

export const WithTextAddon: Story = {
	render: () => (
		<InputGroup className="w-72">
			<InputGroupAddon>
				<InputGroupText>https://</InputGroupText>
			</InputGroupAddon>
			<InputGroupInput placeholder="example.com" />
		</InputGroup>
	),
};

export const WithButton: Story = {
	render: () => (
		<InputGroup className="w-96">
			<InputGroupAddon>
				<MdLink size={16} />
			</InputGroupAddon>
			<InputGroupInput value="https://example.com/share/abc123" readOnly />
			<InputGroupAddon align="inline-end">
				<InputGroupButton variant="ghost" size="xs">
					<MdContentCopy size={14} />
					Copy
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	),
};

export const CurrencyInput: Story = {
	render: () => (
		<InputGroup className="w-48">
			<InputGroupAddon>
				<MdAttachMoney size={16} />
			</InputGroupAddon>
			<InputGroupInput placeholder="0.00" />
			<InputGroupAddon align="inline-end">
				<InputGroupText>USD</InputGroupText>
			</InputGroupAddon>
		</InputGroup>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-72">
			<InputGroup size="sm">
				<InputGroupAddon><MdSearch size={14} /></InputGroupAddon>
				<InputGroupInput size="sm" placeholder="Small..." />
			</InputGroup>
			<InputGroup size="md">
				<InputGroupAddon><MdSearch size={16} /></InputGroupAddon>
				<InputGroupInput size="md" placeholder="Medium..." />
			</InputGroup>
			<InputGroup size="lg">
				<InputGroupAddon><MdSearch size={18} /></InputGroupAddon>
				<InputGroupInput size="lg" placeholder="Large..." />
			</InputGroup>
		</div>
	),
};
