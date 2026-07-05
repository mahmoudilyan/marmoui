'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { MagnifyingGlass, Check, CaretDown } from '@phosphor-icons/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';

type DefaultItemType = { label: string; value: string; description?: string };

interface SelectCheckboxSearchableProps<T> {
	items: T[];
	placeholder?: string;
	searchPlaceholder?: string;
	onChange?: (value: string[]) => void;
	value?: string[];
	labelKey?: keyof T;
	valueKey?: keyof T;
	descriptionKey?: keyof T;
	className?: string;
}

interface SelectCheckboxSearchableComponent {
	<T extends object = DefaultItemType>(
		props: SelectCheckboxSearchableProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
	): React.ReactElement;
	displayName?: string;
}

export const SelectCheckboxSearchable: SelectCheckboxSearchableComponent = React.forwardRef(
	function SelectCheckboxSearchable<T extends object = DefaultItemType>(
		{
			items,
			placeholder = 'Select items...',
			searchPlaceholder = 'Search...',
			onChange,
			value = [],
			labelKey = 'label' as keyof T,
			valueKey = 'value' as keyof T,
			descriptionKey = 'description' as keyof T,
			className,
		}: SelectCheckboxSearchableProps<T>,
		ref: React.ForwardedRef<HTMLButtonElement>
	) {
		const [searchQuery, setSearchQuery] = React.useState('');
		const [open, setOpen] = React.useState(false);

		// Convert value to array format for internal use - memoized to improve performance
		const valueArray = React.useMemo(() => {
			if (!value) return [];
			return Array.isArray(value) ? value : [];
		}, [value]);

		// Memoize the filtered items to improve performance
		const filteredItems = React.useMemo(() => {
			if (!searchQuery) return items;
			return items.filter(item =>
				String(item[labelKey]).toLowerCase().includes(searchQuery.toLowerCase())
			);
		}, [items, searchQuery, labelKey]);

		// Memoize the handler to prevent re-creating it on each render
		const handleItemToggle = React.useCallback(
			(itemValue: string, e: React.MouseEvent) => {
				e.preventDefault();
				e.stopPropagation();

				const newValue = valueArray.includes(itemValue)
					? valueArray.filter(v => v !== itemValue)
					: [...valueArray, itemValue];

				onChange?.(newValue);
			},
			[valueArray, onChange]
		);

		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						variant="ghost"
						role="combobox"
						aria-expanded={open}
						className={cn(
							'flex w-full min-h-9 items-center justify-between gap-2 rounded-md border bg-panel px-3 py-1 text-sm font-normal transition-[border-color,box-shadow] outline-none border-border-input hover:border-border-hover hover:bg-panel focus-visible:border-primary-solid focus-visible:ring-[2px] focus-visible:ring-primary-bright',
							className
						)}
					>
						<span className="truncate">
							{valueArray.length === 0 ? placeholder : `${valueArray.length} items selected`}
						</span>
						<CaretDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0 w-full">
					<div className="p-1 border-b border-border-secondary">
						<div className="relative">
							<MagnifyingGlass className="absolute left-2 top-2.5 h-4 w-4 text-ink-light" />
							<Input
								placeholder={searchPlaceholder}
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className="pl-8 focus-visible:ring-0 border-none"
							/>
						</div>
					</div>
					<div className="max-h-60 overflow-auto">
						{filteredItems.map(item => {
							const itemValue = String(item[valueKey]);
							const isSelected = valueArray.includes(itemValue);
							const description = item[descriptionKey] ? String(item[descriptionKey]) : undefined;

							return (
								<div
									key={itemValue}
									className={cn(
										'flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-bg transition-colors',
										isSelected && 'bg-bg'
									)}
									onClick={e => handleItemToggle(itemValue, e)}
								>
									<div
										className={cn(
											'h-4 w-4 border border-primary rounded-sm flex items-center justify-center',
											isSelected
												? 'bg-primary-solid text-primary-contrast border-0'
												: 'bg-background'
										)}
									>
										{isSelected && <Check className="h-3 w-3" weight="regular" />}
									</div>
									<div className="flex-1 min-w-0">
										<div className="font-medium truncate">{String(item[labelKey])}</div>
										{description && (
											<div className="text-xs text-muted-foreground truncate">{description}</div>
										)}
									</div>
								</div>
							);
						})}

						{filteredItems.length === 0 && (
							<div className="p-4 text-center text-muted-foreground">No items found</div>
						)}
					</div>
				</PopoverContent>
			</Popover>
		);
	}
) as SelectCheckboxSearchableComponent;

SelectCheckboxSearchable.displayName = 'SelectCheckboxSearchable';
