import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Popover as PopoverBase,
	PopoverContent as PopoverContentBase,
	PopoverTrigger as PopoverTriggerBase,
	Button as ButtonBase,
	Input as InputBase,
	Label as LabelBase,
} from '@marmoui/ui';

const Popover = PopoverBase as any;
const PopoverContent = PopoverContentBase as any;
const PopoverTrigger = PopoverTriggerBase as any;
const Button = ButtonBase as any;
const Input = InputBase as any;
const Label = LabelBase as any;

const meta = {
	title: 'Components/Popover',
	component: Popover,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Popover

A floating panel anchored to a trigger element for displaying rich content.

## Features
- **Flexible content**: Any React content inside
- **Positioning**: Auto-positioning with collision detection
- **Accessible**: Focus management and keyboard support
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof PopoverBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Open popover</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="space-y-2">
					<h4 className="font-medium leading-none">Dimensions</h4>
					<p className="text-sm text-ink-light">Set the dimensions for the layer.</p>
				</div>
				<div className="grid gap-2 mt-4">
					<div className="grid grid-cols-3 items-center gap-4">
						<Label htmlFor="width">Width</Label>
						<Input id="width" defaultValue="100%" className="col-span-2 h-8" />
					</div>
					<div className="grid grid-cols-3 items-center gap-4">
						<Label htmlFor="height">Height</Label>
						<Input id="height" defaultValue="25px" className="col-span-2 h-8" />
					</div>
				</div>
			</PopoverContent>
		</Popover>
	),
};
