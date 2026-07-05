'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { MagnifyingGlass, Check, CaretDown } from '@phosphor-icons/react';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Tag } from './tag';

type DefaultItemType = { label: string; value: string; description?: string };

/* ---------------------------------- Types --------------------------------- */

interface SelectSearchableBaseProps<T> {
	items: T[];
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	labelKey?: keyof T;
	valueKey?: keyof T;
	descriptionKey?: keyof T;
	className?: string;
	disabled?: boolean;
	maxNumber?: number;
	/** 'check' = checkmark on the right (default). 'checkbox' = checkbox on the left. */
	indicator?: 'check' | 'checkbox';
}

interface SelectSearchableSingleProps<T> extends SelectSearchableBaseProps<T> {
	multiple?: false;
	value?: string;
	onChange?: (value: string) => void;
	maxTags?: never;
}

interface SelectSearchableMultipleProps<T> extends SelectSearchableBaseProps<T> {
	multiple: true;
	value?: string[];
	onChange?: (value: string[]) => void;
	/** Max visible tags in the trigger. 0 = show all (default). */
	maxTags?: number;
}

type SelectSearchableProps<T> = SelectSearchableSingleProps<T> | SelectSearchableMultipleProps<T>;

interface SelectSearchableComponent {
	<T extends object = DefaultItemType>(
		props: SelectSearchableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
	): React.ReactElement;
	displayName?: string;
}

/* -------------------------------- Component ------------------------------- */

export const SelectSearchable: SelectSearchableComponent = React.forwardRef(
	function SelectSearchable<T extends object = DefaultItemType>(
		props: SelectSearchableProps<T>,
		ref: React.ForwardedRef<HTMLDivElement>
	) {
		const {
			items,
			placeholder = 'Select...',
			searchPlaceholder = 'Search...',
			emptyMessage = 'No results found',
			labelKey = 'label' as keyof T,
			valueKey = 'value' as keyof T,
			descriptionKey = 'description' as keyof T,
			className,
			disabled,
			maxNumber,
			indicator = 'check',
		} = props;

		const isMultiple = props.multiple === true;
		const maxTags = isMultiple ? ((props as SelectSearchableMultipleProps<T>).maxTags ?? 0) : 0;

		const [searchQuery, setSearchQuery] = React.useState('');
		const [open, setOpen] = React.useState(false);
		const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
		const triggerRef = React.useRef<HTMLDivElement>(null);
		const inputRef = React.useRef<HTMLInputElement>(null);
		const listRef = React.useRef<HTMLDivElement>(null);

		// Merge refs
		const mergedRef = React.useCallback(
			(node: HTMLDivElement | null) => {
				(triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
				if (typeof ref === 'function') ref(node);
				else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
			},
			[ref]
		);

		// Normalize value to array
		const valueArray = React.useMemo(() => {
			if (isMultiple) {
				const val = (props as SelectSearchableMultipleProps<T>).value;
				return val ?? [];
			}
			const val = (props as SelectSearchableSingleProps<T>).value;
			return val ? [val] : [];
		}, [isMultiple, props]);

		const filteredItems = React.useMemo(() => {
			if (!searchQuery) return items;
			return items.filter(item =>
				String(item[labelKey]).toLowerCase().includes(searchQuery.toLowerCase())
			);
		}, [items, searchQuery, labelKey]);

		React.useEffect(() => {
			if (open) {
				setSearchQuery('');
				setHighlightedIndex(-1);
				setTimeout(() => inputRef.current?.focus(), 0);
			}
		}, [open]);

		const getLabel = React.useCallback(
			(itemValue: string) => {
				const item = items.find(i => String(i[valueKey]) === itemValue);
				return item ? String(item[labelKey]) : itemValue;
			},
			[items, valueKey, labelKey]
		);

		const handleSelect = React.useCallback(
			(itemValue: string) => {
				if (isMultiple) {
					const multiProps = props as SelectSearchableMultipleProps<T>;
					const current = multiProps.value ?? [];
					if (current.includes(itemValue)) {
						multiProps.onChange?.(current.filter(v => v !== itemValue));
					} else {
						// Enforce maxNumber
						if (maxNumber && current.length >= maxNumber) return;
						multiProps.onChange?.([...current, itemValue]);
					}
				} else {
					const singleProps = props as SelectSearchableSingleProps<T>;
					singleProps.onChange?.(itemValue);
					setOpen(false);
				}
			},
			[isMultiple, props, maxNumber]
		);

		const handleRemoveTag = React.useCallback(
			(itemValue: string) => {
				if (isMultiple) {
					const multiProps = props as SelectSearchableMultipleProps<T>;
					const current = multiProps.value ?? [];
					multiProps.onChange?.(current.filter(v => v !== itemValue));
				}
			},
			[isMultiple, props]
		);

		const handleKeyDown = React.useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === 'ArrowDown') {
					e.preventDefault();
					setHighlightedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
				} else if (e.key === 'ArrowUp') {
					e.preventDefault();
					setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
				} else if (e.key === 'Enter' && highlightedIndex >= 0) {
					e.preventDefault();
					const item = filteredItems[highlightedIndex];
					if (item) handleSelect(String(item[valueKey]));
				} else if (e.key === 'Escape') {
					setOpen(false);
				}
			},
			[filteredItems, highlightedIndex, handleSelect, valueKey]
		);

		React.useEffect(() => {
			if (highlightedIndex >= 0 && listRef.current) {
				const el = listRef.current.querySelectorAll('[data-item]');
				el[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
			}
		}, [highlightedIndex]);

		/* ------------------------------ Trigger content ----------------------------- */

		const renderTriggerContent = () => {
			if (isMultiple) {
				const current = (props as SelectSearchableMultipleProps<T>).value ?? [];

				if (current.length === 0) {
					return <span className="text-ink-muted">{placeholder}</span>;
				}

				const showAll = maxTags === 0;
				const visible = showAll ? current : current.slice(0, maxTags);
				const overflow = showAll ? 0 : current.length - maxTags;

				return (
					<div className="flex flex-wrap items-center gap-1">
						{visible.map(val => (
							<Tag
								key={val}
								size="sm"
								closable
								onClose={() => handleRemoveTag(val)}
								className="cursor-default [&_button]:cursor-pointer"
							>
								{getLabel(val)}
							</Tag>
						))}
						{overflow > 0 && <span className="text-xs text-ink-muted pl-1">+{overflow} more</span>}
					</div>
				);
			}

			const singleVal = (props as SelectSearchableSingleProps<T>).value;
			if (!singleVal) {
				return <span className="text-ink-muted">{placeholder}</span>;
			}
			return <span className="truncate">{getLabel(singleVal)}</span>;
		};

		const atMax = isMultiple && maxNumber ? valueArray.length >= maxNumber : false;

		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div
						ref={mergedRef}
						role="button"
						tabIndex={disabled ? -1 : 0}
						aria-expanded={open}
						aria-haspopup="listbox"
						aria-disabled={disabled || undefined}
						onClick={() => !disabled && setOpen(!open)}
						onKeyDown={e => {
							if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
								e.preventDefault();
								setOpen(!open);
							}
						}}
						className={cn(
							'flex w-full min-h-9 items-center gap-2 rounded-md border bg-panel px-3 py-1 text-sm text-left cursor-pointer transition-[border-color,box-shadow] outline-none',
							'border-border-input',
							'hover:border-border-hover',
							'focus-visible:border-primary-solid focus-visible:ring-[2px] focus-visible:ring-primary-bright',
							disabled && 'cursor-not-allowed opacity-50 pointer-events-none',
							open && 'border-primary-solid ring-[2px] ring-primary-bright',
							className
						)}
					>
						<div className="flex-1 min-w-0">{renderTriggerContent()}</div>
						<CaretDown
							className={cn('size-4 shrink-0 text-icon transition-transform', open && 'rotate-180')}
						/>
					</div>
				</PopoverTrigger>
				<PopoverContent
					className="p-0 w-[var(--radix-popover-trigger-width)]"
					align="start"
					onKeyDown={handleKeyDown}
				>
					<div className="p-2 border-b border-border-secondary">
						<div className="relative">
							<MagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-icon" />
							<Input
								ref={inputRef}
								placeholder={searchPlaceholder}
								value={searchQuery}
								onChange={e => {
									setSearchQuery(e.target.value);
									setHighlightedIndex(0);
								}}
								className="pl-8 h-8 border-none shadow-none focus-visible:ring-0"
							/>
						</div>
					</div>
					{atMax && (
						<div className="px-3 py-1.5 text-xs text-ink-muted border-b border-border-secondary">
							Maximum of {maxNumber} items selected
						</div>
					)}
					<div ref={listRef} role="listbox" className="max-h-60 overflow-y-auto py-1">
						{filteredItems.length === 0 ? (
							<div className="px-3 py-6 text-center text-sm text-ink-muted">{emptyMessage}</div>
						) : (
							filteredItems.map((item, index) => {
								const itemValue = String(item[valueKey]);
								const itemLabel = String(item[labelKey]);
								const description = item[descriptionKey] ? String(item[descriptionKey]) : undefined;
								const isSelected = valueArray.includes(itemValue);
								const isHighlighted = index === highlightedIndex;
								const isDisabledItem = atMax && !isSelected;

								return (
									<div
										key={itemValue}
										data-item
										role="option"
										aria-selected={isSelected}
										aria-disabled={isDisabledItem || undefined}
										className={cn(
											'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer outline-none transition-colors',
											isHighlighted && 'bg-bg',
											isSelected && !isHighlighted && 'bg-bg/50',
											isDisabledItem && 'opacity-40 cursor-not-allowed'
										)}
										onClick={() => !isDisabledItem && handleSelect(itemValue)}
										onMouseEnter={() => setHighlightedIndex(index)}
									>
										{indicator === 'checkbox' && (
											<div
												className={cn(
													'flex size-4 shrink-0 items-center justify-center rounded-xs border transition-colors',
													isSelected
														? 'bg-primary-solid border-primary-solid'
														: 'border-border-input'
												)}
											>
												{isSelected && (
													<Check className="size-3 text-primary-contrast" weight="regular" />
												)}
											</div>
										)}
										<div className="flex-1 min-w-0">
											<div className="truncate">{itemLabel}</div>
											{description && (
												<div className="text-xs text-ink-light truncate">{description}</div>
											)}
										</div>
										{indicator === 'check' && isSelected && (
											<Check className="size-4 shrink-0 text-primary-solid" weight="fill" />
										)}
									</div>
								);
							})
						)}
					</div>
				</PopoverContent>
			</Popover>
		);
	}
) as SelectSearchableComponent;

SelectSearchable.displayName = 'SelectSearchable';
