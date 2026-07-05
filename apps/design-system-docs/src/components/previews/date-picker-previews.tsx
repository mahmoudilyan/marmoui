'use client';

import React from 'react';
import { DatePicker, Calendar, MonthPicker, Label, Field, Button, Input } from '@marmoui/ui';
import type { DatePreset } from '@marmoui/ui';

type DateRange = { from: Date; to?: Date };

// --- Basic Single Date ---

export function DatePickerBasicPreview() {
	const [date, setDate] = React.useState<Date | undefined>();
	return (
		<div className="w-72">
			<Label className="mb-1 block">Select Date</Label>
			<DatePicker value={date} onChange={d => setDate(d as Date)} placeholder="Pick a date" />
		</div>
	);
}

// --- Trigger Types ---

export function DatePickerTriggerTypesPreview() {
	const [date1, setDate1] = React.useState<Date | undefined>();
	const [date2, setDate2] = React.useState<Date | undefined>();
	return (
		<div className="flex flex-col gap-6 w-72">
			<div>
				<Label className="mb-1 block">Button Trigger (Default)</Label>
				<DatePicker
					value={date1}
					onChange={d => setDate1(d as Date)}
					placeholder="Pick a date"
					triggerType="button"
				/>
			</div>
			<div>
				<Label className="mb-1 block">Input Trigger</Label>
				<DatePicker
					value={date2}
					onChange={d => setDate2(d as Date)}
					placeholder="Pick a date"
					triggerType="input"
				/>
			</div>
		</div>
	);
}

// --- With Presets (single) ---

export function DatePickerPresetsPreview() {
	const [date, setDate] = React.useState<Date | undefined>();
	return (
		<div className="w-72">
			<Label className="mb-1 block">Event Date</Label>
			<DatePicker
				value={date}
				onChange={d => setDate(d as Date)}
				placeholder="Select date"
				hasPresets
			/>
		</div>
	);
}

// --- Date Range ---

export function DatePickerRangePreview() {
	const [range, setRange] = React.useState<[Date, Date] | undefined>();
	return (
		<div className="w-80">
			<Label className="mb-1 block">Date Range</Label>
			<DatePicker
				value={range}
				onChange={d => setRange(d as [Date, Date])}
				placeholder="Select date range"
				isRange
			/>
		</div>
	);
}

// --- Range with Presets ---

export function DatePickerRangePresetsPreview() {
	const [range, setRange] = React.useState<[Date, Date] | undefined>();
	return (
		<div className="w-96">
			<Label className="mb-1 block">Report Period</Label>
			<DatePicker
				value={range}
				onChange={d => setRange(d as [Date, Date])}
				placeholder="Select period"
				isRange
				hasPresets
			/>
		</div>
	);
}

// --- Custom Presets ---

const customPresets: DatePreset[] = [
	{
		label: 'Last 7 Days',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setDate(start.getDate() - 6);
			start.setHours(0, 0, 0, 0);
			end.setHours(23, 59, 59, 999);
			return [start, end];
		},
	},
	{
		label: 'Last 30 Days',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setDate(start.getDate() - 29);
			start.setHours(0, 0, 0, 0);
			end.setHours(23, 59, 59, 999);
			return [start, end];
		},
	},
	{
		label: 'Last 90 Days',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setDate(start.getDate() - 89);
			start.setHours(0, 0, 0, 0);
			end.setHours(23, 59, 59, 999);
			return [start, end];
		},
	},
	{
		label: 'Last 12 Months',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setFullYear(start.getFullYear() - 1);
			start.setHours(0, 0, 0, 0);
			end.setHours(23, 59, 59, 999);
			return [start, end];
		},
	},
	{
		label: 'Year to Date',
		value: () => {
			const end = new Date();
			const start = new Date(end.getFullYear(), 0, 1);
			start.setHours(0, 0, 0, 0);
			end.setHours(23, 59, 59, 999);
			return [start, end];
		},
	},
	{ label: 'Custom', value: () => new Date() },
];

export function DatePickerCustomPresetsPreview() {
	const [range, setRange] = React.useState<[Date, Date] | undefined>();
	return (
		<div className="w-96">
			<Label className="mb-1 block">Analytics Period</Label>
			<DatePicker
				value={range}
				onChange={d => setRange(d as [Date, Date])}
				placeholder="Select period"
				isRange
				hasPresets
				presets={customPresets}
			/>
		</div>
	);
}

// --- Date Constraints ---

export function DatePickerConstraintsPreview() {
	const [date, setDate] = React.useState<Date | undefined>();
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

	return (
		<div className="w-72">
			<Label className="mb-1 block">Appointment Date</Label>
			<DatePicker
				value={date}
				onChange={d => setDate(d as Date)}
				placeholder="Select appointment"
				disabledDays={d => d < today}
				endMonth={nextMonth}
			/>
			<p className="text-xs text-muted-foreground mt-1">
				Only future dates within the next month are available
			</p>
		</div>
	);
}

// --- Custom Date Format ---

export function DatePickerFormatsPreview() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	return (
		<div className="flex flex-col gap-4 w-72">
			<div>
				<Label className="mb-1 block">Default (MMM dd, yyyy)</Label>
				<DatePicker
					value={date}
					onChange={d => setDate(d as Date)}
					dateFormat="MMM dd, yyyy"
					placeholder="Pick a date"
				/>
			</div>
			<div>
				<Label className="mb-1 block">Short (MM/dd/yyyy)</Label>
				<DatePicker
					value={date}
					onChange={d => setDate(d as Date)}
					dateFormat="MM/dd/yyyy"
					placeholder="Pick a date"
				/>
			</div>
			<div>
				<Label className="mb-1 block">Long (EEEE, MMMM do, yyyy)</Label>
				<DatePicker
					value={date}
					onChange={d => setDate(d as Date)}
					dateFormat="EEEE, MMMM do, yyyy"
					placeholder="Pick a date"
				/>
			</div>
		</div>
	);
}

// --- Disabled ---

export function DatePickerDisabledPreview() {
	return (
		<div className="flex flex-col gap-4 w-72">
			<div>
				<Label className="mb-1 block">Disabled (button trigger)</Label>
				<DatePicker value={new Date()} disabled placeholder="Cannot change" />
			</div>
			<div>
				<Label className="mb-1 block">Disabled (input trigger)</Label>
				<DatePicker value={new Date()} disabled triggerType="input" placeholder="Cannot change" />
			</div>
		</div>
	);
}

// --- Standalone Calendar ---

export function CalendarStandalonePreview() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

// --- Standalone Calendar Range ---

export function CalendarRangePreview() {
	const [range, setRange] = React.useState<DateRange | undefined>(undefined);
	return (
		<Calendar
			mode="range"
			selected={range}
			onSelect={r => setRange(r as DateRange)}
			numberOfMonths={2}
		/>
	);
}

// --- Month/Year Dropdown Caption ---

export function DatePickerDropdownPreview() {
	const [date, setDate] = React.useState<Date | undefined>();
	const startMonth = new Date(2020, 0, 1);
	const endMonth = new Date(2030, 11, 31);
	return (
		<div className="flex flex-col gap-6 w-72">
			<div>
				<Label className="mb-1 block">Month & Year Dropdown</Label>
				<DatePicker
					value={date}
					onChange={d => setDate(d as Date)}
					placeholder="Pick a date"
					captionLayout="dropdown"
					startMonth={startMonth}
					endMonth={endMonth}
				/>
			</div>
			<div>
				<Label className="mb-1 block">Month Dropdown Only</Label>
				<DatePicker
					value={date}
					onChange={d => setDate(d as Date)}
					placeholder="Pick a date"
					captionLayout="dropdown-months"
					startMonth={startMonth}
					endMonth={endMonth}
				/>
			</div>
			<div>
				<Label className="mb-1 block">Year Dropdown Only</Label>
				<DatePicker
					value={date}
					onChange={d => setDate(d as Date)}
					placeholder="Pick a date"
					captionLayout="dropdown-years"
					startMonth={startMonth}
					endMonth={endMonth}
				/>
			</div>
		</div>
	);
}

export function CalendarDropdownPreview() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const startMonth = new Date(2020, 0, 1);
	const endMonth = new Date(2030, 11, 31);
	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			captionLayout="dropdown"
			startMonth={startMonth}
			endMonth={endMonth}
		/>
	);
}

// --- With Time Picker ---

export function DatePickerTimePreview() {
	const [date, setDate] = React.useState<Date | undefined>();
	return (
		<div className="w-72">
			<Label className="mb-1 block">Date & Time</Label>
			<DatePicker
				value={date}
				onChange={d => setDate(d as Date)}
				placeholder="Pick date and time"
				showTime
				dateFormat="MMM dd, yyyy"
			/>
		</div>
	);
}

export function DatePickerTimeRangePreview() {
	const [range, setRange] = React.useState<[Date, Date] | undefined>();
	return (
		<div className="w-80">
			<Label className="mb-1 block">Date Range with Time</Label>
			<DatePicker
				value={range}
				onChange={d => setRange(d as [Date, Date])}
				placeholder="Select range with time"
				isRange
				showTime
			/>
		</div>
	);
}

export function DatePickerDropdownTimePreview() {
	const [date, setDate] = React.useState<Date | undefined>();
	const startMonth = new Date(2020, 0, 1);
	const endMonth = new Date(2030, 11, 31);
	return (
		<div className="w-72">
			<Label className="mb-1 block">Dropdown + Time</Label>
			<DatePicker
				value={date}
				onChange={d => setDate(d as Date)}
				placeholder="Pick date and time"
				captionLayout="dropdown"
				startMonth={startMonth}
				endMonth={endMonth}
				showTime
			/>
		</div>
	);
}

// --- MonthPicker ---

export function MonthPickerBasicPreview() {
	const [value, setValue] = React.useState<Date | undefined>(new Date());
	return (
		<div className="flex flex-col gap-2">
			<Label className="block">
				Selected:{' '}
				{value
					? `${value.toLocaleString('default', { month: 'long' })} ${value.getFullYear()}`
					: 'None'}
			</Label>
			<MonthPicker value={value} onChange={setValue} />
		</div>
	);
}

export function MonthPickerConstrainedPreview() {
	const [value, setValue] = React.useState<Date | undefined>(new Date());
	return (
		<div className="flex flex-col gap-2">
			<Label className="block">Years 2020 – 2030</Label>
			<MonthPicker value={value} onChange={setValue} minYear={2020} maxYear={2030} />
		</div>
	);
}

// --- In Form Context ---

export function DatePickerFormPreview() {
	const [eventData, setEventData] = React.useState<{
		title: string;
		dateRange: [Date, Date] | undefined;
	}>({ title: '', dateRange: undefined });

	return (
		<form
			className="w-96 p-6 border border-border rounded-lg space-y-4"
			onSubmit={e => e.preventDefault()}
		>
			<h3 className="text-lg font-semibold">Schedule Event</h3>

			<Field label="Event Title" required>
				<Input
					value={eventData.title}
					onChange={e => setEventData(prev => ({ ...prev, title: e.target.value }))}
					placeholder="Team Offsite Meeting"
				/>
			</Field>

			<Field label="Event Dates" required helperText="Select start and end dates">
				<DatePicker
					value={eventData.dateRange}
					onChange={d => setEventData(prev => ({ ...prev, dateRange: d as [Date, Date] }))}
					placeholder="Select date range"
					isRange
					hasPresets
				/>
			</Field>

			<Button type="submit" className="w-full">
				Schedule Event
			</Button>
		</form>
	);
}
