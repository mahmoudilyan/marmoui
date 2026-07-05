'use client';

import * as React from 'react';
import { Input } from '@marmoui/ui';
import { MdSearch } from 'react-icons/md';
import {
	ComponentGallery,
	GalleryHero,
	componentSections,
	sectionAnchor,
} from '@/components/component-gallery';

export function ComponentsShowcase() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [active, setActive] = React.useState(sectionAnchor(componentSections[0].title));

	React.useEffect(() => {
		const onScroll = () => {
			let current = sectionAnchor(componentSections[0].title);
			for (const s of componentSections) {
				const el = document.getElementById(sectionAnchor(s.title));
				if (el && el.getBoundingClientRect().top < 160) current = sectionAnchor(s.title);
			}
			setActive(current);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const jump = (id: string) => {
		const el = document.getElementById(id);
		if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: 'smooth' });
	};

	return (
		<div className="w-full bg-bg">
			{/* Intro band — full bleed */}
			<GalleryHero className="border-b border-border-secondary bg-bg">
				<div className="relative mt-7 inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-lg border border-border-secondary bg-panel px-4 py-2.5">
					<span className="font-mono text-sm whitespace-nowrap text-ink">
						<span className="text-ink-muted">import</span> {'{ Button, Card, Badge, DataTable }'}{' '}
						<span className="text-ink-muted">from</span>{' '}
						<span className="text-primary">&apos;@marmoui/ui&apos;</span>
					</span>
				</div>
			</GalleryHero>

			{/* Content — sticky category nav + card gallery */}
			<div className="mx-auto grid bg-bg w-full max-w-[1680px] items-start gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[224px_minmax(0,1fr)] lg:px-12 lg:py-16">
				<aside className="sticky top-20 hidden self-start lg:block">
					<p className="mb-3 text-xs font-bold uppercase tracking-[0.06em] text-ink-light">
						Browse the library
					</p>
					<nav className="flex flex-col gap-0.5">
						{componentSections.map((s, i) => {
							const id = sectionAnchor(s.title);
							const on = active === id;
							return (
								<button
									key={id}
									type="button"
									onClick={() => jump(id)}
									className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
										on
											? 'bg-secondary font-semibold text-primary'
											: 'font-medium text-ink hover:bg-secondary/60'
									}`}
								>
									<span className="font-mono text-xs tabular-nums text-ink-muted">
										{String(i + 1).padStart(2, '0')}
									</span>
									{s.title}
								</button>
							);
						})}
					</nav>
					<div className="relative mt-5">
						<MdSearch
							className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-light"
							aria-hidden
						/>
						<Input
							type="search"
							placeholder="Search…"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className="pl-9"
							aria-label="Search components"
						/>
					</div>
				</aside>

				<main className="min-w-0 pb-12">
					<div className="relative mb-8 lg:hidden">
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
					<ComponentGallery query={searchQuery} withAnchors />
				</main>
			</div>
		</div>
	);
}
