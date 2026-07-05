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
	Avatar,
	AvatarFallback,
	Badge,
	BarList,
	BarListLegend,
	ChartContainer,
	ChartFunnel,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	DatePicker,
	IconButton,
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
	type ChartConfig,
	Widget,
} from '@marmoui/ui';
import { MdSettings } from 'react-icons/md';

const compactCurrency = (v: number) => `$${(v / 1000).toFixed(v >= 1000 ? 1 : 0)}k`;
const compactNumber = (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toLocaleString());

/** Multi-line x-axis tick — splits long category labels (e.g. "Landing Page") into 2 lines. */
function MultilineTick(props: { x?: number; y?: number; payload?: { value?: string } }) {
	const { x = 0, y = 0, payload } = props;
	const text = payload?.value ?? '';
	const words = text.split(' ');
	let lines: string[];
	if (words.length <= 1) {
		lines = [text];
	} else if (words.length === 2) {
		lines = words;
	} else {
		const mid = Math.ceil(words.length / 2);
		lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
	}
	return (
		<g transform={`translate(${x},${y})`}>
			<text textAnchor="middle" className="fill-ink" fontSize={11}>
				{lines.map((line, i) => (
					<tspan key={i} x={0} dy={i === 0 ? 14 : 12}>
						{line}
					</tspan>
				))}
			</text>
		</g>
	);
}

// ---------------- Sales by channel (line) ----------------

const salesData = [
	{ month: 'Jan', email: 12400, search: 8200, social: 4800, direct: 3600 },
	{ month: 'Feb', email: 15600, search: 9100, social: 5200, direct: 4100 },
	{ month: 'Mar', email: 18200, search: 9800, social: 6400, direct: 4500 },
	{ month: 'Apr', email: 17100, search: 11200, social: 7100, direct: 4900 },
	{ month: 'May', email: 21500, search: 12400, social: 8200, direct: 5400 },
	{ month: 'Jun', email: 24800, search: 13800, social: 9400, direct: 6100 },
];

const salesConfig: ChartConfig = {
	email: { label: 'Email', theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' } },
	search: {
		label: 'Search',
		theme: { light: 'var(--color-chart-2)', dark: 'var(--color-chart-2)' },
	},
	social: {
		label: 'Social',
		theme: { light: 'var(--color-chart-3)', dark: 'var(--color-chart-3)' },
	},
	direct: {
		label: 'Direct',
		theme: { light: 'var(--color-chart-4)', dark: 'var(--color-chart-4)' },
	},
};

export function WidgetSalesByChannel() {
	return (
		<Widget title="Sales by channel">
			<ChartContainer
				config={salesConfig}
				ariaLabel="Sales by channel, monthly January through June"
				className="aspect-[16/9] max-h-[280px] w-full"
			>
				<LineChart data={salesData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis dataKey="month" tickLine={false} axisLine={false} />
					<YAxis tickLine={false} axisLine={false} tickFormatter={compactCurrency} />
					<ChartTooltip
						cursor={{ stroke: 'var(--color-chart-grid)', strokeDasharray: '3 3' }}
						content={<ChartTooltipContent unit="$" indicator="bar" />}
					/>
					<ChartLegend content={<ChartLegendContent />} />
					{(['email', 'search', 'social', 'direct'] as const).map(k => (
						<Line
							key={k}
							dataKey={k}
							type="monotone"
							stroke={`var(--color-${k})`}
							strokeWidth={2}
							dot={false}
						/>
					))}
				</LineChart>
			</ChartContainer>
		</Widget>
	);
}

// ---------------- Email campaigns (single-campaign drilldown) ----------------

const campaignSent = 7000;
const campaignMetrics = [
	{ name: 'Opened', value: 1180 },
	{ name: 'Clicked', value: 42 },
	{ name: 'Unsubscribed', value: 18 },
];

const campaignData = campaignMetrics.map(m => ({
	...m,
	rest: Math.max(campaignSent - m.value, 0),
	sent: campaignSent,
}));

const campaignConfig: ChartConfig = {
	value: {
		label: 'Engaged',
		theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' },
	},
	rest: {
		label: 'Remaining of sent',
		theme: { light: 'var(--color-chart-1-bright)', dark: 'var(--color-chart-1-bright)' },
	},
};

const campaignKpis = [
	{ label: 'Sent', value: campaignSent.toLocaleString() },
	{ label: 'Opened', value: '1,180', sub: '16.86%' },
	{ label: 'Total clicks', value: '42', sub: '0.60%' },
	{ label: 'Conversion', value: '6', sub: '0.09%' },
];

export function WidgetEmailCampaigns() {
	return (
		<Widget title="Email campaigns">
			<div className="flex flex-col gap-4">
				<ChartContainer
					config={campaignConfig}
					ariaLabel="Email campaign engagement: opens, clicks, unsubscribes against sent baseline"
					className="aspect-[16/9] max-h-[260px] w-full"
				>
					<BarChart data={campaignData} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis dataKey="name" tickLine={false} axisLine={false} />
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={compactNumber}
							width={56}
							label={{
								value: 'Engagement',
								angle: -90,
								position: 'insideLeft',
								offset: 0,
								style: { textAnchor: 'middle', fill: 'var(--color-ink-light)', fontSize: 11 },
							}}
						/>
						<ChartTooltip
							cursor={{ fill: 'transparent' }}
							content={
								<ChartTooltipContent
									indicator="bar"
									formatter={(value, name, item) => {
										if (name === 'rest') {
											const remaining = Number((item.payload as { rest: number }).rest);
											return (
												<div className="flex items-center justify-between gap-3">
													<span className="text-ink-light">Remaining of sent</span>
													<span className="font-mono font-medium tabular-nums text-ink-dark">
														{remaining.toLocaleString()}
													</span>
												</div>
											);
										}
										const v = Number(value as number);
										const pct = campaignSent > 0 ? (v / campaignSent) * 100 : 0;
										return (
											<div className="flex items-center justify-between gap-3">
												<span className="text-ink-light">
													{(item.payload as { name: string }).name}
												</span>
												<span className="font-mono font-medium tabular-nums text-ink-dark">
													{v.toLocaleString()}{' '}
													<span className="text-ink-light">· {pct.toFixed(2)}%</span>
												</span>
											</div>
										);
									}}
								/>
							}
						/>
						<Bar
							dataKey="value"
							stackId="a"
							fill="var(--color-value)"
							radius={[0, 0, 0, 0]}
							maxBarSize={48}
						/>
						<Bar
							dataKey="rest"
							stackId="a"
							fill="var(--color-rest)"
							fillOpacity={0.5}
							radius={[4, 4, 0, 0]}
							maxBarSize={48}
						/>
					</BarChart>
				</ChartContainer>

				{/* KPI scorecards beneath the chart, like the legacy widget */}
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{campaignKpis.map(kpi => (
						<div key={kpi.label} className="rounded-md border border-border-secondary bg-bg p-3">
							<div className="text-xs text-ink-light">{kpi.label}</div>
							<div className="font-heading text-lg font-semibold tabular-nums text-ink-dark">
								{kpi.value}
							</div>
							{kpi.sub && <div className="text-xs tabular-nums text-ink-light">{kpi.sub}</div>}
						</div>
					))}
				</div>
			</div>
		</Widget>
	);
}

// ---------------- Lists growth (area) ----------------

const listsData = Array.from({ length: 12 }, (_, i) => ({
	month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
	contacts: 4200 + i * 320 + (i % 3 === 0 ? 180 : 0),
}));

const listsConfig: ChartConfig = {
	contacts: {
		label: 'Contacts',
		theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' },
	},
};

export function WidgetListsGrowth() {
	const gradId = `contactsGradient-${React.useId().replace(/:/g, '')}`;
	return (
		<Widget
			title="Lists growth"
			actions={<ConfigureButton />}
			filters={
				<>
					<Select defaultValue="all">
						<SelectTrigger className="w-44" size="sm">
							<SelectValue placeholder="Select list" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Lists</SelectItem>
							<SelectItem value="customers">Customers</SelectItem>
							<SelectItem value="leads">Leads</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker
						placeholder="Select date range"
						isRange
						triggerType="input"
						className="h-8 text-sm"
					/>
				</>
			}
		>
			<ChartContainer
				config={listsConfig}
				ariaLabel="Total contacts month over month"
				className="aspect-[16/9] max-h-[280px] w-full"
			>
				<AreaChart data={listsData} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
					<defs>
						<linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--color-contacts)" stopOpacity={0.5} />
							<stop offset="100%" stopColor="var(--color-contacts)" stopOpacity={0.02} />
						</linearGradient>
					</defs>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis dataKey="month" tickLine={false} axisLine={false} />
					<YAxis
						tickLine={false}
						axisLine={false}
						tickFormatter={compactNumber}
						width={56}
						label={{
							value: 'Contacts',
							angle: -90,
							position: 'insideLeft',
							offset: 0,
							style: { textAnchor: 'middle', fill: 'var(--color-ink-light)', fontSize: 11 },
						}}
					/>
					<ChartTooltip
						cursor={{ stroke: 'var(--color-chart-grid)', strokeDasharray: '3 3' }}
						content={<ChartTooltipContent indicator="bar" />}
					/>
					<ChartLegend verticalAlign="top" content={<ChartLegendContent verticalAlign="top" />} />
					<Area
						dataKey="contacts"
						type="monotone"
						stroke="var(--color-contacts)"
						strokeWidth={2}
						fill={`url(#${gradId})`}
					/>
				</AreaChart>
			</ChartContainer>
		</Widget>
	);
}

// ---------------- Sales by country (donut) ----------------

const countryData = [
	{ name: 'United States', value: 12400, color: 'var(--color-chart-cat-teal)' },
	{ name: 'Germany', value: 4800, color: 'var(--color-chart-cat-violet)' },
	{ name: 'United Kingdom', value: 3600, color: 'var(--color-chart-cat-blue)' },
	{ name: 'Canada', value: 2100, color: 'var(--color-chart-cat-orange)' },
];

const countryConfig: ChartConfig = {
	'United States': {
		label: 'United States',
		theme: { light: 'var(--color-chart-cat-teal)', dark: 'var(--color-chart-cat-teal)' },
	},
	Germany: {
		label: 'Germany',
		theme: { light: 'var(--color-chart-cat-violet)', dark: 'var(--color-chart-cat-violet)' },
	},
	'United Kingdom': {
		label: 'United Kingdom',
		theme: { light: 'var(--color-chart-cat-blue)', dark: 'var(--color-chart-cat-blue)' },
	},
	Canada: {
		label: 'Canada',
		theme: { light: 'var(--color-chart-cat-orange)', dark: 'var(--color-chart-cat-orange)' },
	},
};

export function WidgetSalesByCountry() {
	const total = countryData.reduce((s, d) => s + d.value, 0);
	return (
		<Widget title="Sales by country">
			<ChartContainer
				config={countryConfig}
				ariaLabel="Revenue share by country"
				className="aspect-square max-h-[280px] w-full"
			>
				<PieChart>
					<ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" unit="$" />} />
					<Pie
						data={countryData}
						dataKey="value"
						nameKey="name"
						innerRadius={60}
						outerRadius={90}
						strokeWidth={2}
					>
						{countryData.map(d => (
							<Cell key={d.name} fill={d.color} />
						))}
						<Label
							content={({ viewBox }) => {
								if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
								return (
									<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-ink-dark text-xl font-semibold"
										>
											{compactCurrency(total)}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy ?? 0) + 18}
											className="fill-ink-light text-xs"
										>
											total
										</tspan>
									</text>
								);
							}}
						/>
					</Pie>
					<ChartLegend content={<ChartLegendContent nameKey="name" />} />
				</PieChart>
			</ChartContainer>
		</Widget>
	);
}

// ---------------- Leads funnel (ChartFunnel) ----------------

export function WidgetLeadsFunnel() {
	return (
		<Widget
			title="Leads funnel"
			actions={<ConfigureButton />}
			filters={
				<>
					<Select defaultValue="primary">
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Select site" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="primary">example.com</SelectItem>
							<SelectItem value="academy">academy.example.com</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker placeholder="Select date range" isRange triggerType="input" />
				</>
			}
		>
			<ChartFunnel
				ariaLabel="Leads funnel: visitors to purchase completed across four stages"
				legendLabel="All Users; Overall"
				stages={[
					{ id: 'visitors', label: 'Visitors', value: 1269 },
					{ id: 'viewed', label: 'Product Viewed', value: 612 },
					{ id: 'cart', label: 'Added to Cart', value: 286 },
					{ id: 'purchased', label: 'Purchase Completed', value: 96 },
				]}
				color="var(--color-chart-1)"
				brightColor="var(--color-chart-1-bright)"
				height={300}
			/>
		</Widget>
	);
}

// ---------------- Retention cohort (stacked area) ----------------

const retentionData = Array.from({ length: 8 }, (_, i) => ({
	week: `W${i + 1}`,
	new: Math.max(120 - i * 12, 30),
	returning: 80 + i * 18,
}));

const retentionConfig: ChartConfig = {
	new: {
		label: 'New',
		theme: {
			light: 'var(--color-chart-cat-teal-bright)',
			dark: 'var(--color-chart-cat-teal-bright)',
		},
	},
	returning: {
		label: 'Returning',
		theme: { light: 'var(--color-chart-cat-teal)', dark: 'var(--color-chart-cat-teal)' },
	},
};

export function WidgetRetentionCohort() {
	return (
		<Widget title="Retention">
			<ChartContainer
				config={retentionConfig}
				ariaLabel="New versus returning customers per week"
				className="aspect-[16/9] max-h-[260px] w-full"
			>
				<AreaChart data={retentionData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis dataKey="week" tickLine={false} axisLine={false} />
					<YAxis tickLine={false} axisLine={false} />
					<ChartTooltip
						cursor={{ stroke: 'var(--color-chart-grid)', strokeDasharray: '3 3' }}
						content={<ChartTooltipContent />}
					/>
					<ChartLegend content={<ChartLegendContent />} />
					<Area
						dataKey="new"
						stackId="a"
						stroke="var(--color-new)"
						fill="var(--color-new)"
						fillOpacity={0.4}
					/>
					<Area
						dataKey="returning"
						stackId="a"
						stroke="var(--color-returning)"
						fill="var(--color-returning)"
						fillOpacity={0.5}
					/>
				</AreaChart>
			</ChartContainer>
		</Widget>
	);
}

// ---------------- Conversation starters (horizontal bar) ----------------

const startersData = [
	{ name: 'Pricing', count: 312 },
	{ name: 'How does it work?', count: 248 },
	{ name: 'Refund policy', count: 184 },
	{ name: 'Compare plans', count: 156 },
	{ name: 'Contact sales', count: 98 },
];

const startersConfig: ChartConfig = {
	count: {
		label: 'Conversations',
		theme: { light: 'var(--color-chart-1)', dark: 'var(--color-chart-1)' },
	},
};

export function WidgetConversationStarters() {
	return (
		<Widget title="Conversation starters">
			<ChartContainer
				config={startersConfig}
				ariaLabel="Top chatbot conversation starters by count"
				className="aspect-[16/9] max-h-[260px] w-full"
			>
				<BarChart
					data={startersData}
					layout="vertical"
					margin={{ top: 8, right: 16, bottom: 0, left: 8 }}
				>
					<CartesianGrid horizontal={false} strokeDasharray="3 3" />
					<XAxis type="number" tickLine={false} axisLine={false} />
					<YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={140} />
					<ChartTooltip cursor={{ fill: 'var(--color-bg)' }} content={<ChartTooltipContent />} />
					<Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
				</BarChart>
			</ChartContainer>
		</Widget>
	);
}

// ---------------- Top countries (table widget) ----------------

const topCountries = [
	{ flag: '🇺🇸', country: 'United States', visitors: 12400, share: 0.42 },
	{ flag: '🇩🇪', country: 'Germany', visitors: 4800, share: 0.16 },
	{ flag: '🇬🇧', country: 'United Kingdom', visitors: 3600, share: 0.12 },
	{ flag: '🇨🇦', country: 'Canada', visitors: 2100, share: 0.07 },
	{ flag: '🇫🇷', country: 'France', visitors: 1800, share: 0.06 },
	{ flag: '🇪🇸', country: 'Spain', visitors: 1200, share: 0.04 },
	{ flag: '🇮🇹', country: 'Italy', visitors: 980, share: 0.034 },
	{ flag: '🇦🇺', country: 'Australia', visitors: 870, share: 0.03 },
	{ flag: '🇳🇱', country: 'Netherlands', visitors: 760, share: 0.026 },
	{ flag: '🇧🇷', country: 'Brazil', visitors: 640, share: 0.022 },
	{ flag: '🇯🇵', country: 'Japan', visitors: 590, share: 0.02 },
	{ flag: '🇲🇽', country: 'Mexico', visitors: 480, share: 0.017 },
];

const TOP_COUNTRIES_PAGE_SIZE = 4;

export function WidgetTopCountries() {
	const [page, setPage] = React.useState(1);
	const pageCount = Math.ceil(topCountries.length / TOP_COUNTRIES_PAGE_SIZE);
	const start = (page - 1) * TOP_COUNTRIES_PAGE_SIZE;
	const rows = topCountries.slice(start, start + TOP_COUNTRIES_PAGE_SIZE);
	const goTo = (n: number) => setPage(Math.min(Math.max(n, 1), pageCount));

	return (
		<Widget
			title="Top countries"
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
			<table className="w-full text-left text-sm tabular-nums">
				<thead className="border-b border-border text-xs text-ink-light">
					<tr>
						<th scope="col" className="px-3 py-2 font-medium">
							Country
						</th>
						<th scope="col" className="px-3 py-2 text-right font-medium">
							Visitors
						</th>
						<th scope="col" className="px-3 py-2 text-right font-medium">
							Share
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map(row => (
						<tr key={row.country} className="border-b border-border-secondary last:border-b-0">
							<td className="px-3 py-2">
								<span className="mr-2" aria-hidden>
									{row.flag}
								</span>
								{row.country}
							</td>
							<td className="px-3 py-2 text-right text-ink-dark">
								{row.visitors.toLocaleString()}
							</td>
							<td className="px-3 py-2 text-right text-ink-light">
								{(row.share * 100).toFixed(1)}%
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Widget>
	);
}

// ---------------- Chatbot stats (replaces 3D chatbot-stats.php) ----------------

const chatbotData = [
	{ channel: 'Website', conversations: 124, users: 88 },
	{ channel: 'Landing Page', conversations: 96, users: 72 },
	{ channel: 'Messenger', conversations: 64, users: 48 },
	{ channel: 'Instagram', conversations: 38, users: 28 },
	{ channel: 'WhatsApp', conversations: 24, users: 16 },
	{ channel: 'SMS', conversations: 12, users: 8 },
];

const chatbotConfig: ChartConfig = {
	conversations: {
		label: 'Conversations',
		theme: { light: 'var(--color-chart-cat-teal-bright)', dark: 'var(--color-chart-cat-teal-bright)' },
	},
	users: {
		label: 'Users',
		theme: { light: 'var(--color-chart-cat-teal)', dark: 'var(--color-chart-cat-teal)' },
	},
};

export function WidgetChatbotStats() {
	return (
		<Widget
			title="Chatbot stats"
			actions={<ConfigureButton />}
			filters={
				<>
					<Select defaultValue="fitness">
						<SelectTrigger className="w-44" size="sm">
							<SelectValue placeholder="Select bot" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="fitness">Dr Joey · Fitness</SelectItem>
							<SelectItem value="support">Help Scout · Support</SelectItem>
							<SelectItem value="sales">Sales Agent</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker
						placeholder="Select date range"
						isRange
						triggerType="input"
						className="h-8 text-sm"
					/>
				</>
			}
		>
			<ChartContainer
				config={chatbotConfig}
				ariaLabel="Chatbot conversations and users per channel"
				className="aspect-[16/9] max-h-[300px] w-full"
			>
				<BarChart data={chatbotData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis
						dataKey="channel"
						tickLine={false}
						axisLine={false}
						interval={0}
						height={40}
						tick={<MultilineTick />}
					/>
					<YAxis tickLine={false} axisLine={false} tickFormatter={compactNumber} />
					<ChartTooltip cursor={{ fill: 'var(--color-bg)' }} content={<ChartTooltipContent />} />
					<ChartLegend verticalAlign="top" content={<ChartLegendContent verticalAlign="top" />} />
					<Bar dataKey="conversations" fill="var(--color-conversations)" radius={[4, 4, 0, 0]} />
					<Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ChartContainer>
		</Widget>
	);
}

// ---------------- Automation actions (replaces 3D automation.php) ----------------

const automationData = [
	{ channel: 'Email', sent: 8200, opened: 3100, clicked: 720 },
	{ channel: 'Browser Push', sent: 4800, opened: 1900, clicked: 320 },
	{ channel: 'SMS', sent: 2400, opened: 1700, clicked: 280 },
];

const automationConfig: ChartConfig = {
	sent: {
		label: 'Sent',
		theme: { light: 'var(--color-chart-sequential-1)', dark: 'var(--color-chart-sequential-1)' },
	},
	opened: {
		label: 'Opened',
		theme: { light: 'var(--color-chart-sequential-3)', dark: 'var(--color-chart-sequential-3)' },
	},
	clicked: {
		label: 'Clicked',
		theme: { light: 'var(--color-chart-sequential-5)', dark: 'var(--color-chart-sequential-5)' },
	},
};

export function WidgetAutomationActions() {
	return (
		<Widget
			title="Automation actions"
			actions={<ConfigureButton />}
			filters={
				<>
					<Select defaultValue="primary">
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Select site" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="primary">example.com</SelectItem>
							<SelectItem value="academy">academy.example.com</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker placeholder="Select date range" isRange triggerType="input" />
				</>
			}
		>
			<ChartContainer
				config={automationConfig}
				ariaLabel="Automation actions analytics by channel"
				className="aspect-[16/9] max-h-[300px] w-full"
			>
				<BarChart data={automationData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis
						dataKey="channel"
						tickLine={false}
						axisLine={false}
						interval={0}
						height={40}
						tick={<MultilineTick />}
					/>
					<YAxis tickLine={false} axisLine={false} tickFormatter={compactNumber} />
					<ChartTooltip cursor={{ fill: 'var(--color-bg)' }} content={<ChartTooltipContent />} />
					<ChartLegend verticalAlign="top" content={<ChartLegendContent verticalAlign="top" />} />
					<Bar dataKey="sent" fill="var(--color-sent)" radius={[4, 4, 0, 0]} />
					<Bar dataKey="opened" fill="var(--color-opened)" radius={[4, 4, 0, 0]} />
					<Bar dataKey="clicked" fill="var(--color-clicked)" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ChartContainer>
		</Widget>
	);
}

// ---------------- Top buyers (table widget with avatars) ----------------

const topBuyers = [
	{ initials: 'JD', name: 'John Doe', orders: 24, ltv: 4820 },
	{ initials: 'AS', name: 'Aisha Singh', orders: 18, ltv: 3640 },
	{ initials: 'CP', name: 'Carlos Perez', orders: 15, ltv: 3120 },
	{ initials: 'EM', name: 'Eva Müller', orders: 12, ltv: 2480 },
	{ initials: 'LK', name: 'Liam Kim', orders: 10, ltv: 2160 },
	{ initials: 'NR', name: 'Noa Rivera', orders: 8, ltv: 1820 },
	{ initials: 'TT', name: 'Tomas Tan', orders: 7, ltv: 1640 },
	{ initials: 'PV', name: 'Priya Vora', orders: 6, ltv: 1490 },
	{ initials: 'OO', name: 'Olu Okafor', orders: 5, ltv: 1320 },
];

const TOP_BUYERS_PAGE_SIZE = 3;

export function WidgetTopBuyers() {
	const [page, setPage] = React.useState(1);
	const pageCount = Math.ceil(topBuyers.length / TOP_BUYERS_PAGE_SIZE);
	const rows = topBuyers.slice((page - 1) * TOP_BUYERS_PAGE_SIZE, page * TOP_BUYERS_PAGE_SIZE);
	const goTo = (n: number) => setPage(Math.min(Math.max(n, 1), pageCount));

	return (
		<Widget
			title="Top buyers"
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
				{rows.map(b => (
					<li key={b.name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
						<Avatar size="sm">
							<AvatarFallback>{b.initials}</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<div className="truncate text-sm font-medium text-ink-dark">{b.name}</div>
							<div className="text-xs text-ink-light">{b.orders} orders</div>
						</div>
						<Badge variant="success">${b.ltv.toLocaleString()}</Badge>
					</li>
				))}
			</ul>
		</Widget>
	);
}

// ---------------- Countries × channels (BarList multi-series + legend) ----------------

const countriesByChannelData = [
	{
		name: 'United States',
		values: { direct: 4200, organic: 3100, paid: 2100, social: 1400, referral: 900 },
	},
	{
		name: 'Germany',
		values: { direct: 1800, organic: 1500, paid: 700, social: 480, referral: 320 },
	},
	{
		name: 'United Kingdom',
		values: { direct: 1400, organic: 1200, paid: 540, social: 410, referral: 220 },
	},
	{ name: 'France', values: { direct: 900, organic: 780, paid: 320, social: 260, referral: 140 } },
	{ name: 'Canada', values: { direct: 820, organic: 690, paid: 410, social: 220, referral: 180 } },
	{ name: 'Spain', values: { direct: 540, organic: 410, paid: 220, social: 160, referral: 90 } },
	{ name: 'Italy', values: { direct: 480, organic: 360, paid: 190, social: 140, referral: 80 } },
	{
		name: 'Australia',
		values: { direct: 410, organic: 320, paid: 170, social: 120, referral: 70 },
	},
];

const channelSeries = [
	{ key: 'direct', label: 'Direct', color: 'teal' },
	{ key: 'organic', label: 'Organic', color: 'violet' },
	{ key: 'paid', label: 'Paid', color: 'blue' },
	{ key: 'social', label: 'Social', color: 'orange' },
	{ key: 'referral', label: 'Referral', color: 'pink' },
];

export function WidgetCountriesByChannel() {
	return (
		<Widget title="Visitors by country">
			<div className="flex flex-col gap-4">
				<BarListLegend series={channelSeries} maxVisible={4} />
				<BarList
					data={countriesByChannelData}
					series={channelSeries}
					layout="stacked"
					header="Country"
					labelWidth={120}
					maxBarWidth={260}
				/>
			</div>
		</Widget>
	);
}

function ConfigureButton() {
	return (
		<IconButton variant="ghost" size="sm" aria-label="Configure chart" icon={<MdSettings />} />
	);
}

// ---------------- Whole dashboard demo ----------------

export function DashboardWidgetsShowcase() {
	return (
		<div className="not-prose space-y-4">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<WidgetSalesByChannel />
				<WidgetSalesByCountry />
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<WidgetEmailCampaigns />
				<WidgetListsGrowth />
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<WidgetLeadsFunnel />
				<WidgetRetentionCohort />
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<WidgetConversationStarters />
				<WidgetTopCountries />
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<WidgetChatbotStats />
				<WidgetAutomationActions />
			</div>
			<WidgetCountriesByChannel />
			<WidgetTopBuyers />
		</div>
	);
}
