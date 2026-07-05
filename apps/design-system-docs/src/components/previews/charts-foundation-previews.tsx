'use client';

import * as React from 'react';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ReferenceLine,
	ResponsiveContainer,
	Scatter,
	ScatterChart,
	Tooltip,
	XAxis,
	YAxis,
	ZAxis,
} from 'recharts';
import {
	BarList,
	Button,
	Card,
	CardContent,
	ChartContainer,
	ChartSkeleton,
	ChartTooltip,
	ChartTooltipContent,
	EmptyState,
	type ChartConfig,
} from '@marmoui/ui';
import {
	MdAddChart,
	MdArrowDownward,
	MdArrowUpward,
	MdBarChart,
	MdDonutLarge,
	MdErrorOutline,
	MdLeaderboard,
	MdPieChart,
	MdScatterPlot,
	MdShowChart,
	MdStackedLineChart,
	MdTimeline,
	MdTrendingUp,
	MdViewModule,
} from 'react-icons/md';

/* ─────────────── Small helpers ─────────────── */

const fmtCompact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const fmtFull = new Intl.NumberFormat('en-US');

export function ColorSwatch({ token, size = 18 }: { token: string; size?: number }) {
	return (
		<span
			aria-hidden
			className="inline-block shrink-0 rounded-sm border border-border-secondary align-text-bottom"
			style={{ width: size, height: size, background: `var(${token})` }}
		/>
	);
}

const seriesConfig = {
	revenue: { label: 'Revenue', theme: { light: 'var(--color-chart-cat-teal)', dark: 'var(--color-chart-cat-teal)' } },
	refunds: { label: 'Refunds', theme: { light: 'var(--color-chart-cat-violet)', dark: 'var(--color-chart-cat-violet)' } },
} satisfies ChartConfig;

const stackConfig = {
	Free: { label: 'Free', theme: { light: 'var(--color-chart-cat-teal)', dark: 'var(--color-chart-cat-teal)' } },
	Pro: { label: 'Pro', theme: { light: 'var(--color-chart-cat-teal-bright)', dark: 'var(--color-chart-cat-teal-bright)' } },
	Team: { label: 'Team', theme: { light: 'var(--color-chart-cat-violet)', dark: 'var(--color-chart-cat-violet)' } },
} satisfies ChartConfig;

const monthSeries = (seed = 30) => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let r = seed;
	let f = seed * 0.25;
	return months.map((m) => {
		r += Math.round((Math.random() - 0.3) * 14);
		f += Math.round((Math.random() - 0.5) * 4);
		return { month: m, revenue: Math.max(0, r * 1000), refunds: Math.max(0, Math.round(f * 1000)) };
	});
};

const sparkSeries = (n = 14) => Array.from({ length: n }, (_, i) => ({ x: i, v: 60 + Math.round(Math.random() * 40) }));

/* ─────────────── 1. Principles hero ─────────────── */

const heroData = monthSeries();

export function PrinciplesHero() {
	return (
		<ChartContainer config={seriesConfig} ariaLabel="Revenue trending up across 2026 with refunds flat" className="aspect-[16/9] w-full">
			<LineChart data={heroData} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${fmtCompact.format(Number(v))}`} width={56} />
				<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
				<Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2.5} dot={false} />
				<Line dataKey="refunds" type="monotone" stroke="var(--color-refunds)" strokeWidth={1.5} strokeOpacity={0.55} dot={false} />
			</LineChart>
		</ChartContainer>
	);
}

/* ─────────────── 2. Decision tree (visual card) ─────────────── */

const decisionRows: Array<{ icon: React.ReactNode; q: string; pick: string }> = [
	{ icon: <MdBarChart aria-hidden className="size-5" />, q: 'Compare across categories?', pick: 'Bar (horizontal ≥ 5; vertical ≤ 5)' },
	{ icon: <MdShowChart aria-hidden className="size-5" />, q: 'How has X changed over time?', pick: 'Line (continuous) · Column (discrete)' },
	{ icon: <MdDonutLarge aria-hidden className="size-5" />, q: 'What is X made of?', pick: 'Donut (≤ 4 slices) · Stacked bar · Treemap' },
	{ icon: <MdStackedLineChart aria-hidden className="size-5" />, q: 'How has composition shifted?', pick: 'Stacked area / column' },
	{ icon: <MdScatterPlot aria-hidden className="size-5" />, q: 'Is X correlated with Y?', pick: 'Scatter · Bubble (third dim)' },
	{ icon: <MdLeaderboard aria-hidden className="size-5" />, q: 'Above / below a target?', pick: 'Bullet · Scorecard with delta' },
];

export function DecisionTreeFigure() {
	return (
		<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
			{decisionRows.map((row) => (
				<div key={row.q} className="flex items-start gap-3 rounded-md border border-border-secondary bg-bg p-3">
					<div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-ink-primary">
						{row.icon}
					</div>
					<div className="min-w-0">
						<div className="text-xs font-medium text-ink-light">{row.q}</div>
						<div className="text-sm font-semibold text-ink">{row.pick}</div>
					</div>
				</div>
			))}
		</div>
	);
}

/* ─────────────── 3. Chart catalog 6-up ─────────────── */

const barData = [
	{ name: 'Direct', value: 997 },
	{ name: 'Referral', value: 467 },
	{ name: 'Organic', value: 268 },
	{ name: 'Paid', value: 58 },
];

export function CatalogBar() {
	return (
		<ChartContainer config={seriesConfig} ariaLabel="Bar chart example" className="aspect-[4/3] w-full">
			<BarChart data={barData} layout="vertical" margin={{ top: 8, right: 16, bottom: 4, left: 4 }}>
				<CartesianGrid horizontal={false} strokeDasharray="3 3" />
				<XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => fmtCompact.format(Number(v))} />
				<YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={64} />
				<Bar dataKey="value" radius={[0, 4, 4, 0]}>
					{barData.map((_, i) => (
						<Cell
							key={i}
							fill={i === 0 ? 'var(--color-chart-cat-teal)' : 'var(--color-chart-cat-teal-bright)'}
						/>
					))}
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}

export function CatalogLine() {
	return (
		<ChartContainer config={seriesConfig} ariaLabel="Line chart example" className="aspect-[4/3] w-full">
			<LineChart data={heroData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} interval={1} />
				<YAxis tickLine={false} axisLine={false} hide />
				<Line dataKey="revenue" type="monotone" stroke="var(--color-chart-cat-teal)" strokeWidth={2} dot={false} />
				<Line dataKey="refunds" type="monotone" stroke="var(--color-chart-cat-violet)" strokeWidth={1.5} dot={false} strokeOpacity={0.5} />
			</LineChart>
		</ChartContainer>
	);
}

const stackData = (() => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
	return months.map((m, i) => ({
		month: m,
		Free: 4000 + i * 220 + Math.round(Math.random() * 200),
		Pro: 1800 + i * 140 + Math.round(Math.random() * 120),
		Team: 600 + i * 60 + Math.round(Math.random() * 60),
	}));
})();

export function CatalogStackedArea() {
	return (
		<ChartContainer config={stackConfig} ariaLabel="Stacked area chart example" className="aspect-[4/3] w-full">
			<AreaChart data={stackData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} hide />
				<Area dataKey="Free" stackId="a" stroke="var(--color-Free)" fill="var(--color-Free)" fillOpacity={0.4} />
				<Area dataKey="Pro" stackId="a" stroke="var(--color-Pro)" fill="var(--color-Pro)" fillOpacity={0.55} />
				<Area dataKey="Team" stackId="a" stroke="var(--color-Team)" fill="var(--color-Team)" fillOpacity={0.7} />
			</AreaChart>
		</ChartContainer>
	);
}

const scatterData = Array.from({ length: 24 }, () => {
	const spend = Math.round(200 + Math.random() * 1800);
	const noise = (Math.random() - 0.5) * 30;
	return { spend, signups: Math.max(0, Math.round(spend * 0.04 + noise)) };
});

export function CatalogScatter() {
	return (
		<ChartContainer config={seriesConfig} ariaLabel="Scatter — ad spend vs signups" className="aspect-[4/3] w-full">
			<ScatterChart margin={{ top: 12, right: 16, bottom: 32, left: 44 }}>
				<CartesianGrid stroke="var(--color-border)" strokeOpacity={0.6} />
				<XAxis
					type="number"
					dataKey="spend"
					tickLine={{ stroke: 'var(--color-border)' }}
					axisLine={{ stroke: 'var(--color-border)' }}
					tickFormatter={(v) => `$${fmtCompact.format(Number(v))}`}
					tick={{ fontSize: 10, fill: 'var(--color-ink-light)' }}
					label={{ value: 'Ad spend', position: 'bottom', offset: 8, style: { fontSize: 10, fill: 'var(--color-ink-light)' } }}
				/>
				<YAxis
					type="number"
					dataKey="signups"
					tickLine={{ stroke: 'var(--color-border)' }}
					axisLine={{ stroke: 'var(--color-border)' }}
					tick={{ fontSize: 10, fill: 'var(--color-ink-light)' }}
					label={{ value: 'Signups', angle: -90, position: 'insideLeft', offset: 12, style: { fontSize: 10, fill: 'var(--color-ink-light)' } }}
				/>
				<ZAxis range={[60, 60]} />
				<Tooltip
					cursor={{ stroke: 'var(--color-ink-muted)', strokeDasharray: '3 3', strokeOpacity: 0.6 }}
					contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 11, padding: '6px 8px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}
					formatter={(value: number, name) => {
						const label = name === 'spend' ? 'Ad spend' : 'Signups';
						const formatted = name === 'spend' ? `$${fmtFull.format(value)}` : fmtFull.format(value);
						return [formatted, label];
					}}
				/>
				<Scatter
					data={scatterData}
					fill="var(--color-chart-cat-teal)"
					fillOpacity={0.85}
					stroke="var(--color-bg)"
					strokeWidth={1.5}
				/>
			</ScatterChart>
		</ChartContainer>
	);
}

const donutData = [
	{ name: 'Free', value: 6200 },
	{ name: 'Pro', value: 3100 },
	{ name: 'Team', value: 1400 },
	{ name: 'Enterprise', value: 380 },
];

const DONUT_FILLS = [
	'var(--color-chart-cat-teal)',
	'var(--color-chart-cat-violet)',
	'var(--color-chart-cat-blue)',
	'var(--color-chart-cat-orange)',
];

export function CatalogDonut() {
	const total = donutData.reduce((s, d) => s + d.value, 0);
	return (
		<div className="flex h-full flex-col items-center gap-2">
			<ChartContainer config={seriesConfig} ariaLabel="Donut — users by plan" className="aspect-square w-32">
				<PieChart>
					<Pie data={donutData} dataKey="value" nameKey="name" innerRadius={32} outerRadius={56} paddingAngle={2}>
						{donutData.map((d, i) => (
							<Cell key={d.name} fill={DONUT_FILLS[i]} />
						))}
					</Pie>
				</PieChart>
			</ChartContainer>
			<ul className="grid w-full grid-cols-2 gap-x-3 gap-y-1 px-1 text-[11px]">
				{donutData.map((d, i) => {
					const pct = Math.round((d.value / total) * 100);
					return (
						<li key={d.name} className="flex items-center gap-1.5 text-ink-light">
							<span aria-hidden className="inline-block size-2 rounded-sm" style={{ background: DONUT_FILLS[i] }} />
							<span className="truncate text-ink">{d.name}</span>
							<span className="ml-auto tabular-nums">{pct}%</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export function CatalogSparkline() {
	const data = sparkSeries(18);
	return (
		<div className="flex h-full flex-col items-start justify-center gap-2">
			<div className="text-2xl font-semibold tabular-nums text-ink">12,480</div>
			<ChartContainer config={seriesConfig} ariaLabel="Sparkline example" className="h-12 w-40">
				<LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
					<Line dataKey="v" type="monotone" stroke="var(--color-chart-cat-teal)" strokeWidth={2} dot={false} isAnimationActive={false} />
				</LineChart>
			</ChartContainer>
			<div className="inline-flex items-center gap-1 text-xs text-ink-success">
				<MdArrowUpward aria-hidden className="size-3" /> +312 last 7 days
			</div>
		</div>
	);
}

/* ─────────────── 4. Palette types ─────────────── */

const CATEGORICAL_TOKENS = [
	'--color-chart-cat-teal',
	'--color-chart-cat-violet',
	'--color-chart-cat-blue',
	'--color-chart-cat-orange',
	'--color-chart-cat-pink',
	'--color-chart-cat-amber',
	'--color-chart-cat-green',
	'--color-chart-cat-indigo',
	'--color-chart-cat-mint',
	'--color-chart-cat-red',
];

export function PaletteCategorical() {
	return (
		<div className="flex flex-wrap gap-2">
			{CATEGORICAL_TOKENS.map((t) => (
				<div key={t} className="flex flex-col items-center gap-1">
					<span
						aria-hidden
						className="block size-10 rounded-md border border-border-secondary"
						style={{ background: `var(${t})` }}
					/>
					<code className="text-[10px] text-ink-light">{t.replace('--color-chart-cat-', '')}</code>
				</div>
			))}
		</div>
	);
}

export function PaletteSequential() {
	const stops = ['200', '300', '400', '500', '600', '700'];
	return (
		<div className="flex flex-col gap-3">
			<div className="flex h-10 overflow-hidden rounded-md border border-border-secondary">
				{stops.map((s) => (
					<span key={s} aria-hidden className="flex-1" style={{ background: `var(--color-primary-${s})` }} />
				))}
			</div>
			<div className="flex justify-between text-[10px] text-ink-light">
				<span>Low (200)</span>
				<span>High (700)</span>
			</div>
		</div>
	);
}

export function PaletteDiverging() {
	const left = ['700', '500', '300'];
	const right = ['300', '500', '700'];
	return (
		<div className="flex flex-col gap-3">
			<div className="flex h-10 overflow-hidden rounded-md border border-border-secondary">
				{left.map((s) => (
					<span key={`l-${s}`} aria-hidden className="flex-1" style={{ background: `var(--color-red-${s})` }} />
				))}
				<span aria-hidden className="flex-1" style={{ background: 'var(--color-bg)' }} />
				{right.map((s) => (
					<span key={`r-${s}`} aria-hidden className="flex-1" style={{ background: `var(--color-green-${s})` }} />
				))}
			</div>
			<div className="flex justify-between text-[10px] text-ink-light">
				<span>Below target</span>
				<span>Neutral</span>
				<span>Above target</span>
			</div>
		</div>
	);
}

export function PaletteMonochromatic() {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex h-10 overflow-hidden rounded-md border border-border-secondary">
				<span aria-hidden className="flex-1" style={{ background: 'var(--color-chart-cat-teal)' }} />
				<span aria-hidden className="flex-1" style={{ background: 'var(--color-chart-cat-teal-bright)' }} />
			</div>
			<div className="flex justify-between text-[10px] text-ink-light">
				<span>Primary band</span>
				<span>Comparison / secondary</span>
			</div>
		</div>
	);
}

/* ─────────────── 5. Composition anatomy ─────────────── */

export function CompositionAnatomy() {
	return (
		<div className="flex flex-col gap-3">
			<div className="text-sm font-semibold text-ink">How are orders trending this year?</div>
			<ChartContainer config={seriesConfig} ariaLabel="Anatomy of a chart with labeled parts" className="aspect-[16/9] w-full">
				<LineChart data={heroData} margin={{ top: 16, right: 24, bottom: 16, left: 32 }}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis dataKey="month" tickLine={false} axisLine={false} label={{ value: 'Month', position: 'bottom', style: { fontSize: 10, fill: 'var(--color-ink-light)' } }} />
					<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${fmtCompact.format(Number(v))}`} label={{ value: 'Revenue', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: 'var(--color-ink-light)' } }} />
					<ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={{ stroke: 'var(--color-ink-muted)', strokeDasharray: '3 3' }} />
					<Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2.5} dot={false} />
				</LineChart>
			</ChartContainer>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-ink-light sm:grid-cols-3">
				<div><b className="text-ink">Title</b> · the question</div>
				<div><b className="text-ink">Y label</b> · outside data area</div>
				<div><b className="text-ink">Gridlines</b> · light, behind data</div>
				<div><b className="text-ink">Ticks</b> · 4–7 across</div>
				<div><b className="text-ink">Tooltip</b> · hover + focus</div>
				<div><b className="text-ink">Footnote</b> · source / range</div>
			</div>
		</div>
	);
}

/* ─────────────── 6. Context (KPI + chart) ─────────────── */

export function ContextTile() {
	const data = monthSeries(24);
	const total = data.reduce((s, d) => s + d.revenue, 0);
	return (
		<Card>
			<CardContent className="grid gap-4 p-4 sm:grid-cols-[1fr_2fr] sm:items-center">
				<div className="flex flex-col gap-1">
					<span className="text-xs uppercase tracking-wide text-ink-light">Revenue</span>
					<span className="font-heading text-2xl font-semibold tabular-nums text-ink">${fmtCompact.format(total)}</span>
					<span className="inline-flex items-center gap-1 text-xs text-ink-success">
						<MdArrowUpward aria-hidden className="size-3" /> +8.4% vs last quarter
					</span>
					<ChartContainer config={seriesConfig} ariaLabel="Revenue trend sparkline" className="mt-2 h-8 w-32">
						<LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
							<Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} isAnimationActive={false} />
						</LineChart>
					</ChartContainer>
				</div>
				<ChartContainer config={seriesConfig} ariaLabel="Revenue by month" className="aspect-[16/9] w-full">
					<LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis dataKey="month" tickLine={false} axisLine={false} />
						<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${fmtCompact.format(Number(v))}`} width={48} />
						<ChartTooltip content={<ChartTooltipContent />} />
						<Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

/* ─────────────── 7. Annotations + reference lines ─────────────── */

export function AnnotationsExample() {
	return (
		<ChartContainer config={seriesConfig} ariaLabel="Line chart with target line and launch event guide" className="aspect-[16/9] w-full">
			<LineChart data={heroData} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${fmtCompact.format(Number(v))}`} width={56} />
				<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
				<ReferenceLine y={45000} stroke="var(--color-ink-muted)" strokeDasharray="4 4" label={{ value: 'Goal', position: 'right', fill: 'var(--color-ink-light)', fontSize: 10 }} />
				<ReferenceLine x="May" stroke="var(--color-ink-muted)" strokeDasharray="2 4" label={{ value: 'Launch', position: 'top', fill: 'var(--color-ink-light)', fontSize: 10 }} />
				<Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2.5} dot={false} />
			</LineChart>
		</ChartContainer>
	);
}

/* ─────────────── 8. Small multiples ─────────────── */

const regions = ['US', 'EU', 'UK', 'CA', 'AU', 'BR'];

export function SmallMultiplesGrid() {
	const series = regions.map((name) => ({ name, data: monthSeries(10 + Math.random() * 30) }));
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{series.map((s) => (
				<div key={s.name} className="rounded-md border border-border-secondary p-2">
					<div className="mb-1 text-xs font-medium text-ink">{s.name}</div>
					<ChartContainer config={seriesConfig} ariaLabel={`${s.name} revenue trend`} className="aspect-[3/2] w-full">
						<LineChart data={s.data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
							<XAxis dataKey="month" tickLine={false} axisLine={false} hide />
							<YAxis tickLine={false} axisLine={false} hide domain={[0, 'dataMax']} />
							<Line dataKey="revenue" type="monotone" stroke="var(--color-chart-cat-teal)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
						</LineChart>
					</ChartContainer>
				</div>
			))}
		</div>
	);
}

/* ─────────────── 9. Tooltip ─────────────── */

export function TooltipExample() {
	return (
		<ChartContainer config={seriesConfig} ariaLabel="Multi-series line chart with tooltip crosshair" className="aspect-[16/9] w-full">
			<LineChart data={heroData} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis dataKey="month" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${fmtCompact.format(Number(v))}`} width={56} />
				<ChartTooltip
					defaultIndex={6}
					content={<ChartTooltipContent indicator="dot" />}
					cursor={{ stroke: 'var(--color-ink-muted)', strokeDasharray: '3 3' }}
				/>
				<Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
				<Line dataKey="refunds" type="monotone" stroke="var(--color-refunds)" strokeWidth={2} dot={false} />
			</LineChart>
		</ChartContainer>
	);
}

/* ─────────────── 10. States ─────────────── */

export function StateLoading() {
	return <ChartSkeleton variant="line" height={160} />;
}

export function StateEmpty() {
	return (
		<EmptyState
			title="No events yet"
			description="Once contacts start interacting, activity will show here."
			icon={<MdAddChart aria-hidden className="size-8" />}
		>
			<Button size="sm" variant="primary">
				Create campaign
			</Button>
		</EmptyState>
	);
}

export function StateError() {
	return (
		<div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-3 p-6 text-center">
			<MdErrorOutline aria-hidden className="size-8 text-destructive" />
			<div className="space-y-1">
				<h3 className="text-sm font-semibold text-ink">Couldn't load chart</h3>
				<p className="text-xs text-ink-light">Analytics service didn't respond.</p>
			</div>
			<Button size="sm" variant="ghost">
				Retry
			</Button>
		</div>
	);
}

export function StateNoData() {
	return (
		<div className="relative flex h-[160px] flex-col">
			<ChartContainer config={seriesConfig} ariaLabel="No data for selected range" className="h-full w-full opacity-60">
				<LineChart data={[]} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis dataKey="month" tickLine={false} axisLine={false} />
					<YAxis tickLine={false} axisLine={false} />
				</LineChart>
			</ChartContainer>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="rounded-md bg-bg/90 px-3 py-1.5 text-xs text-ink-light">No events in this range. Try a wider window.</span>
			</div>
		</div>
	);
}

/* ─────────────── 11. Do / Don't ─────────────── */

export function DoChart() {
	const data = [
		{ name: 'Direct', value: 997, color: 'var(--color-chart-cat-teal)' },
		{ name: 'Referral', value: 467, color: 'var(--color-chart-cat-violet)' },
		{ name: 'Organic search', value: 268, color: 'var(--color-chart-cat-blue)' },
		{ name: 'Paid ads', value: 58, color: 'var(--color-chart-cat-orange)' },
		{ name: 'Newsletter', value: 12, color: 'var(--color-chart-cat-pink)' },
	];
	return (
		<div className="flex flex-col gap-2">
			<div className="text-sm font-semibold text-ink">Which channels drove the most signups in March?</div>
			<BarList data={data} header="Source" unit="Signups" />
		</div>
	);
}

const dontPie = [
	{ name: 'Direct', value: 997 },
	{ name: 'Referral', value: 467 },
	{ name: 'Organic', value: 268 },
	{ name: 'Paid', value: 58 },
	{ name: 'Newsletter', value: 12 },
	{ name: 'Affiliate', value: 9 },
	{ name: 'Podcast', value: 6 },
	{ name: 'Other', value: 4 },
];

const RAINBOW = ['#e74c3c', '#e67e22', '#f1c40f', '#27ae60', '#3498db', '#9b59b6', '#1abc9c', '#d35400'];

export function DontChart() {
	return (
		<div
			className="flex flex-col items-center gap-2"
			style={{ transform: 'perspective(900px) rotateX(28deg)', transformOrigin: 'center bottom' }}
		>
			<div className="text-sm font-semibold text-ink">Revenue</div>
			<ChartContainer config={seriesConfig} ariaLabel="3D pie with 8 slices — anti-example" className="aspect-square w-48">
				<PieChart>
					<Pie data={dontPie} dataKey="value" nameKey="name" outerRadius={80}>
						{dontPie.map((_, i) => (
							<Cell key={i} fill={RAINBOW[i % RAINBOW.length]} stroke="rgba(0,0,0,0.15)" />
						))}
					</Pie>
				</PieChart>
			</ChartContainer>
		</div>
	);
}
