'use client';

import * as React from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from 'recharts';
import {
	Avatar,
	AvatarFallback,
	Badge,
	BarList,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	DatePicker,
	IconButton,
	KpiCard,
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Widget,
	type ChartConfig,
} from '@marmoui/ui';
import { MdMoreVert, MdSettings } from 'react-icons/md';
import { MarmoDonutChart } from '@/components/charts/marmo-donut-chart';
import { MarmoFunnelChart } from '@/components/charts/marmo-funnel-chart';

const compactCurrency = (v: number) =>
	v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`;

function WidgetMenuButton() {
	return (
		<IconButton variant="ghost-body" size="sm" aria-label="Widget options" icon={<MdMoreVert />} />
	);
}

function WidgetSettingsButton() {
	return (
		<IconButton variant="ghost-body" size="sm" aria-label="Configure widget" icon={<MdSettings />} />
	);
}

// ── KPI strip (4-up) ─────────────────────────────────────────────────────────

export function MarmoKpiStrip() {
	return (
		<div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 xl:grid-cols-4">
			<KpiCard label="Revenue" value={24800} prefix="$" delta={8.4} deltaLabel="vs last month" />
			<KpiCard label="Active users" value={12480} delta={312} deltaLabel="last 7 days" />
			<KpiCard label="Conversion" value="3.42%" delta={0.4} deltaLabel="vs prior period" />
			<KpiCard label="Sessions" value={89240} delta={-2.1} deltaLabel="vs last week" />
		</div>
	);
}

// ── Revenue trend (area + line) ──────────────────────────────────────────────

const revenueData = [
	{ month: 'Jan', revenue: 18200 },
	{ month: 'Feb', revenue: 19400 },
	{ month: 'Mar', revenue: 21100 },
	{ month: 'Apr', revenue: 20800 },
	{ month: 'May', revenue: 23200 },
	{ month: 'Jun', revenue: 24800 },
];

const revenueConfig = {
	revenue: {
		label: 'Revenue',
		theme: { light: 'var(--color-primary-600)', dark: 'var(--color-primary-500)' },
	},
} satisfies ChartConfig;

export function MarmoWidgetRevenueTrend() {
	return (
		<Widget
			title="Revenue trend"
			actions={<WidgetSettingsButton />}
			filters={
				<DatePicker placeholder="Last 6 months" triggerType="input" className="h-8 text-sm" />
			}
		>
			<ChartContainer
				config={revenueConfig}
				ariaLabel="Monthly revenue January through June"
				className="aspect-[16/9] max-h-[280px] w-full"
			>
				<AreaChart data={revenueData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
					<defs>
						<linearGradient id="marmoRevenueFill" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.25} />
							<stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis dataKey="month" tickLine={false} axisLine={false} />
					<YAxis tickLine={false} axisLine={false} tickFormatter={compactCurrency} width={48} />
					<ChartTooltip
						cursor={{ stroke: 'var(--color-border-secondary)', strokeDasharray: '3 3' }}
						content={<ChartTooltipContent unit="$" indicator="line" />}
					/>
					<Area
						type="monotone"
						dataKey="revenue"
						stroke="var(--color-revenue)"
						strokeWidth={2}
						fill="url(#marmoRevenueFill)"
						dot={false}
					/>
				</AreaChart>
			</ChartContainer>
		</Widget>
	);
}

// ── Top pages (BarList) ──────────────────────────────────────────────────────

const topPagesData = [
	{ name: '/pricing', value: 4820 },
	{ name: '/docs/get-started', value: 3640 },
	{ name: '/projects', value: 2910 },
	{ name: '/blog/design-tokens', value: 1840 },
	{ name: '/components/button', value: 1260 },
];

export function MarmoWidgetTopPages() {
	return (
		<Widget title="Top pages" actions={<WidgetMenuButton />}>
			<BarList data={topPagesData} header="Page" unit="Views" />
		</Widget>
	);
}

// ── Traffic mix (donut) ──────────────────────────────────────────────────────

const trafficMixData = [
	{ name: 'Organic', value: 4200 },
	{ name: 'Direct', value: 2800 },
	{ name: 'Referral', value: 1640 },
	{ name: 'Paid', value: 980 },
];

export function MarmoWidgetTrafficMix() {
	return (
		<Widget
			title="Traffic mix"
			actions={<WidgetSettingsButton />}
			filters={
				<Select defaultValue="30d">
					<SelectTrigger size="sm" className="w-32">
						<SelectValue placeholder="Range" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7d">Last 7 days</SelectItem>
						<SelectItem value="30d">Last 30 days</SelectItem>
						<SelectItem value="90d">Last 90 days</SelectItem>
					</SelectContent>
				</Select>
			}
		>
			<MarmoDonutChart
				data={trafficMixData}
				centerValue="9.6k"
				centerLabel="Sessions"
				height={220}
			/>
		</Widget>
	);
}

// ── Signup funnel ────────────────────────────────────────────────────────────

const signupFunnelStages = [
	{ name: 'Visited', value: 12400 },
	{ name: 'Started signup', value: 4200 },
	{ name: 'Verified email', value: 3100 },
	{ name: 'Completed profile', value: 2480 },
	{ name: 'Activated', value: 1820 },
];

export function MarmoWidgetSignupFunnel() {
	return (
		<Widget title="Signup funnel">
			<MarmoFunnelChart stages={signupFunnelStages} height={260} />
		</Widget>
	);
}

// ── Recent orders (paginated list) ───────────────────────────────────────────

const recentOrders = [
	{ id: 'ORD-1042', customer: 'Alex Kim', initials: 'AK', amount: 248, status: 'Paid' as const },
	{ id: 'ORD-1041', customer: 'Sam Rivera', initials: 'SR', amount: 129, status: 'Paid' as const },
	{ id: 'ORD-1040', customer: 'Jordan Lee', initials: 'JL', amount: 89, status: 'Pending' as const },
	{ id: 'ORD-1039', customer: 'Morgan Chen', initials: 'MC', amount: 412, status: 'Paid' as const },
	{ id: 'ORD-1038', customer: 'Riley Park', initials: 'RP', amount: 56, status: 'Refunded' as const },
	{ id: 'ORD-1037', customer: 'Casey Wu', initials: 'CW', amount: 199, status: 'Paid' as const },
];

const ORDERS_PAGE_SIZE = 3;

function statusVariant(status: (typeof recentOrders)[number]['status']) {
	if (status === 'Paid') return 'success' as const;
	if (status === 'Pending') return 'warning' as const;
	return 'destructive' as const;
}

export function MarmoWidgetRecentOrders() {
	const [page, setPage] = React.useState(1);
	const pageCount = Math.ceil(recentOrders.length / ORDERS_PAGE_SIZE);
	const rows = recentOrders.slice((page - 1) * ORDERS_PAGE_SIZE, page * ORDERS_PAGE_SIZE);
	const goTo = (n: number) => setPage(Math.min(Math.max(n, 1), pageCount));

	return (
		<Widget
			title="Recent orders"
			actions={<WidgetMenuButton />}
			footer={
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious disabled={page === 1} onClick={() => goTo(page - 1)} />
						</PaginationItem>
						{Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
							<PaginationItem key={n}>
								<PaginationLink isActive={n === page} onClick={() => goTo(n)}>
									{n}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext disabled={page === pageCount} onClick={() => goTo(page + 1)} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			}
		>
			<ul className="flex flex-col divide-y divide-border-secondary">
				{rows.map(order => (
					<li key={order.id} className="flex items-center gap-space-sm py-space-sm first:pt-0 last:pb-0">
						<Avatar size="sm">
							<AvatarFallback>{order.initials}</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<div className="truncate text-body-sm font-medium text-ink-dark">{order.customer}</div>
							<div className="text-body-sm text-ink-light">{order.id}</div>
						</div>
						<div className="flex shrink-0 items-center gap-space-sm">
							<span className="text-body-sm font-medium tabular-nums text-ink-dark">
								${order.amount}
							</span>
							<Badge variant={statusVariant(order.status)}>{order.status}</Badge>
						</div>
					</li>
				))}
			</ul>
		</Widget>
	);
}

// ── Sessions by channel (multi-line) ─────────────────────────────────────────

const sessionsData = [
	{ month: 'Jan', organic: 3200, direct: 2100, referral: 980 },
	{ month: 'Feb', organic: 3400, direct: 2200, referral: 1040 },
	{ month: 'Mar', organic: 3600, direct: 2350, referral: 1120 },
	{ month: 'Apr', organic: 3550, direct: 2280, referral: 1080 },
	{ month: 'May', organic: 3900, direct: 2420, referral: 1180 },
	{ month: 'Jun', organic: 4200, direct: 2800, referral: 1240 },
];

const sessionsConfig = {
	organic: {
		label: 'Organic',
		theme: { light: 'var(--color-primary-600)', dark: 'var(--color-primary-500)' },
	},
	direct: {
		label: 'Direct',
		theme: { light: 'var(--color-primary-400)', dark: 'var(--color-primary-300)' },
	},
	referral: {
		label: 'Referral',
		theme: { light: 'var(--color-primary-200)', dark: 'var(--color-primary-100)' },
	},
} satisfies ChartConfig;

export function MarmoWidgetSessionsByChannel() {
	return (
		<Widget
			title="Sessions by channel"
			filters={
				<Select defaultValue="all">
					<SelectTrigger size="sm" className="w-36">
						<SelectValue placeholder="Channel" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All channels</SelectItem>
						<SelectItem value="organic">Organic</SelectItem>
						<SelectItem value="direct">Direct</SelectItem>
					</SelectContent>
				</Select>
			}
		>
			<ChartContainer
				config={sessionsConfig}
				ariaLabel="Sessions by channel over six months"
				className="aspect-[16/9] max-h-[280px] w-full"
			>
				<LineChart data={sessionsData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis dataKey="month" tickLine={false} axisLine={false} />
					<YAxis tickLine={false} axisLine={false} width={40} />
					<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
					<Line type="monotone" dataKey="organic" stroke="var(--color-organic)" strokeWidth={2} dot={false} />
					<Line type="monotone" dataKey="direct" stroke="var(--color-direct)" strokeWidth={2} dot={false} />
					<Line type="monotone" dataKey="referral" stroke="var(--color-referral)" strokeWidth={2} dot={false} />
				</LineChart>
			</ChartContainer>
		</Widget>
	);
}

// ── Full board (Figma widgets frame) ─────────────────────────────────────────

export function MarmoDashboardWidgetsBoard() {
	return (
		<div className="not-prose space-y-space-md">
			<MarmoKpiStrip />
			<div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
				<MarmoWidgetRevenueTrend />
				<MarmoWidgetTopPages />
			</div>
			<div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
				<MarmoWidgetTrafficMix />
				<MarmoWidgetSignupFunnel />
			</div>
			<div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
				<MarmoWidgetSessionsByChannel />
				<MarmoWidgetRecentOrders />
			</div>
		</div>
	);
}
