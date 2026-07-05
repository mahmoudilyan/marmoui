'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarBlank } from '@phosphor-icons/react';
import type { DateRange, DayPickerProps } from 'react-day-picker';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Input } from './input';
import { Card } from './card';
import { cn } from '../lib/utils';

// ---------- Time column constants ----------
const HOURS_12 = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES_60 = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const PERIODS = ['AM', 'PM'] as const;

// ---------- Scrollable time column ----------
function TimeColumn({
	items,
	value,
	onChange,
	withDivider = false,
}: {
	items: readonly string[];
	value: string;
	onChange: (v: string) => void;
	withDivider?: boolean;
}) {
	const containerRef = React.useRef<HTMLDivElement>(null);

	// Scroll to selected value whenever it changes
	React.useEffect(() => {
		const idx = items.indexOf(value);
		if (containerRef.current && idx >= 0) {
			containerRef.current.scrollTop = idx * 36;
		}
	}, [value, items]);

	return (
		<div
			className={cn(
				'flex h-full shrink-0 overflow-hidden',
				withDivider && 'border-r border-border-secondary'
			)}
		>
			<div
				ref={containerRef}
				className="flex flex-col overflow-y-auto h-full px-2 py-1"
				// Hide scrollbar cross-browser
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{items.map(item => (
					<button
						key={item}
						type="button"
						onClick={() => onChange(item)}
						className={cn(
							'flex h-9 w-9 shrink-0 items-center justify-center rounded-md body-sm transition-colors',
							value === item
								? 'bg-primary-solid text-primary-contrast font-medium'
								: 'text-ink hover:bg-secondary'
						)}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	);
}

export interface DatePreset {
	label: string;
	value: Date | [Date, Date] | (() => Date | [Date, Date]);
}

export interface DatePickerProps {
	/**
	 * Selected date value
	 */
	value?: Date | [Date, Date];
	/**
	 * Callback when date selection changes
	 */
	onChange?: (date: Date | [Date, Date] | undefined) => void;
	/**
	 * Whether to show preset date options
	 */
	hasPresets?: boolean;
	/**
	 * Custom preset options to display
	 */
	presets?: DatePreset[];
	/**
	 * Input placeholder
	 */
	placeholder?: string;
	/**
	 * Allow range selection
	 */
	isRange?: boolean;
	/**
	 * Whether the input is disabled
	 */
	disabled?: boolean;
	/**
	 * Format string for date display
	 */
	dateFormat?: string;
	/**
	 * Matcher to disable specific dates
	 */
	disabledDays?: (date: Date) => boolean;
	/**
	 * Earliest date that can be displayed or selected
	 */
	startMonth?: Date;
	/**
	 * Latest date that can be displayed or selected
	 */
	endMonth?: Date;
	/**
	 * Callback when the popover is closed
	 */
	onClose?: () => void;
	/**
	 * Additional className for the trigger
	 */
	className?: string;
	/**
	 * Trigger type - 'button' or 'input'
	 * @default 'button'
	 */
	triggerType?: 'button' | 'input';
	/**
	 * Caption layout for the calendar header
	 * - 'label': static month/year label (default)
	 * - 'dropdown': month and year dropdowns
	 * - 'dropdown-months': month dropdown only
	 * - 'dropdown-years': year dropdown only
	 * - 'buttons': navigation buttons (same as label)
	 * Note: dropdown layouts require startMonth and endMonth to define the range.
	 * @default 'label'
	 */
	captionLayout?: DayPickerProps['captionLayout'];
	/**
	 * Show a time picker beside the calendar. Only applies to single-date mode.
	 * @default false
	 */
	showTime?: boolean;
}

// Create presets based on isRange
const createPresets = (isRange: boolean): DatePreset[] => [
	{
		label: 'Today',
		value: () => {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			if (isRange) {
				const endOfDay = new Date(today);
				endOfDay.setHours(23, 59, 59, 999);
				return [today, endOfDay];
			}

			return today;
		},
	},
	{
		label: 'Yesterday',
		value: () => {
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			yesterday.setHours(0, 0, 0, 0);

			if (isRange) {
				const endOfYesterday = new Date(yesterday);
				endOfYesterday.setHours(23, 59, 59, 999);
				return [yesterday, endOfYesterday];
			}

			return yesterday;
		},
	},
	{
		label: 'This Week',
		value: () => {
			const now = new Date();
			const day = now.getDay();
			const startDiff = day === 0 ? -6 : 1 - day;

			const start = new Date(now);
			start.setDate(now.getDate() + startDiff);
			start.setHours(0, 0, 0, 0);

			const end = new Date(start);
			end.setDate(start.getDate() + 6);
			end.setHours(23, 59, 59, 999);

			return [start, end];
		},
	},
	{
		label: 'Last Week',
		value: () => {
			const now = new Date();
			const day = now.getDay();
			const startDiff = day === 0 ? -13 : -6 - day + 1;

			const start = new Date(now);
			start.setDate(now.getDate() + startDiff);
			start.setHours(0, 0, 0, 0);

			const end = new Date(start);
			end.setDate(start.getDate() + 6);
			end.setHours(23, 59, 59, 999);

			return [start, end];
		},
	},
	{
		label: 'This Month',
		value: () => {
			const now = new Date();

			const start = new Date(now.getFullYear(), now.getMonth(), 1);
			start.setHours(0, 0, 0, 0);

			const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
			end.setHours(23, 59, 59, 999);

			return [start, end];
		},
	},
	{
		label: 'Last Month',
		value: () => {
			const now = new Date();

			const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			start.setHours(0, 0, 0, 0);

			const end = new Date(now.getFullYear(), now.getMonth(), 0);
			end.setHours(23, 59, 59, 999);

			return [start, end];
		},
	},
	{
		label: 'Custom',
		value: () => new Date(),
	},
];

/**
 * A date picker component with input trigger and popover calendar
 */
export function DatePicker({
	value,
	onChange,
	hasPresets = false,
	presets: customPresets,
	placeholder = 'Select date',
	isRange = false,
	disabled = false,
	dateFormat = 'MMM dd, yyyy',
	disabledDays,
	startMonth,
	endMonth,
	onClose,
	className,
	triggerType = 'button',
	captionLayout,
	showTime = false,
}: DatePickerProps) {
	const presets = customPresets || createPresets(isRange);

	const [isOpen, setIsOpen] = React.useState(false);
	const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
		Array.isArray(value) ? value[0] : value
	);
	const [selectedEndDate, setSelectedEndDate] = React.useState<Date | undefined>(
		Array.isArray(value) ? value[1] : undefined
	);
	const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null);
	const inputRef = React.useRef<HTMLButtonElement | HTMLInputElement>(null);

	// Time state (12-hour format)
	const [hours, setHours] = React.useState(() => {
		const d = Array.isArray(value) ? value[0] : value;
		if (!d) return '12';
		const h = d.getHours() % 12;
		return String(h === 0 ? 12 : h).padStart(2, '0');
	});
	const [minutes, setMinutes] = React.useState(() => {
		const d = Array.isArray(value) ? value[0] : value;
		return d ? String(d.getMinutes()).padStart(2, '0') : '00';
	});
	const [period, setPeriod] = React.useState<'AM' | 'PM'>(() => {
		const d = Array.isArray(value) ? value[0] : value;
		if (!d) return 'AM';
		return d.getHours() >= 12 ? 'PM' : 'AM';
	});

	React.useEffect(() => {
		if (value) {
			if (Array.isArray(value)) {
				setSelectedDate(value[0]);
				setSelectedEndDate(value[1]);
			} else {
				setSelectedDate(value);
				setSelectedEndDate(undefined);
			}
		} else {
			// Clear dates when value is undefined
			setSelectedDate(undefined);
			setSelectedEndDate(undefined);
		}
	}, [value]);

	const buildDateWithTime = (date: Date): Date => {
		if (!showTime) return date;
		const result = new Date(date);
		let h = parseInt(hours, 10);
		const m = parseInt(minutes, 10);
		if (period === 'PM' && h < 12) h += 12;
		if (period === 'AM' && h === 12) h = 0;
		result.setHours(h, m, 0, 0);
		return result;
	};

	// Format display value
	const displayValue = React.useMemo(() => {
		if (!selectedDate) return '';
		const dateStr = format(selectedDate, dateFormat);
		const timeStr = showTime ? ` ${hours}:${minutes} ${period}` : '';
		if (isRange && selectedEndDate) {
			return `${dateStr}${timeStr} – ${format(selectedEndDate, dateFormat)}${timeStr}`;
		}
		return `${dateStr}${timeStr}`;
	}, [selectedDate, selectedEndDate, dateFormat, isRange, showTime, hours, minutes, period]);

	const handleSingleDaySelect = (day: Date | undefined) => {
		if (!day) return;
		setSelectedPreset('Custom');
		setSelectedDate(day);
	};

	const handleRangeDaySelect = (range: DateRange | undefined) => {
		if (range?.from) {
			setSelectedPreset('Custom');
			setSelectedDate(range.from);
			setSelectedEndDate(range.to);
		}
	};

	const handlePresetSelect = (preset: DatePreset) => {
		setSelectedPreset(preset.label);

		if (preset.label === 'Custom') {
			return;
		}

		const presetValue = typeof preset.value === 'function' ? preset.value() : preset.value;

		if (Array.isArray(presetValue)) {
			const startDate = new Date(presetValue[0]);
			const endDate = presetValue[1] ? new Date(presetValue[1]) : undefined;

			setSelectedDate(startDate);
			setSelectedEndDate(endDate);
		} else {
			const date = new Date(presetValue);
			setSelectedDate(date);
			setSelectedEndDate(undefined);
		}
	};

	const handleApply = () => {
		if (!onChange || !selectedDate) return;

		if (isRange && selectedEndDate) {
			onChange([buildDateWithTime(selectedDate), buildDateWithTime(selectedEndDate)]);
		} else if (!isRange) {
			onChange(buildDateWithTime(selectedDate));
		}

		setIsOpen(false);
		onClose?.();
	};

	const handleCancel = () => {
		// Reset to original value
		if (value) {
			if (Array.isArray(value)) {
				setSelectedDate(value[0]);
				setSelectedEndDate(value[1]);
			} else {
				setSelectedDate(value);
			}
		} else {
			setSelectedDate(undefined);
			setSelectedEndDate(undefined);
		}
		setIsOpen(false);
		onClose?.();
	};

	const handleClear = () => {
		setSelectedDate(undefined);
		setSelectedEndDate(undefined);
		onChange?.(undefined);
	};

	return (
		<Popover
			open={isOpen}
			onOpenChange={open => {
				setIsOpen(open);
				if (!open) {
					onClose?.();
				}
				// Keep trigger focused when popover opens
				if (open && inputRef.current) {
					setTimeout(() => {
						inputRef.current?.focus();
					}, 0);
				}
			}}
		>
			<PopoverTrigger asChild>
				{triggerType === 'input' ? (
					<div className="relative">
						<Input
							ref={inputRef as React.RefObject<HTMLInputElement>}
							value={displayValue}
							placeholder={placeholder}
							readOnly
							disabled={disabled}
							className={cn('cursor-pointer pr-20', className)}
							startAdornment={<CalendarBlank className="h-4 w-4" />}
							onClick={() => !disabled && setIsOpen(true)}
						/>
					</div>
				) : (
					<Button
						ref={inputRef as React.RefObject<HTMLButtonElement>}
						variant="secondary"
						disabled={disabled}
						className={cn(
							'w-full justify-start text-left font-normal',
							!displayValue && 'text-ink-light',
							className
						)}
						leftIcon={<CalendarBlank />}
					>
						{displayValue || placeholder}
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0"
				align="start"
				onOpenAutoFocus={e => {
					// Prevent the popover from stealing focus
					e.preventDefault();
					inputRef.current?.focus();
				}}
			>
			<Card className="border-0 shadow-none">
				<div className="flex flex-col">
					<div className="flex">
						{hasPresets && (
							<div className="w-48 border-r border-border-secondary bg-panel p-3 rounded-s-xl">
								<div className="flex flex-col gap-1">
									{presets.map((preset, index) => (
										<Button
											key={index}
											variant="ghost"
											size="sm"
											className={cn('justify-start font-normal')}
											onClick={() => handlePresetSelect(preset)}
											data-active={selectedPreset === preset.label}
										>
											{preset.label}
										</Button>
									))}
								</div>
							</div>
						)}
					{/* Calendar */}
					{isRange ? (
						<Calendar
							mode="range"
							selected={{ from: selectedDate, to: selectedEndDate }}
							onSelect={handleRangeDaySelect}
							numberOfMonths={2}
							disabled={disabledDays}
							startMonth={startMonth}
							endMonth={endMonth}
							captionLayout={captionLayout}
						/>
					) : (
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={handleSingleDaySelect}
							disabled={disabledDays}
							startMonth={startMonth}
							endMonth={endMonth}
							captionLayout={captionLayout}
						/>
					)}
					{/* Time panel — single-date only, fixed height so columns scroll */}
					{showTime && !isRange && (
						<div className="flex flex-col border-l border-border-secondary shrink-0 h-[304px]">
							<div className="px-3 py-2 shrink-0 border-b border-border-secondary">
								<span className="body-xs text-ink-dark">
									Time: {hours}:{minutes} {period}
								</span>
							</div>
							<div className="flex flex-1 min-h-0">
								<TimeColumn
									items={HOURS_12}
									value={hours}
									onChange={setHours}
									withDivider
								/>
								<TimeColumn
									items={MINUTES_60}
									value={minutes}
									onChange={setMinutes}
									withDivider
								/>
								<TimeColumn
									items={PERIODS}
									value={period}
									onChange={v => setPeriod(v as 'AM' | 'PM')}
								/>
							</div>
						</div>
					)}
					</div>
					{/* Footer */}
					<div className="flex items-center justify-end gap-2 border-t border-border-secondary px-4 py-3">
						<Button variant="ghost" size="sm" onClick={handleCancel}>
							Cancel
						</Button>
						<Button
							size="sm"
							onClick={handleApply}
							disabled={!selectedDate || (isRange && !selectedEndDate)}
						>
							Apply
						</Button>
					</div>
				</div>
			</Card>
			</PopoverContent>
		</Popover>
	);
}

DatePicker.displayName = 'DatePicker';

export default DatePicker;
