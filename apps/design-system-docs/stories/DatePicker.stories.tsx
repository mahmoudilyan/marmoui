import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker as DatePickerBase, Label as LabelBase } from '@marmoui/ui';

const DatePicker = DatePickerBase as any;
const Label = LabelBase as any;

const meta = {
	title: 'Components/DatePicker',
	component: DatePicker,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# DatePicker

A date and date range picker with calendar popover, presets, and multiple trigger styles.

## Features
- **Single/Range**: Date or date range selection
- **Presets**: Quick selection options
- **Trigger styles**: Button or input trigger
- **Date constraints**: Min/max dates
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DatePickerBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="w-72">
			<Label className="mb-1 block">Select Date</Label>
			<DatePicker placeholder="Pick a date" />
		</div>
	),
};

export const InputTrigger: Story = {
	render: () => (
		<div className="w-72">
			<Label className="mb-1 block">Input Trigger</Label>
			<DatePicker placeholder="Pick a date" triggerType="input" />
		</div>
	),
};

export const WithPresets: Story = {
	render: () => (
		<div className="w-72">
			<Label className="mb-1 block">Event Date</Label>
			<DatePicker placeholder="Select date" hasPresets />
		</div>
	),
};

export const DateRange: Story = {
	render: () => (
		<div className="w-80">
			<Label className="mb-1 block">Date Range</Label>
			<DatePicker placeholder="Select date range" isRange />
		</div>
	),
};

export const RangeWithPresets: Story = {
	render: () => (
		<div className="w-96">
			<Label className="mb-1 block">Report Period</Label>
			<DatePicker placeholder="Select period" isRange hasPresets />
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div className="w-72">
			<Label className="mb-1 block">Locked Date</Label>
			<DatePicker value={new Date()} disabled placeholder="Cannot change" />
		</div>
	),
};
