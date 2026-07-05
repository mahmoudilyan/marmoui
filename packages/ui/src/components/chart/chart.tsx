'use client';

import * as React from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';
import { type ChartConfig, type ChartContextValue, THEMES } from './types';

const ChartContext = React.createContext<ChartContextValue | null>(null);

export function useChart(): ChartContextValue {
	const ctx = React.useContext(ChartContext);
	if (!ctx) {
		throw new Error('useChart must be used inside <ChartContainer>');
	}
	return ctx;
}

export interface ChartContainerProps extends React.ComponentProps<'div'> {
	config: ChartConfig;
	id?: string;
	ariaLabel: string;
	ariaDescribedBy?: string;
	children: React.ComponentProps<typeof ResponsiveContainer>['children'];
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
	function ChartContainer(props, ref) {
		const { id, config, ariaLabel, ariaDescribedBy, className, children, ...rest } = props;

		const reactId = React.useId();
		const chartId = `chart-${(id ?? reactId).replace(/:/g, '')}`;

		const containerRef = React.useRef<HTMLDivElement | null>(null);
		React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

		React.useEffect(() => {
			const root = containerRef.current?.querySelector('svg');
			if (!root) return;
			root.setAttribute('role', 'img');
			root.setAttribute('aria-label', ariaLabel);
			if (ariaDescribedBy) {
				root.setAttribute('aria-describedby', ariaDescribedBy);
			}
		}, [ariaLabel, ariaDescribedBy, children]);

		const ctxValue = React.useMemo(() => ({ config }), [config]);

		return (
			<ChartContext.Provider value={ctxValue}>
				<div
					ref={containerRef}
					data-chart={chartId}
					data-slot="chart"
					tabIndex={0}
					className={cn(
						'relative flex aspect-video w-full justify-center text-xs outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
						'[&_.recharts-cartesian-axis-tick_text]:fill-ink-light',
						'[&_.recharts-cartesian-grid_line]:stroke-chart-grid',
						"[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-chart-grid",
						'[&_.recharts-radial-bar-background-sector]:fill-muted',
						'[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-bg',
						"[&_.recharts-reference-line_[stroke='#ccc']]:stroke-chart-grid",
						"[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
						'[&_.recharts-layer]:outline-none',
						"[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
						'[&_.recharts-sector]:outline-none',
						'[&_.recharts-surface]:outline-none',
						'motion-reduce:**:animate-none! motion-reduce:**:transition-none!',
						className
					)}
					{...rest}
				>
					<ChartStyle id={chartId} config={config} />
					<ResponsiveContainer>{children}</ResponsiveContainer>
				</div>
			</ChartContext.Provider>
		);
	}
);

export function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
	const colorEntries = Object.entries(config).filter(([, value]) => value.color || value.theme);

	if (!colorEntries.length) return null;

	return (
		<style
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: Object.entries(THEMES)
					.map(
						([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorEntries
	.map(([key, value]) => {
		const color = value.theme?.[theme as keyof typeof value.theme] || value.color;
		return color ? `  --color-${key}: ${color};` : '';
	})
	.join('\n')}
}`
					)
					.join('\n'),
			}}
		/>
	);
}
