'use client';

import * as React from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Label,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import {
	BarList,
	ChartFunnel,
	type BarListItem,
	type ChartFunnelStage,
} from '@marmoui/ui';
import {
	ChartTile,
	KPIScorecard,
	MarmoDonutChart,
	type DonutDatum,
} from '@/components/charts';
import { CHART_TOKENS, formatCompact, formatFull, formatPercent } from '@/components/charts/palette';

const TOOLTIP_STYLE = {
	background: 'var(--color-bg, white)',
	border: '1px solid var(--color-border)',
	borderRadius: 8,
	padding: '8px 10px',
	fontSize: 12,
};

/* ── Anatomy demo: title + KPI strip + chart ── */

const anatomyTrend = (() => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let base = 120;
	return months.map((m) => {
		base += Math.round((Math.random() - 0.35) * 15);
		return { month: m, orders: Math.max(0, base) };
	});
})();

export function AnatomyDemo() {
	const total = anatomyTrend.reduce((s, d) => s + d.orders, 0);
	const last3 = anatomyTrend.slice(-3).reduce((s, d) => s + d.orders, 0);
	const prev3 = anatomyTrend.slice(-6, -3).reduce((s, d) => s + d.orders, 0);
	const delta = last3 - prev3;
	return (
		<ChartTile question="How are orders trending this year?" hint="All channels · last 12 months">
			<div className="grid grid-cols-3 gap-2">
				<KPIScorecard label="Orders" value={total} delta={delta} deltaLabel="vs prior quarter" />
				<KPIScorecard label="Avg per month" value={Math.round(total / 12)} />
				<KPIScorecard
					label="Conversion"
					value={formatPercent(0.034, 1)}
					delta={0.4}
					deltaLabel="vs prior quarter"
				/>
			</div>
			<div className="mt-3">
				<ResponsiveContainer width="100%" height={200}>
					<LineChart data={anatomyTrend} margin={{ top: 8, right: 16, bottom: 0, left: 16 }}>
						<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="month" tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }} axisLine={false} tickLine={false} />
						<YAxis
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={false}
							tickLine={false}
							tickFormatter={(v) => formatCompact(Number(v))}
						>
							<Label value="Orders" angle={-90} position="insideLeft" offset={0} style={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }} />
						</YAxis>
						<Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [formatFull(v), 'Orders']} />
						<Line type="monotone" dataKey="orders" stroke={CHART_TOKENS.accent} strokeWidth={2} dot={false} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</ChartTile>
	);
}

/* ── Archetype 1: KPI scorecard ── */

export function ArchetypeKPI() {
	return (
		<div className="grid grid-cols-2 gap-2">
			<KPIScorecard label="Active users" value={12480} delta={312} deltaLabel="last 7 days" />
			<KPIScorecard label="MRR" value="$48,210" delta={4.2} deltaLabel="vs last month" />
		</div>
	);
}

/* ── Archetype 2: ranked bar (BarList from @marmoui/ui) ── */

const rankedSources: BarListItem[] = [
	{ name: 'Direct', value: 997 },
	{ name: 'Referral', value: 467 },
	{ name: 'Organic search', value: 268 },
	{ name: 'Paid ads', value: 58 },
	{ name: 'Newsletter', value: 12 },
];

export function ArchetypeRankedBar() {
	return (
		<ChartTile question="Which categories are biggest?">
			<BarList data={rankedSources} header="Source" unit="Visits" />
		</ChartTile>
	);
}

/* ── Archetype 3: donut ── */

const planMix: DonutDatum[] = [
	{ name: 'Free', value: 6200 },
	{ name: 'Pro', value: 3100 },
	{ name: 'Team', value: 1400 },
	{ name: 'Enterprise', value: 380 },
];

export function ArchetypeDonut() {
	const total = planMix.reduce((s, d) => s + d.value, 0);
	return (
		<div className="mx-auto w-full max-w-[500px]">
			<ChartTile question="What's the mix?">
				<MarmoDonutChart data={planMix} centerValue={formatCompact(total)} centerLabel="Users" />
			</ChartTile>
		</div>
	);
}

/* ── Archetype 4: funnel (ChartFunnel from @marmoui/ui) ── */

const onboardingFunnel: ChartFunnelStage[] = [
	{ id: 'signed-up', label: 'Signed up', value: 4200 },
	{ id: 'verified', label: 'Verified email', value: 3800 },
	{ id: 'created', label: 'Created project', value: 2100 },
	{ id: 'invited', label: 'Invited team', value: 720 },
];

export function ArchetypeFunnel() {
	return (
		<div className="mx-auto w-full max-w-[500px]">
			<ChartTile question="Where do users drop off?">
				<ChartFunnel
					ariaLabel="Onboarding funnel — Signed up through Invited team"
					stages={onboardingFunnel}
					legendLabel="All new users"
					height={260}
				/>
			</ChartTile>
		</div>
	);
}

/* ── Archetype 5: trend line ── */

const revenueTrend = (() => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let base = 22000;
	return months.map((m) => {
		base += Math.round((Math.random() - 0.3) * 3500);
		return { month: m, revenue: Math.max(0, base) };
	});
})();

export function ArchetypeTrend() {
	return (
		<div className="mx-auto w-full max-w-[500px]">
		<ChartTile question="How is monthly revenue trending?">
			<ResponsiveContainer width="100%" height={200}>
				<AreaChart data={revenueTrend} margin={{ top: 8, right: 16, bottom: 0, left: 20 }}>
					<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" vertical={false} />
					<XAxis dataKey="month" tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }} axisLine={false} tickLine={false} />
					<YAxis
						tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
						axisLine={false}
						tickLine={false}
						tickFormatter={(v) => `$${formatCompact(Number(v))}`}
					>
						<Label
							value="Revenue"
							angle={-90}
							position="insideLeft"
							offset={-8}
							style={{ fill: CHART_TOKENS.axisLabel, fontSize: 11, textAnchor: 'middle' }}
						/>
					</YAxis>
					<Tooltip
						contentStyle={TOOLTIP_STYLE}
						formatter={(v: number) => [`$${formatFull(v)}`, 'Revenue']}
					/>
					<Area type="monotone" dataKey="revenue" stroke={CHART_TOKENS.accent} fill={CHART_TOKENS.accent} fillOpacity={0.18} strokeWidth={2} />
				</AreaChart>
			</ResponsiveContainer>
		</ChartTile>
		</div>
	);
}

/* ── Archetype 6: stacked area over time (composition / cohort retention) ── */

const stackedAreaData = (() => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
	return months.map((m, i) => ({
		month: m,
		Free: 4000 + i * 220 + Math.round(Math.random() * 200),
		Pro: 1800 + i * 140 + Math.round(Math.random() * 120),
		Team: 600 + i * 60 + Math.round(Math.random() * 60),
	}));
})();

export function ArchetypeStackedArea() {
	return (
		<ChartTile question="How is the plan mix changing over time?">
			<ResponsiveContainer width="100%" height={200}>
				<AreaChart data={stackedAreaData} margin={{ top: 8, right: 16, bottom: 0, left: 20 }}>
					<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" vertical={false} />
					<XAxis dataKey="month" tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }} axisLine={false} tickLine={false} />
					<YAxis
						tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
						axisLine={false}
						tickLine={false}
						tickFormatter={(v) => formatCompact(Number(v))}
					>
						<Label
							value="Users"
							angle={-90}
							position="insideLeft"
							offset={-8}
							style={{ fill: CHART_TOKENS.axisLabel, fontSize: 11, textAnchor: 'middle' }}
						/>
					</YAxis>
					<Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, n) => [formatFull(v), n]} />
					<Area type="monotone" dataKey="Free" stackId="1" stroke={CHART_TOKENS.accent} fill={CHART_TOKENS.accent} fillOpacity={0.35} />
					<Area type="monotone" dataKey="Pro" stackId="1" stroke={CHART_TOKENS.accent} fill={CHART_TOKENS.accent} fillOpacity={0.55} />
					<Area type="monotone" dataKey="Team" stackId="1" stroke={CHART_TOKENS.accent} fill={CHART_TOKENS.accent} fillOpacity={0.8} />
				</AreaChart>
			</ResponsiveContainer>
		</ChartTile>
	);
}
