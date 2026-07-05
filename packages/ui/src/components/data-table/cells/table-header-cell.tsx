'use client';

import * as React from 'react';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import type { TableState } from '../types';

interface TableHeaderCellProps {
	label: string;
	canSort?: boolean;
	tableState?: TableState;
	setTableState?: (state: Partial<TableState>) => void;
	columnIndex: number;
}

export function TableHeaderCell({
	label,
	canSort = false,
	columnIndex,
	tableState,
	setTableState,
}: TableHeaderCellProps) {
	const currentSort = tableState?.sorting?.[0];
	const isSortedAsc = currentSort?.column === columnIndex && currentSort?.dir === 'asc';
	const isSortedDesc = currentSort?.column === columnIndex && currentSort?.dir === 'desc';

	const handleSort = () => {
		if (!canSort || !tableState || !setTableState) return;

		const nextDir = isSortedAsc ? 'desc' : 'asc';
		setTableState({
			sorting: [
				{
					column: columnIndex,
					dir: nextDir,
				},
			],
		});
	};

	return (
		<button
			type="button"
			onClick={handleSort}
			className="flex items-center gap-1 px-2 py-2 text-sm font-medium capitalize text-muted-foreground"
		>
			<span className="text-foreground">{label}</span>
			{canSort ? (
				<span className="flex items-center text-muted-foreground">
					{isSortedAsc ? <ArrowUp className="size-4" /> : null}
					{isSortedDesc ? <ArrowDown className="size-4" /> : null}
				</span>
			) : null}
		</button>
	);
}
