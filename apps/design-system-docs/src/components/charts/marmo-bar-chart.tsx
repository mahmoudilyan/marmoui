'use client';

import * as React from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { CHART_OPACITY, CHART_TOKENS, formatCompact, formatFull, formatPercent } from './palette';

export type BarDatum = {
	name: string;
	value: number;
};

type MarmoBarChartProps = {
	data: BarDatum[];
	orientation?: 'horizontal' | 'vertical';
	topN?: number;
	otherLabel?: string;
	hideZeros?: boolean;
	unit?: string;
	height?: number;
	highlightLeader?: boolean;
	sort?: 'desc' | 'asc' | 'none';
};

const TOOLTIP_CONTENT_STYLE = {
	background: 'var(--color-bg, white)',
	border: '1px solid var(--color-border)',
	borderRadius: 8,
	padding: '8px 10px',
	boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
	fontSize: 12,
};

export function MarmoBarChart({
	data,
	orientation = 'horizontal',
	topN,
	otherLabel = 'Other',
	hideZeros = true,
	unit,
	height,
	highlightLeader = true,
	sort = 'desc',
}: MarmoBarChartProps) {
	const prepared = React.useMemo(() => {
		const filtered = hideZeros ? data.filter((d) => d.value > 0) : data;
		const ordered =
			sort === 'desc'
				? [...filtered].sort((a, b) => b.value - a.value)
				: sort === 'asc'
					? [...filtered].sort((a, b) => a.value - b.value)
					: filtered;

		if (topN == null || ordered.length <= topN) return ordered;

		const top = ordered.slice(0, topN);
		const tail = ordered.slice(topN);
		const otherValue = tail.reduce((sum, d) => sum + d.value, 0);
		if (otherValue === 0) return top;

		return [
			...top,
			{
				name: `${otherLabel} (${tail.length})`,
				value: otherValue,
			},
		];
	}, [data, topN, otherLabel, hideZeros, sort]);

	const total = prepared.reduce((sum, d) => sum + d.value, 0);
	const isHorizontal = orientation === 'horizontal';

	const ROW_PX = 36;
	const PADDING_PX = 32;
	const computedHeight =
		height ?? (isHorizontal ? Math.max(prepared.length * ROW_PX + PADDING_PX, 160) : 260);

	return (
		<ResponsiveContainer width="100%" height={computedHeight}>
			<BarChart
				data={prepared}
				layout={isHorizontal ? 'vertical' : 'horizontal'}
				margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
				barCategoryGap={isHorizontal ? '20%' : '15%'}
			>
				<CartesianGrid
					stroke={CHART_TOKENS.gridline}
					strokeOpacity={CHART_OPACITY.gridline}
					strokeDasharray="3 3"
					horizontal={!isHorizontal}
					vertical={isHorizontal}
				/>
				{isHorizontal ? (
					<>
						<XAxis
							type="number"
							tickFormatter={(v) => formatCompact(Number(v))}
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={{ stroke: CHART_TOKENS.gridline }}
							tickLine={false}
						/>
						<YAxis
							type="category"
							dataKey="name"
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={false}
							tickLine={false}
							width={140}
						/>
					</>
				) : (
					<>
						<XAxis
							type="category"
							dataKey="name"
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={{ stroke: CHART_TOKENS.gridline }}
							tickLine={false}
							interval={0}
						/>
						<YAxis
							type="number"
							tickFormatter={(v) => formatCompact(Number(v))}
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={false}
							tickLine={false}
						/>
					</>
				)}
				<Tooltip
					cursor={{ fill: CHART_TOKENS.gridline, fillOpacity: 0.25 }}
					contentStyle={TOOLTIP_CONTENT_STYLE}
					formatter={(value: number, _name, payload) => {
						const pct = total > 0 ? formatPercent(value / total) : '—';
						const label = unit ? `${formatFull(value)} ${unit}` : formatFull(value);
						const datum = payload?.payload as BarDatum | undefined;
						return [`${label} · ${pct}`, datum?.name ?? ''];
					}}
				/>
				<Bar dataKey="value" radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]} maxBarSize={26}>
					{prepared.map((_, i) => {
						const isLeader = highlightLeader && i === 0;
						return (
							<Cell
								key={i}
								fill={isLeader ? CHART_TOKENS.accent : CHART_TOKENS.neutral}
								fillOpacity={isLeader ? CHART_OPACITY.leader : CHART_OPACITY.neutral}
							/>
						);
					})}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
