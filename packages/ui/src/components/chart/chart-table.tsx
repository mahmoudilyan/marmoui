'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import type { ChartConfig } from './types';

export interface ChartTableProps<T extends Record<string, unknown>>
	extends Omit<React.ComponentProps<'table'>, 'children'> {
	data: T[];
	config: ChartConfig;
	xKey: keyof T & string;
	xLabel?: React.ReactNode;
	caption?: React.ReactNode;
	formatValue?: (value: unknown, key: string, row: T) => React.ReactNode;
}

export function ChartTable<T extends Record<string, unknown>>({
	data,
	config,
	xKey,
	xLabel,
	caption,
	formatValue,
	className,
	...rest
}: ChartTableProps<T>) {
	const seriesKeys = Object.keys(config).filter((k) => k !== xKey);

	const renderCell = (value: unknown, key: string, row: T): React.ReactNode => {
		if (formatValue) return formatValue(value, key, row);
		if (value === null || value === undefined) return '—';
		if (typeof value === 'number') return value.toLocaleString();
		return value as React.ReactNode;
	};

	return (
		<table
			data-slot="chart-table"
			className={cn(
				'w-full border-collapse text-left text-xs tabular-nums [&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2',
				className
			)}
			{...rest}
		>
			{caption && (
				<caption className="caption-bottom pt-2 text-ink-light">{caption}</caption>
			)}
			<thead className="border-b border-border text-ink-light">
				<tr>
					<th scope="col" className="font-medium">
						{xLabel ?? xKey}
					</th>
					{seriesKeys.map((key) => (
						<th key={key} scope="col" className="font-medium text-right">
							{config[key]?.label ?? key}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => (
					<tr key={i} className="border-b border-border-secondary last:border-b-0">
						<th scope="row" className="font-normal text-ink">
							{renderCell(row[xKey], xKey, row)}
						</th>
						{seriesKeys.map((key) => (
							<td key={key} className="text-right text-ink-dark">
								{renderCell(row[key as keyof T], key, row)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
