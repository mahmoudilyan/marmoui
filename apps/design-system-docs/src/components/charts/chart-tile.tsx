'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@marmoui/ui';
import { cn } from '@/lib/utils';

type ChartTileState = 'idle' | 'loading' | 'empty' | 'error' | 'no-data-for-range';

type ChartTileProps = {
	question: string;
	hint?: React.ReactNode;
	toolbar?: React.ReactNode;
	filters?: React.ReactNode;
	footer?: React.ReactNode;
	state?: ChartTileState;
	emptyTitle?: string;
	emptyBody?: React.ReactNode;
	emptyAction?: React.ReactNode;
	errorTitle?: string;
	errorBody?: React.ReactNode;
	errorAction?: React.ReactNode;
	noDataMessage?: React.ReactNode;
	height?: number | string;
	className?: string;
	children?: React.ReactNode;
};

export function ChartTile({
	question,
	hint,
	toolbar,
	filters,
	footer,
	state = 'idle',
	emptyTitle = 'Nothing to show yet',
	emptyBody,
	emptyAction,
	errorTitle = 'Something went wrong',
	errorBody = "We couldn't load this chart. Try again.",
	errorAction,
	noDataMessage = 'No events in this range. Try a wider window.',
	height,
	className,
	children,
}: ChartTileProps) {
	const isStateOverlay = state !== 'idle';
	const heightStyle =
		height != null ? { height: typeof height === 'number' ? `${height}px` : height } : undefined;
	const minHeightStyle = isStateOverlay && !heightStyle ? { minHeight: 160 } : undefined;

	return (
		<Card className={cn('not-prose overflow-hidden border-border', className)}>
			<CardHeader
				className={cn(
					'flex flex-col gap-3 border-0 p-4 pb-2',
					filters ? 'border-b border-border-secondary pb-3' : undefined
				)}
			>
				<div className="flex flex-row items-start justify-between gap-3">
					<div className="flex min-w-0 flex-col gap-0.5">
						<CardTitle className="truncate text-sm font-semibold text-ink-dark">
							{question}
						</CardTitle>
						{hint && <span className="text-xs text-ink-light">{hint}</span>}
					</div>
					{toolbar && <div className="-mt-1 flex shrink-0 items-center gap-1.5">{toolbar}</div>}
				</div>
				{filters && <div className="flex flex-wrap items-center gap-2">{filters}</div>}
			</CardHeader>
			<CardContent className="p-4 pt-2">
				<div className="relative w-full" style={{ ...heightStyle, ...minHeightStyle }}>
					{state === 'loading' && <ChartSkeleton />}
					{state === 'error' && (
						<TileMessage
							tone="danger"
							title={errorTitle}
							body={errorBody}
							action={errorAction}
						/>
					)}
					{state === 'empty' && (
						<TileMessage
							tone="neutral"
							title={emptyTitle}
							body={emptyBody}
							action={emptyAction}
						/>
					)}
					{state === 'no-data-for-range' && (
						<div className="flex h-full items-center justify-center text-center text-xs text-ink-light">
							{noDataMessage}
						</div>
					)}
					{state === 'idle' && children}
				</div>
				{footer && <div className="mt-3 text-xs text-ink-light">{footer}</div>}
			</CardContent>
		</Card>
	);
}

function ChartSkeleton() {
	return (
		<div className="flex h-full items-end gap-2 px-2 pb-2 pt-4">
			{[60, 90, 45, 75, 50, 80, 65].map((h, i) => (
				<div
					key={i}
					className="flex-1 animate-pulse rounded bg-secondary"
					style={{ height: `${h}%` }}
				/>
			))}
		</div>
	);
}

function TileMessage({
	tone,
	title,
	body,
	action,
}: {
	tone: 'neutral' | 'danger';
	title: string;
	body?: React.ReactNode;
	action?: React.ReactNode;
}) {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-2 text-center">
			<div
				className={cn(
					'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
					tone === 'danger' ? 'bg-red-500/10 text-red-700 dark:text-red-400' : 'bg-secondary text-ink-light'
				)}
			>
				{tone === 'danger' ? 'Error' : 'Empty'}
			</div>
			<div className="text-sm font-medium text-ink-dark">{title}</div>
			{body && <div className="max-w-xs text-xs text-ink-light">{body}</div>}
			{action && <div className="mt-1">{action}</div>}
		</div>
	);
}
