'use client';

import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';
import siteConfig from '@/../site.config';
import { HeroBentoGrid } from './hero-bento-grid';

const agentNames = ['Claude Code', 'Codex', 'Cursor', 'Gemini CLI'];

export function HeroSection() {
	return (
		<section className="relative overflow-x-clip bg-bg pb-16 pt-16 md:pb-24 md:pt-20">
			{/* Subtle dot grid */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.35]"
				style={{
					backgroundImage:
						'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
					backgroundSize: '48px 48px',
				}}
			/>

			<HeroBentoGrid />

			<div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:min-h-[960px] 2xl:min-h-[1060px]">
				{/* Headline — top-left, above the floats. Constrained to the left half so
				    it never collides with the right-anchored floating column. */}
				<div className="relative z-10 max-w-[480px] pt-2 md:pt-6">
					<div className="mb-6">
						<span className="inline-flex items-center gap-1.5 rounded-[3px] bg-panel px-2.5 py-1 text-[13px] font-medium text-ink border border-border-secondary">
							<span className="size-1.5 rounded-full bg-primary" aria-hidden />
							MCP-native · MIT components
						</span>
					</div>

					<h1 className="font-heading text-[3rem] font-bold leading-[1.02] tracking-[-0.03em] text-ink-dark md:text-[3.5rem]">
						Your AI agent,
						<br />
						now a designer
					</h1>

					<p className="mt-5 text-[16px] leading-relaxed text-ink">
						Marmo gives {agentNames.slice(0, -1).join(', ')} and {agentNames.at(-1)} a real design
						system over MCP — component APIs, composition patterns, and your own tokens. Ship
						production dashboards and apps in minutes, in your style. No AI slop.
					</p>

					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Link
							href={siteConfig.connectUrl}
							className="inline-flex h-11 items-center gap-1.5 rounded-[6px] bg-[#141422] px-6 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
						>
							Connect your agent
							<MdChevronRight className="size-4" aria-hidden />
						</Link>
						<Link
							href={siteConfig.componentsUrl}
							className="inline-flex h-11 items-center gap-2 rounded-[6px] border border-border-secondary bg-white px-5 text-[15px] font-medium text-ink transition-colors hover:bg-panel"
						>
							Browse components
						</Link>
					</div>

					<div className="mt-10 max-w-[420px] overflow-x-auto rounded-lg border border-border-secondary bg-panel px-4 py-3">
						<code className="whitespace-nowrap font-mono text-[13px] text-ink">
							<span className="text-ink-muted">$</span> <span className="text-primary">npx marmoui init</span>
						</code>
					</div>
				</div>
			</div>
		</section>
	);
}
