'use client';

import * as React from 'react';
import { Funnel, Plus, X } from '@phosphor-icons/react';

import { Button } from '../button';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { SelectCheckboxSearchable } from '../select-checkbox-searchable';
import { SelectSearchable } from '../select-searchable';
import { Input } from '../input';
import { Switch } from '../switch';
import { cn } from '../../lib/utils';
import type { TableState, TableFilter, FilterOption } from './types';
import { DatePicker } from '../date-picker';
import { Badge } from '../badge';

interface DataTableFiltersProps {
	filters: TableFilter[];
	tableState: TableState;
	setTableState: (state: TableState) => void;
	className?: string;
	buttonLabel?: string;
}

export function DataTableFilters({
	filters,
	tableState,
	setTableState,
	className,
	buttonLabel = 'Filters',
}: DataTableFiltersProps) {
	const [filterOptions, setFilterOptions] = React.useState<Record<string, FilterOption[]>>({});
	const [loadingFilters, setLoadingFilters] = React.useState<Record<string, boolean>>({});
	const [isOpen, setIsOpen] = React.useState(false);
	// Notion-style dynamic rows: a filter row exists when it has an applied
	// value OR the user added it this session (empty row awaiting a value).
	const [draftIds, setDraftIds] = React.useState<string[]>([]);

	const appliedFilters = tableState?.filters ?? {};

	// Calculate applied count based on actual filter values
	const appliedCount = React.useMemo(() => {
		return Object.entries(appliedFilters).filter(([key, value]) => {
			if (value === null || value === undefined || value === '') return false;
			// For arrays, check if they're empty (multiselect) or date ranges (should have 2 dates)
			if (Array.isArray(value)) {
				// Date range: [Date, Date] or [string, string] (ISO dates from storage)
				if (value.length === 2) {
					const hasValidDates =
						(value[0] instanceof Date || (typeof value[0] === 'string' && value[0])) &&
						(value[1] instanceof Date || (typeof value[1] === 'string' && value[1]));
					if (hasValidDates) return true;
				}
				// Empty multiselect array
				if (value.length === 0) return false;
				// Non-empty multiselect array
				return true;
			}
			// Single date (Date object or ISO string from storage)
			if (value instanceof Date) return true;
			if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T/)) return true;
			// Boolean filters should always count as applied
			if (typeof value === 'boolean') return true;
			return true;
		}).length;
	}, [appliedFilters]);

	const handleFilterChange = React.useCallback(
		(filterId: string, value: unknown) => {
			setTableState({
				...tableState,
				filters: {
					...appliedFilters,
					[filterId]: value,
				},
				pagination: {
					...tableState.pagination,
					pageIndex: 0, // Reset to first page when filter changes
				},
			});
		},
		[appliedFilters, setTableState, tableState]
	);

	const handleClearFilters = React.useCallback(() => {
		setTableState({
			...tableState,
			filters: {},
			pagination: {
				...tableState.pagination,
				pageIndex: 0, // Reset to first page when clearing filters
			},
		});
		// Don't close the popover - user can see filters are cleared
	}, [setTableState, tableState]);

	// Load options for async filters when popover opens
	React.useEffect(() => {
		if (!isOpen) return;

		filters.forEach(async filter => {
			if (
				(filter.type === 'select' || filter.type === 'multiselect') &&
				typeof filter.options === 'function' &&
				!filterOptions[filter.id]
			) {
				setLoadingFilters(prev => ({ ...prev, [filter.id]: true }));
				try {
					const options = await filter.options();
					setFilterOptions(prev => ({ ...prev, [filter.id]: options }));
				} catch (error) {
					console.error(`Error loading options for filter ${filter.id}:`, error);
				} finally {
					setLoadingFilters(prev => ({ ...prev, [filter.id]: false }));
				}
			}
		});
	}, [isOpen, filters, filterOptions]);

	const handleRemoveFilter = React.useCallback(
		(filterId: string) => {
			const next = { ...appliedFilters };
			delete next[filterId];
			setDraftIds(ids => ids.filter(id => id !== filterId));
			setTableState({
				...tableState,
				filters: next,
				pagination: { ...tableState.pagination, pageIndex: 0 },
			});
		},
		[appliedFilters, setTableState, tableState]
	);

	const hasValue = React.useCallback(
		(filterId: string) => {
			const v = appliedFilters[filterId];
			if (v === null || v === undefined || v === '') return false;
			if (Array.isArray(v)) return v.length > 0;
			return true;
		},
		[appliedFilters]
	);

	/** Rows currently shown: applied values first (filter-def order), then drafts. */
	const activeRows = React.useMemo(() => {
		const ids = new Set<string>();
		filters.forEach(f => {
			if (hasValue(f.id) || draftIds.includes(f.id)) ids.add(f.id);
		});
		return filters.filter(f => ids.has(f.id));
	}, [filters, draftIds, hasValue]);

	const availableToAdd = React.useMemo(
		() => filters.filter(f => !hasValue(f.id) && !draftIds.includes(f.id)),
		[filters, draftIds, hasValue]
	);

	const renderFilter = React.useCallback(
		(filter: TableFilter) => {
			const value = appliedFilters[filter.id];

			switch (filter.type) {
				case 'select': {
					const options = Array.isArray(filter.options)
						? filter.options
						: filterOptions[filter.id] || [];
					const isLoading = loadingFilters[filter.id];

					return (
						<div className="space-y-2">
							<label className="text-sm font-medium text-ink" htmlFor={`filter-${filter.id}`}>
								{filter.label}
							</label>
							<Select
								value={(value as string) || undefined}
								onValueChange={newValue => handleFilterChange(filter.id, newValue)}
								disabled={isLoading}
							>
								<SelectTrigger id={`filter-${filter.id}`} className="w-full">
									<SelectValue placeholder={filter.placeholder || 'Select...'} />
								</SelectTrigger>
								<SelectContent>
									{isLoading ? (
										<div className="p-2 text-center text-sm text-ink-light">Loading...</div>
									) : options.length > 0 ? (
										options.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))
									) : (
										<div className="p-2 text-center text-sm text-ink-light">No options</div>
									)}
								</SelectContent>
							</Select>
						</div>
					);
				}

				case 'multiselect': {
					const options = Array.isArray(filter.options)
						? filter.options
						: filterOptions[filter.id] || [];
					const isLoading = loadingFilters[filter.id];

					if (isLoading) {
						return (
							<div className="space-y-2">
								<label className="text-sm font-medium text-ink">{filter.label}</label>
								<div className="flex h-9 items-center justify-center rounded-md border border-border-input bg-panel text-sm text-ink-light">
									Loading...
								</div>
							</div>
						);
					}

					if (filter.searchable !== false) {
						return (
							<div className="space-y-2">
								<label className="text-sm font-medium text-ink">{filter.label}</label>
								<SelectSearchable
									multiple={true}
									items={options}
									value={Array.isArray(value) ? value : []}
									onChange={newValue =>
										handleFilterChange(filter.id, newValue.length > 0 ? newValue : undefined)
									}
									placeholder={filter.placeholder || 'Select items...'}
									searchPlaceholder={filter.searchPlaceholder || 'Search...'}
									labelKey="label"
									valueKey="value"
									descriptionKey="description"
									maxTags={2}
								/>
							</div>
						);
					}

					// Simple multi-select without search
					return (
						<div className="space-y-2">
							<label className="text-sm font-medium text-ink">{filter.label}</label>
							<div className="max-h-40 space-y-1 overflow-y-auto rounded-md border border-border-input p-2">
								{options.map(option => {
									const currentValues = Array.isArray(value) ? value : [];
									const isSelected = currentValues.includes(option.value);
									return (
										<label
											key={option.value}
											className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-bg"
										>
											<input
												type="checkbox"
												checked={isSelected}
												onChange={e => {
													const newValue = e.target.checked
														? [...currentValues, option.value]
														: currentValues.filter(v => v !== option.value);
													handleFilterChange(filter.id, newValue.length > 0 ? newValue : undefined);
												}}
												className="size-4 rounded border-gray-300"
											/>
											<span className="text-sm">{option.label}</span>
										</label>
									);
								})}
							</div>
						</div>
					);
				}

				case 'date': {
					const dateValue = value as [Date, Date] | Date | undefined;
					const isRange = filter.mode === 'range';

					return (
						<div className="space-y-2">
							<label className="text-sm font-medium text-ink" htmlFor={`filter-${filter.id}`}>
								{filter.label}
							</label>
							<DatePicker
								value={dateValue}
								onChange={newValue => {
									handleFilterChange(filter.id, newValue);
								}}
								isRange={isRange}
								hasPresets={true}
								placeholder={filter.placeholder || 'Select date'}
								className="w-full"
								triggerType="input"
							/>
						</div>
					);
				}

				case 'boolean': {
					const boolValue = value === undefined ? false : (value as boolean);
					return (
						<div className="flex items-center justify-between">
							<label className="text-sm font-medium text-ink" htmlFor={`filter-${filter.id}`}>
								{filter.label}
							</label>
							<div className="flex items-center gap-2">
								<span className="text-xs text-ink-light">
									{boolValue ? filter.trueLabel || 'Yes' : filter.falseLabel || 'No'}
								</span>
								<Switch
									id={`filter-${filter.id}`}
									checked={boolValue}
									onCheckedChange={checked =>
										handleFilterChange(filter.id, checked ? true : undefined)
									}
								/>
							</div>
						</div>
					);
				}

				default:
					return null;
			}
		},
		[appliedFilters, filterOptions, loadingFilters, handleFilterChange]
	);

	if (!filters.length) {
		return null;
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="secondary"
					size="sm"
					data-active={appliedCount > 0}
					className={cn(className)}
					leftIcon={<Funnel className="size-4" aria-hidden />}
				>
					{buttonLabel}
					{appliedCount > 0 ? (
						<Badge variant="normal" size="sm" className="ml-1 bg-panel text-ink-primary">
							{appliedCount}
						</Badge>
					) : null}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[420px] p-2">
				{activeRows.length === 0 ? (
					<p className="px-2 py-3 text-sm text-ink-light">No filters applied. Add one below.</p>
				) : (
					<div className="space-y-1">
						{activeRows.map(filter => (
							<div
								key={filter.id}
								className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-bg"
							>
								<span className="w-24 shrink-0 truncate text-sm text-ink-light">
									{filter.label}
								</span>
								{renderFilter(filter)}
								<Button
									variant="ghost"
									size="sm"
									className="shrink-0 opacity-40 hover:opacity-100"
									onClick={() => handleRemoveFilter(filter.id)}
									aria-label={`Remove ${filter.label} filter`}
									leftIcon={<X className="size-3.5" aria-hidden />}
								/>
							</div>
						))}
					</div>
				)}
				<div className="mt-1 flex items-center justify-between border-t border-border-secondary px-1 pt-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								disabled={availableToAdd.length === 0}
								leftIcon={<Plus className="size-3.5" aria-hidden />}
							>
								Add filter
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{availableToAdd.map(f => (
								<DropdownMenuItem key={f.id} onSelect={() => setDraftIds(ids => [...ids, f.id])}>
									{f.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					{appliedCount > 0 ? (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => {
								setDraftIds([]);
								handleClearFilters();
							}}
						>
							Clear all
						</Button>
					) : null}
				</div>
			</PopoverContent>
		</Popover>
	);
}
