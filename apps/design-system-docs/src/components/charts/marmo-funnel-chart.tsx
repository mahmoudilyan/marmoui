'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CHART_TOKENS, formatFull, formatPercent, sequentialOpacities } from './palette';

export type FunnelStage = {
	name: string;
	value: number;
};

type MarmoFunnelChartProps = {
	stages: FunnelStage[];
	maxStages?: number;
	showDropoff?: boolean;
	height?: number;
};

export function MarmoFunnelChart({
	stages,
	maxStages = 6,
	showDropoff = true,
	height,
}: MarmoFunnelChartProps) {
	if (stages.length > maxStages) {
		console.warn(
			`[MarmoFunnelChart] ${stages.length} stages exceeds the maxStages cap (${maxStages}). Truncating.`
		);
	}

	const visible = stages.slice(0, maxStages);
	const top = visible[0]?.value ?? 0;
	const opacities = sequentialOpacities(visible.length).reverse();

	return (
		<ol
			role="list"
			aria-label="Funnel stages"
			className={cn('not-prose flex flex-col gap-2')}
			style={height ? { minHeight: height } : undefined}
		>
			{visible.map((stage, i) => {
				const widthPct = top > 0 ? (stage.value / top) * 100 : 0;
				const stagePct = top > 0 ? stage.value / top : 0;
				const prev = i > 0 ? visible[i - 1] : undefined;
				const dropoff =
					prev && prev.value > 0 ? (stage.value - prev.value) / prev.value : null;
				const opacity = opacities[i] ?? 1;

				return (
					<li key={stage.name} className="flex flex-col gap-0.5">
						<div className="flex items-baseline justify-between text-xs">
							<span className="font-medium text-ink-dark">{stage.name}</span>
							<span className="tabular-nums text-ink-light">
								{formatFull(stage.value)} · {formatPercent(stagePct, 1)}
							</span>
						</div>
						<div
							className="relative h-7 overflow-hidden rounded-md bg-secondary/40"
							role="img"
							aria-label={`${stage.name}: ${stage.value}, ${formatPercent(stagePct, 1)} of top`}
						>
							<div
								className="h-full rounded-md transition-[width] duration-300 ease-out"
								style={{
									width: `${Math.max(widthPct, 1.5)}%`,
									background: CHART_TOKENS.accent,
									opacity,
								}}
							/>
						</div>
						{showDropoff && dropoff != null && i > 0 && (
							<div className="ml-2 flex items-center gap-1 text-[11px] text-ink-light">
								<span aria-hidden>↓</span>
								<span className="tabular-nums">{formatPercent(dropoff, 1)}</span>
								<span>vs. {prev?.name}</span>
							</div>
						)}
					</li>
				);
			})}
		</ol>
	);
}
