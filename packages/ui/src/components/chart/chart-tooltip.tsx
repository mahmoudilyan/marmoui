'use client';

import * as React from 'react';
import { Tooltip as RechartsTooltip } from 'recharts';
import { cn } from '../../lib/utils';
import { useChart } from './chart';

export const ChartTooltip = RechartsTooltip;

type Indicator = 'bar' | 'square' | 'line' | 'dot' | 'dashed';

export interface ChartTooltipContentProps
	extends Omit<React.ComponentProps<'div'>, 'content'> {
	active?: boolean;
	payload?: Array<{
		name?: string;
		value?: number | string;
		dataKey?: string;
		payload?: Record<string, unknown>;
		color?: string;
	}>;
	label?: React.ReactNode;
	/** Visual treatment for the per-row indicator. Default: `bar` for single-row tooltips, `square` for multi-row. */
	indicator?: Indicator;
	/** Style for the comparison row's indicator (when `comparePayload` provided). Default: `dashed`. */
	compareIndicator?: 'dashed' | 'striped' | 'line';
	hideLabel?: boolean;
	hideIndicator?: boolean;
	/** Suffix appended to the numeric value (e.g. "users", "$"). */
	unit?: React.ReactNode;
	/** Optional comparison payload (e.g. previous-period values). Renders below the main rows. */
	comparePayload?: Array<{
		name?: string;
		value?: number | string;
		dataKey?: string;
		payload?: Record<string, unknown>;
		color?: string;
	}>;
	/** Optional comparison label override (e.g. previous-period date). */
	compareLabel?: React.ReactNode;
	/** When `delta` is supplied, render the delta pill with "from previous period" copy. */
	delta?: number;
	/** Override the comparison-row trailing copy. Default: "from previous period". */
	deltaCaption?: React.ReactNode;
	labelFormatter?: (label: React.ReactNode, payload: NonNullable<ChartTooltipContentProps['payload']>) => React.ReactNode;
	formatter?: (
		value: ChartTooltipContentProps['payload'] extends Array<infer U>
			? U extends { value?: infer V }
				? V
				: never
			: never,
		name: string,
		item: NonNullable<ChartTooltipContentProps['payload']>[number],
		index: number
	) => React.ReactNode;
	nameKey?: string;
	labelKey?: string;
	color?: string;
}

function formatValue(value: number | string | undefined): string {
	if (value === undefined || value === null) return '—';
	if (typeof value === 'number') return value.toLocaleString();
	return String(value);
}

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
	function ChartTooltipContent(
		{
			active,
			payload,
			className,
			indicator,
			compareIndicator = 'dashed',
			hideLabel = false,
			hideIndicator = false,
			label,
			labelFormatter,
			formatter,
			nameKey,
			labelKey,
			color,
			unit,
			comparePayload,
			compareLabel,
			delta,
			deltaCaption = 'from previous period',
			...rest
		},
		ref
	) {
		const { config } = useChart();

		if (!active || !payload?.length) return null;

		const resolvedIndicator: Indicator =
			indicator ?? (payload.length >= 2 ? 'square' : 'bar');

		const resolveTitle = (): React.ReactNode => {
			if (hideLabel) return null;
			const [item] = payload;
			const key = labelKey || (item.dataKey as string | undefined) || (item.name as string | undefined);
			const itemConfig = key ? config[key] : undefined;
			const value =
				!labelKey && typeof label === 'string'
					? config[label as keyof typeof config]?.label || label
					: itemConfig?.label;
			if (labelFormatter) return labelFormatter(value ?? label, payload);
			if (!value && !label) return null;
			return value || label;
		};

		const renderIndicator = (variant: Indicator | 'striped', tone?: string) => {
			if (hideIndicator) return null;
			if (variant === 'bar') {
				return (
					<span
						aria-hidden
						className="block w-1 self-stretch rounded-sm"
						style={{ backgroundColor: tone }}
					/>
				);
			}
			if (variant === 'square') {
				return (
					<span
						aria-hidden
						className="block size-3 shrink-0 self-center rounded-[3px]"
						style={{ backgroundColor: tone }}
					/>
				);
			}
			if (variant === 'line') {
				return (
					<span
						aria-hidden
						className="block h-0.5 w-3 self-center rounded"
						style={{ backgroundColor: tone }}
					/>
				);
			}
			if (variant === 'dot') {
				return (
					<span
						aria-hidden
						className="block size-2.5 shrink-0 self-center rounded-[2px]"
						style={{ backgroundColor: tone }}
					/>
				);
			}
			if (variant === 'dashed') {
				return (
					<span
						aria-hidden
						className="block w-1 self-stretch rounded-sm border-2 border-dashed"
						style={{ borderColor: tone }}
					/>
				);
			}
			// striped
			return (
				<span
					aria-hidden
					className="block w-1 self-stretch rounded-sm"
					style={{
						background: `repeating-linear-gradient(135deg, ${tone} 0 3px, transparent 3px 6px)`,
					}}
				/>
			);
		};

		const renderRow = (
			item: NonNullable<ChartTooltipContentProps['payload']>[number],
			variant: Indicator | 'striped',
			labelOverride?: React.ReactNode
		) => {
			const key =
				nameKey ||
				(item.name as string | undefined) ||
				(item.dataKey as string | undefined) ||
				'value';
			const itemConfig = key ? config[key] : undefined;
			const tone =
				color ||
				(item.payload as Record<string, string>)?.fill ||
				item.color ||
				'currentColor';
			const seriesLabel = labelOverride ?? itemConfig?.label ?? item.name ?? key;
			const formattedValue =
				item.value !== undefined && formatter && item.name
					? formatter(item.value as never, item.name, item, 0)
					: formatValue(item.value);

			// Compact single-line layout for square/dot indicators
			if (variant === 'square' || variant === 'dot') {
				return (
					<div className="flex items-center gap-2">
						{renderIndicator(variant, tone)}
						<div className="flex min-w-0 flex-1 items-center justify-between gap-3">
							<span className="text-xs text-ink-light">{seriesLabel}</span>
							<span className="flex items-baseline gap-1 text-xs font-semibold tabular-nums text-ink-dark">
								{formattedValue}
								{unit && <span className="font-normal text-ink-light">{unit}</span>}
							</span>
						</div>
					</div>
				);
			}

			return (
				<div className="flex gap-2.5">
					{renderIndicator(variant, tone)}
					<div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-tight">
						<span className="text-xs text-ink-light">{seriesLabel}</span>
						<span className="flex items-baseline gap-1 font-semibold tabular-nums text-ink-dark">
							{formattedValue}
							{unit && <span className="text-xs font-normal text-ink-light">{unit}</span>}
						</span>
					</div>
				</div>
			);
		};

		const title = resolveTitle();

		return (
			<div
				ref={ref}
				className={cn(
					'min-w-[10rem] rounded-md border border-chart-tooltip-border bg-chart-tooltip-bg p-3 text-xs shadow-lg',
					className
				)}
				{...rest}
			>
				{title && (
					<div className="mb-2 text-sm font-semibold text-ink-dark">{title}</div>
				)}
				<div className="flex flex-col gap-2">
					{payload.map((item, i) => (
						<React.Fragment key={`p-${item.dataKey ?? item.name ?? i}`}>
							{renderRow(item, resolvedIndicator)}
						</React.Fragment>
					))}
					{delta !== undefined && (
						<div className="flex items-center gap-1.5">
							<span
								className={cn(
									'inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs font-semibold tabular-nums',
									delta >= 0
										? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
										: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
								)}
							>
								{delta >= 0 ? '+' : ''}
								{delta.toFixed(2)}%
							</span>
							<span className="text-xs text-ink-light">{deltaCaption}</span>
						</div>
					)}
					{comparePayload?.length ? (
						<div className="flex flex-col gap-2 border-t border-border-secondary pt-2">
							{comparePayload.map((item, i) => (
								<React.Fragment key={`c-${item.dataKey ?? item.name ?? i}`}>
									{renderRow(item, compareIndicator, compareLabel)}
								</React.Fragment>
							))}
						</div>
					) : null}
				</div>
			</div>
		);
	}
);
