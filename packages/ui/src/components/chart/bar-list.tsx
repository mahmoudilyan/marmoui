'use client';

import * as React from 'react';
import { Tooltip } from '../tooltip';

export type BarListItem = {
	name: string;
	/** Single-series value. Used when `series` prop is omitted. */
	value?: number;
	/** Multi-series values, keyed by `series[].key`. Used when `series` is set. */
	values?: Record<string, number>;
	/** Optional per-row color override. Only honored in single-series mode. Accepts a hue name (`'teal'`) or any CSS color value. */
	color?: string;
};

export type BarSeries = {
	/** Matches the key in `BarListItem.values`. */
	key: string;
	/** Legend / tooltip label. */
	label: string;
	/** Hue name from `CATEGORICAL_CHART_PALETTE` (e.g. `'teal'`) or any CSS color. Defaults to next palette slot by index. */
	color?: string;
};

/**
 * Categorical chart palette — distinct hues for different categories. Each hue
 * has a `-bright` sibling (in globals.css) for emphasis bands inside the SAME
 * category — never swap to a different hue for that.
 */
export const CATEGORICAL_CHART_PALETTE = [
	{ name: 'teal', token: 'var(--color-chart-cat-teal)', bright: 'var(--color-chart-cat-teal-bright)' },
	{ name: 'violet', token: 'var(--color-chart-cat-violet)', bright: 'var(--color-chart-cat-violet-bright)' },
	{ name: 'blue', token: 'var(--color-chart-cat-blue)', bright: 'var(--color-chart-cat-blue-bright)' },
	{ name: 'orange', token: 'var(--color-chart-cat-orange)', bright: 'var(--color-chart-cat-orange-bright)' },
	{ name: 'pink', token: 'var(--color-chart-cat-pink)', bright: 'var(--color-chart-cat-pink-bright)' },
	{ name: 'amber', token: 'var(--color-chart-cat-amber)', bright: 'var(--color-chart-cat-amber-bright)' },
	{ name: 'green', token: 'var(--color-chart-cat-green)', bright: 'var(--color-chart-cat-green-bright)' },
	{ name: 'indigo', token: 'var(--color-chart-cat-indigo)', bright: 'var(--color-chart-cat-indigo-bright)' },
	{ name: 'mint', token: 'var(--color-chart-cat-mint)', bright: 'var(--color-chart-cat-mint-bright)' },
	{ name: 'red', token: 'var(--color-chart-cat-red)', bright: 'var(--color-chart-cat-red-bright)' },
] as const;

const DEFAULT_PALETTE_TOKENS = CATEGORICAL_CHART_PALETTE.map(p => p.token);

function defaultFormat(value: number): string {
	return new Intl.NumberFormat('en-US').format(value);
}

function resolveColor(color: string | undefined, fallback: string): string {
	if (!color) return fallback;
	const hue = CATEGORICAL_CHART_PALETTE.find(p => p.name === color);
	return hue ? hue.token : color;
}

export type BarListLayout = 'single' | 'grouped' | 'stacked';

export type BarListProps = {
	data: BarListItem[];
	/** Series definition. Required for `grouped` / `stacked` layouts. When omitted, BarList runs in single-series mode and reads `item.value`. */
	series?: BarSeries[];
	/** How rows render. `single` → one bar per row. `grouped` → one thin bar per series stacked inside the row. `stacked` → one bar split into series segments. Defaults to `single`. */
	layout?: BarListLayout;
	/** Label that sits above the name column (e.g. "Source", "Country", "Channel"). */
	header?: string;
	/** Unit shown next to the value inside the tooltip (e.g. "Visits", "Contacts", "Sessions"). */
	unit?: string;
	/** Hide rows whose total is 0 (default true). */
	hideZeros?: boolean;
	/** Sort ordering. Defaults to `desc`. Multi-series rows sort by total. */
	sort?: 'desc' | 'asc' | 'none';
	/** Width of the name column in pixels. Defaults to 88. */
	labelWidth?: number;
	/** Pixel width allocated to the longest bar. Bars scale proportionally below this. Defaults to 280. */
	maxBarWidth?: number;
	/** Value formatter for both inline value and tooltip. */
	formatValue?: (value: number) => string;
	/** Override the default categorical palette. */
	colors?: string[];
};

export function BarList({
	data,
	series,
	layout = 'single',
	header,
	unit,
	hideZeros = true,
	sort = 'desc',
	labelWidth = 88,
	maxBarWidth = 280,
	formatValue,
	colors,
}: BarListProps) {
	const palette = colors ?? DEFAULT_PALETTE_TOKENS;
	const fmt = formatValue ?? defaultFormat;
	const isMulti = !!series && series.length > 0;

	const seriesResolved = React.useMemo(() => {
		if (!series) return [];
		return series.map((s, i) => ({
			...s,
			resolvedColor: resolveColor(s.color, palette[i % palette.length]),
		}));
	}, [series, palette]);

	const prepared = React.useMemo(() => {
		const rowTotal = (d: BarListItem): number => {
			if (isMulti) {
				return seriesResolved.reduce((sum, s) => sum + (d.values?.[s.key] ?? 0), 0);
			}
			return d.value ?? 0;
		};
		const filtered = hideZeros ? data.filter(d => rowTotal(d) > 0) : data;
		if (sort === 'asc') return [...filtered].sort((a, b) => rowTotal(a) - rowTotal(b));
		if (sort === 'desc') return [...filtered].sort((a, b) => rowTotal(b) - rowTotal(a));
		return filtered;
	}, [data, hideZeros, sort, isMulti, seriesResolved]);

	const max = React.useMemo(() => {
		if (!isMulti) return prepared.reduce((m, d) => Math.max(m, d.value ?? 0), 0);
		if (layout === 'stacked') {
			return prepared.reduce((m, d) => {
				const total = seriesResolved.reduce((s, ser) => s + (d.values?.[ser.key] ?? 0), 0);
				return Math.max(m, total);
			}, 0);
		}
		return prepared.reduce(
			(m, d) => seriesResolved.reduce((mm, ser) => Math.max(mm, d.values?.[ser.key] ?? 0), m),
			0,
		);
	}, [prepared, isMulti, seriesResolved, layout]);

	return (
		<div className="flex flex-col gap-3">
			{header && (
				<div
					className="text-right text-sm font-semibold text-ink-dark"
					style={{ width: labelWidth }}
				>
					{header}
				</div>
			)}
			<div className="flex flex-col gap-3">
				{prepared.map((d, i) => {
					if (isMulti && layout === 'grouped') {
						return (
							<div key={d.name} className="flex items-start gap-[15px]">
								<div
									className="mt-0.5 shrink-0 truncate text-right text-xs text-ink"
									style={{ width: labelWidth }}
								>
									{d.name}
								</div>
								<div className="flex flex-col gap-1">
									{seriesResolved.map(s => {
										const v = d.values?.[s.key] ?? 0;
										const ratio = max > 0 ? v / max : 0;
										const barWidth = Math.max(ratio * maxBarWidth, 4);
										return (
											<Tooltip
												key={s.key}
												content={
													<BarListTooltip
														name={`${d.name} · ${s.label}`}
														value={v}
														unit={unit}
														color={s.resolvedColor}
														formatValue={fmt}
													/>
												}
												side="top"
												contentProps={{ className: 'p-0 border-0 bg-transparent shadow-none' }}
											>
												<div className="flex cursor-default items-center gap-2">
													<div
														className="h-2.5 shrink-0 rounded-[3px] transition-opacity hover:opacity-80"
														style={{ width: barWidth, backgroundColor: s.resolvedColor }}
													/>
													<span className="whitespace-nowrap text-xs tabular-nums text-ink">
														{fmt(v)}
													</span>
												</div>
											</Tooltip>
										);
									})}
								</div>
							</div>
						);
					}
					if (isMulti && layout === 'stacked') {
						const total = seriesResolved.reduce((s, ser) => s + (d.values?.[ser.key] ?? 0), 0);
						const ratio = max > 0 ? total / max : 0;
						const barTotalWidth = Math.max(ratio * maxBarWidth, 4);
						return (
							<div key={d.name} className="flex items-center gap-[15px]">
								<div
									className="shrink-0 truncate text-right text-xs text-ink"
									style={{ width: labelWidth }}
								>
									{d.name}
								</div>
								<Tooltip
									content={
										<StackedBarTooltip
											name={d.name}
											values={d.values ?? {}}
											series={seriesResolved}
											unit={unit}
											formatValue={fmt}
										/>
									}
									side="top"
									contentProps={{ className: 'p-0 border-0 bg-transparent shadow-none' }}
								>
									<div className="flex cursor-default items-center gap-2">
										<div
											className="flex h-3 shrink-0 overflow-hidden rounded-[4px]"
											style={{ width: barTotalWidth }}
										>
											{seriesResolved.map(s => {
												const v = d.values?.[s.key] ?? 0;
												if (v <= 0 || total <= 0) return null;
												const segWidth = (v / total) * barTotalWidth;
												return (
													<div
														key={s.key}
														className="h-full transition-opacity hover:opacity-80"
														style={{ width: segWidth, backgroundColor: s.resolvedColor }}
													/>
												);
											})}
										</div>
										<span className="whitespace-nowrap text-xs tabular-nums text-ink">
											{fmt(total)}
										</span>
									</div>
								</Tooltip>
							</div>
						);
					}
					const v = d.value ?? 0;
					const ratio = max > 0 ? v / max : 0;
					const barWidth = Math.max(ratio * maxBarWidth, 4);
					const fallback = palette[i % palette.length];
					const color = resolveColor(d.color, fallback);
					return (
						<div key={d.name} className="flex items-center gap-[15px]">
							<div
								className="shrink-0 truncate text-right text-xs text-ink"
								style={{ width: labelWidth }}
							>
								{d.name}
							</div>
							<Tooltip
								content={<BarListTooltip name={d.name} value={v} unit={unit} color={color} formatValue={fmt} />}
								side="top"
								contentProps={{ className: 'p-0 border-0 bg-transparent shadow-none' }}
							>
								<div className="flex cursor-default items-center gap-2">
									<div
										className="h-3 shrink-0 rounded-[4px] transition-opacity hover:opacity-80"
										style={{ width: barWidth, backgroundColor: color }}
									/>
									<span className="whitespace-nowrap text-xs tabular-nums text-ink">
										{fmt(v)}
									</span>
								</div>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export type BarListLegendProps = {
	series: BarSeries[];
	/** Show this many chips inline; collapse the rest into a `+N More` hover popover. Default: show all. */
	maxVisible?: number;
	/** Override the default categorical palette. */
	colors?: string[];
	className?: string;
};

export function BarListLegend({ series, maxVisible, colors, className }: BarListLegendProps) {
	const palette = colors ?? DEFAULT_PALETTE_TOKENS;
	const withColor = series.map((s, i) => ({
		...s,
		resolvedColor: resolveColor(s.color, palette[i % palette.length]),
	}));
	const visible = typeof maxVisible === 'number' ? withColor.slice(0, maxVisible) : withColor;
	const hidden = typeof maxVisible === 'number' ? withColor.slice(maxVisible) : [];
	return (
		<div className={['flex flex-wrap items-center gap-x-4 gap-y-2', className].filter(Boolean).join(' ')}>
			{visible.map(s => (
				<span key={s.key} className="flex items-center gap-1.5 text-xs text-ink-dark">
					<span
						aria-hidden
						className="block size-2.5 rounded-[3px]"
						style={{ backgroundColor: s.resolvedColor }}
					/>
					<span>{s.label}</span>
				</span>
			))}
			{hidden.length > 0 && (
				<Tooltip
					content={<HiddenLegendTooltip series={hidden} />}
					side="top"
					contentProps={{ className: 'p-0 border-0 bg-transparent shadow-none' }}
				>
					<button
						type="button"
						className="cursor-default rounded-md border border-transparent px-1.5 py-0.5 text-xs text-ink-light transition-colors hover:border-border-secondary hover:text-ink-dark"
						aria-label={`Show ${hidden.length} more series`}
					>
						+{hidden.length} More
					</button>
				</Tooltip>
			)}
		</div>
	);
}

function BarListTooltip({
	name,
	value,
	unit,
	color,
	formatValue,
}: {
	name: string;
	value: number;
	unit?: string;
	color: string;
	formatValue: (v: number) => string;
}) {
	return (
		<div className="min-w-40 rounded-md border border-chart-tooltip-border bg-chart-tooltip-bg p-3 text-xs shadow-lg">
			<div className="mb-2 text-sm font-semibold text-ink-dark">{name}</div>
			<div className="flex gap-2.5">
				<span
					aria-hidden
					className="block w-1 self-stretch rounded-sm"
					style={{ backgroundColor: color }}
				/>
				<div className="flex flex-col gap-0.5">
					{unit && <span className="text-xs text-ink">{unit}</span>}
					<span className="text-base font-semibold tabular-nums text-ink-dark">
						{formatValue(value)}
					</span>
				</div>
			</div>
		</div>
	);
}

function StackedBarTooltip({
	name,
	values,
	series,
	unit,
	formatValue,
}: {
	name: string;
	values: Record<string, number>;
	series: Array<BarSeries & { resolvedColor: string }>;
	unit?: string;
	formatValue: (v: number) => string;
}) {
	const total = series.reduce((s, ser) => s + (values[ser.key] ?? 0), 0);
	return (
		<div className="min-w-48 rounded-md border border-chart-tooltip-border bg-chart-tooltip-bg p-3 text-xs shadow-lg">
			<div className="mb-2 flex items-baseline justify-between gap-3">
				<span className="text-sm font-semibold text-ink-dark">{name}</span>
				<span className="text-xs tabular-nums text-ink-light">
					{unit ? `${formatValue(total)} ${unit}` : formatValue(total)}
				</span>
			</div>
			<div className="flex flex-col gap-1.5">
				{series.map(s => (
					<div key={s.key} className="flex items-center justify-between gap-3">
						<span className="flex items-center gap-2 text-ink">
							<span
								aria-hidden
								className="block size-2 rounded-[2px]"
								style={{ backgroundColor: s.resolvedColor }}
							/>
							{s.label}
						</span>
						<span className="tabular-nums text-ink-dark">{formatValue(values[s.key] ?? 0)}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function HiddenLegendTooltip({
	series,
}: {
	series: Array<BarSeries & { resolvedColor: string }>;
}) {
	return (
		<div className="min-w-40 rounded-md border border-chart-tooltip-border bg-chart-tooltip-bg p-2 text-xs shadow-lg">
			<div className="flex flex-col gap-1.5">
				{series.map(s => (
					<span key={s.key} className="flex items-center gap-2 text-ink-dark">
						<span
							aria-hidden
							className="block size-2 rounded-[2px]"
							style={{ backgroundColor: s.resolvedColor }}
						/>
						{s.label}
					</span>
				))}
			</div>
		</div>
	);
}
