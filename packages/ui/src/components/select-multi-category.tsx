'use client';

import * as React from 'react';
import { CaretDown, CaretRight, Check, MagnifyingGlass, X } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Input } from './input';
import { Button } from './button';
import { Text } from './text';
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';
import { Badge } from './badge';

// Type definitions
export interface CategoryItem {
	value: string;
	label: string;
	description?: string;
}

export interface Category {
	name: string;
	items: CategoryItem[];
}

export interface SelectMultiCategoryProps extends Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'onChange'
> {
	categories: Category[];
	value?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	disabled?: boolean;
	isLoading?: boolean;
}

// Helper functions
const formatSelectedValues = (selectedValues: string[], categories: Category[]): string => {
	if (selectedValues.length === 0) return '';

	// Group selected values by category
	const selectedByCategory = categories.reduce<Record<string, number>>((acc, category) => {
		const count = category.items.filter(item =>
			selectedValues.includes(`${category.name}:${item.value}`)
		).length;

		if (count > 0) {
			acc[category.name] = count;
		}

		return acc;
	}, {});

	// Format the display string
	const displayParts = Object.entries(selectedByCategory).map(([category, count]) => {
		const categoryLabel = category.toLowerCase();
		return count === 1 ? `1 ${categoryLabel}` : `${count} ${categoryLabel}s`;
	});

	// Special case for a single item selected
	if (selectedValues.length === 1) {
		const [fullValue] = selectedValues;
		const [categoryName, itemValue] = fullValue.split(':');

		for (const category of categories) {
			if (category.name === categoryName) {
				const item = category.items.find(i => i.value === itemValue);
				if (item) {
					return `${category.name} - ${item.label}`;
				}
			}
		}
	}

	return displayParts.join(', ');
};

export const SelectMultiCategory = React.forwardRef<HTMLDivElement, SelectMultiCategoryProps>(
	(
		{
			categories,
			value = [],
			onChange,
			placeholder = 'Select items...',
			searchPlaceholder = 'Search...',
			disabled = false,
			className,
			isLoading = false,
			...props
		},
		ref
	) => {
		// References
		const dropdownRef = React.useRef<HTMLDivElement>(null);
		const triggerRef = React.useRef<HTMLDivElement>(null);

		// State
		const [isOpen, setIsOpen] = React.useState(false);
		const [selectedValues, setSelectedValues] = React.useState<string[]>(value);
		const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
		const [searchQueries, setSearchQueries] = React.useState<Record<string, string>>({});

		// Update state when value prop changes
		React.useEffect(() => {
			setSelectedValues(value);
		}, [value]);

		// Handle outside clicks to close dropdown
		React.useEffect(() => {
			function handleClickOutside(event: MouseEvent) {
				if (
					dropdownRef.current &&
					!dropdownRef.current.contains(event.target as Node) &&
					triggerRef.current &&
					!triggerRef.current.contains(event.target as Node)
				) {
					setIsOpen(false);
				}
			}

			if (isOpen) {
				document.addEventListener('mousedown', handleClickOutside);
			}

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [isOpen]);

		// Toggle dropdown
		const toggleDropdown = (e: React.MouseEvent) => {
			if (disabled) return;
			e.stopPropagation();
			setIsOpen(prev => !prev);

			if (!isOpen && !activeCategory && categories.length > 0) {
				setActiveCategory(categories[0].name);
			}
		};

		// Toggle a category's open state
		const toggleCategory = (categoryName: string, e: React.MouseEvent) => {
			e.stopPropagation();
			setActiveCategory(prev => (prev === categoryName ? null : categoryName));
		};

		// Handle item selection
		const handleSelectItem = (categoryName: string, itemValue: string, e: React.MouseEvent) => {
			e.stopPropagation();

			const fullValue = `${categoryName}:${itemValue}`;
			let newValues: string[];

			if (selectedValues.includes(fullValue)) {
				newValues = selectedValues.filter(v => v !== fullValue);
			} else {
				newValues = [...selectedValues, fullValue];
			}

			setSelectedValues(newValues);
			onChange?.(newValues);
		};

		// Clear all selected items
		const clearAll = (e: React.MouseEvent) => {
			e.stopPropagation();
			setSelectedValues([]);
			onChange?.([]);
		};

		// Count selected items in a category
		const countSelectedInCategory = (categoryName: string): number => {
			return selectedValues.filter(v => v.startsWith(`${categoryName}:`)).length;
		};

		// Update search query for a category
		const updateSearchQuery = (categoryName: string, query: string) => {
			setSearchQueries(prev => ({
				...prev,
				[categoryName]: query,
			}));
		};

		// Filter items in a category based on search query
		const getFilteredItems = (category: Category) => {
			const query = searchQueries[category.name] || '';
			if (!query) return category.items;

			return category.items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
		};

		// Get display text for selected values
		const displayText = formatSelectedValues(selectedValues, categories) || placeholder;

		return (
			<div ref={ref} className={cn('relative w-full', className)} {...props}>
				{/* Select trigger */}
				<div
					ref={triggerRef}
					className={cn(
						'flex items-center justify-between px-3 py-2 border rounded-md cursor-pointer bg-background',
						'hover:border-border-primary transition-colors',
						isOpen && 'border-border-primary ring-[3px] ring-primary-bright',
						disabled && 'opacity-50 cursor-not-allowed',
						!isOpen && 'border-border'
					)}
					onClick={toggleDropdown}
				>
					<span className={cn('text-sm flex-1', selectedValues.length === 0 && 'text-ink-light')}>
						{displayText}
					</span>
					<div className="flex items-center gap-1">
						{selectedValues.length > 0 && !disabled && (
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={clearAll}
								className="h-5 w-5 p-0"
								aria-label="Clear selections"
							>
								<X size={16} />
							</Button>
						)}
						<CaretDown
							size={20}
							className={cn(
								'transition-transform duration-200 text-ink-light',
								isOpen && 'rotate-180'
							)}
						/>
					</div>
					<span className="sr-only">{selectedValues.length} items selected</span>
				</div>

				{/* Dropdown */}
				{isOpen && (
					<div
						ref={dropdownRef}
						className="absolute z-50 w-full mt-1 bg-panel rounded-md shadow-lg border border-border max-h-[400px] overflow-auto"
					>
						{categories.map(category => (
							<div key={category.name} className="border-b border-border-muted last:border-b-0">
								{/* Category Header */}
								<div
									className={cn(
										'flex items-center justify-between p-2 cursor-pointer transition-colors',
										activeCategory === category.name && 'bg'
									)}
									onClick={e => toggleCategory(category.name, e)}
								>
									<div className="flex items-center gap-2">
										{activeCategory === category.name ? (
											<CaretDown size={20} className="text-icon" />
										) : (
											<CaretRight size={20} className="text-icon" />
										)}
										<span className="font-medium text-sm">{category.name}</span>
									</div>

									{countSelectedInCategory(category.name) > 0 && (
										<Badge variant="normal" size="sm">
											{countSelectedInCategory(category.name)} selected
										</Badge>
									)}
								</div>

								{/* Category Items */}
								{activeCategory === category.name && (
									<div>
										{/* Search input */}
										<div className="p-2 pt-0 border-b border-border-secondary bg-panel">
											<InputGroup size="sm">
												<InputGroupAddon>
													<MagnifyingGlass size={16} />
												</InputGroupAddon>
												<InputGroupInput
													placeholder={searchPlaceholder}
													value={searchQueries[category.name] || ''}
													onChange={e => updateSearchQuery(category.name, e.target.value)}
													onClick={e => e.stopPropagation()}
													onKeyDown={e => e.stopPropagation()}
													//className="bg-background border-0 focus-visible:ring-0"
												/>
											</InputGroup>
										</div>

										{/* Filtered items */}
										<div className="max-h-[180px] overflow-auto">
											{getFilteredItems(category).map(item => {
												const isSelected = selectedValues.includes(
													`${category.name}:${item.value}`
												);
												return (
													<div
														key={item.value}
														className={cn(
															'px-4 py-2 cursor-pointer transition-colors',
															'hover:bg-bg',
															isSelected && 'bg-bg text-ink-dark'
														)}
														onClick={e => handleSelectItem(category.name, item.value, e)}
														role="checkbox"
														aria-checked={isSelected}
													>
														<div className="flex items-center gap-2">
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
																<div className="text-sm">{item.label}</div>
																{item.description && (
																	<Text variant="body-xs" className="text-ink-light mt-0.5">
																		{item.description}
																	</Text>
																)}
															</div>
														</div>
													</div>
												);
											})}

											{getFilteredItems(category).length === 0 && (
												<div className="p-4 text-center text-ink-light text-sm">No items found</div>
											)}
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
);

SelectMultiCategory.displayName = 'SelectMultiCategory';
