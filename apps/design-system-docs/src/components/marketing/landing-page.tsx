'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Avatar,
	AvatarFallback,
	Card,
	CardContent,
} from '@marmoui/ui';
import { MdCheck } from 'react-icons/md';
import siteConfig from '@/../site.config';
import { AgentDemo } from './agent-demo';
import { agentTools } from './agent-logos';
import { BuyProButton } from '@/components/buy-pro-button';
import { HeroSection } from './hero-section';

export type LandingTestimonial = {
	quote: string;
	name: string;
	role: string;
};

/* ── Agent workflow ── */

const workflowItems = [
	{
		id: 'connect',
		title: 'Connect with one command',
		body: 'Run npx marmoui init. It wires Claude Code, Codex, Cursor, Gemini CLI — whatever you use. From that moment your agent reads live component APIs, patterns, and generation rules instead of guessing from training data.',
	},
	{
		id: 'generate',
		title: 'Generate real screens, not mockups',
		body: 'Ask for a settings page, a billing dashboard, an app shell. The agent composes actual @marmoui/ui components — DataTable, charts, forms — with real props pulled from the MCP. The code lands in your repo, ready to run.',
	},
	{
		id: 'validate',
		title: 'Validated before you ever see it',
		body: 'Every generated file passes through the MCP review step: wrong imports, invented props, and broken compositions are caught and fixed by the agent before it reports done. That is the difference between generated and made.',
	},
];

function McpBadge() {
	return (
		<div className="mx-auto flex size-14 items-center justify-center rounded-[14px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
				<path
					d="M8 7v4a4 4 0 0 0 8 0V7"
					stroke="#8569ce"
					strokeWidth="2"
					strokeLinecap="round"
				/>
				<path d="M9 3v4M15 3v4M12 15v6" stroke="#8569ce" strokeWidth="2" strokeLinecap="round" />
			</svg>
		</div>
	);
}

/** Right-side visual for the "connect" workflow item: one config block, connected clients. */
function ConnectVisual() {
	return (
		<div className="overflow-hidden rounded-[12px] bg-[#0d0d0d] shadow-[0_12px_40px_rgba(15,23,42,0.25)]">
			<div className="border-b border-white/10 px-4 py-2.5">
				<p className="font-mono text-[11px] font-medium text-white/50">terminal</p>
			</div>
			<div className="p-5 font-mono text-[13px] leading-loose">
				<p className="text-white/90"><span className="text-white/40">$</span> npx marmoui init</p>
				<p className="text-white/70"><span className="text-emerald-400">✓</span> Claude Code <span className="text-white/35">.mcp.json</span></p>
				<p className="text-white/70"><span className="text-emerald-400">✓</span> Cursor <span className="text-white/35">.cursor/mcp.json</span></p>
				<p className="text-white/70"><span className="text-emerald-400">✓</span> VS Code <span className="text-white/35">.vscode/mcp.json</span></p>
				<p className="text-white/70"><span className="text-emerald-400">✓</span> Gemini CLI <span className="text-white/35">.gemini/settings.json</span></p>
				<p className="mt-2 text-white/55">
					Claude Code? <span className="text-white/80">/plugin install marmo-ui</span> adds skills + commands too.
				</p>
				<p className="mt-1 text-white/55">Then just ask: &ldquo;Build a billing dashboard with Marmo UI.&rdquo;</p>
			</div>
		</div>
	);
}

/** Right-side visual for the "validate" workflow item: review_generated_code catching slop. */
const validationFindings = [
	{
		bad: "import { Button } from '@chakra-ui/react'",
		good: "import { Button } from '@marmoui/ui'",
		note: 'wrong library',
	},
	{
		bad: '<Tabs.List>…</Tabs.List>',
		good: '<TabsList>…</TabsList>',
		note: 'no namespace sub-components',
	},
	{
		bad: '<DataTable paginate />',
		good: '<DataTable pagination={{ pageSize: 10 }} />',
		note: 'invented prop',
	},
];

function ValidateVisual() {
	return (
		<div className="overflow-hidden rounded-[12px] border border-border-secondary bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
			<div className="flex items-center justify-between border-b border-border-secondary bg-panel px-4 py-2.5">
				<p className="font-mono text-[11px] font-semibold text-ink">review_generated_code</p>
				<span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
					3 fixed · 0 remaining
				</span>
			</div>
			<div className="space-y-4 p-4">
				{validationFindings.map(f => (
					<div key={f.note} className="rounded-md border border-border-secondary">
						<div className="flex items-start gap-2 border-b border-border-secondary bg-red-50/60 px-3 py-2">
							<span className="mt-px text-[11px] font-bold text-red-500">✗</span>
							<code className="min-w-0 flex-1 break-all font-mono text-[12px] text-red-700 line-through decoration-red-400/60">
								{f.bad}
							</code>
							<span className="hidden shrink-0 rounded bg-red-100 px-1.5 py-px text-[9px] font-semibold text-red-600 sm:inline">
								{f.note}
							</span>
						</div>
						<div className="flex items-start gap-2 px-3 py-2">
							<span className="mt-px text-[11px] font-bold text-emerald-600">✓</span>
							<code className="min-w-0 flex-1 break-all font-mono text-[12px] text-ink-dark">{f.good}</code>
						</div>
					</div>
				))}
				<p className="text-center text-[12px] text-ink-light">
					Errors fixed by the agent before it reports done — you only ever see the ✓ column.
				</p>
			</div>
		</div>
	);
}

/** Right-side visual for the "generate" workflow item: prompt → real code → running screen. */
function GenerateVisual() {
	return (
		<div className="relative pb-16">
			<div className="overflow-hidden rounded-[12px] border border-border-secondary bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
				<div className="flex items-center gap-2 border-b border-border-secondary bg-panel px-4 py-2.5">
					<span className="font-mono text-[11px] font-semibold text-ink">app/billing/page.tsx</span>
					<span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
						generated
					</span>
				</div>
				<pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-ink-dark">
					<code>
						<span className="text-primary">import</span> {'{ PageHeader, Card,'}{'\n'}
						{'  DataTable, ChartContainer }'} <span className="text-primary">from</span>{' '}
						<span className="text-emerald-700">&apos;@marmoui/ui&apos;</span>;{'\n\n'}
						<span className="text-primary">export default function</span> BillingPage() {'{'}
						{'\n  '}<span className="text-primary">return</span> ({'\n'}
						{'    <PageHeader title='}<span className="text-emerald-700">&quot;Billing&quot;</span>{' />\n'}
						{'    <Card>\n'}
						{'      <ChartContainer data={usage} />\n'}
						{'    </Card>\n'}
						{'    <DataTable columns={columns}\n'}
						{'      data={invoices} />\n'}
						{'  );\n'}
						{'}'}
					</code>
				</pre>
			</div>

			{/* The screen that code renders — overlapping the editor */}
			<div className="absolute -bottom-0 right-0 w-[240px] rounded-[10px] border border-border-secondary bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.16)]">
				<div className="flex items-center justify-between">
					<p className="text-[11px] font-bold tracking-tight text-ink-dark">Billing</p>
					<span className="rounded-[3px] bg-[#141422] px-1.5 py-0.5 text-[8px] font-semibold text-white">Export</span>
				</div>
				<div className="mt-2 flex h-12 items-end gap-1 rounded border border-border-secondary p-1.5">
					{[40, 65, 50, 80, 60, 92].map((h, i) => (
						<div key={i} className="flex-1 rounded-t-[2px] bg-primary/70" style={{ height: `${h}%` }} />
					))}
				</div>
				<div className="mt-2 rounded border border-border-secondary">
					{[
						['INV-0142', '$1,250'],
						['INV-0141', '$840'],
					].map(([id, amt]) => (
						<div key={id} className="flex justify-between border-b border-border-secondary px-2 py-1 text-[9px] text-ink last:border-0">
							<span>{id}</span>
							<span className="tabular-nums">{amt}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function WorkflowSection() {
	const [active, setActive] = React.useState(workflowItems[0].id);

	return (
		<section id="features" className="scroll-mt-20 bg-bg py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="relative rounded-[8px] border-2 border-dashed border-[#dccffb] bg-white px-6 py-12 md:px-16 md:py-16 lg:px-20">
					{/* Corner dots */}
					<span className="absolute -left-[5px] -top-[5px] size-2 rounded-full bg-primary" aria-hidden />
					<span className="absolute -right-[5px] -top-[5px] size-2 rounded-full bg-primary" aria-hidden />
					<span className="absolute -bottom-[5px] -left-[5px] size-2 rounded-full bg-primary" aria-hidden />
					<span className="absolute -bottom-[5px] -right-[5px] size-2 rounded-full bg-primary" aria-hidden />
					<div className="mx-auto mb-14 max-w-2xl text-center">
						<McpBadge />
						<p className="mt-4 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] font-semibold text-primary tracking-[-0.36px]">
							Prompt to production
						</p>
						<h2 className="mt-2 font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-ink-dark tracking-[-1.2px] leading-[1.1] md:text-[48px]">
							Your agent stops guessing
						</h2>
					</div>

					<div className="grid items-start gap-10 lg:grid-cols-[440fr_584fr]">
						<div>
							{workflowItems.map(item => {
								const isActive = active === item.id;
								return (
									<div key={item.id} className="border-b border-border-secondary py-6">
										<button
											type="button"
											onClick={() => setActive(item.id)}
											aria-expanded={isActive}
											aria-controls={`workflow-panel-${item.id}`}
											className="group w-full text-left"
										>
											<p
												className={`font-['Plus_Jakarta_Sans',sans-serif] text-[24px] font-semibold tracking-[-0.72px] transition-colors duration-200 ${
													isActive ? 'text-ink-dark' : 'text-ink-light group-hover:text-ink-dark'
												}`}
											>
												{item.title}
											</p>
										</button>
										<div
											id={`workflow-panel-${item.id}`}
											className={`grid transition-all duration-300 ease-out ${
												isActive ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
											}`}
										>
											<p className="overflow-hidden text-[16px] leading-relaxed text-ink-light">
												{item.body}
											</p>
										</div>
									</div>
								);
							})}
						</div>

						<div key={active} className="relative animate-in fade-in slide-in-from-bottom-2 duration-300">
							{active === 'connect' && <ConnectVisual />}
							{active === 'validate' && <ValidateVisual />}
							{active === 'generate' && <GenerateVisual />}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ── Works with your tools ── */

function ToolsSection() {
	return (
		<section id="tools" className="scroll-mt-20 bg-panel py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] font-semibold text-primary tracking-[-0.36px]">
						No new tool to learn
					</p>
					<h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-ink-dark tracking-[-1.2px] leading-[1.15]">
						Works where you already work
					</h2>
					<p className="mt-5 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] text-ink-light tracking-[-0.36px] leading-[1.5]">
						One command connects the agent you already use. Then just ask it to build.
					</p>
				</div>

				<div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
					{agentTools.map(tool => (
						<div
							key={tool.name}
							className="flex flex-col items-center gap-2.5 rounded-[10px] border border-border-secondary bg-white px-4 py-6 text-center"
						>
							{tool.mark}
							<p className="font-['Plus_Jakarta_Sans',sans-serif] text-[14px] font-semibold text-ink-dark">
								{tool.name}
							</p>
						</div>
					))}
				</div>

				<div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-full border border-border-secondary bg-[#0d0d0d] px-6 py-3.5">
					<code className="font-mono text-[15px] text-white/90">
						<span className="text-white/40">$</span> npx marmoui init
					</code>
				</div>
				<p className="mt-4 text-center text-sm text-ink-light">
					On Claude Code, the{' '}
					<code className="rounded bg-white px-1.5 py-0.5 font-mono text-[12px] text-ink">
						marmo-ui
					</code>{' '}
					plugin adds skills and slash commands on top —{' '}
					<Link
						href="/docs/introduction/install-agent"
						className="font-medium text-primary hover:underline"
					>
						install guide
					</Link>
					.
				</p>
			</div>
		</section>
	);
}

/* ── Define your own style ── */

const styleFeatures = [
	{
		title: 'One set of foundations',
		description:
			'Type, color, spacing, and elevation live as tokens — the base every component and every generated screen is built on.',
		image: '/marketing/figma/benefit-core.png',
	},
	{
		title: 'Your tokens, not template defaults',
		description:
			'Swap a brand color or tighten spacing once. Every screen your agent generates from then on carries your style — in Figma and in React.',
		image: '/marketing/figma/benefit-dropdown.png',
	},
	{
		title: 'On-brand generation (Pro)',
		description:
			'Feed the MCP your DESIGN.md — brand color, type, component inventory — and any connected agent generates UI that looks like yours, not like everyone else’s.',
		image: '/marketing/figma/benefit-colors.png',
	},
];

function StyleSection() {
	return (
		<section id="style" className="scroll-mt-20 bg-bg py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mx-auto mb-14 flex max-w-5xl items-start justify-between gap-8 max-md:flex-col max-md:items-center max-md:text-center">
					<div>
						<p className="mb-1 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] font-semibold text-primary tracking-[-0.36px]">
							Define your own style
						</p>
						<h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-ink-dark tracking-[-1.2px] leading-[1.2]">
							Generated, but unmistakably yours
						</h2>
					</div>
					<p className="max-w-lg font-['Plus_Jakarta_Sans',sans-serif] text-[18px] text-ink-light tracking-[-0.36px] leading-[1.5] md:pt-12">
						AI slop happens when a model improvises styling. Marmo removes the improvisation: your
						agent reads tokens and patterns from one source and every screen comes out consistent.
					</p>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					{styleFeatures.map(feature => (
						<Card
							key={feature.title}
							className="overflow-hidden rounded-[12px] border-border-secondary bg-panel"
						>
							<div className="relative h-[280px] overflow-hidden bg-panel">
								<Image
									src={feature.image}
									alt={feature.title}
									fill
									className="object-cover object-top"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-x-0 bottom-0 h-6 bg-panel" />
							</div>
							<CardContent className="bg-white p-6">
								<h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-[24px] font-semibold text-ink-dark tracking-[-0.72px]">
									{feature.title}
								</h3>
								<p className="mt-2 font-['Plus_Jakarta_Sans',sans-serif] text-[16px] leading-[1.5] text-ink-light tracking-[-0.32px]">
									{feature.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

/* ── Built with Marmo ── */

const portfolioItems = [
	{ title: 'Mail App', image: '/marketing/figma/portfolio-mail.png' },
	{ title: 'Dashboard', image: '/marketing/figma/portfolio-dashboard.png' },
	{ title: 'Projects', image: '/marketing/figma/portfolio-projects.png' },
];

function ShowcaseSection() {
	return (
		<section
			id="showcase"
			className="scroll-mt-20 border-y border-[#ccb5fd]/30 py-20 md:py-28"
			style={{
				background:
					'linear-gradient(180deg, rgba(204,181,253,0.05) 0%, rgba(255,73,138,0.05) 100%)',
			}}
		>
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] font-semibold text-primary tracking-[-0.36px]">
						Built with Marmo
					</p>
					<h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-ink-dark tracking-[-1.2px] leading-[1.2]">
						Full apps, same components
					</h2>
					<p className="mt-5 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] text-ink-light tracking-[-0.36px] leading-[1.5]">
						Mail, analytics, project tracking — complete screens assembled from the components on
						this page. No custom one-offs, nothing an agent couldn’t compose.
					</p>
				</div>
				<div className="grid gap-8 md:grid-cols-3">
					{portfolioItems.map(item => (
						<div key={item.title} className="flex flex-col gap-3">
							<div className="relative h-[193px] overflow-hidden rounded-[8px] border border-border-secondary bg-panel">
								<Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover object-top"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
							<p className="font-['Plus_Jakarta_Sans',sans-serif] text-center text-[18px] font-semibold text-ink-dark tracking-[-0.36px]">
								{item.title}
							</p>
						</div>
					))}
				</div>
				<div className="mt-12 flex justify-center">
					<Link
						href={siteConfig.componentsUrl}
						className="inline-flex h-12 items-center gap-2 rounded-[6px] border border-border-secondary bg-white px-6 text-[16px] font-medium text-ink transition-colors hover:bg-panel"
					>
						See every component
					</Link>
				</div>
			</div>
		</section>
	);
}

/* ── Testimonials (Sanity-driven — renders nothing when the CMS is empty) ── */

function TestimonialsSection({ testimonials }: { testimonials: LandingTestimonial[] }) {
	if (testimonials.length === 0) return null;
	return (
		<section className="bg-panel py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="grid gap-6 md:grid-cols-2">
					{testimonials.map(t => (
						<Card key={t.name} className="border-border-secondary bg-white p-8">
							<p className="text-base leading-relaxed text-ink-dark">&ldquo;{t.quote}&rdquo;</p>
							<div className="mt-6 flex items-center gap-3">
								<Avatar>
									<AvatarFallback>
										{t.name
											.split(' ')
											.map(n => n[0])
											.join('')}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-semibold text-ink-dark">{t.name}</p>
									<p className="text-sm text-ink-light">{t.role}</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

/* ── Pricing teaser ── */

const freeFeatures = [
	'Every core component, MIT licensed',
	'Free Core MCP — connect any agent',
	'Component docs & patterns overview',
	'Light and dark mode',
	'Use on unlimited projects',
];

const proFeatures = [
	'Everything in Free',
	'On-brand generation from your DESIGN.md',
	'Composition patterns library',
	'Pro blocks — generated into your repo',
	'Personal MCP token & dashboard',
	'Hosted design-system site in your tokens',
];

function PricingSection() {
	return (
		<section
			id="pricing"
			className="scroll-mt-20 border-y border-[#ccb5fd]/30 py-20 md:py-28"
			style={{
				background:
					'linear-gradient(180deg, rgba(204,181,253,0.05) 0%, rgba(255,73,138,0.05) 100%)',
			}}
		>
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] font-semibold text-primary tracking-[-0.36px]">
						Pricing
					</p>
					<h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-ink-dark tracking-[-1.2px] leading-[1.2]">
						Free to build. Pro to brand.
					</h2>
					<p className="mt-5 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] text-ink-light tracking-[-0.36px] leading-[1.5]">
						The components and the Core MCP are free, forever. Pro unlocks generation in your own
						style.
					</p>
				</div>
				<div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
					{/* Free */}
					<div className="rounded-[16px] border border-[#f1e4f2] bg-white p-4">
						<div className="flex h-full flex-col gap-5 rounded-[8px] border border-[#e6d5e7] bg-white p-6 shadow-[0_1px_1.5px_rgba(0,0,0,0.05)]">
							<div className="flex flex-col gap-1">
								<h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] font-semibold text-ink-dark tracking-[-0.84px]">
									Free
								</h3>
								<p className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] text-ink-light tracking-[-0.3px]">
									Open-source components + Core MCP
								</p>
							</div>
							<p className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-semibold text-ink-dark tracking-[-1.2px]">
								$0
							</p>
							<Link
								href={siteConfig.docsUrl}
								className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-border-secondary bg-white text-[16px] font-medium text-ink transition-colors hover:bg-panel"
							>
								Start building
							</Link>
							<ul className="space-y-2.5">
								{freeFeatures.map(f => (
									<li key={f} className="flex items-center gap-2.5 text-[14px] text-ink-dark">
										<MdCheck className="size-4 shrink-0 text-primary" aria-hidden />
										{f}
									</li>
								))}
							</ul>
						</div>
					</div>
					{/* Pro */}
					<div className="rounded-[16px] border border-[#f1e4f2] bg-white p-4">
						<div className="flex h-full flex-col gap-5 rounded-[8px] border border-[#e6d5e7] bg-white p-6 shadow-[0_1px_1.5px_rgba(0,0,0,0.05)]">
							<div className="flex flex-col gap-1">
								<h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] font-semibold text-ink-dark tracking-[-0.84px]">
									Pro
								</h3>
								<p className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] text-ink-light tracking-[-0.3px]">
									Your brand, generated by any agent
								</p>
							</div>
							<p className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-semibold text-ink-dark tracking-[-1.2px]">
								$59
								<span className="ml-2 align-middle text-[14px] font-medium text-ink-light">
									early access · lifetime
								</span>
							</p>
							<BuyProButton className="h-12 w-full text-[16px] font-medium">Get Pro</BuyProButton>
							<ul className="space-y-2.5">
								{proFeatures.map(f => (
									<li key={f} className="flex items-center gap-2.5 text-[14px] text-ink-dark">
										<MdCheck className="size-4 shrink-0 text-primary" aria-hidden />
										{f}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<p className="mt-8 text-center text-sm text-ink-light">
					Full plan details on the{' '}
					<Link href={siteConfig.pricingUrl} className="font-medium text-primary hover:underline">
						pricing page
					</Link>
					.
				</p>
			</div>
		</section>
	);
}

/* ── FAQ ── */

const faqItems = [
	{
		q: 'What is Marmo?',
		a: 'An open-source React design system (@marmoui/ui) plus a hosted MCP server. The components are what your app ships; the MCP is what makes your AI agent good at using them — live props, composition patterns, and generation rules instead of guesses.',
	},
	{
		q: 'Which AI tools does it work with?',
		a: 'Anything that speaks MCP: Claude Code, Codex, Cursor, Gemini CLI, Windsurf, and most agent frameworks. One config block connects it — there is no separate Marmo app to learn.',
	},
	{
		q: 'How is this different from asking an agent to build UI from scratch?',
		a: 'An unassisted agent improvises: invented props, mismatched spacing, template-shaped pages. With Marmo connected, it reads real component APIs and validated patterns, and its output is checked before it reports done. Same agent, dramatically better screens.',
	},
	{
		q: 'What does “no AI slop” actually mean here?',
		a: 'Three concrete things: the agent can only use components and props that exist; every screen inherits your design tokens instead of improvised styling; and generated code passes a review step that rejects wrong imports and invented APIs.',
	},
	{
		q: 'Can it match my brand?',
		a: 'Yes — that is the Pro tier. You feed the MCP your DESIGN.md (brand color, type, tokens, component inventory) and every connected agent generates UI in your style. Free tier generates with the default Marmo look.',
	},
	{
		q: 'Do I own the generated code?',
		a: 'Fully. Generation happens in your own agent, with your own LLM tokens, and the code lands in your repo. The components are MIT. Nothing is locked behind our runtime.',
	},
	{
		q: 'What about accessibility?',
		a: 'Components are built on accessible primitives: keyboard navigation, focus states, and ARIA roles are in place, and motion respects reduced-motion settings. Generated screens inherit all of it.',
	},
];

function FaqSection() {
	return (
		<section
			id="faq"
			className="scroll-mt-20 py-20 md:py-28"
			style={{ background: 'linear-gradient(180deg, #3e2572 0%, #0d0d0d 100%)' }}
		>
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="grid gap-12 md:grid-cols-2">
					{/* Left: heading */}
					<div className="md:pt-2">
						<h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-white tracking-[-1.2px] leading-[1.15] md:text-[48px]">
							Frequently Asked Questions
						</h2>
					</div>
					{/* Right: accordion */}
					<div>
						<Accordion
							type="single"
							collapsible
							defaultValue="faq-0"
							className="space-y-3"
						>
							{faqItems.map((item, i) => (
								<AccordionItem key={item.q} value={`faq-${i}`} className="rounded-[10px] border-0 bg-white px-5">
									<AccordionTrigger className="py-4 text-left text-[16px] font-semibold text-ink-dark hover:no-underline">
										{item.q}
									</AccordionTrigger>
									<AccordionContent className="pb-4 text-[15px] leading-relaxed text-ink-light">
										{item.a}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</div>
		</section>
	);
}

export function LandingPage({ testimonials = [] }: { testimonials?: LandingTestimonial[] }) {
	return (
		<>
			<HeroSection />
			<AgentDemo />
			<WorkflowSection />
			<ToolsSection />
			<StyleSection />
			<ShowcaseSection />
			<TestimonialsSection testimonials={testimonials} />
			<PricingSection />
			<FaqSection />
		</>
	);
}
