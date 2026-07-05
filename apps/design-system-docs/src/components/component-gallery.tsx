'use client';

import Link from 'next/link';
import {
	Avatar,
	AvatarFallback,
	Badge,
	Button,
	Calendar,
	Checkbox,
	Input,
	Skeleton,
	Slider,
	Spinner,
	Switch,
} from '@marmoui/ui';
import { MdSearch } from 'react-icons/md';
import componentsMeta from '../../content/components/meta.json';

/* ── Types ── */

export interface ComponentEntry {
	name: string;
	slug: string;
	status?: 'updated' | 'new' | 'alpha';
	preview?: React.ReactNode;
}

export interface ComponentSection {
	eyebrow: string;
	title: string;
	items: ComponentEntry[];
}

export const sectionAnchor = (title: string) => title.toLowerCase().replace(/[^a-z]+/g, '-');

export const titleCase = (slug: string) =>
	slug
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

/* Small faux previews for components whose live render is too heavy or
   interactive for a gallery card. Pure markup — no invented props. */

function FauxSelect({ label = 'Select' }: { label?: string }) {
	return (
		<span className="flex h-9 w-40 items-center justify-between rounded-md border border-border bg-panel px-3 text-sm text-ink-light">
			{label}
			<svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
				<path
					d="M1 1l4 4 4-4"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
	);
}

function FauxRadio() {
	return (
		<span className="flex items-center gap-3">
			<span className="flex size-4 items-center justify-center rounded-full border-2 border-primary-600">
				<span className="size-1.5 rounded-full bg-primary-600" />
			</span>
			<span className="size-4 rounded-full border border-border" />
		</span>
	);
}

function FauxProgress() {
	return (
		<span className="block h-1.5 w-40 overflow-hidden rounded-full bg-secondary">
			<span className="block h-full w-3/5 rounded-full bg-primary-600" />
		</span>
	);
}

function FauxTag() {
	return (
		<span className="flex gap-2">
			<span className="rounded bg-[#bee3f8] px-2 py-0.5 text-xs text-[#2a3648]">Design</span>
			<span className="rounded bg-[#9ae6b4] px-2 py-0.5 text-xs text-[#2a3648]">Shipped</span>
		</span>
	);
}

function FauxTextarea() {
	return (
		<span className="flex h-16 w-40 flex-col gap-1.5 rounded-md border border-border bg-panel p-2.5">
			<span className="h-1.5 w-4/5 rounded bg-secondary" />
			<span className="h-1.5 w-3/5 rounded bg-secondary" />
		</span>
	);
}

function FauxDialog() {
	return (
		<span className="flex w-36 flex-col gap-2 rounded-lg border border-border bg-panel p-3 shadow-md">
			<span className="h-2 w-1/2 rounded bg-ink-dark/20" />
			<span className="h-1.5 w-4/5 rounded bg-secondary" />
			<span className="mt-1 flex justify-end gap-1.5">
				<span className="h-4 w-9 rounded bg-secondary" />
				<span className="h-4 w-9 rounded bg-primary-600" />
			</span>
		</span>
	);
}

function FauxMenu({ rows = ['Edit', 'Duplicate', 'Delete'] }: { rows?: string[] }) {
	return (
		<span className="flex w-32 flex-col rounded-md border border-border bg-panel py-1 shadow-md">
			{rows.map(r => (
				<span key={r} className="px-3 py-1 text-xs text-ink-dark first:font-medium">
					{r}
				</span>
			))}
		</span>
	);
}

function FauxTable() {
	return (
		<span className="flex w-44 flex-col overflow-hidden rounded-md border border-border bg-panel text-[9px]">
			<span className="flex gap-2 border-b border-border bg-bg px-2 py-1 font-semibold uppercase text-ink-light">
				<span className="w-14">User</span>
				<span>Status</span>
			</span>
			{['Amina', 'Yousef'].map(n => (
				<span
					key={n}
					className="flex items-center gap-2 border-b border-border px-2 py-1 last:border-0"
				>
					<span className="w-14 text-ink-dark">{n}</span>
					<span className="rounded bg-[#9ae6b4] px-1">Active</span>
				</span>
			))}
		</span>
	);
}

function FauxChart() {
	return (
		<svg width="120" height="48" viewBox="0 0 120 48" fill="none" aria-hidden>
			<path
				d="M2 40 L22 30 L42 34 L62 18 L82 24 L102 8 L118 12"
				stroke="var(--color-primary-600, #8569ce)"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M2 40 L22 30 L42 34 L62 18 L82 24 L102 8 L118 12 V48 H2 Z"
				fill="var(--color-primary-600, #8569ce)"
				opacity="0.12"
			/>
		</svg>
	);
}

function FauxPagination() {
	return (
		<span className="flex items-center gap-1 text-xs text-ink-light">
			<span className="flex size-6 items-center justify-center rounded border border-border">
				‹
			</span>
			<span className="flex size-6 items-center justify-center rounded bg-primary-600 text-white">
				1
			</span>
			<span className="flex size-6 items-center justify-center rounded border border-border">
				2
			</span>
			<span className="flex size-6 items-center justify-center rounded border border-border">
				›
			</span>
		</span>
	);
}

function FauxLayout() {
	return (
		<span className="flex h-16 w-24 overflow-hidden rounded-md border border-border bg-panel">
			<span className="w-6 border-r border-border bg-bg" />
			<span className="flex flex-1 flex-col gap-1 p-1.5">
				<span className="h-1.5 w-3/4 rounded bg-secondary" />
				<span className="h-1.5 w-1/2 rounded bg-secondary" />
			</span>
		</span>
	);
}

function FauxTooltip() {
	return (
		<span className="flex flex-col items-center gap-1">
			<span className="rounded bg-ink-dark px-2 py-1 text-[10px] text-white">Tooltip</span>
			<svg width="10" height="5" viewBox="0 0 10 5" aria-hidden>
				<path d="M0 0h10L5 5z" fill="var(--color-ink-dark, #040815)" />
			</svg>
		</span>
	);
}

function FauxToast() {
	return (
		<span className="flex w-40 items-center gap-2 rounded-md border border-border bg-panel px-3 py-2 shadow-md">
			<span className="flex size-4 items-center justify-center rounded-full bg-[#2f855a] text-[9px] text-white">
				✓
			</span>
			<span className="text-xs text-ink-dark">Saved</span>
		</span>
	);
}

/* ── Component inventory ──
   Membership is driven by content/components/meta.json (the docs source of
   truth); the arrays below only attach display names, previews, and statuses.
   Slugs missing here still render via the catch-all section; slugs here but
   absent from meta.json are dropped. */

const curatedSections: ComponentSection[] = [
	{
		eyebrow: 'Inputs',
		title: 'Form Elements',
		items: [
			{
				name: 'Input',
				slug: 'input',
				status: 'updated',
				preview: <Input placeholder="Input" className="pointer-events-none w-40" readOnly />,
			},
			{ name: 'Input Group', slug: 'input-group', preview: <FauxSelect label="marmoui.com/" /> },
			{
				name: 'Input Shortcode',
				slug: 'input-shortcode',
				preview: <FauxSelect label="{{name}}" />,
			},
			{ name: 'Textarea', slug: 'textarea', preview: <FauxTextarea /> },
			{ name: 'Select', slug: 'select', preview: <FauxSelect /> },
			{
				name: 'Searchable Select',
				slug: 'select-searchable',
				preview: <FauxSelect label="Search…" />,
			},
			{
				name: 'Checkbox Select',
				slug: 'select-checkbox-searchable',
				preview: <FauxSelect label="3 selected" />,
			},
			{
				name: 'Category Select',
				slug: 'select-multi-category',
				preview: <FauxSelect label="Categories" />,
			},
			{
				name: 'Checkbox',
				slug: 'checkbox',
				preview: <Checkbox defaultChecked className="pointer-events-none" />,
			},
			{ name: 'Checkbox Card', slug: 'checkbox-card', preview: <FauxDialog /> },
			{ name: 'Radio', slug: 'radio', preview: <FauxRadio /> },
			{ name: 'Radio Group', slug: 'radio-group', preview: <FauxRadio /> },
			{ name: 'Radio Card', slug: 'radio-card', preview: <FauxDialog /> },
			{
				name: 'Switch',
				slug: 'switch',
				status: 'updated',
				preview: <Switch defaultChecked className="pointer-events-none" />,
			},
			{
				name: 'Slider',
				slug: 'slider',
				preview: <Slider defaultValue={[50]} className="pointer-events-none w-40" />,
			},
			{
				name: 'Date Picker',
				slug: 'date-picker',
				status: 'updated',
				preview: (
					<span className="pointer-events-none block h-[172px] w-[220px] overflow-hidden">
						<span className="block origin-top-left scale-[0.75]">
							<Calendar
								mode="single"
								selected={new Date(2026, 6, 18)}
								defaultMonth={new Date(2026, 6, 1)}
							/>
						</span>
					</span>
				),
			},
			{ name: 'Field', slug: 'field', preview: <FauxSelect label="Label" /> },
			{ name: 'Form', slug: 'form', preview: <FauxTextarea /> },
			{
				name: 'Label',
				slug: 'label',
				preview: <span className="text-sm font-medium text-ink-dark">Label *</span>,
			},
		],
	},
	{
		eyebrow: 'Actions',
		title: 'Buttons & Actions',
		items: [
			{
				name: 'Button',
				slug: 'button',
				preview: <Button className="pointer-events-none">Button</Button>,
			},
			{
				name: 'Button Group',
				slug: 'button-group',
				preview: (
					<span className="pointer-events-none flex overflow-hidden rounded-md border border-border">
						<span className="border-r border-border bg-panel px-3 py-1.5 text-sm text-ink-dark">
							Day
						</span>
						<span className="border-r border-border bg-secondary px-3 py-1.5 text-sm text-ink-dark">
							Week
						</span>
						<span className="bg-panel px-3 py-1.5 text-sm text-ink-dark">Month</span>
					</span>
				),
			},
			{
				name: 'Icon Button',
				slug: 'icon-button',
				preview: (
					<span className="flex size-9 items-center justify-center rounded-md border border-border bg-panel text-ink-dark">
						<MdSearch aria-hidden />
					</span>
				),
			},
			{
				name: 'Action Bar',
				slug: 'action-bar',
				preview: <FauxMenu rows={['2 selected', 'Archive', 'Delete']} />,
			},
		],
	},
	{
		eyebrow: 'Data display',
		title: 'Data & Display',
		items: [
			{ name: 'Data Table', slug: 'data-table', status: 'updated', preview: <FauxTable /> },
			{ name: 'Chart', slug: 'chart', status: 'alpha', preview: <FauxChart /> },
			{ name: 'KPI Card', slug: 'kpi-card', preview: <FauxDialog /> },
			{ name: 'Widget', slug: 'widget', preview: <FauxLayout /> },
			{ name: 'Pagination', slug: 'pagination', preview: <FauxPagination /> },
			{
				name: 'Badge',
				slug: 'badge',
				preview: <Badge className="pointer-events-none">Badge</Badge>,
			},
			{ name: 'Tag', slug: 'tag', preview: <FauxTag /> },
			{
				name: 'Avatar',
				slug: 'avatar',
				preview: (
					<Avatar className="pointer-events-none">
						<AvatarFallback>MU</AvatarFallback>
					</Avatar>
				),
			},
			{
				name: 'Avatar Cell',
				slug: 'table-cell-avatar-with-checkbox',
				preview: (
					<span className="pointer-events-none flex items-center gap-2">
						<Checkbox defaultChecked />
						<Avatar size="xs">
							<AvatarFallback>JL</AvatarFallback>
						</Avatar>
						<span className="text-sm text-ink-dark">John Locke</span>
					</span>
				),
			},
			{
				name: 'Text',
				slug: 'text',
				preview: <span className="font-semibold text-ink-dark">Aa Bb Cc</span>,
			},
			{ name: 'Marketing Cards', slug: 'marketing-cards', preview: <FauxDialog /> },
			{ name: 'Lifecycle Funnel', slug: 'lead-lifecycle-funnel', preview: <FauxChart /> },
		],
	},
	{
		eyebrow: 'Feedback',
		title: 'Feedback & Status',
		items: [
			{
				name: 'Alert',
				slug: 'alert',
				preview: (
					<span className="flex w-44 items-start gap-2 rounded-md border border-[#f6c6c6] bg-[#fdf2f2] px-3 py-2">
						<span className="mt-0.5 size-3 shrink-0 rounded-full bg-[#b30606]" />
						<span className="text-xs text-ink-dark">Something went wrong</span>
					</span>
				),
			},
			{ name: 'Progress', slug: 'progress', preview: <FauxProgress /> },
			{
				name: 'Skeleton',
				slug: 'skeleton',
				preview: (
					<span className="flex w-40 flex-col gap-2">
						<Skeleton className="h-3 w-full" />
						<Skeleton className="h-3 w-2/3" />
					</span>
				),
			},
			{ name: 'Spinner', slug: 'spinner', preview: <Spinner /> },
			{ name: 'Toaster', slug: 'toaster', status: 'updated', preview: <FauxToast /> },
		],
	},
	{
		eyebrow: 'Overlays',
		title: 'Overlays & Menus',
		items: [
			{ name: 'Dialog', slug: 'dialog', preview: <FauxDialog /> },
			{ name: 'Drawer', slug: 'drawer', preview: <FauxLayout /> },
			{ name: 'Dropdown', slug: 'dropdown', status: 'updated', preview: <FauxMenu /> },
			{ name: 'Popover', slug: 'popover', preview: <FauxTooltip /> },
			{ name: 'Hover Card', slug: 'hover-card', preview: <FauxDialog /> },
			{ name: 'Tooltip', slug: 'tooltip', preview: <FauxTooltip /> },
		],
	},
	{
		eyebrow: 'Layout',
		title: 'Layout & Navigation',
		items: [
			{ name: 'Layout', slug: 'layout', preview: <FauxLayout /> },
			{ name: 'Page Section', slug: 'page-section', preview: <FauxLayout /> },
			{ name: 'Section Wizard', slug: 'page-section-wizard', preview: <FauxPagination /> },
			{ name: 'Sidebar Panel', slug: 'sidebar-panel', preview: <FauxLayout /> },
			{
				name: 'Tabs',
				slug: 'tabs',
				preview: (
					<span className="flex gap-4 border-b border-border pb-0 text-sm">
						<span className="border-b-2 border-primary-600 pb-1.5 font-medium text-ink-dark">
							Tab 1
						</span>
						<span className="pb-1.5 text-ink-light">Tab 2</span>
					</span>
				),
			},
			{ name: 'Scroll Area', slug: 'scroll-area', preview: <FauxTextarea /> },
			{ name: 'Card', slug: 'card', preview: <FauxDialog /> },
		],
	},
];

/* Assemble sections from meta.json: curated entries filtered to slugs the docs
   actually publish, plus a catch-all for published slugs we haven't curated. */

const publishedSlugs: string[] = (componentsMeta.pages as string[]).filter(
	slug => slug !== 'index' && slug !== 'components'
);
const publishedSet = new Set(publishedSlugs);
const curatedSlugs = new Set(curatedSections.flatMap(section => section.items.map(i => i.slug)));
const uncurated = publishedSlugs.filter(slug => !curatedSlugs.has(slug));

export const componentSections: ComponentSection[] = [
	...curatedSections
		.map(section => ({
			...section,
			items: section.items.filter(item => publishedSet.has(item.slug)),
		}))
		.filter(section => section.items.length > 0),
	...(uncurated.length > 0
		? [
				{
					eyebrow: 'More',
					title: 'More Components',
					items: uncurated.map(slug => ({ name: titleCase(slug), slug })),
				},
			]
		: []),
];

export const totalComponents = componentSections.reduce((n, s) => n + s.items.length, 0);

/* ── UI pieces ── */

export function GalleryHero({
	children,
	className = '',
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`relative overflow-hidden bg-[#eef0f3] px-6 py-14 text-center md:py-16 ${className}`}
		>
			{/* Squiggle + blob, right side */}
			<svg
				viewBox="0 0 220 320"
				className="pointer-events-none absolute -right-6 top-0 h-full w-auto"
				aria-hidden
			>
				<defs>
					<linearGradient id="gallery-squiggle" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#ffd9e8" />
						<stop offset="60%" stopColor="#ff9ec4" />
						<stop offset="100%" stopColor="#ffc7dc" />
					</linearGradient>
				</defs>
				<ellipse cx="52" cy="185" rx="48" ry="30" fill="#fdf6d8" />
				<path
					d="M178 -30 C 118 55, 232 92, 168 155 C 104 218, 205 245, 158 340"
					stroke="url(#gallery-squiggle)"
					strokeWidth="26"
					fill="none"
					strokeLinecap="round"
					opacity="0.8"
				/>
			</svg>

			{/* Dots */}
			<span
				className="pointer-events-none absolute left-[32%] top-8 size-1.5 rounded-full bg-[#b9aef4]"
				aria-hidden
			/>
			<span
				className="pointer-events-none absolute right-[32%] top-10 size-1.5 rounded-full bg-[#b9aef4]"
				aria-hidden
			/>
			<span
				className="pointer-events-none absolute bottom-8 left-[34%] size-1.5 rounded-full bg-[#ff498a]"
				aria-hidden
			/>
			<span
				className="pointer-events-none absolute bottom-10 right-[34%] size-1.5 rounded-full bg-[#ff498a]"
				aria-hidden
			/>

			<h1 className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-4xl font-bold tracking-tight text-ink-dark md:text-5xl">
				<span className="font-mono">
					<span className="text-ink-light">&lt;</span>
					<span className="text-[#ff498a]">Code</span>
					<span className="text-ink-light">&nbsp;/&gt;</span>
				</span>
				<span>&amp;</span>
				<span className="border border-dashed border-[#ff9ec4] bg-panel px-3">Design</span>
			</h1>
			<p className="relative mt-5 text-xl font-bold text-[#2a3648]">Every Component You Need</p>
			<p className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-light">
				A complete library of {totalComponents}+ production-ready UI components, built for Figma and
				ready to ship.
			</p>
			{children}
		</div>
	);
}

function StatusBadge({ status }: { status: NonNullable<ComponentEntry['status']> }) {
	const styles = {
		updated: 'bg-[#e3f2fd] text-[#1565c0]',
		new: 'bg-[#e8f5e9] text-[#2e7d32]',
		alpha: 'bg-[#fff3e0] text-[#e65100]',
	} as const;
	return (
		<span className={`rounded px-1.5 py-0.5 text-[10px] font-medium capitalize ${styles[status]}`}>
			{status}
		</span>
	);
}

export function ComponentCard({ entry }: { entry: ComponentEntry }) {
	return (
		<Link
			href={`/docs/components/${entry.slug}`}
			prefetch={true}
			className="group flex w-[280px] max-w-full flex-col overflow-hidden rounded-lg border border-border bg-panel transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-600/40 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
		>
			<span
				className="relative flex h-[200px] items-center justify-center overflow-hidden border-b border-border p-4"
				aria-hidden
			>
				{/* Grid lines: radial-gradient ink masked to a 24px grid, 12% opacity */}
				<span
					className="pointer-events-none absolute inset-0 opacity-[0.12]"
					style={{
						background:
							'radial-gradient(circle at 30% 20%, #77EBCE 0%, #F8A4FF 21%, #ABADF2 42%, #EBFAF9 100%)',
						WebkitMaskImage:
							'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
						WebkitMaskSize: '24px 24px',
						maskImage:
							'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
						maskSize: '24px 24px',
					}}
				/>
				<span className="relative select-none">
					{entry.preview ?? (
						<span className="flex size-12 items-center justify-center rounded-lg border border-border bg-panel text-lg font-semibold text-ink-light">
							{entry.name.charAt(0)}
						</span>
					)}
				</span>
			</span>
			<span className="flex h-[50px] items-center justify-between px-4">
				<span className="text-sm font-medium text-ink-dark group-hover:text-primary-600">
					{entry.name}
				</span>
				{entry.status && <StatusBadge status={entry.status} />}
			</span>
		</Link>
	);
}

export function filterSections(query: string): ComponentSection[] {
	const q = query.trim().toLowerCase();
	if (!q) return componentSections;
	return componentSections
		.map(section => ({
			...section,
			items: section.items.filter(item => item.name.toLowerCase().includes(q)),
		}))
		.filter(section => section.items.length > 0);
}

export function ComponentGallery({
	query = '',
	withAnchors = false,
}: {
	query?: string;
	withAnchors?: boolean;
}) {
	const visible = filterSections(query);

	if (visible.length === 0) {
		return (
			<p className="py-12 text-center text-ink-light">No components match &ldquo;{query}&rdquo;.</p>
		);
	}

	return (
		<div className="space-y-16">
			{visible.map(section => (
				<section
					key={section.title}
					id={withAnchors ? sectionAnchor(section.title) : undefined}
					className="scroll-mt-24 space-y-5"
				>
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-600">
							{section.eyebrow}
						</p>
						<h2 className="mt-1 text-2xl font-bold tracking-tight text-ink-dark">
							{section.title}
						</h2>
					</div>
					<div
						className="grid justify-center gap-4 sm:justify-start"
						style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 280px))' }}
					>
						{section.items.map(entry => (
							<ComponentCard key={entry.slug} entry={entry} />
						))}
					</div>
				</section>
			))}
		</div>
	);
}
