import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider as SliderBase, Label as LabelBase } from '@marmoui/ui';

const Slider = SliderBase as any;
const Label = LabelBase as any;

const meta = {
	title: 'Components/Slider',
	component: Slider,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Slider

A range input component for selecting numeric values within a range.

## Features
- **Range support**: Single or dual thumb
- **Step control**: Customizable step increments
- **Accessible**: Keyboard navigation with arrow keys
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SliderBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Slider defaultValue={[50]} max={100} step={1} className="w-[300px]" />,
};

export const WithLabel: Story = {
	render: () => (
		<div className="w-[300px] space-y-2">
			<div className="flex justify-between">
				<Label>Volume</Label>
				<span className="text-sm text-ink-light">75%</span>
			</div>
			<Slider defaultValue={[75]} max={100} step={1} />
		</div>
	),
};

export const Range: Story = {
	render: () => (
		<div className="w-[300px] space-y-2">
			<Label>Price Range</Label>
			<Slider defaultValue={[25, 75]} max={100} step={5} />
			<div className="flex justify-between text-xs text-ink-light">
				<span>$0</span>
				<span>$100</span>
			</div>
		</div>
	),
};

export const Steps: Story = {
	render: () => (
		<div className="w-[300px] space-y-4">
			<div className="space-y-2">
				<Label>Step: 1</Label>
				<Slider defaultValue={[50]} max={100} step={1} />
			</div>
			<div className="space-y-2">
				<Label>Step: 10</Label>
				<Slider defaultValue={[50]} max={100} step={10} />
			</div>
			<div className="space-y-2">
				<Label>Step: 25</Label>
				<Slider defaultValue={[50]} max={100} step={25} />
			</div>
		</div>
	),
};
