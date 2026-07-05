'use client';

import * as React from 'react';
import { Warning } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import {
	Alert,
	AlertAction,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from './alert';
import { Button } from './button';

/** Raw status row as returned by the lifecycle API. */
export type LifecycleStatus = {
	label: string;
	leads: number;
	/** User-defined fill from the API. Ignored unless `useDataColors` is true. */
	color?: string;
};

export interface LeadLifecycleFunnelProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
	/** Lifecycle data as returned by the API. Order is preserved. */
	statuses: LifecycleStatus[];
	/** Labels whose rows are treated as data-quality flags (rendered as Alert above the funnel). Defaults to ["Poor Data"]. Matching is case-insensitive. */
	qualityFlagLabels?: string[];
	/** Use the `color` field from each status as the segment fill. Defaults to false — uses the chart palette. */
	useDataColors?: boolean;
	/** Action handler for the data-quality flag alert. Receives the flag label. */
	onReviewFlag?: (label: string) => void;
	/** Label for the quality-flag Alert action button. Defaults to "Review". */
	reviewLabel?: string;
	/** Optional copy override for the quality-flag Alert description. Receives the flag row. */
	flagDescription?: (flag: LifecycleStatus) => React.ReactNode;
	ariaLabel: string;
	/** Override numeric formatting in legend rows and tooltips. */
	formatValue?: (value: number) => string;
	/** Funnel SVG height in px. Defaults to 280. */
	height?: number;
	/**
	 * Minimum visible width of a funnel slice, as % of the maxValue band.
	 * Tiny stages stay legible. Defaults to 4.
	 */
	minSlicePercent?: number;
	/** Override the default categorical palette pulled from the chart tokens. */
	palette?: string[];
}

const defaultFormat = (n: number) => n.toLocaleString();

const DEFAULT_PALETTE = [
	'var(--color-chart-1)',
	'var(--color-chart-2)',
	'var(--color-chart-3)',
	'var(--color-chart-4)',
	'var(--color-chart-5)',
	'var(--color-chart-cat-teal)',
	'var(--color-chart-cat-violet)',
	'var(--color-chart-cat-blue)',
	'var(--color-chart-cat-orange)',
	'var(--color-chart-cat-pink)',
];

const DEFAULT_FLAG_LABELS = ['Poor Data'];

const defaultFlagDescription = (flag: LifecycleStatus) => (
	<>
		These leads are missing required fields and aren't counted in the lifecycle below.
		Review and re-tag <span className="font-medium">{flag.label.toLowerCase()}</span> to roll
		them into the funnel.
	</>
);

const LeadLifecycleFunnel = React.forwardRef<HTMLDivElement, LeadLifecycleFunnelProps>(
	function LeadLifecycleFunnel(
		{
			statuses,
			qualityFlagLabels = DEFAULT_FLAG_LABELS,
			useDataColors = false,
			onReviewFlag,
			reviewLabel = 'Review',
			flagDescription = defaultFlagDescription,
			ariaLabel,
			formatValue = defaultFormat,
			height = 280,
			minSlicePercent = 4,
			palette = DEFAULT_PALETTE,
			className,
			...rest
		},
		ref
	) {
		const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

		const flagLabelSet = React.useMemo(
			() => new Set(qualityFlagLabels.map((s) => s.toLowerCase())),
			[qualityFlagLabels]
		);

		const { stages, flags, grandTotal, stageTotal } = React.useMemo(() => {
			const fs: LifecycleStatus[] = [];
			const ss: LifecycleStatus[] = [];
			for (const row of statuses) {
				if (flagLabelSet.has(row.label.toLowerCase())) fs.push(row);
				else ss.push(row);
			}
			const sT = ss.reduce((sum, s) => sum + s.leads, 0);
			const fT = fs.reduce((sum, f) => sum + f.leads, 0);
			return { stages: ss, flags: fs, stageTotal: sT, grandTotal: sT + fT };
		}, [statuses, flagLabelSet]);

		const maxValue = stages.reduce((m, s) => Math.max(m, s.leads), 0);

		const formatPercent = (value: number, denominator: number) => {
			if (denominator <= 0) return '0.0%';
			return `${((value / denominator) * 100).toFixed(2)}%`;
		};

		const colorFor = (status: LifecycleStatus, index: number) => {
			if (useDataColors && status.color) return status.color;
			return palette[index % palette.length];
		};

		// Compute trapezoid widths in viewBox units (0–100), clamped to minSlicePercent.
		const stageWidths = React.useMemo(() => {
			return stages.map((s) => {
				const raw = maxValue > 0 ? (s.leads / maxValue) * 100 : 0;
				return Math.max(raw, minSlicePercent);
			});
		}, [stages, maxValue, minSlicePercent]);

		const segmentHeight = stages.length > 0 ? 100 / stages.length : 0;

		const polygonPoints = (index: number) => {
			const topW = stageWidths[index];
			const isLast = index === stages.length - 1;
			const botW = isLast
				? Math.max(topW * 0.18, minSlicePercent / 2)
				: stageWidths[index + 1];
			const yTop = index * segmentHeight;
			const yBot = (index + 1) * segmentHeight;
			const xLT = (100 - topW) / 2;
			const xRT = xLT + topW;
			const xLB = (100 - botW) / 2;
			const xRB = xLB + botW;
			return `${xLT},${yTop} ${xRT},${yTop} ${xRB},${yBot} ${xLB},${yBot}`;
		};

		return (
			<div
				ref={ref}
				role="group"
				aria-label={ariaLabel}
				className={cn('flex flex-col gap-3', className)}
				{...rest}
			>
				{flags.length > 0 && (
					<div className="flex flex-col gap-2" data-slot="lead-lifecycle-quality-flags">
						{flags.map((flag) => (
							<Alert key={flag.label} variant="warning">
								<AlertIcon>
									<Warning weight="duotone" aria-hidden />
								</AlertIcon>
								<AlertContent>
									<AlertTitle>
										{flag.label} — {formatValue(flag.leads)} ({formatPercent(flag.leads, grandTotal)} of total)
									</AlertTitle>
									<AlertDescription>{flagDescription(flag)}</AlertDescription>
									{onReviewFlag && (
										<AlertAction>
											<Button
												size="xs"
												variant="secondary"
												onClick={() => onReviewFlag(flag.label)}
											>
												{reviewLabel}
											</Button>
										</AlertAction>
									)}
								</AlertContent>
							</Alert>
						))}
					</div>
				)}

				<div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-6">
					{/* Funnel SVG */}
					<div
						className="relative"
						style={{ height }}
						onMouseLeave={() => setHoverIndex(null)}
					>
						<svg
							viewBox="0 0 100 100"
							preserveAspectRatio="none"
							className="block size-full overflow-visible"
							role="img"
							aria-label={ariaLabel}
						>
							{stages.map((stage, i) => {
								const fill = colorFor(stage, i);
								const isHover = hoverIndex === i;
								return (
									<polygon
										key={stage.label}
										points={polygonPoints(i)}
										fill={fill}
										fillOpacity={hoverIndex == null || isHover ? 1 : 0.4}
										stroke={isHover ? 'var(--color-panel)' : 'transparent'}
										strokeWidth={isHover ? 0.6 : 0}
										style={{ cursor: 'pointer', transition: 'fill-opacity 120ms ease' }}
										onMouseEnter={() => setHoverIndex(i)}
										onFocus={() => setHoverIndex(i)}
										onBlur={() => setHoverIndex(null)}
										tabIndex={0}
										aria-label={`${stage.label}: ${formatValue(stage.leads)}, ${formatPercent(stage.leads, stageTotal)} of lifecycle`}
									/>
								);
							})}
						</svg>

						{hoverIndex != null && stages[hoverIndex] && (
							<div
								role="tooltip"
								className="pointer-events-none absolute left-1/2 top-2 z-10 min-w-44 -translate-x-1/2 rounded-md border border-chart-tooltip-border bg-chart-tooltip-bg p-3 text-xs shadow-lg"
							>
								<div className="flex items-center gap-2">
									<span
										aria-hidden
										className="inline-block size-2.5 rounded-sm"
										style={{ background: colorFor(stages[hoverIndex], hoverIndex) }}
									/>
									<span className="font-semibold text-ink-dark">
										{stages[hoverIndex].label}
									</span>
								</div>
								<div className="mt-1 flex items-baseline justify-between gap-3 tabular-nums">
									<span className="text-ink-light">Leads</span>
									<span className="font-medium text-ink-dark">
										{formatValue(stages[hoverIndex].leads)}
									</span>
								</div>
								<div className="flex items-baseline justify-between gap-3 tabular-nums">
									<span className="text-ink-light">Share</span>
									<span className="font-medium text-ink-dark">
										{formatPercent(stages[hoverIndex].leads, stageTotal)}
									</span>
								</div>
							</div>
						)}
					</div>

					{/* Right-side legend aligned to each funnel segment */}
					<ol
						role="list"
						aria-label="Lifecycle stages legend"
						className="flex flex-col"
						style={{ height }}
						data-slot="lead-lifecycle-legend"
					>
						{stages.map((stage, i) => {
							const isHover = hoverIndex === i;
							return (
								<li
									key={stage.label}
									className={cn(
										'flex flex-1 items-center gap-2 rounded-md px-2 text-xs transition-colors',
										isHover && 'bg-secondary/50'
									)}
									onMouseEnter={() => setHoverIndex(i)}
									onMouseLeave={() => setHoverIndex(null)}
									data-stage-label={stage.label}
								>
									<span
										aria-hidden
										className="inline-block size-2.5 shrink-0 rounded-sm"
										style={{ background: colorFor(stage, i) }}
									/>
									<span className="min-w-0 flex-1 truncate font-medium text-ink-dark">
										{stage.label}
									</span>
									<span className="shrink-0 tabular-nums text-ink-light">
										{formatValue(stage.leads)} · {formatPercent(stage.leads, stageTotal)}
									</span>
								</li>
							);
						})}
					</ol>
				</div>
			</div>
		);
	}
);

LeadLifecycleFunnel.displayName = 'LeadLifecycleFunnel';

export { LeadLifecycleFunnel };
