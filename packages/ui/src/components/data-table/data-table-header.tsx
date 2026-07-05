'use client';

import * as React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import type { TableState } from './types';
import { Flex } from '../flex';
import { DataTableFilters } from './data-table-filters';
import { DataTableColumnsDropdown } from './data-table-columns-dropdown';
import type { TableFilter } from './types';
import { Box } from '../box';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group';
import { Text } from '../text';

interface DataTableHeaderProps {
	table: any;
	pageSize: number;
	total?: number;
	dataType: string;
	searchPlaceholder?: string;
	hideSearch?: boolean;
	hideColumnsMenu?: boolean;
	filters?: TableFilter[];
	className?: string;
	tableState?: TableState;
	setTableState?: (state: TableState) => void;
	onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
	onClearFilters?: () => void;
}

export function DataTableHeader({
	table,
	searchPlaceholder = 'Search...',
	hideSearch = false,
	hideColumnsMenu = false,
	filters = [],
	className,
	tableState,
	setTableState,
	pageSize,
	total,
	dataType,
	onColumnVisibilityChange,
	onClearFilters,
}: DataTableHeaderProps) {
	const [globalFilter, setGlobalFilter] = React.useState('');

	React.useEffect(() => {
		table?.setGlobalFilter?.(globalFilter);
	}, [globalFilter, table]);

	return (
		<Flex className="w-full md:w-auto justify-between">
			<Box className="flex items-center gap-2">
				<Text variant="body-sm" as="p">
					Showing {pageSize} of {total ?? 0} {dataType}
				</Text>
			</Box>
			<Flex gap={'2'}>
				{!hideSearch && (
					<InputGroup size="sm">
						<InputGroupAddon align="inline-start">
							<MagnifyingGlass className="h-4 w-4 text-icon" />
						</InputGroupAddon>
						<InputGroupInput
							type="search"
							placeholder={searchPlaceholder}
							value={globalFilter}
							onChange={event => setGlobalFilter(event.target.value)}
							className="pl-9"
							size="sm"
						/>
					</InputGroup>
				)}

				{!hideColumnsMenu ? <DataTableColumnsDropdown table={table} /> : null}
				{tableState && setTableState ? (
					<DataTableFilters
						filters={filters}
						tableState={tableState}
						setTableState={setTableState}
						className={className}
						buttonLabel="Filters"
					/>
				) : null}
			</Flex>
		</Flex>
	);
}
