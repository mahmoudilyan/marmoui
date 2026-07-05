'use client';

import * as React from 'react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

export type CalendarProps = DayPickerProps;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-4 relative', className)}
			classNames={{
				months: 'flex flex-col sm:flex-row gap-4',
				month: 'gap-4',
			month_caption: 'flex justify-center relative items-center h-8 px-9',
			caption_label: 'body-sm font-medium text-ink-dark [&[aria-hidden=true]]:hidden',
			dropdowns: 'flex gap-1.5 items-center',
			dropdown_root: 'relative',
			dropdown: cn(
				'appearance-none cursor-pointer rounded-md',
				'h-8 px-2 body-sm font-medium text-ink-dark',
				'hover:bg-secondary transition-colors',
				'focus:outline-none'
			),
				nav: 'contents',
				button_previous: cn(
					'cursor-pointer absolute left-4 top-4 inline-flex items-center justify-center',
					'h-8 w-8 rounded-md bg-panel z-1',
					'hover:bg-bg hover:text-ink-dark hover:cursor-pointer',
					'disabled:pointer-events-none disabled:opacity-50'
				),
				button_next: cn(
					'cursor-pointer absolute right-4 top-4 inline-flex items-center justify-center',
					'h-8 w-8 rounded-md bg-panel z-1',
					'hover:bg-bg hover:text-ink-dark hover:cursor-pointer',
					'disabled:pointer-events-none disabled:opacity-50'
				),
				month_grid: 'w-full border-collapse mt-2',
				weekdays: 'flex',
				weekday: 'text-ink-light rounded-md w-9 font-medium text-[13px] py-2',
				week: 'flex w-full mt-0.5',
				day: cn('relative p-0 text-center body-sm', 'focus-within:relative focus-within:z-20'),
				today:
					'bg-red-100 text-ink-dark font-medium rounded-full data-[selected=true]:bg-primary-solid data-[selected=true]:text-primary-contrast',
				day_button: cn(
					'inline-flex items-center justify-center cursor-pointer',
					'h-9 w-9 rounded-md',
					'body-sm font-normal',
					'hover:ring-1 hover:ring-primary-solid-hover ring-inset',
					//'hover:bg-muted hover:text-ink-dark',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-bright',
					'disabled:pointer-events-none disabled:opacity-50',
					'transition-colors'
				),
				range_start: cn(
					'day-range-start rounded-l-md bg-primary-solid text-white hover:ring-primary-100',
					'rounded-e-none'
				),
				range_end:
					'day-range-end rounded-r-md bg-primary-solid text-white hover:ring-primary-100 rounded-s-none',
				selected: cn(
					'rounded-md bg-primary-solid text-primary-contrast',
					'[data-today=true]:bg-primary-solid'
				),
				outside: 'text-ink-muted opacity-50',
				disabled: 'text-ink-muted opacity-50',
				range_middle: '!bg-primary-100 !text-ink-dark rounded-none',
				hidden: 'invisible',
				...classNames,
			}}
			components={{
				Chevron: ({ orientation }) => {
				const Icon = orientation === 'left' ? CaretLeft : CaretRight;
				return <Icon className="h-4 w-4" />;
				},
			}}
			{...props}
		/>
	);
}

Calendar.displayName = 'Calendar';

export { Calendar };
