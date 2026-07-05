'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '../../lib/utils';
import { ChartContainer } from './chart';
import type { ChartConfig } from './types';

export interface ChartFunnelStage {
	id: string;
	label: string;
	value: number;
	/** Optional time-to-complete shown in the conversion tooltip block (e.g. "1h 26m"). */
	avgTime?: string;
}

export interface ChartFunnelProps extends Omit<React.ComponentProps<'div'>, 'children'> {
	stages: ChartFunnelStage[];
	ariaLabel: string;
	color?: string;
	brightColor?: string;
	legendLabel?: React.ReactNode;
	height?: number;
	formatValue?: (value: number) => string;
}

interface FunnelDatum {
	id: string;
	label: string;
	index: number;
	value: number;
	prevValue: number;
	overallTotal: number;
	avgTime?: string;
	filled: number;
	rest: number;
	pct: number;
}

type Segment = 'filled' | 'rest';

interface SimpleTooltipProps {
	active?: boolean;
	payload?: Array<{ payload?: FunnelDatum; dataKey?: string }>;
	segment: Segment;
	legendLabel: React.ReactNode;
	color: string;
	brightColor: string;
	formatValue: (v: number) => string;
}

const FunnelTooltipContent = React.memo(function FunnelTooltipContent({
	active,
	payload,
	segment,
	legendLabel,
	color,
	brightColor,
	formatValue,
}: SimpleTooltipProps) {
	if (!active || !payload?.length) return null;
	const d = payload[0].payload;
	if (!d) return null;

	if (segment === 'rest') {
		const dropOff = Math.max(d.prevValue - d.value, 0);
		const dropOffPct = d.prevValue > 0 ? (dropOff / d.prevValue) * 100 : 0;
		return (
			<div className="min-w-48 rounded-md border border-chart-tooltip-border bg-chart-tooltip-bg p-3 text-xs shadow-lg">
				<div className="text-sm font-semibold text-ink-dark">{legendLabel}</div>
				<div className="mb-2 text-xs text-ink">{d.label}</div>
				<div className="flex gap-2.5">
					<span
						aria-hidden
						className="block w-1 self-stretch rounded-sm"
						style={{
							background: `repeating-linear-gradient(-45deg, ${brightColor} 0 3px, transparent 3px 6px)`,
						}}
					/>
					<div className="flex flex-col gap-0.5">
						<span className="flex items-baseline gap-1 text-base font-semibold tabular-nums text-ink-dark">
							{dropOffPct.toFixed(1)}%
							<span className="text-xs font-normal text-ink">drop-off</span>
						</span>
						<span className="text-xs tabular-nums text-ink">{formatValue(dropOff)}</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-w-48 rounded-md border border-chart-tooltip-border bg-chart-tooltip-bg p-3 text-xs shadow-lg">
			<div className="text-sm font-semibold text-ink-dark">{legendLabel}</div>
			<div className="mb-2 text-xs text-ink">{d.label}</div>
			<div className="flex gap-2.5">
				<span
					aria-hidden
					className="block w-1 self-stretch rounded-sm"
					style={{ backgroundColor: color }}
				/>
				<div className="flex flex-col gap-0.5">
					<span className="flex items-baseline gap-1 text-base font-semibold tabular-nums text-ink-dark">
						{d.pct.toFixed(1)}%
						<span className="text-xs font-normal text-ink">of overall</span>
					</span>
					<span className="text-xs tabular-nums text-ink">{formatValue(d.value)}</span>
				</div>
			</div>
		</div>
	);
});

function StageTick(props: {
	x?: number;
	y?: number;
	payload?: { value?: string; index?: number };
	index?: number;
}) {
	const { x = 0, y = 0, payload } = props;
	const text = payload?.value ?? '';
	const stageNumber = (payload?.index ?? props.index ?? 0) + 1;
	const words = text.split(' ');
	let lines: string[];
	if (words.length <= 1) {
		lines = [text];
	} else if (words.length === 2) {
		lines = words;
	} else {
		const mid = Math.ceil(words.length / 2);
		lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
	}
	return (
		<g transform={`translate(${x},${y})`}>
			<text textAnchor="middle" fontSize={12} fontWeight={500}>
				{lines.map((line, i) => (
					<tspan key={i} x={0} dy={i === 0 ? 14 : 14}>
						{i === 0 && (
							<tspan className="fill-ink-light tabular-nums">{stageNumber} </tspan>
						)}
						<tspan className="fill-ink-dark">{line}</tspan>
					</tspan>
				))}
			</text>
		</g>
	);
}

export function ChartFunnel({
	stages,
	ariaLabel,
	color = 'var(--color-chart-1)',
	brightColor = 'var(--color-chart-1-bright)',
	legendLabel = 'All Users; Overall',
	height = 320,
	formatValue,
	className,
	...rest
}: ChartFunnelProps) {
	const total = stages[0]?.value ?? 0;
	const reactId = React.useId();
	const patternId = `funnel-pattern-${reactId.replace(/:/g, '')}`;

	const data: FunnelDatum[] = React.useMemo(
		() =>
			stages.map((s, i) => {
				const pct = total > 0 ? (s.value / total) * 100 : 0;
				const prev = i > 0 ? stages[i - 1] : s;
				return {
					id: s.id,
					label: s.label,
					index: i,
					value: s.value,
					prevValue: prev.value,
					overallTotal: total,
					avgTime: s.avgTime,
					filled: pct,
					rest: 100 - pct,
					pct,
				};
			}),
		[stages, total]
	);

	const fmt = formatValue ?? ((v: number) => v.toLocaleString());
	const config: ChartConfig = React.useMemo(
		() => ({ filled: { label: 'Converted', color } }),
		[color]
	);

	const [hover, setHover] = React.useState<{ seg: Segment; idx: number } | null>(null);

	// Stable handlers — defining them inline would invalidate Bar memoization on every render.
	const onEnterFilled = React.useCallback(
		(_: unknown, idx: number) => setHover({ seg: 'filled', idx }),
		[]
	);
	const onEnterRest = React.useCallback(
		(_: unknown, idx: number) => setHover({ seg: 'rest', idx }),
		[]
	);
	const onChartLeave = React.useCallback(() => setHover(null), []);

	// Keep stroke synced with recharts' active stage. When the tooltip switches to
	// a different bar (e.g. cursor moves through the gap between bars) the previous
	// segment's stroke would otherwise stick. Clear it as soon as the active index
	// diverges from the segment the user actually entered.
	const onChartMove = React.useCallback(
		(state: { isTooltipActive?: boolean; activeTooltipIndex?: number }) => {
			setHover(prev => {
				if (!state?.isTooltipActive) return prev ? null : prev;
				if (prev && state.activeTooltipIndex !== prev.idx) return null;
				return prev;
			});
		},
		[]
	);

	// Per-Bar shape — renders the cell plus a stroke outline (with 2px white gap)
	// only on the hovered segment. Memoized factory bound to current hover state.
	const makeShape = React.useCallback(
		(seg: Segment) =>
			function ShapeRenderer(props: unknown) {
				const p = props as {
					x?: number;
					y?: number;
					width?: number;
					height?: number;
					fill?: string;
					index?: number;
				};
				const x = Number(p.x ?? 0);
				const y = Number(p.y ?? 0);
				const w = Number(p.width ?? 0);
				const h = Number(p.height ?? 0);
				const idx = p.index ?? 0;
				const isHovered = hover?.seg === seg && hover.idx === idx;
				const gap = 2;
				const sw = 1.5;
				return (
					<g>
						<rect x={x} y={y} width={w} height={h} fill={p.fill} />
						{isHovered && (
							<rect
								x={x - gap - sw / 2}
								y={y - gap - sw / 2}
								width={w + (gap + sw / 2) * 2}
								height={h + (gap + sw / 2) * 2}
								fill="none"
								stroke={color}
								strokeWidth={sw}
								rx={4}
							/>
						)}
					</g>
				);
			},
		[hover, color]
	);
	const filledShape = React.useMemo(() => makeShape('filled'), [makeShape]);
	const restShape = React.useMemo(() => makeShape('rest'), [makeShape]);

	return (
		<div className={cn('flex flex-col gap-3', className)} {...rest}>
			<ChartContainer
				config={config}
				ariaLabel={ariaLabel}
				className="aspect-auto w-full"
				style={{ height }}
			>
				<BarChart
					data={data}
					margin={{ top: 16, right: 16, bottom: 8, left: 8 }}
					barCategoryGap="18%"
					onMouseMove={onChartMove}
					onMouseLeave={onChartLeave}
				>
					<defs>
						<pattern
							id={patternId}
							width="8"
							height="8"
							patternUnits="userSpaceOnUse"
							patternTransform="rotate(-45)"
						>
							<rect width="8" height="8" fill={brightColor} fillOpacity="0.35" />
							<line x1="0" y1="0" x2="0" y2="8" stroke={brightColor} strokeWidth="3" />
						</pattern>
					</defs>
					<CartesianGrid vertical={false} stroke="var(--color-chart-grid)" strokeDasharray="2 4" />
					<XAxis
						dataKey="label"
						tickLine={false}
						axisLine={false}
						interval={0}
						height={44}
						tick={<StageTick />}
					/>
					<YAxis
						tickFormatter={v => `${v}%`}
						domain={[0, 100]}
						ticks={[0, 50, 100]}
						tickLine={false}
						axisLine={false}
						width={36}
						tick={{ fill: 'var(--color-ink-light)', fontSize: 11 }}
					/>
					<Tooltip
						cursor={{ fill: 'transparent' }}
						content={props => (
							<FunnelTooltipContent
								active={props.active}
								payload={
									props.payload as Array<{ payload?: FunnelDatum; dataKey?: string }>
								}
								segment={hover?.seg ?? 'filled'}
								legendLabel={legendLabel}
								color={color}
								brightColor={brightColor}
								formatValue={fmt}
							/>
						)}
					/>
					<Bar
						dataKey="filled"
						stackId="a"
						isAnimationActive={false}
						shape={filledShape}
						onMouseEnter={onEnterFilled}
					>
						{data.map(d => (
							<Cell key={`f-${d.id}`} fill={color} />
						))}
					</Bar>
					<Bar
						dataKey="rest"
						stackId="a"
						isAnimationActive={false}
						shape={restShape}
						onMouseEnter={onEnterRest}
					>
						{data.map(d => (
							<Cell key={`r-${d.id}`} fill={`url(#${patternId})`} />
						))}
						{/* LabelList on the LATER (rest) bar so pills paint on top of all bars.
						   position="bottom" of rest = top of filled = the segment boundary. */}
						<LabelList
							dataKey="pct"
							position="bottom"
							content={(p: {
								x?: number | string;
								y?: number | string;
								width?: number | string;
								height?: number | string;
								index?: number;
							}) => {
								const x = Number(p.x ?? 0);
								const y = Number(p.y ?? 0);
								const height = Number(p.height ?? 0);
								const width = Number(p.width ?? 0);
								const idx = p.index ?? 0;
								const row = data[idx];
								const cx = x + width / 2;
								// y = top of rest. boundary = y + height (= top of filled).
								const boundaryY = y + height;
								return (
									<g transform={`translate(${cx},${boundaryY - 15})`}>
										<rect
											x={-26}
											y={0}
											width={52}
											height={30}
											rx={4}
											fill="var(--color-panel)"
											stroke="var(--color-border)"
										/>
										<text
											x={0}
											y={12}
											textAnchor="middle"
											fontSize={11}
											fontWeight={700}
											className="fill-ink-dark"
										>
											{row.pct.toFixed(1)}%
										</text>
										<text
											x={0}
											y={24}
											textAnchor="middle"
											fontSize={10}
											className="fill-ink-light"
										>
											{fmt(row.value)}
										</text>
									</g>
								);
							}}
						/>
					</Bar>
				</BarChart>
			</ChartContainer>

			<div className="flex items-center justify-center gap-1.5 text-xs font-medium text-ink">
				<span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
				{legendLabel}
			</div>
		</div>
	);
}
