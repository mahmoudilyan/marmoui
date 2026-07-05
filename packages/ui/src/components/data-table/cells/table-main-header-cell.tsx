'use client';

import * as React from 'react';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import type { Table as TanstackTable } from '@tanstack/react-table';
import { Checkbox } from '../../checkbox';
import type { TableState } from '../types';

interface TableMainHeaderCellProps<TData> {
	label: string;
	table?: TanstackTable<TData>;
	canSort?: boolean;
	tableState?: TableState;
	setTableState?: (state: Partial<TableState>) => void;
	columnIndex: number;
}

export function TableMainHeaderCell<TData>({
	label,
	table,
	canSort = false,
	columnIndex,
	tableState,
	setTableState,
}: TableMainHeaderCellProps<TData>) {
	const handleSort = () => {
		if (!canSort || !tableState || !setTableState) return;

		const currentSort = tableState.sorting?.[0];
		const nextDir = currentSort?.dir === 'asc' ? 'desc' : 'asc';

		setTableState({
			sorting: [
				{
					column: columnIndex,
					dir: currentSort?.dir ? nextDir : 'asc',
				},
			],
		});
	};

	const currentSort = tableState?.sorting?.[0];
	const isSortedAsc = currentSort?.column === columnIndex && currentSort?.dir === 'asc';
	const isSortedDesc = currentSort?.column === columnIndex && currentSort?.dir === 'desc';

	const allRowsSelected = table?.getIsAllPageRowsSelected?.() ?? false;
	const someRowsSelected = table?.getIsSomePageRowsSelected?.() ?? false;
	const checkboxState = allRowsSelected || (someRowsSelected ? 'indeterminate' : false);

	return (
		<div className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-muted-foreground">
			<Checkbox
				checked={checkboxState}
				onCheckedChange={value => table?.toggleAllPageRowsSelected?.(!!value)}
				aria-label="Select all rows"
				onClick={event => event.stopPropagation()}
				onKeyDown={event => event.stopPropagation()}
			/>
			<button
				type="button"
				onClick={handleSort}
				className="flex flex-1 items-center justify-start gap-1 text-left"
			>
				<span className="capitalize text-foreground">{label}</span>
				{canSort ? (
					<span className="flex items-center text-muted-foreground">
					{isSortedAsc ? <ArrowUp className="size-4" /> : null}
					{isSortedDesc ? <ArrowDown className="size-4" /> : null}
					</span>
				) : null}
			</button>
		</div>
	);
}
