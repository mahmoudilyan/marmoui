'use client';

import * as React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORICAL_CHART_PALETTE } from '@marmoui/ui';
import { formatFull, formatPercent } from './palette';

const DONUT_PALETTE = CATEGORICAL_CHART_PALETTE.map(p => p.token);

export type DonutDatum = {
	name: string;
	value: number;
};

type MarmoDonutChartProps = {
	data: DonutDatum[];
	maxSlices?: number;
	otherLabel?: string;
	centerLabel?: string;
	centerValue?: string | number;
	height?: number;
};

const TOOLTIP_CONTENT_STYLE = {
	background: 'var(--color-bg, white)',
	border: '1px solid var(--color-border)',
	borderRadius: 8,
	padding: '8px 10px',
	boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
	fontSize: 12,
};

export function MarmoDonutChart({
	data,
	maxSlices = 4,
	otherLabel = 'Other',
	centerLabel,
	centerValue,
	height = 240,
}: MarmoDonutChartProps) {
	const prepared = React.useMemo(() => {
		const filtered = data.filter((d) => d.value > 0);
		const sorted = [...filtered].sort((a, b) => b.value - a.value);
		if (sorted.length <= maxSlices) return sorted;

		const top = sorted.slice(0, maxSlices - 1);
		const tail = sorted.slice(maxSlices - 1);
		const otherValue = tail.reduce((sum, d) => sum + d.value, 0);
		return [...top, { name: `${otherLabel} (${tail.length})`, value: otherValue }];
	}, [data, maxSlices, otherLabel]);

	const total = prepared.reduce((sum, d) => sum + d.value, 0);
	const colors = prepared.map((_, i) => DONUT_PALETTE[i % DONUT_PALETTE.length]);

	return (
		<div className="w-full">
			<div className="relative w-full" style={{ height }}>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={prepared}
							dataKey="value"
							nameKey="name"
							innerRadius="58%"
							outerRadius="88%"
							paddingAngle={1}
							stroke="var(--color-bg, white)"
							strokeWidth={2}
							isAnimationActive={false}
						>
							{prepared.map((_, i) => (
								<Cell key={i} fill={colors[i]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={TOOLTIP_CONTENT_STYLE}
							formatter={(value: number, name) => {
								const pct = total > 0 ? formatPercent(value / total) : '—';
								return [`${formatFull(value)} · ${pct}`, name as string];
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
				{(centerLabel || centerValue != null) && (
					<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
						{centerValue != null && (
							<span className="font-heading text-xl font-semibold tabular-nums text-ink-dark">
								{typeof centerValue === 'number' ? formatFull(centerValue) : centerValue}
							</span>
						)}
						{centerLabel && <span className="text-[10px] uppercase tracking-wide text-ink-light">{centerLabel}</span>}
					</div>
				)}
			</div>
			<DonutLegend data={prepared} colors={colors} total={total} />
		</div>
	);
}

function DonutLegend({
	data,
	colors,
	total,
}: {
	data: DonutDatum[];
	colors: string[];
	total: number;
}) {
	return (
		<ul className="not-prose mt-2 grid grid-cols-1 gap-1 px-1 text-xs sm:grid-cols-2">
			{data.map((d, i) => {
				const pct = total > 0 ? formatPercent(d.value / total) : '—';
				return (
					<li key={d.name} className="flex items-center gap-2 text-ink">
						<span
							aria-hidden
							className="size-2.5 shrink-0 rounded-sm"
							style={{ background: colors[i] }}
						/>
						<span className="grow truncate">{d.name}</span>
						<span className="shrink-0 tabular-nums text-ink-light">
							{formatFull(d.value)} · {pct}
						</span>
					</li>
				);
			})}
		</ul>
	);
}
