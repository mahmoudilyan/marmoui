'use client';

import * as React from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export interface MonthPickerProps {
	/**
	 * Currently selected date (month + year).
	 * Only the month and year components are considered.
	 */
	value?: Date;
	/** Called with a Date set to the 1st of the selected month */
	onChange?: (date: Date) => void;
	/** Minimum selectable year */
	minYear?: number;
	/** Maximum selectable year */
	maxYear?: number;
	className?: string;
}

/**
 * A compact month/year picker with year navigation and a 3×4 month grid.
 */
export function MonthPicker({ value, onChange, minYear, maxYear, className }: MonthPickerProps) {
	const today = new Date();
	const [year, setYear] = React.useState(value?.getFullYear() ?? today.getFullYear());

	const selectedMonth = value?.getMonth();
	const selectedYear = value?.getFullYear();

	const prevDisabled = minYear !== undefined && year <= minYear;
	const nextDisabled = maxYear !== undefined && year >= maxYear;

	const handleMonthClick = (monthIdx: number) => {
		onChange?.(new Date(year, monthIdx, 1));
	};

	return (
		<div
			className={cn(
				'bg-panel border border-border rounded-lg overflow-hidden w-[268px]',
				className
			)}
		>
			{/* Year navigation */}
			<div className="flex items-center justify-between px-4 py-3">
				<span className="body-sm font-medium text-ink-dark">{year}</span>
				<div className="flex items-center gap-0">
					<button
						type="button"
						onClick={() => !prevDisabled && setYear(y => y - 1)}
						disabled={prevDisabled}
						className={cn(
							'inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors',
							prevDisabled
								? 'opacity-40 pointer-events-none'
								: 'hover:bg-secondary cursor-pointer'
						)}
						aria-label="Previous year"
					>
						<CaretLeft className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => !nextDisabled && setYear(y => y + 1)}
						disabled={nextDisabled}
						className={cn(
							'inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors',
							nextDisabled
								? 'opacity-40 pointer-events-none'
								: 'hover:bg-secondary cursor-pointer'
						)}
						aria-label="Next year"
					>
						<CaretRight className="h-4 w-4" />
					</button>
				</div>
			</div>

			{/* 3×4 month grid */}
			<div className="grid grid-cols-3 gap-1 px-2 pb-3">
				{MONTHS.map((label, idx) => {
					const isSelected = selectedMonth === idx && selectedYear === year;
					const isToday = today.getMonth() === idx && today.getFullYear() === year && !isSelected;
					return (
						<button
							key={label}
							type="button"
							onClick={() => handleMonthClick(idx)}
							className={cn(
								'h-9 rounded-md body-sm font-normal transition-colors text-center',
								isSelected && 'bg-primary-solid text-primary-contrast font-medium',
								isToday && !isSelected && 'bg-red-100 text-ink-dark',
								!isSelected && !isToday && 'text-ink hover:bg-secondary'
							)}
						>
							{label}
						</button>
					);
				})}
			</div>
		</div>
	);
}

MonthPicker.displayName = 'MonthPicker';
