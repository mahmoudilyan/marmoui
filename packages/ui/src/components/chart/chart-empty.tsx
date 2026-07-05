'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ChartEmptyProps extends React.ComponentProps<'div'> {
	heading: string;
	body?: React.ReactNode;
	action?: React.ReactNode;
	icon?: React.ReactNode;
	height?: number | string;
}

export function ChartEmpty({
	heading,
	body,
	action,
	icon,
	height = 240,
	className,
	...rest
}: ChartEmptyProps) {
	return (
		<div
			data-slot="chart-empty"
			role="img"
			aria-label={heading}
			className={cn(
				'flex w-full flex-col items-center justify-center rounded-md border border-dashed border-border bg-bg p-6 text-center',
				className
			)}
			style={{ minHeight: height }}
			{...rest}
		>
			{icon && (
				<div className="mb-3 text-ink-light" aria-hidden>
					{icon}
				</div>
			)}
			<h3 className="text-sm font-semibold text-ink-dark">{heading}</h3>
			{body && <p className="mt-1 max-w-sm text-xs text-ink-light">{body}</p>}
			{action && <div className="mt-4">{action}</div>}
		</div>
	);
}
