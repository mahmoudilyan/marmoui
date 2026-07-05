'use client';

import * as React from 'react';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { Card, CardContent } from '@marmoui/ui';
import { cn } from '@/lib/utils';
import { formatFull } from './palette';

type KPIScorecardProps = {
	label: string;
	value: number | string;
	delta?: number;
	deltaLabel?: string;
	deltaTone?: 'auto' | 'positive' | 'negative' | 'neutral';
	hint?: React.ReactNode;
	prefix?: string;
	suffix?: string;
	className?: string;
};

export function KPIScorecard({
	label,
	value,
	delta,
	deltaLabel,
	deltaTone = 'auto',
	hint,
	prefix,
	suffix,
	className,
}: KPIScorecardProps) {
	const valueText = typeof value === 'number' ? formatFull(value) : value;

	const tone =
		deltaTone === 'auto'
			? delta == null
				? 'neutral'
				: delta > 0
					? 'positive'
					: delta < 0
						? 'negative'
						: 'neutral'
			: deltaTone;

	return (
		<Card className={cn('not-prose border-border', className)}>
			<CardContent className="flex flex-col gap-1 p-4">
				<span className="text-xs font-medium uppercase tracking-wide text-ink-light">{label}</span>
				<span className="font-heading text-2xl font-semibold tabular-nums text-ink-dark">
					{prefix}
					{valueText}
					{suffix}
				</span>
				<div className="flex items-center gap-2 text-xs">
					{delta != null && (
						<span
							className={cn(
								'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold tabular-nums',
								tone === 'positive' && 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
								tone === 'negative' && 'bg-red-500/10 text-red-700 dark:text-red-400',
								tone === 'neutral' && 'bg-secondary text-ink-light'
							)}
						>
							{tone === 'positive' && <MdArrowUpward aria-hidden className="size-3" />}
							{tone === 'negative' && <MdArrowDownward aria-hidden className="size-3" />}
							{delta > 0 ? '+' : ''}
							{formatFull(delta)}
						</span>
					)}
					{deltaLabel && <span className="text-ink-light">{deltaLabel}</span>}
				</div>
				{hint && <span className="mt-0.5 text-xs text-ink-light">{hint}</span>}
			</CardContent>
		</Card>
	);
}
