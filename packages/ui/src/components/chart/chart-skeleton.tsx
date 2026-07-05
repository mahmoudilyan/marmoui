'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export type ChartSkeletonVariant = 'line' | 'bar' | 'area' | 'pie' | 'sparkline';

export interface ChartSkeletonProps extends React.ComponentProps<'div'> {
	variant?: ChartSkeletonVariant;
	height?: number | string;
}

export function ChartSkeleton({
	variant = 'line',
	height = 240,
	className,
	...rest
}: ChartSkeletonProps) {
	return (
		<div
			data-slot="chart-skeleton"
			role="img"
			aria-label="Loading chart"
			className={cn('relative w-full animate-pulse', className)}
			style={{ height }}
			{...rest}
		>
			{variant === 'pie' ? (
				<div className="absolute inset-0 m-auto aspect-square max-h-full max-w-full rounded-full bg-muted" />
			) : variant === 'bar' ? (
				<div className="absolute inset-x-2 bottom-2 top-2 flex items-end gap-2">
					{[60, 30, 80, 45, 70, 55, 90].map((h, i) => (
						<div
							key={i}
							className="flex-1 rounded-sm bg-muted"
							style={{ height: `${h}%` }}
						/>
					))}
				</div>
			) : variant === 'sparkline' ? (
				<div className="absolute inset-0 flex items-center px-2">
					<div className="h-1 w-full rounded-full bg-muted" />
				</div>
			) : (
				<div className="absolute inset-0 flex flex-col justify-between px-2 py-3">
					<div className="h-px w-full bg-chart-grid" />
					<div className="h-px w-full bg-chart-grid" />
					<div className="h-px w-full bg-chart-grid" />
					<div
						className={cn(
							'pointer-events-none absolute inset-x-3 top-1/3 h-1/3 rounded-md bg-muted',
							variant === 'area' && 'opacity-70'
						)}
					/>
				</div>
			)}
		</div>
	);
}
