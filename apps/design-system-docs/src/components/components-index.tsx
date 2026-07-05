'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input, Tabs, TabsContent, TabsList, TabsTrigger } from '@marmoui/ui';
import { MdSearch } from 'react-icons/md';
import { ComponentGallery, GalleryHero, titleCase } from '@/components/component-gallery';
import foundationMeta from '../../content/foundation/meta.json';
import developMeta from '../../content/develop/meta.json';
import toolsMeta from '../../content/tools/meta.json';

/* ── Non-component tabs (link directories, driven by each meta.json) ── */

interface LinkEntry {
	name: string;
	href: string;
	description: string;
	pro?: boolean;
}

function linksFromMeta(
	meta: { pages: string[] },
	base: string,
	descriptions: Record<string, string>,
	options?: { pro?: boolean; names?: Record<string, string> }
): LinkEntry[] {
	return meta.pages
		.filter(slug => slug !== 'index')
		.map(slug => ({
			name: options?.names?.[slug] ?? titleCase(slug),
			href: `${base}/${slug}`,
			description: descriptions[slug] ?? '',
			pro: options?.pro,
		}));
}

const foundationLinks: LinkEntry[] = linksFromMeta(foundationMeta, '/docs/foundation', {
	colors: 'Palette, semantic roles, and dark mode',
	typography: 'Type scale, weights, and usage',
	spacing: 'The spacing scale and layout rhythm',
	tokens: 'CSS custom properties and Figma variables',
	'borders-and-radius': 'Stroke widths and corner rounding',
	shadows: 'Elevation levels and when to use them',
	icons: 'Icon libraries, sizes, and weights',
	charts: 'Chart colors, axes, and legibility rules',
	illustration: 'Empty states and spot illustrations',
	'voice-and-tone': 'How Marmo products speak',
});

const developLinks: LinkEntry[] = linksFromMeta(developMeta, '/docs/develop', {
	hooks: 'Utility hooks shipped with @marmoui/ui',
	utilities: 'cn, formatters, and helper functions',
});

const toolLinks: LinkEntry[] = [
	{ name: 'Tools Overview', href: '/docs/tools', description: 'Everything that connects Marmo to your workflow' },
	...linksFromMeta(toolsMeta, '/docs/tools', {
		'claude-plugin': 'Generate on-brand Marmo UI from Claude Code',
	}),
];

function LinkCardGrid({ links }: { links: LinkEntry[] }) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{links.map(link => (
				<Link
					key={link.href}
					href={link.href}
					prefetch={true}
					className="group flex flex-col gap-1 rounded-lg border border-border bg-panel p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-600/40 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
				>
					<span className="flex items-center justify-between">
						<span className="font-semibold text-ink-dark group-hover:text-primary-600">
							{link.name}
						</span>
						{link.pro && (
							<span className="rounded bg-[#f3f0ff] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-600">
								Pro
							</span>
						)}
					</span>
					<span className="text-sm text-ink-light">{link.description}</span>
				</Link>
			))}
		</div>
	);
}

/* ── Page ── */

export function ComponentsIndex() {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<div className="space-y-12">
			{/* Hero */}
			<GalleryHero className="rounded-2xl" />

			{/* Tabs: Components / Foundation / Develop & Tools */}
			<Tabs defaultValue="components" variant="pill">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<TabsList aria-label="Documentation sections">
						<TabsTrigger value="components">Components</TabsTrigger>
							<TabsTrigger value="foundation">Foundation</TabsTrigger>
						<TabsTrigger value="develop">Develop & Tools</TabsTrigger>
					</TabsList>
					<div className="relative w-full sm:w-64">
						<MdSearch
							className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-light"
							aria-hidden
						/>
						<Input
							type="search"
							placeholder="Search components…"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className="pl-9"
							aria-label="Search components"
						/>
					</div>
				</div>

				<TabsContent value="components" className="mt-10">
					<ComponentGallery query={searchQuery} />
				</TabsContent>

				<TabsContent value="foundation" className="mt-10 space-y-5">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-600">
							Fundamentals
						</p>
						<h2 className="mt-1 text-2xl font-bold tracking-tight text-ink-dark">Foundation</h2>
						<p className="mt-1 text-ink-light">
							Tokens, color, type — the base every component sits on.
						</p>
					</div>
					<LinkCardGrid links={foundationLinks} />
				</TabsContent>

				<TabsContent value="develop" className="mt-10 space-y-5">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-600">
							For engineers
						</p>
						<h2 className="mt-1 text-2xl font-bold tracking-tight text-ink-dark">Develop & Tools</h2>
						<p className="mt-1 text-ink-light">Hooks, utilities, and AI tooling around the system.</p>
					</div>
					<LinkCardGrid links={[...developLinks, ...toolLinks]} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
