'use client';

import * as React from 'react';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Label,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from 'recharts';
import {
	Alert,
	BarList,
	BarListLegend,
	Card,
	CardContent,
	ChartContainer,
	ChartEmpty,
	ChartLegend,
	ChartLegendContent,
	ChartSkeleton,
	ChartTable,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@marmoui/ui';
import { MdArrowDownward, MdArrowUpward, MdInbox } from 'react-icons/md';

const monthly = [
	{ month: 'Jan', revenue: 12400, refunds: 800 },
	{ month: 'Feb', revenue: 15600, refunds: 1100 },
	{ month: 'Mar', revenue: 18200, refunds: 950 },
	{ month: 'Apr', revenue: 17100, refunds: 1300 },
	{ month: 'May', revenue: 21500, refunds: 1450 },
	{ month: 'Jun', revenue: 24800, refunds: 1200 },
];

const lineConfig = {
	revenue: { label: 'Revenue', theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' } },
} satisfies ChartConfig;

const multiLineConfig = {
	revenue: { label: 'Revenue', theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' } },
	refunds: { label: 'Refunds', theme: { light: 'var(--color-chart-4)', dark: 'var(--color-chart-4)' } },
} satisfies ChartConfig;

export function ChartLinePreview() {
	return (
		<ChartContainer
			config={lineConfig}
			ariaLabel="Monthly revenue trend, January to June"
			className="aspect-[16/9] max-h-[280px] w-full"
		>
			<LineChart data={monthly} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
				<ChartTooltip
					cursor={{ stroke: 'var(--color-chart-grid)', strokeDasharray: '3 3' }}
					content={<ChartTooltipContent indicator="line" />}
				/>
				<Line
					dataKey="revenue"
					type="monotone"
					stroke="var(--color-revenue)"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ChartContainer>
	);
}

export function ChartMultiLinePreview() {
	return (
		<ChartContainer
			config={multiLineConfig}
			ariaLabel="Monthly revenue and refunds, January to June"
			className="aspect-[16/9] max-h-[300px] w-full"
		>
			<LineChart data={monthly} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
				<ChartTooltip
					cursor={{ stroke: 'var(--color-chart-grid)', strokeDasharray: '3 3' }}
					content={<ChartTooltipContent />}
				/>
				<ChartLegend content={<ChartLegendContent />} />
				<Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
				<Line dataKey="refunds" type="monotone" stroke="var(--color-refunds)" strokeWidth={2} dot={false} />
			</LineChart>
		</ChartContainer>
	);
}

export function ChartAreaPreview() {
	return (
		<ChartContainer
			config={lineConfig}
			ariaLabel="Revenue area trend"
			className="aspect-[16/9] max-h-[280px] w-full"
		>
			<AreaChart data={monthly} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
				<defs>
					<linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.4} />
						<stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
					</linearGradient>
				</defs>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
				<ChartTooltip
					cursor={{ stroke: 'var(--color-chart-grid)', strokeDasharray: '3 3' }}
					content={<ChartTooltipContent />}
				/>
				<Area
					dataKey="revenue"
					type="monotone"
					stroke="var(--color-revenue)"
					strokeWidth={2}
					fill="url(#revenueGradient)"
				/>
			</AreaChart>
		</ChartContainer>
	);
}

export function ChartStackedAreaPreview() {
	return (
		<ChartContainer
			config={multiLineConfig}
			ariaLabel="Revenue and refunds composition over time"
			className="aspect-[16/9] max-h-[300px] w-full"
		>
			<AreaChart data={monthly} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
				<ChartTooltip
					cursor={{ stroke: 'var(--color-chart-grid)', strokeDasharray: '3 3' }}
					content={<ChartTooltipContent />}
				/>
				<ChartLegend content={<ChartLegendContent />} />
				<Area
					dataKey="revenue"
					stackId="a"
					type="monotone"
					stroke="var(--color-revenue)"
					fill="var(--color-revenue)"
					fillOpacity={0.4}
				/>
				<Area
					dataKey="refunds"
					stackId="a"
					type="monotone"
					stroke="var(--color-refunds)"
					fill="var(--color-refunds)"
					fillOpacity={0.5}
				/>
			</AreaChart>
		</ChartContainer>
	);
}

const channels = [
	{ channel: 'Email', signups: 1240 },
	{ channel: 'Search', signups: 980 },
	{ channel: 'Social', signups: 760 },
	{ channel: 'Direct', signups: 540 },
	{ channel: 'Referral', signups: 320 },
];

const barConfig = {
	signups: { label: 'Signups', theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' } },
} satisfies ChartConfig;

export function ChartBarPreview() {
	return (
		<ChartContainer
			config={barConfig}
			ariaLabel="Signups by channel for March"
			className="aspect-[16/9] max-h-[280px] w-full"
		>
			<BarChart data={channels} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="channel" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} />
				<ChartTooltip cursor={{ fill: 'var(--color-bg)' }} content={<ChartTooltipContent />} />
				<Bar dataKey="signups" fill="var(--color-signups)" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ChartContainer>
	);
}

const channelMix = [
	{ channel: 'Email', new: 720, returning: 520 },
	{ channel: 'Search', new: 580, returning: 400 },
	{ channel: 'Social', new: 460, returning: 300 },
	{ channel: 'Direct', new: 320, returning: 220 },
	{ channel: 'Referral', new: 200, returning: 120 },
];

const stackedBarConfig = {
	new: { label: 'New', theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' } },
	returning: { label: 'Returning', theme: { light: 'var(--color-chart-2)', dark: 'var(--color-chart-2)' } },
} satisfies ChartConfig;

export function ChartStackedBarPreview() {
	return (
		<ChartContainer
			config={stackedBarConfig}
			ariaLabel="New vs returning signups by channel"
			className="aspect-[16/9] max-h-[300px] w-full"
		>
			<BarChart data={channelMix} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="channel" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} />
				<ChartTooltip cursor={{ fill: 'var(--color-bg)' }} content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar dataKey="new" stackId="a" fill="var(--color-new)" radius={[0, 0, 0, 0]} />
				<Bar dataKey="returning" stackId="a" fill="var(--color-returning)" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ChartContainer>
	);
}

export function ChartHorizontalBarPreview() {
	return (
		<ChartContainer
			config={barConfig}
			ariaLabel="Signups by channel, ranked"
			className="aspect-[16/9] max-h-[300px] w-full"
		>
			<BarChart
				data={channels}
				layout="vertical"
				margin={{ top: 8, right: 16, bottom: 0, left: 16 }}
			>
				<CartesianGrid horizontal={false} strokeDasharray="3 3" />
				<XAxis type="number" tickLine={false} axisLine={false} />
				<YAxis type="category" dataKey="channel" tickLine={false} axisLine={false} width={80} />
				<ChartTooltip cursor={{ fill: 'var(--color-bg)' }} content={<ChartTooltipContent />} />
				<Bar dataKey="signups" fill="var(--color-signups)" radius={[0, 4, 4, 0]} />
			</BarChart>
		</ChartContainer>
	);
}

const traffic = [
	{ source: 'Email', visits: 5200 },
	{ source: 'Organic', visits: 3800 },
	{ source: 'Social', visits: 2400 },
	{ source: 'Direct', visits: 1600 },
];

const donutConfig = {
	Email: { label: 'Email', theme: { light: 'var(--color-chart-cat-teal)', dark: 'var(--color-chart-cat-teal)' } },
	Organic: { label: 'Organic', theme: { light: 'var(--color-chart-cat-violet)', dark: 'var(--color-chart-cat-violet)' } },
	Social: { label: 'Social', theme: { light: 'var(--color-chart-cat-blue)', dark: 'var(--color-chart-cat-blue)' } },
	Direct: { label: 'Direct', theme: { light: 'var(--color-chart-cat-orange)', dark: 'var(--color-chart-cat-orange)' } },
} satisfies ChartConfig;

export function ChartDonutPreview() {
	const total = traffic.reduce((sum, d) => sum + d.visits, 0);
	return (
		<ChartContainer
			config={donutConfig}
			ariaLabel="Traffic by source"
			className="aspect-square max-h-[300px] w-full"
		>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent hideLabel nameKey="source" />} />
				<Pie data={traffic} dataKey="visits" nameKey="source" innerRadius={55} outerRadius={85} strokeWidth={2}>
					{traffic.map((d) => (
						<Cell key={d.source} fill={`var(--color-${d.source})`} />
					))}
					<Label
						content={({ viewBox }) => {
							if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
							return (
								<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
									<tspan x={viewBox.cx} y={viewBox.cy} className="fill-ink-dark text-xl font-semibold">
										{total.toLocaleString()}
									</tspan>
									<tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 18} className="fill-ink-light text-xs">
										visits
									</tspan>
								</text>
							);
						}}
					/>
				</Pie>
				<ChartLegend content={<ChartLegendContent nameKey="source" />} />
			</PieChart>
		</ChartContainer>
	);
}

const sparkData = [
	{ d: 1, v: 32 }, { d: 2, v: 41 }, { d: 3, v: 38 }, { d: 4, v: 52 },
	{ d: 5, v: 49 }, { d: 6, v: 61 }, { d: 7, v: 73 },
];

const sparklineConfig = {
	v: { label: 'Visits', theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' } },
} satisfies ChartConfig;

export function ChartSparklinePreview() {
	return (
		<div className="flex items-center gap-3">
			<span className="text-2xl font-semibold tabular-nums text-ink-dark">2,840</span>
			<ChartContainer config={sparklineConfig} ariaLabel="Visits trend, last 7 days" className="h-10 w-32">
				<LineChart data={sparkData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
					<Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} isAnimationActive={false} />
				</LineChart>
			</ChartContainer>
		</div>
	);
}

export function ChartKPIPreview() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			{[
				{ label: 'Revenue', value: '$24,800', delta: 8.4, tone: 'positive' as const, sparkline: sparkData },
				{ label: 'Signups', value: '1,240', delta: -2.1, tone: 'negative' as const, sparkline: sparkData },
				{ label: 'AOV', value: '$72.40', delta: 1.5, tone: 'positive' as const, sparkline: sparkData },
			].map((kpi) => (
				<Card key={kpi.label}>
					<CardContent className="flex flex-col gap-1 p-4">
						<span className="text-xs font-medium uppercase tracking-wide text-ink-light">
							{kpi.label}
						</span>
						<span className="font-heading text-2xl font-semibold tabular-nums text-ink-dark">
							{kpi.value}
						</span>
						<div className="flex items-center justify-between">
							<span
								className={
									kpi.tone === 'positive'
										? 'inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums text-ink-success'
										: 'inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums text-ink-destructive'
								}
							>
								{kpi.tone === 'positive' ? (
									<MdArrowUpward aria-hidden className="size-3" />
								) : (
									<MdArrowDownward aria-hidden className="size-3" />
								)}
								{kpi.delta > 0 ? '+' : ''}
								{kpi.delta}%
							</span>
							<ChartContainer config={sparklineConfig} ariaLabel={`${kpi.label} trend`} className="h-8 w-20">
								<LineChart data={kpi.sparkline} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
									<Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} isAnimationActive={false} />
								</LineChart>
							</ChartContainer>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

const barListSingle = [
	{ name: 'Direct', value: 997 },
	{ name: 'Referral', value: 467 },
	{ name: 'Organic Search', value: 268 },
	{ name: 'PPC Google Ads', value: 58 },
	{ name: 'Acme', value: 4 },
];

export function ChartBarListPreview() {
	return (
		<div className="p-2">
			<BarList data={barListSingle} header="Source" unit="Visits" />
		</div>
	);
}

const barListMultiSeries = [
	{ key: 'desktop', label: 'Desktop', color: 'teal' },
	{ key: 'mobile', label: 'Mobile', color: 'violet' },
	{ key: 'tablet', label: 'Tablet', color: 'blue' },
];

const barListMultiData = [
	{ name: 'United States', values: { desktop: 4200, mobile: 2100, tablet: 600 } },
	{ name: 'Germany', values: { desktop: 1800, mobile: 800, tablet: 220 } },
	{ name: 'United Kingdom', values: { desktop: 1400, mobile: 700, tablet: 180 } },
	{ name: 'France', values: { desktop: 900, mobile: 500, tablet: 120 } },
];

export function ChartBarListGroupedPreview() {
	return (
		<div className="flex flex-col gap-3 p-2">
			<BarListLegend series={barListMultiSeries} />
			<BarList
				data={barListMultiData}
				series={barListMultiSeries}
				layout="grouped"
				header="Country"
				labelWidth={120}
			/>
		</div>
	);
}

const barListStackedSeries = [
	{ key: 'direct', label: 'Direct', color: 'teal' },
	{ key: 'organic', label: 'Organic', color: 'violet' },
	{ key: 'paid', label: 'Paid', color: 'blue' },
	{ key: 'social', label: 'Social', color: 'orange' },
	{ key: 'referral', label: 'Referral', color: 'pink' },
];

const barListStackedData = [
	{ name: 'United States', values: { direct: 4200, organic: 3100, paid: 2100, social: 1400, referral: 900 } },
	{ name: 'Germany', values: { direct: 1800, organic: 1500, paid: 700, social: 480, referral: 320 } },
	{ name: 'United Kingdom', values: { direct: 1400, organic: 1200, paid: 540, social: 410, referral: 220 } },
	{ name: 'France', values: { direct: 900, organic: 780, paid: 320, social: 260, referral: 140 } },
];

export function ChartBarListStackedPreview() {
	return (
		<div className="flex flex-col gap-3 p-2">
			<BarListLegend series={barListStackedSeries} maxVisible={4} />
			<BarList
				data={barListStackedData}
				series={barListStackedSeries}
				layout="stacked"
				header="Country"
				labelWidth={120}
			/>
		</div>
	);
}

export function ChartLoadingPreview() {
	return <ChartSkeleton variant="line" height={240} />;
}

export function ChartEmptyPreview() {
	return (
		<ChartEmpty
			heading="No events yet"
			body="Once contacts start interacting with your campaigns, their activity will show here."
			icon={<MdInbox aria-hidden className="size-8" />}
		/>
	);
}

export function ChartErrorPreview() {
	return (
		<div className="space-y-3">
			<Alert variant="destructive">Couldn&apos;t load this chart. Try refreshing.</Alert>
			<ChartSkeleton variant="line" height={200} />
		</div>
	);
}

export function ChartViewAsTablePreview() {
	const config = {
		revenue: { label: 'Revenue' },
		refunds: { label: 'Refunds' },
	} satisfies ChartConfig;
	return (
		<details className="rounded-md border border-border bg-bg p-3 text-xs">
			<summary className="cursor-pointer text-ink">View as table</summary>
			<div className="mt-3">
				<ChartTable
					data={monthly}
					config={config}
					xKey="month"
					xLabel="Month"
					formatValue={(v, key) => {
						if (typeof v !== 'number') return v as React.ReactNode;
						return key === 'month' ? v : `$${v.toLocaleString()}`;
					}}
				/>
			</div>
		</details>
	);
}
