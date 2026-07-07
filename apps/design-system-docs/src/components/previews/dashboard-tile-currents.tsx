'use client';

import * as React from 'react';
import {
	BarChart as ReBarChart,
	Bar,
	CartesianGrid,
	Cell,
	ComposedChart,
	PieChart,
	Pie,
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Legend,
} from 'recharts';
import { ChartTile } from '@/components/charts';
import { Badge } from '@marmoui/ui';
import { CHART_TOKENS, formatFull } from '@/components/charts/palette';

const RAINBOW = [
	'#e74c3c',
	'#e67e22',
	'#f1c40f',
	'#27ae60',
	'#3498db',
	'#9b59b6',
	'#1abc9c',
	'#d35400',
	'#8e44ad',
	'#16a085',
	'#c0392b',
	'#2c3e50',
	'#7f8c8d',
	'#bdc3c7',
];

const TOOLTIP_STYLE = {
	background: 'var(--color-bg, white)',
	border: '1px solid var(--color-border)',
	borderRadius: 8,
	padding: '8px 10px',
	fontSize: 12,
};

function CurrentBadge() {
	return (
		<Badge variant="destructive" size="sm">
			Current
		</Badge>
	);
}

/* 1 · Referral Sources — pie, 14 slices, 5 zeros */

const referralPie = [
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

export function ReferralSourcesCurrent() {
	return (
		<ChartTile question="Referral sources" toolbar={<CurrentBadge />}>
			<ResponsiveContainer width="100%" height={260}>
				<PieChart>
					<Pie data={referralPie} dataKey="value" nameKey="name" outerRadius={90}>
						{referralPie.map((_, i) => (
							<Cell key={i} fill={RAINBOW[i % RAINBOW.length]} />
						))}
					</Pie>
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Legend wrapperStyle={{ fontSize: 10 }} />
				</PieChart>
			</ResponsiveContainer>
		</ChartTile>
	);
}

/* 3 · Email Campaigns — overlapping column, two ambiguous series */

const emailOverlap = [
	{ name: 'Opened', a: 13800, b: 11200 },
	{ name: 'Clicked', a: 2200, b: 1900 },
	{ name: 'Unsubscribed', a: 80, b: 60 },
];

export function EmailCampaignsCurrent() {
	return (
		<ChartTile question="Email campaigns" toolbar={<CurrentBadge />}>
			<ResponsiveContainer width="100%" height={240}>
				<ReBarChart data={emailOverlap} barGap={-30}>
					<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" />
					<XAxis dataKey="name" tick={{ fontSize: 11 }} />
					<YAxis tick={{ fontSize: 11 }} />
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Bar dataKey="a" fill="#5b9bd5" />
					<Bar dataKey="b" fill="#7cb5ec" opacity={0.7} />
				</ReBarChart>
			</ResponsiveContainer>
		</ChartTile>
	);
}

/* 4 · Checkout Funnel — mirrored area with negative y-axis */

const checkoutMirror = [
	{ stage: 'Visited Store', upper: 162, lower: -162 },
	{ stage: 'Started Shopping', upper: 33, lower: -33 },
	{ stage: 'Completed Orders', upper: 14.5, lower: -14.5 },
];

export function CheckoutFunnelCurrent() {
	return (
		<ChartTile question="Checkout funnel" toolbar={<CurrentBadge />}>
			<ResponsiveContainer width="100%" height={240}>
				<AreaChart data={checkoutMirror}>
					<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" />
					<XAxis dataKey="stage" tick={{ fontSize: 11 }} />
					<YAxis domain={[-200, 200]} tick={{ fontSize: 11 }} />
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Area type="monotone" dataKey="upper" stroke="#e67e22" fill="#e67e22" fillOpacity={0.6} />
					<Area type="monotone" dataKey="lower" stroke="#e67e22" fill="#e67e22" fillOpacity={0.6} />
				</AreaChart>
			</ResponsiveContainer>
		</ChartTile>
	);
}

/* 5 · Social Content — 3D column + 3D donut, two questions in one tile */

const socialBars = [
	{ name: 'Engagement', value: 180 },
	{ name: 'Views', value: 5300 },
	{ name: 'Reach', value: 3800 },
	{ name: 'Saved', value: 40 },
];

const socialMix = [
	{ name: 'Images', value: 2 },
	{ name: 'Videos', value: 8 },
	{ name: 'Galleries', value: 4 },
];

export function SocialContentCurrent() {
	return (
		<ChartTile question="Social content" toolbar={<CurrentBadge />}>
			<div className="grid grid-cols-2 gap-3">
				<ResponsiveContainer width="100%" height={200}>
					<ReBarChart data={socialBars}>
						<XAxis dataKey="name" tick={{ fontSize: 10 }} />
						<YAxis tick={{ fontSize: 10 }} />
						<Bar dataKey="value">
							{socialBars.map((_, i) => (
								<Cell key={i} fill={RAINBOW[i]} />
							))}
						</Bar>
					</ReBarChart>
				</ResponsiveContainer>
				<ResponsiveContainer width="100%" height={200}>
					<PieChart>
						<Pie data={socialMix} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80}>
							{socialMix.map((_, i) => (
								<Cell key={i} fill={RAINBOW[i + 3]} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</ChartTile>
	);
}

/* 6 · Chatbot Stats — 3D column with empty channels */

const chatbotBars = [
	{ name: 'Website', conv: 0, users: 0 },
	{ name: 'Landing Page', conv: 19, users: 2 },
	{ name: 'Messenger', conv: 0, users: 0 },
	{ name: 'Instagram', conv: 0, users: 0 },
	{ name: 'WhatsApp', conv: 0, users: 0 },
	{ name: 'SMS', conv: 0, users: 0 },
];

export function ChatbotStatsCurrent() {
	return (
		<ChartTile question="Channels" toolbar={<CurrentBadge />}>
			<ResponsiveContainer width="100%" height={240}>
				<ReBarChart data={chatbotBars}>
					<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" />
					<XAxis dataKey="name" tick={{ fontSize: 10 }} />
					<YAxis tick={{ fontSize: 10 }} />
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Bar dataKey="conv">
						{chatbotBars.map((_, i) => (
							<Cell key={i} fill={RAINBOW[i % RAINBOW.length]} />
						))}
					</Bar>
					<Bar dataKey="users">
						{chatbotBars.map((_, i) => (
							<Cell key={i} fill={RAINBOW[(i + 4) % RAINBOW.length]} />
						))}
					</Bar>
				</ReBarChart>
			</ResponsiveContainer>
			<p className="mt-2 text-[11px] text-ink-light">
				Conversations: 0 / Users: 0 · Conversations: 19 / Users: 2 · Conversations: 0 / Users: 0
			</p>
		</ChartTile>
	);
}

/* 7 · Conversation Starters — pie, 4 slices (borderline) */

const conversationPie = [
	{ name: 'How do I reset my password?', value: 10 },
	{ name: 'User-initiated', value: 6 },
	{ name: 'What plans do you offer?', value: 2 },
	{ name: 'Can I cancel anytime?', value: 1 },
];

export function ConversationStartersCurrent() {
	return (
		<ChartTile question="Top user queries" toolbar={<CurrentBadge />}>
			<ResponsiveContainer width="100%" height={240}>
				<PieChart>
					<Pie data={conversationPie} dataKey="value" nameKey="name" outerRadius={90}>
						{conversationPie.map((_, i) => (
							<Cell key={i} fill={RAINBOW[i]} />
						))}
					</Pie>
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Legend wrapperStyle={{ fontSize: 10 }} />
				</PieChart>
			</ResponsiveContainer>
		</ChartTile>
	);
}

/* 9 · Lists Growth — area, truncated y-axis */

const listsAreaData = (() => {
	const start = new Date('2025-10-25');
	const out: Array<{ date: string; total: number }> = [];
	let total = 258720;
	for (let i = 0; i < 30; i++) {
		const d = new Date(start);
		d.setDate(d.getDate() + i);
		total += Math.round(2 + Math.random() * 8);
		out.push({
			date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			total,
		});
	}
	return out;
})();

export function ListsGrowthCurrent() {
	return (
		<ChartTile question="Lists growth" toolbar={<CurrentBadge />}>
			<ResponsiveContainer width="100%" height={240}>
				<ComposedChart data={listsAreaData}>
					<CartesianGrid stroke={CHART_TOKENS.gridline} strokeDasharray="3 3" />
					<XAxis dataKey="date" interval={4} tick={{ fontSize: 10 }} />
					<YAxis
						domain={[258700, 258840]}
						tick={{ fontSize: 10 }}
						tickFormatter={(v) => formatFull(Number(v))}
					/>
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Area
						type="monotone"
						dataKey="total"
						stroke="#3498db"
						fill="#3498db"
						fillOpacity={0.45}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</ChartTile>
	);
}
