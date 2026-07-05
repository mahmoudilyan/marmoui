'use client';

import * as React from 'react';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Card, CardContent } from './card';

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Metric label — rendered uppercase in caps style. */
	label: string;
	value: number | string;
	/** Numeric delta or pre-formatted string (e.g. "+8.4%"). */
	delta?: number | string;
	deltaLabel?: string;
	deltaTone?: 'auto' | 'positive' | 'negative' | 'neutral';
	hint?: React.ReactNode;
	prefix?: string;
	suffix?: string;
}

function formatFull(value: number): string {
	return new Intl.NumberFormat('en-US').format(value);
}

function resolveDeltaTone(
	delta: number | string | undefined,
	deltaTone: KpiCardProps['deltaTone']
): 'positive' | 'negative' | 'neutral' {
	if (deltaTone && deltaTone !== 'auto') {
		return deltaTone === 'positive' ? 'positive' : deltaTone === 'negative' ? 'negative' : 'neutral';
	}
	if (delta == null) return 'neutral';
	if (typeof delta === 'string') {
		const n = parseFloat(delta.replace(/[^0-9.-]/g, ''));
		if (Number.isNaN(n)) return 'neutral';
		return n > 0 ? 'positive' : n < 0 ? 'negative' : 'neutral';
	}
	return delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral';
}

function formatDelta(delta: number | string): string {
	if (typeof delta === 'string') return delta;
	return `${delta > 0 ? '+' : ''}${formatFull(delta)}`;
}

/**
 * KPI scorecard for dashboard metric strips.
 * Not sortable — pair with {@link Widget} for chart/list tiles in the same grid.
 */
export function KpiCard({
	label,
	value,
	delta,
	deltaLabel,
	deltaTone = 'auto',
	hint,
	prefix,
	suffix,
	className,
	...props
}: KpiCardProps) {
	const valueText = typeof value === 'number' ? formatFull(value) : value;
	const tone = resolveDeltaTone(delta, deltaTone);

	return (
		<Card className={cn('h-full', className)} {...props}>
			<CardContent className="flex flex-col gap-1 px-space-md py-space-md">
				<span className="text-caps-sm font-medium uppercase tracking-caps-sm text-ink-light">
					{label}
				</span>
				<span className="font-heading text-heading-lg font-semibold tabular-nums text-ink-dark">
					{prefix}
					{valueText}
					{suffix}
				</span>
				{(delta != null || deltaLabel) && (
					<div className="flex flex-wrap items-center gap-space-xs text-body-sm">
						{delta != null && (
							<span
								className={cn(
									'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold tabular-nums',
									tone === 'positive' && 'bg-green-500/10 text-ink-success',
									tone === 'negative' && 'bg-red-500/10 text-ink-destructive',
									tone === 'neutral' && 'bg-secondary text-ink-light'
								)}
							>
						{tone === 'positive' && <ArrowUp weight="duotone" aria-hidden className="size-3" />}
						{tone === 'negative' && <ArrowDown weight="duotone" aria-hidden className="size-3" />}
								{formatDelta(delta)}
							</span>
						)}
						{deltaLabel && <span className="text-ink-light">{deltaLabel}</span>}
					</div>
				)}
				{hint && <span className="text-body-sm text-ink-light">{hint}</span>}
			</CardContent>
		</Card>
	);
}
