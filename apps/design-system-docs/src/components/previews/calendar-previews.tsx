// @ts-nocheck — DateRange type comes from react-day-picker which is a transitive dep
'use client';
import React from 'react';
import { Calendar } from '@marmoui/ui';
import type { DateRange } from 'react-day-picker';

export function CalendarSelectedPreview() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

export function CalendarRangePreview() {
	const [range, setRange] = React.useState<DateRange | undefined>({
		from: new Date(2026, 2, 10),
		to: new Date(2026, 2, 18),
	});

	return (
		<Calendar
			mode="range"
			selected={range}
			onSelect={setRange}
			numberOfMonths={2}
		/>
	);
}

export function CalendarDisabledPreview() {
	return <Calendar mode="single" disabled={{ before: new Date() }} />;
}

export function CalendarMultiMonthPreview() {
	return <Calendar mode="single" numberOfMonths={2} />;
}
