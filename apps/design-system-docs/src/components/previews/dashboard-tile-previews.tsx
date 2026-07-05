'use client';

import * as React from 'react';
import {
	BarList,
	ChartTile,
	KPIScorecard,
	MarmoBarChart,
	type BarDatum,
} from '@/components/charts';
import {
	Alert,
	Badge,
	Button,
	ChartFunnel,
	DatePicker,
	EmptyState,
	IconButton,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	type ChartFunnelStage,
} from '@marmoui/ui';
import { MdAddChart, MdErrorOutline, MdSettings } from 'react-icons/md';
import {
	BarChart as ReBarChart,
	Bar,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Line,
	ComposedChart,
} from 'recharts';
import { CHART_TOKENS, formatCompact, formatFull, formatPercent } from '@/components/charts/palette';

const TOOLTIP_STYLE = {
	background: 'var(--color-bg, white)',
	border: '1px solid var(--color-border)',
	borderRadius: 8,
	padding: '8px 10px',
	boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
	fontSize: 12,
};

/* ───────────── 1 · Referral Sources ─────────── */

const referralData: BarDatum[] = [
	{ name: 'Direct', value: 997 },
	{ name: 'Referral', value: 467 },
	{ name: 'Organic Search', value: 268 },
	{ name: 'PPC Google Ads', value: 58 },
	{ name: 'Newsletter', value: 4 },
	{ name: 'Partner blog', value: 3 },
	{ name: 'Starter pack', value: 2 },
	{ name: 'Webinar', value: 1 },
	{ name: 'Podcast', value: 1 },
	{ name: 'PPC Bing Ads', value: 0 },
	{ name: 'PPC Facebook Ads', value: 0 },
	{ name: 'PPC X Ads', value: 0 },
	{ name: 'PPC LinkedIn Ads', value: 0 },
	{ name: 'PPC Pinterest Ads', value: 0 },
];

export function ReferralSourcesPreview() {
	return (
		<ChartTile
			question="Where did our referrals come from?"
			toolbar={
				<>
					<Badge variant="normal" size="sm">Recommended</Badge>
					<IconButton variant="ghost" size="sm" aria-label="Configure chart" icon={<MdSettings />} />
				</>
			}
			filters={
				<>
					<Select defaultValue="primary">
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Select site" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="primary">Primary site</SelectItem>
							<SelectItem value="docs">Docs site</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker placeholder="Select date range" isRange triggerType="input" />
				</>
			}
		>
			<BarList data={referralData} header="Source" unit="Visits" />
		</ChartTile>
	);
}

/* ───────────── 3 · Email Campaigns ─────────── */

const emailFunnel: ChartFunnelStage[] = [
	{ id: 'sent', label: 'Sent', value: 23000 },
	{ id: 'delivered', label: 'Delivered', value: 22600 },
	{ id: 'opened', label: 'Opened', value: 13800 },
	{ id: 'clicked', label: 'Clicked', value: 2200 },
];

export function EmailCampaignsPreview() {
	return (
		<ChartTile
			question="Where do recipients drop off?"
			hint="Email marketing — 30-day window"
			toolbar={<Badge variant="normal" size="sm">Recommended</Badge>}
		>
			<div className="grid grid-cols-3 gap-2">
				<KPIScorecard label="Open rate" value={formatPercent(13800 / 22600)} />
				<KPIScorecard label="CTR" value={formatPercent(2200 / 22600)} />
				<KPIScorecard label="Unsubscribe" value={formatPercent(80 / 22600, 2)} />
			</div>
			<div className="mt-3">
				<ChartFunnel
					ariaLabel="Email campaign funnel — Sent through Clicked"
					stages={emailFunnel}
					legendLabel="All recipients"
					height={260}
				/>
			</div>
		</ChartTile>
	);
}

/* ───────────── 4 · Checkout Funnel ─────────── */

const checkoutFunnel: ChartFunnelStage[] = [
	{ id: 'visited', label: 'Visited Store', value: 324 },
	{ id: 'started', label: 'Started Shopping', value: 66 },
	{ id: 'completed', label: 'Completed Orders', value: 29 },
];

export function CheckoutFunnelPreview() {
	return (
		<ChartTile
			question="Where do customers drop off in checkout?"
			toolbar={
				<>
					<Badge variant="normal" size="sm">Recommended</Badge>
					<IconButton variant="ghost" size="sm" aria-label="Configure chart" icon={<MdSettings />} />
				</>
			}
			filters={
				<>
					<Select defaultValue="docs">
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Select site" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="docs">Docs site</SelectItem>
							<SelectItem value="primary">Primary site</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker placeholder="Select date range" isRange triggerType="input" />
				</>
			}
		>
			<ChartFunnel
				ariaLabel="Checkout funnel — Visited Store through Completed Orders"
				stages={checkoutFunnel}
				legendLabel="All shoppers"
				height={260}
			/>
		</ChartTile>
	);
}

/* ───────────── 5 · Social Content (split into two tiles) ─────────── */

const socialMetrics = [
	{ name: 'Views', value: 5300 },
	{ name: 'Reach', value: 3800 },
	{ name: 'Engagement', value: 180 },
	{ name: 'Saved', value: 40 },
];

const socialMix = [
	{ name: 'Videos', value: 8 },
	{ name: 'Galleries', value: 4 },
	{ name: 'Images', value: 2 },
];

export function SocialContentPreview() {
	const totalPosts = socialMix.reduce((s, d) => s + d.value, 0);
	const totalEvents = socialMetrics.reduce((s, d) => s + d.value, 0);
	return (
		<ChartTile
			question="How is social content performing?"
			hint="Social campaigns · last 30 days"
			toolbar={<Badge variant="normal" size="sm">Recommended</Badge>}
		>
			<div className="flex flex-col gap-4">
				<div>
					<div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-light">
						Engagement
					</div>
					<div className="grid grid-cols-4 gap-2">
						{socialMetrics.map((m) => (
							<KPIScorecard key={m.name} label={m.name} value={formatFull(m.value)} />
						))}
					</div>
				</div>
				<div>
					<div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink-light">
						<span>Content mix</span>
						<span className="text-ink">{totalPosts} posts · {formatFull(totalEvents)} events</span>
					</div>
					<ul className="flex flex-col gap-2">
						{socialMix.map((r) => {
							const pct = totalPosts ? (r.value / totalPosts) * 100 : 0;
							return (
								<li key={r.name} className="flex flex-col gap-1">
									<div className="flex items-baseline justify-between text-sm">
										<span className="text-ink-dark">{r.name}</span>
										<span className="tabular-nums text-ink-light">
											{r.value} · {pct.toFixed(0)}%
										</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-border-secondary">
										<div
											className="h-full rounded-full"
											style={{
												width: `${pct}%`,
												backgroundColor: 'var(--color-chart-cat-teal)',
											}}
										/>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</ChartTile>
	);
}

/* ───────────── 6 · Chatbot Stats ─────────── */

type ChannelDatum = { name: string; conversations: number; users: number };

const chatbotChannels: ChannelDatum[] = [
	{ name: 'Landing Page', conversations: 19, users: 2 },
	{ name: 'Website', conversations: 0, users: 0 },
	{ name: 'Messenger', conversations: 0, users: 0 },
	{ name: 'Instagram', conversations: 0, users: 0 },
	{ name: 'WhatsApp', conversations: 0, users: 0 },
	{ name: 'SMS', conversations: 0, users: 0 },
];

export function ChatbotStatsPreview() {
	const [showInactive, setShowInactive] = React.useState(false);
	const active = chatbotChannels.filter((c) => c.conversations > 0 || c.users > 0);
	const inactive = chatbotChannels.filter((c) => c.conversations === 0 && c.users === 0);
	const visible = showInactive ? chatbotChannels : active;
	const totalConv = chatbotChannels.reduce((s, c) => s + c.conversations, 0);
	const totalUsers = chatbotChannels.reduce((s, c) => s + c.users, 0);

	const rowCount = Math.max(visible.length, 1);
	const chartHeight = rowCount * 56 + 36;

	return (
		<ChartTile
			question="Which channels generate conversations and users?"
			toolbar={
				<>
					<Badge variant="normal" size="sm">Recommended</Badge>
					<IconButton variant="ghost" size="sm" aria-label="Configure chart" icon={<MdSettings />} />
				</>
			}
			filters={
				<>
					<Select defaultValue="support">
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Select bot" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="support">Support bot</SelectItem>
							<SelectItem value="sales">Sales bot</SelectItem>
							<SelectItem value="onboarding">Onboarding bot</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker placeholder="Select date range" isRange triggerType="input" />
				</>
			}
			footer={
				inactive.length > 0 && (
					<button
						type="button"
						onClick={() => setShowInactive((v) => !v)}
						className="text-ink-primary underline-offset-2 hover:underline"
					>
						{showInactive
							? `Hide inactive (${inactive.length})`
							: `Show inactive channels (${inactive.length})`}
					</button>
				)
			}
		>
			<div className="grid grid-cols-2 gap-2">
				<KPIScorecard label="Total conversations" value={totalConv} />
				<KPIScorecard label="Total unique users" value={totalUsers} />
			</div>
			<div className="mt-3 flex items-center gap-3 text-xs text-ink-light">
				<LegendDot color="var(--color-chart-cat-teal)" label="Conversations" />
				<LegendDot color="var(--color-chart-cat-teal-bright)" label="Unique users" />
			</div>
			<div className="mt-2">
				<ResponsiveContainer width="100%" height={chartHeight}>
					<ReBarChart
						data={visible}
						layout="vertical"
						margin={{ top: 4, right: 24, left: 4, bottom: 4 }}
						barCategoryGap="22%"
					>
						<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" horizontal={false} />
						<XAxis
							type="number"
							tickFormatter={(v) => formatCompact(Number(v))}
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							type="category"
							dataKey="name"
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={false}
							tickLine={false}
							width={110}
						/>
						<Tooltip
							cursor={{ fill: CHART_TOKENS.gridline }}
							contentStyle={TOOLTIP_STYLE}
							formatter={(value: number, name) => {
								const label = name === 'conversations' ? 'Conversations' : 'Users';
								return [formatFull(value), label];
							}}
						/>
						<Bar
							dataKey="conversations"
							fill="var(--color-chart-cat-teal)"
							maxBarSize={14}
							radius={[0, 4, 4, 0]}
						/>
						<Bar
							dataKey="users"
							fill="var(--color-chart-cat-teal-bright)"
							maxBarSize={14}
							radius={[0, 4, 4, 0]}
						/>
					</ReBarChart>
				</ResponsiveContainer>
			</div>
		</ChartTile>
	);
}

function LegendDot({ color, label }: { color: string; label: string }) {
	return (
		<span className="inline-flex items-center gap-1.5">
			<span aria-hidden className="size-2.5 rounded-sm" style={{ background: color }} />
			<span>{label}</span>
		</span>
	);
}

/* ───────────── 7 · Conversation Starters ─────────── */

const conversationStarters = [
	{ name: 'How do I reset my password?', value: 10 },
	{ name: 'User-initiated', value: 6 },
	{ name: 'What plans do you offer?', value: 2 },
	{ name: 'Can I cancel anytime?', value: 1 },
];

export function ConversationStartersPreview() {
	return (
		<ChartTile
			question="Which conversation starters are used most?"
			hint="Support bot · last 30 days"
			toolbar={<Badge variant="normal" size="sm">Recommended</Badge>}
		>
			<BarList data={conversationStarters} header="Query" unit="Uses" />
		</ChartTile>
	);
}

/* ───────────── 8 · Leads Funnel ─────────── */

const leadStages: BarDatum[] = [
	{ name: 'Awareness', value: 110 },
	{ name: 'Consideration', value: 4 },
	{ name: 'Decision', value: 1 },
	{ name: 'Conversion', value: 2 },
	{ name: 'Retention', value: 6 },
	{ name: 'Maintenance', value: 1 },
];

export function LeadsFunnelPreview() {
	const cleanTotal = leadStages.reduce((s, d) => s + d.value, 0);
	const poorData = 53;

	return (
		<ChartTile
			question="How are leads distributed across the lifecycle?"
			toolbar={
				<>
					<Badge variant="normal" size="sm">Recommended</Badge>
					<IconButton variant="ghost" size="sm" aria-label="Configure chart" icon={<MdSettings />} />
				</>
			}
			filters={
				<>
					<Select defaultValue="docs">
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Select site" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="docs">Docs site</SelectItem>
							<SelectItem value="primary">Primary site</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker placeholder="Select date range" isRange triggerType="input" />
				</>
			}
		>
			<Alert variant="warning" className="mb-3">
				<div className="flex flex-col gap-0.5">
					<span className="font-semibold text-ink-dark">
						Poor data — {poorData} leads ({formatPercent(poorData / (poorData + cleanTotal))})
					</span>
					<span className="text-xs text-ink-light">
						Missing email, invalid stage, or no source. Review and re-tag to include them.
					</span>
				</div>
				<Button variant="ghost" size="sm" className="ml-auto shrink-0">
					Review
				</Button>
			</Alert>
			<MarmoBarChart
				data={leadStages}
				orientation="horizontal"
				highlightLeader={false}
				unit="leads"
				sort="none"
			/>
		</ChartTile>
	);
}

/* ───────────── 9 · Lists Growth ─────────── */

const listsGrowthData = generateListsGrowth();

function generateListsGrowth() {
	const start = new Date('2025-10-25');
	const points: Array<{ date: string; daily: number; total: number }> = [];
	let total = 258720;
	for (let i = 0; i < 30; i++) {
		const d = new Date(start);
		d.setDate(d.getDate() + i);
		const daily = Math.max(0, Math.round(2 + Math.random() * 8));
		total += daily;
		points.push({
			date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			daily,
			total,
		});
	}
	return points;
}

export function ListsGrowthPreview() {
	const last = listsGrowthData[listsGrowthData.length - 1];
	const first = listsGrowthData[0];
	const delta = last.total - first.total;

	return (
		<ChartTile
			question="How fast is the list growing?"
			toolbar={
				<>
					<Badge variant="normal" size="sm">Recommended</Badge>
					<IconButton variant="ghost" size="sm" aria-label="Configure chart" icon={<MdSettings />} />
				</>
			}
			filters={
				<>
					<Select defaultValue="all">
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Select list" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Lists</SelectItem>
							<SelectItem value="customers">Customers</SelectItem>
							<SelectItem value="leads">Leads</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker placeholder="Select date range" isRange triggerType="input" />
				</>
			}
		>
			<div className="grid grid-cols-2 gap-2">
				<KPIScorecard
					label="Total contacts"
					value={last.total}
					delta={delta}
					deltaLabel="last 30 days"
				/>
				<KPIScorecard
					label="Avg daily new"
					value={Math.round(delta / listsGrowthData.length)}
					hint="Contacts added per day"
				/>
			</div>
			<div className="mt-3">
				<ResponsiveContainer width="100%" height={200}>
					<ComposedChart
						data={listsGrowthData}
						margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
					>
						<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" vertical={false} />
						<XAxis
							dataKey="date"
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={{ stroke: CHART_TOKENS.gridline }}
							tickLine={false}
							interval={4}
						/>
						<YAxis
							tickFormatter={(v) => formatCompact(Number(v))}
							tick={{ fill: CHART_TOKENS.axisLabel, fontSize: 11 }}
							axisLine={false}
							tickLine={false}
							yAxisId="daily"
						/>
						<Tooltip
							contentStyle={TOOLTIP_STYLE}
							formatter={(value: number, name) => {
								if (name === 'daily') return [`${formatFull(value)} new`, 'New contacts'];
								return [formatFull(value), 'Cumulative'];
							}}
						/>
						<Bar
							dataKey="daily"
							yAxisId="daily"
							fill={CHART_TOKENS.accent}
							radius={[3, 3, 0, 0]}
							maxBarSize={14}
						/>
						<Line
							dataKey="total"
							yAxisId="daily"
							type="monotone"
							stroke={CHART_TOKENS.accentMuted}
							strokeWidth={1.5}
							dot={false}
							hide
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</ChartTile>
	);
}

/* ───────────── States demo (loading / empty / error / no-data) ─────────── */

export function ChartStatesPreview() {
	return (
		<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
			<ChartTile question="Loading state" state="loading" height={220} />
			<ChartTile question="Empty state" height={220}>
				<EmptyState
					title="No campaigns yet"
					description="Create your first campaign to start tracking sign-ups."
					icon={<MdAddChart aria-hidden className="size-10" />}
				>
					<Button size="sm" variant="primary">
						Create campaign
					</Button>
				</EmptyState>
			</ChartTile>
			<ChartTile question="Error state" height={220}>
				<div className="flex h-full flex-col items-center justify-center gap-3 text-center p-6">
					<MdErrorOutline aria-hidden className="size-10 text-destructive" />
					<div className="space-y-1">
						<h3 className="text-base font-semibold text-ink">Couldn't load chart</h3>
						<p className="text-sm text-ink-light">
							The analytics service didn't respond. Retry to try again.
						</p>
					</div>
					<Button size="sm" variant="ghost">
						Retry
					</Button>
				</div>
			</ChartTile>
			<ChartTile question="No data for range" state="no-data-for-range" height={220} />
		</div>
	);
}
