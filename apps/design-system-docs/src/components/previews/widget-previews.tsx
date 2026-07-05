'use client';

import * as React from 'react';
import {
	Avatar,
	AvatarFallback,
	Badge,
	BarList,
	DatePicker,
	IconButton,
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SortableGrid,
	Widget,
} from '@marmoui/ui';
import { MdArrowUpward, MdShoppingCart, MdSettings } from 'react-icons/md';

// ---------------- KPI widget (no header) ----------------

export function WidgetKpiPreview() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:max-w-3xl">
			<Widget>
				<div className="flex items-center justify-between">
					<span className="text-xs font-medium uppercase tracking-wide text-ink-light">
						Revenue
					</span>
					<MdShoppingCart aria-hidden className="size-4 text-ink-light" />
				</div>
				<span className="font-heading text-2xl font-semibold tabular-nums text-ink-dark">
					$24,800
				</span>
				<span className="inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums text-ink-success">
					<MdArrowUpward aria-hidden className="size-3" />
					+8.4%
				</span>
			</Widget>
			<Widget>
				<div className="flex items-center justify-between">
					<span className="text-xs font-medium uppercase tracking-wide text-ink-light">
						New signups
					</span>
				</div>
				<span className="font-heading text-2xl font-semibold tabular-nums text-ink-dark">
					1,240
				</span>
				<span className="text-xs text-ink-light">Last 7 days</span>
			</Widget>
			<Widget>
				<div className="flex items-center justify-between">
					<span className="text-xs font-medium uppercase tracking-wide text-ink-light">
						Email CTR
					</span>
				</div>
				<span className="font-heading text-2xl font-semibold tabular-nums text-ink-dark">
					3.42%
				</span>
				<span className="text-xs text-ink-light">Above 30-day avg</span>
			</Widget>
		</div>
	);
}

// ---------------- Headerless content widget ----------------

export function WidgetHeaderlessPreview() {
	return (
		<div className="max-w-xl">
			<Widget>
				<BarList data={referralData} header="Source" unit="Visits" />
			</Widget>
		</div>
	);
}

// ---------------- Basic widget ----------------

const referralData = [
	{ name: 'Direct', value: 997 },
	{ name: 'Referral', value: 467 },
	{ name: 'Organic Search', value: 268 },
	{ name: 'PPC Google Ads', value: 58 },
];

export function WidgetBasicPreview() {
	return (
		<div className="max-w-xl">
			<Widget title="Referral Sources">
				<BarList data={referralData} header="Source" unit="Visits" />
			</Widget>
		</div>
	);
}

// ---------------- With filters and actions ----------------

export function WidgetWithFiltersPreview() {
	return (
		<div className="max-w-xl">
			<Widget
				title="Lists Growth"
				actions={
					<IconButton variant="ghost" size="sm" aria-label="Configure" icon={<MdSettings />} />
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
				<BarList data={referralData} header="Source" unit="Visits" />
			</Widget>
		</div>
	);
}

// ---------------- Sortable widget (single SortableGrid pair) ----------------

const sortablePairItems = [
	{ id: 'channels', title: 'Top Channels' },
	{ id: 'referral', title: 'Referral Sources' },
];

export function WidgetSortablePreview() {
	const [items, setItems] = React.useState(sortablePairItems);
	return (
		<div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
			<SortableGrid
				items={items}
				onReorder={setItems}
				strategy="grid"
				className="group/widgets contents"
				ariaLabel="Sortable widgets"
			>
				{(item, { containerProps, dragHandleProps, isDragging }) => (
					<div {...containerProps}>
						<Widget
							title={item.title}
							dragHandleProps={dragHandleProps}
							dragHandleLabel={`Drag ${item.title} to reorder`}
							isDragging={isDragging}
							actions={
								<IconButton variant="ghost" size="sm" aria-label="Configure" icon={<MdSettings />} />
							}
						>
							<BarList data={referralData} header="Channel" unit="Visits" />
						</Widget>
					</div>
				)}
			</SortableGrid>
		</div>
	);
}

// ---------------- With pagination ----------------

const countries = [
	{ flag: '🇺🇸', country: 'United States', visitors: 12400 },
	{ flag: '🇩🇪', country: 'Germany', visitors: 4800 },
	{ flag: '🇬🇧', country: 'United Kingdom', visitors: 3600 },
	{ flag: '🇨🇦', country: 'Canada', visitors: 2100 },
	{ flag: '🇫🇷', country: 'France', visitors: 1800 },
	{ flag: '🇪🇸', country: 'Spain', visitors: 1200 },
	{ flag: '🇮🇹', country: 'Italy', visitors: 980 },
	{ flag: '🇦🇺', country: 'Australia', visitors: 870 },
	{ flag: '🇳🇱', country: 'Netherlands', visitors: 760 },
	{ flag: '🇧🇷', country: 'Brazil', visitors: 640 },
	{ flag: '🇯🇵', country: 'Japan', visitors: 590 },
	{ flag: '🇲🇽', country: 'Mexico', visitors: 480 },
];

const PAGE_SIZE = 4;

export function WidgetWithPaginationPreview() {
	const [page, setPage] = React.useState(1);
	const pageCount = Math.ceil(countries.length / PAGE_SIZE);
	const start = (page - 1) * PAGE_SIZE;
	const rows = countries.slice(start, start + PAGE_SIZE);

	const goTo = (next: number) => setPage(Math.min(Math.max(next, 1), pageCount));

	return (
		<div className="max-w-xl">
			<Widget
				title="Top Countries"
				footer={
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									disabled={page === 1}
									onClick={() => goTo(page - 1)}
								/>
							</PaginationItem>
							{Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
								<PaginationItem key={n}>
									<PaginationLink
										isActive={n === page}
										onClick={() => goTo(n)}
									>
										{n}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									disabled={page === pageCount}
									onClick={() => goTo(page + 1)}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				}
			>
				<table className="w-full text-left text-sm tabular-nums">
					<thead className="border-b border-border text-xs text-ink-light">
						<tr>
							<th scope="col" className="px-3 py-2 font-medium">Country</th>
							<th scope="col" className="px-3 py-2 text-right font-medium">Visitors</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr key={row.country} className="border-b border-border-secondary last:border-b-0">
								<td className="px-3 py-2">
									<span className="mr-2" aria-hidden>{row.flag}</span>
									{row.country}
								</td>
								<td className="px-3 py-2 text-right text-ink-dark">
									{row.visitors.toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Widget>
		</div>
	);
}

// ---------------- Sortable grid (full DnD demo) ----------------

type DemoWidget = { id: string; title: string };

const initialOrder: DemoWidget[] = [
	{ id: 'referral', title: 'Referral Sources' },
	{ id: 'channels', title: 'Top Channels' },
	{ id: 'lists', title: 'Lists Growth' },
	{ id: 'funnel', title: 'Leads Funnel' },
];

const demoBars = [
	{ name: 'Alpha', value: 320 },
	{ name: 'Beta', value: 180 },
	{ name: 'Gamma', value: 90 },
];

export function WidgetSortableGridPreview() {
	const [items, setItems] = React.useState(initialOrder);
	return (
		<SortableGrid
			items={items}
			onReorder={setItems}
			strategy="grid"
			className="group/widgets grid w-full grid-cols-1 gap-4 md:grid-cols-2"
			ariaLabel="Sortable widget grid"
		>
			{(w, { containerProps, dragHandleProps, isDragging }) => (
				<div {...containerProps}>
					<Widget
						title={w.title}
						dragHandleProps={dragHandleProps}
						dragHandleLabel={`Drag ${w.title} to reorder`}
						isDragging={isDragging}
					>
						<BarList data={demoBars} header="Item" unit="Events" />
					</Widget>
				</div>
			)}
		</SortableGrid>
	);
}

// ---------------- Avatar list with pagination ----------------

const buyers = Array.from({ length: 9 }, (_, i) => ({
	initials: ['JD', 'AS', 'CP', 'EM', 'LK', 'NR', 'TT', 'PV', 'OO'][i],
	name: [
		'John Doe',
		'Aisha Singh',
		'Carlos Perez',
		'Eva Müller',
		'Liam Kim',
		'Noa Rivera',
		'Tomas Tan',
		'Priya Vora',
		'Olu Okafor',
	][i],
	orders: 24 - i * 2,
	ltv: 4820 - i * 320,
}));

export function WidgetAvatarPaginatedPreview() {
	const [page, setPage] = React.useState(1);
	const pageSize = 3;
	const pageCount = Math.ceil(buyers.length / pageSize);
	const rows = buyers.slice((page - 1) * pageSize, page * pageSize);

	return (
		<div className="max-w-xl">
			<Widget
				title="Top Buyers"
				actions={
					<IconButton variant="ghost" size="sm" aria-label="Configure" icon={<MdSettings />} />
				}
				footer={
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									disabled={page === 1}
									onClick={() => setPage((p) => Math.max(p - 1, 1))}
								/>
							</PaginationItem>
							{Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
								<PaginationItem key={n}>
									<PaginationLink
										isActive={n === page}
										onClick={() => setPage(n)}
									>
										{n}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									disabled={page === pageCount}
									onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				}
			>
				<ul className="flex flex-col divide-y divide-border-secondary">
					{rows.map((b) => (
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
		</div>
	);
}
