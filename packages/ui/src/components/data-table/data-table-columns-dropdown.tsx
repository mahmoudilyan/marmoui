'use client';

import * as React from 'react';
import { MagnifyingGlass, Columns } from '@phosphor-icons/react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
	DropdownMenuSeparator,
} from '../dropdown-menu';
import { Button } from '../button';
import { Input } from '../input';
import { Text } from '../text';
interface ColumnDefinition {
	id: string;
	label?: string;
	group?: string;
	canHide?: boolean;
}

interface DataTableColumnsDropdownProps {
	table: any;
	searchPlaceholder?: string;
	className?: string;
}

export function DataTableColumnsDropdown({
	table,
	searchPlaceholder = 'Search columns...',
	className,
}: DataTableColumnsDropdownProps) {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [refreshKey, setRefreshKey] = React.useState(0);

	// Refresh columns when dropdown opens to get fresh visibility state
	React.useEffect(() => {
		if (open) {
			setRefreshKey(prev => prev + 1);
		}
	}, [open]);

	// Get all columns that can be hidden
	const allColumns = React.useMemo(() => {
		const columns = table?.getAllColumns?.() ?? [];
		return columns
			.filter((column: any) => column.getCanHide?.())
			.map((column: any) => {
				const columnDef = column.columnDef;
				// Get a clean label - avoid showing React component strings
				let label = columnDef.meta?.label;

				if (!label) {
					// Try to get from header if it's a string
					const header = columnDef.header;
					if (typeof header === 'string') {
						label = header;
					} else {
						// Use column ID but format it nicely
						label = column.id
							.replace(/_/g, ' ')
							.replace(/([A-Z])/g, ' $1')
							.trim()
							.split(' ')
							.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
							.join(' ');
					}
				}

				return {
					id: column.id,
					label: label,
					group: columnDef.meta?.group || 'Other',
					canHide: column.getCanHide(),
					column: column,
				};
			});
	}, [table, refreshKey]);

	// Filter columns based on search
	const filteredColumns = React.useMemo(() => {
		if (!searchQuery) return allColumns;
		const query = searchQuery.toLowerCase();
		return allColumns.filter(
			(col: ColumnDefinition & { column: any }) =>
				col.label?.toLowerCase().includes(query) || col.id.toLowerCase().includes(query)
		);
	}, [allColumns, searchQuery]);

	// Group columns by category
	const groupedColumns = React.useMemo(() => {
		const groups = new Map<string, (ColumnDefinition & { column: any })[]>();

		filteredColumns.forEach((col: ColumnDefinition & { column: any }) => {
			const groupName = col.group || 'MdOutlineViewColumn';
			if (!groups.has(groupName)) {
				groups.set(groupName, []);
			}
			groups.get(groupName)?.push(col);
		});

		return Array.from(groups.entries());
	}, [filteredColumns]);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					leftIcon={<Columns />}
					size="sm"
					className={className}
				>
					MdOutlineViewColumn
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[250px] max-h-[400px] overflow-hidden p-0">
				{/* Search input */}
				<div className="p-1 sticky top-0 z-10 bg-panel border-b border-border-secondary">
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

				{/* Column groups */}
				<div className="max-h-[320px] overflow-y-auto py-1">
					{groupedColumns.length === 0 ? (
						<div className="py-6 text-center text-sm text-ink-light">No columns found</div>
					) : (
						groupedColumns.map(([groupName, columns], groupIndex) => (
							<div key={groupName}>
								{groupIndex > 0 && <DropdownMenuSeparator className="my-2" />}
								{/* Only show group label if there's more than one group */}
								{groupedColumns.length > 1 && (
									<DropdownMenuLabel>
										<Text variant="caps-sm" fontWeight="medium">
											{groupName}
										</Text>
									</DropdownMenuLabel>
								)}
								{columns.map((col: ColumnDefinition & { column: any }) => (
									<DropdownMenuCheckboxItem
										key={col.id}
										checked={col.column.getIsVisible()}
										onCheckedChange={value => col.column.toggleVisibility(!!value)}
										onSelect={event => event.preventDefault()}
										className="capitalize"
									>
										{col.label}
									</DropdownMenuCheckboxItem>
								))}
							</div>
						))
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

DataTableColumnsDropdown.displayName = 'DataTableColumnsDropdown';
