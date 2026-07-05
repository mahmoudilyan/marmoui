'use client';

import * as React from 'react';
import { Legend as RechartsLegend } from 'recharts';
import { cn } from '../../lib/utils';
import { useChart } from './chart';

export const ChartLegend = RechartsLegend;

export interface ChartLegendContentProps extends React.ComponentProps<'div'> {
	payload?: Array<{
		value?: string;
		dataKey?: string;
		color?: string;
		type?: string;
	}>;
	verticalAlign?: 'top' | 'middle' | 'bottom';
	hideIcon?: boolean;
	nameKey?: string;
}

export const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
	function ChartLegendContent(
		{ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey, ...rest },
		ref
	) {
		const { config } = useChart();

		if (!payload?.length) return null;

		return (
			<div
				ref={ref}
				className={cn(
					'flex items-center justify-center gap-4',
					verticalAlign === 'top' ? 'pb-3' : 'pt-3',
					className
				)}
				{...rest}
			>
				{payload.map(item => {
					const key =
						nameKey ||
						(item.dataKey as string | undefined) ||
						(item.value as string | undefined) ||
						'value';
					const itemConfig = key ? config[key] : undefined;

					return (
						<div key={item.value || key} className="flex items-center gap-1.5 text-xs text-ink">
							{itemConfig?.icon && !hideIcon ? (
								<itemConfig.icon className="h-3 w-3" />
							) : (
								!hideIcon && (
									<div
										className="h-2 w-2 shrink-0 rounded-sm"
										style={{ backgroundColor: item.color }}
									/>
								)
							)}
							{itemConfig?.label || item.value}
						</div>
					);
				})}
			</div>
		);
	}
);
