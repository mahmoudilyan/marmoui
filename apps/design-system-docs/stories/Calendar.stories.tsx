import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar as CalendarBase } from '@marmoui/ui';

const Calendar = CalendarBase as any;

const meta = {
	title: 'Components/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Calendar

A standalone calendar component for inline date selection.

## Features
- **Single/Range/Multiple**: Different selection modes
- **Month navigation**: Browse months with arrows
- **Disabled dates**: Restrict selectable dates
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof CalendarBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(new Date());
		return <Calendar mode="single" selected={date} onSelect={setDate} />;
	},
};

export const RangeSelection: Story = {
	render: () => {
		const [range, setRange] = React.useState<any>(undefined);
		return <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />;
	},
};

export const DisabledDates: Story = {
	render: () => {
		const today = new Date();
		const [date, setDate] = React.useState<Date | undefined>(undefined);
		return (
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				disabled={(date: Date) => date < today}
			/>
		);
	},
};
