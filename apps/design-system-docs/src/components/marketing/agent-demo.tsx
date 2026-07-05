'use client';

import * as React from 'react';

/**
 * Animated agent demo: a natural-language prompt mentioning Marmo UI is typed
 * on the left; the matching UI assembles on the right piece by piece.
 *
 * The anti-slop proof is the traceability: each requirement phrase in the
 * prompt lights up at the exact moment its UI piece lands, and every built
 * block is tagged with the real @marmoui/ui component that renders it.
 * Status lines are the MCP tools that actually exist.
 */

type PromptSegment = {
	text: string;
	/** build phase this phrase maps to; highlighted while its piece builds */
	phase?: number;
};

type Scenario = {
	id: 'dashboard' | 'form' | 'shell';
	label: string;
	segments: PromptSegment[];
	steps: string[];
	phases: number;
};

const scenarios: Scenario[] = [
	{
		id: 'dashboard',
		label: 'dashboard',
		segments: [
			{ text: 'Using Marmo UI, build a revenue dashboard with ' },
			{ text: 'KPI cards', phase: 2 },
			{ text: ', a ' },
			{ text: 'trend chart', phase: 3 },
			{ text: ' and a ' },
			{ text: 'recent orders table', phase: 4 },
			{ text: '.' },
		],
		steps: [
			'get_pattern("dashboard-tiles")',
			'get_component_info("Card", "ChartContainer", "DataTable")',
			'review_generated_code ✓ 0 errors',
		],
		phases: 4,
	},
	{
		id: 'form',
		label: 'form',
		segments: [
			{ text: 'Create a signup form with Marmo UI — ' },
			{ text: 'name and email', phase: 2 },
			{ text: ', ' },
			{ text: 'password', phase: 3 },
			{ text: ', with ' },
			{ text: 'validation wired up', phase: 4 },
			{ text: '.' },
		],
		steps: [
			'get_pattern("form-with-validation")',
			'get_component_info("Field", "Input", "Button")',
			'review_generated_code ✓ 0 errors',
		],
		phases: 4,
	},
	{
		id: 'shell',
		label: 'app shell',
		segments: [
			{ text: 'Scaffold an app shell with Marmo UI: ' },
			{ text: 'sidebar navigation', phase: 1 },
			{ text: ', a ' },
			{ text: 'topbar', phase: 2 },
			{ text: ' and a ' },
			{ text: 'projects page', phase: 3 },
			{ text: '.' },
		],
		steps: [
			'get_pattern("app-shell")',
			'get_component_info("SidebarProvider", "PageSection")',
			'review_generated_code ✓ 0 errors',
		],
		phases: 4,
	},
];

function scenarioPrompt(s: Scenario) {
	return s.segments.map(seg => seg.text).join('');
}

function useReducedMotion() {
	const [reduced, setReduced] = React.useState(false);
	React.useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		setReduced(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);
	return reduced;
}

/** Build-phase helper: visible once the demo reaches `at`. */
function phaseClass(phase: number, at: number) {
	const on = phase >= at;
	return `transition-all duration-500 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`;
}

/** Mono chip naming the real @marmoui/ui component rendering a block. */
function ComponentTag({ name, show }: { name: string; show: boolean }) {
	return (
		<span
			className={`pointer-events-none absolute -top-2.5 right-2 z-10 rounded-[3px] border border-primary/30 bg-white px-1.5 py-px font-mono text-[9px] font-medium text-primary shadow-sm transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
			aria-hidden
		>
			{`<${name} />`}
		</span>
	);
}

/* ── Right-side previews — real content, tagged with real components ── */

const kpis = [
	{ label: 'MRR', value: '$48,210', delta: '+12.4%', up: true },
	{ label: 'Active customers', value: '1,284', delta: '+4.1%', up: true },
	{ label: 'Churn', value: '2.1%', delta: '-0.3%', up: false },
];

const orders = [
	{ name: 'Acme Corp', amount: '$1,250', status: 'Paid', paid: true },
	{ name: 'Northwind', amount: '$840', status: 'Pending', paid: false },
	{ name: 'Globex', amount: '$2,100', status: 'Paid', paid: true },
];

const chartBars = [38, 52, 44, 66, 58, 82, 74, 91];
const chartDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S', ''];

function DashboardPreview({ phase }: { phase: number }) {
	return (
		<div className="flex h-full flex-col gap-2.5 p-3.5">
			<div className={phaseClass(phase, 1)}>
				<div className="flex items-center justify-between">
					<p className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-bold tracking-[-0.3px] text-ink-dark">
						Revenue overview
					</p>
					<span className="rounded-[4px] bg-[#141422] px-2.5 py-1 text-[10px] font-semibold text-white">
						Export
					</span>
				</div>
			</div>

			<div className={`relative grid grid-cols-3 gap-2 ${phaseClass(phase, 2)}`}>
				<ComponentTag name="Card" show={phase >= 2} />
				{kpis.map(kpi => (
					<div key={kpi.label} className="rounded-md border border-border-secondary bg-white p-2.5">
						<p className="truncate text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
							{kpi.label}
						</p>
						<p className="mt-1 text-[13px] font-bold tracking-tight text-ink-dark">{kpi.value}</p>
						<p className={`text-[9px] font-semibold ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>
							{kpi.delta}
						</p>
					</div>
				))}
			</div>

			<div className={`relative flex-1 rounded-md border border-border-secondary bg-white p-3 ${phaseClass(phase, 3)}`}>
				<ComponentTag name="ChartContainer" show={phase >= 3} />
				<p className="text-[9px] font-semibold uppercase tracking-wide text-ink-muted">This week</p>
				<div className="mt-2 flex h-[calc(100%-2.4rem)] min-h-14 items-end gap-1.5 border-b border-border-secondary pb-px">
					{chartBars.map((h, i) => (
						<div
							key={i}
							className="flex-1 origin-bottom rounded-t-[2px] bg-primary/75 transition-transform duration-700 ease-out"
							style={{
								height: `${h}%`,
								transform: phase >= 3 ? 'scaleY(1)' : 'scaleY(0)',
								transitionDelay: `${i * 55}ms`,
							}}
						/>
					))}
				</div>
				<div className="mt-1 flex gap-1.5">
					{chartDays.map((d, i) => (
						<span key={i} className="flex-1 text-center text-[8px] text-ink-muted">
							{d}
						</span>
					))}
				</div>
			</div>

			<div className={`relative rounded-md border border-border-secondary bg-white ${phaseClass(phase, 4)}`}>
				<ComponentTag name="DataTable" show={phase >= 4} />
				<div className="flex items-center justify-between border-b border-border-secondary px-2.5 py-1.5">
					<span className="text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
						Recent orders
					</span>
				</div>
				{orders.map(row => (
					<div
						key={row.name}
						className="flex items-center gap-2 border-b border-border-secondary px-2.5 py-1.5 last:border-0"
					>
						<span className="flex-1 truncate text-[10px] font-medium text-ink-dark">{row.name}</span>
						<span className="text-[10px] tabular-nums text-ink">{row.amount}</span>
						<span
							className={`rounded-full px-1.5 py-px text-[8px] font-semibold ${
								row.paid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
							}`}
						>
							{row.status}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function FormPreview({ phase }: { phase: number }) {
	return (
		<div className="flex h-full items-center justify-center p-5">
			<div className="relative w-full max-w-[260px] rounded-lg border border-border-secondary bg-white p-4 shadow-sm">
				<ComponentTag name="Field" show={phase >= 2} />
				<div className={phaseClass(phase, 1)}>
					<p className="font-['Plus_Jakarta_Sans',sans-serif] text-[14px] font-bold tracking-[-0.3px] text-ink-dark">
						Create your account
					</p>
					<p className="mt-0.5 text-[10px] text-ink-light">Start building in minutes.</p>
				</div>

				<div className={`mt-3 ${phaseClass(phase, 2)}`}>
					<p className="mb-1 text-[10px] font-medium text-ink">Name</p>
					<div className="flex h-7 items-center rounded-md border border-border-secondary bg-white px-2 text-[10px] text-ink-dark">
						Ada Lovelace
					</div>
				</div>
				<div className={`mt-2.5 ${phaseClass(phase, 2)}`}>
					<p className="mb-1 text-[10px] font-medium text-ink">Email</p>
					<div className="flex h-7 items-center justify-between rounded-md border border-emerald-400 bg-white px-2 text-[10px] text-ink-dark">
						ada@company.com
						<span className="text-[10px] text-emerald-600">✓</span>
					</div>
				</div>
				<div className={`mt-2.5 ${phaseClass(phase, 3)}`}>
					<p className="mb-1 text-[10px] font-medium text-ink">Password</p>
					<div className="flex h-7 items-center rounded-md border border-border-secondary bg-white px-2 text-[10px] tracking-widest text-ink-dark">
						••••••••••
					</div>
					<p className="mt-1 text-[9px] text-ink-muted">8+ characters, one number</p>
				</div>

				<div className={`relative mt-3.5 ${phaseClass(phase, 4)}`}>
					<ComponentTag name="Button" show={phase >= 4} />
					<div className="flex h-8 items-center justify-center rounded-md bg-[#141422]">
						<span className="text-[11px] font-semibold text-white">Create account</span>
					</div>
					<p className="mt-1.5 text-center text-[9px] text-ink-muted">zod + react-hook-form wired</p>
				</div>
			</div>
		</div>
	);
}

const navItems = ['Overview', 'Projects', 'Reports', 'Settings'];
const projects = ['Website redesign', 'Mobile app', 'Q3 analytics', 'Onboarding flow'];

function ShellPreview({ phase }: { phase: number }) {
	return (
		<div className="flex h-full gap-2 p-3">
			<div className={`relative w-[30%] rounded-md border border-border-secondary bg-white p-2 ${phaseClass(phase, 1)}`}>
				<ComponentTag name="SidebarProvider" show={phase >= 1} />
				<div className="mb-2.5 flex items-center gap-1.5 px-1">
					<span className="size-3.5 rounded bg-primary/75" />
					<span className="text-[9px] font-bold text-ink-dark">Acme</span>
				</div>
				{navItems.map((item, i) => (
					<div
						key={item}
						className={`mb-1 rounded px-1.5 py-1 text-[9px] font-medium ${
							i === 1 ? 'bg-primary/10 text-primary' : 'text-ink-light'
						}`}
					>
						{item}
					</div>
				))}
			</div>
			<div className="flex flex-1 flex-col gap-2">
				<div className={`relative h-8 rounded-md border border-border-secondary bg-white px-2 ${phaseClass(phase, 2)}`}>
					<ComponentTag name="PageSection" show={phase >= 2} />
					<div className="flex h-full items-center justify-between">
						<div className="flex h-4.5 w-24 items-center rounded-full bg-panel px-2 text-[8px] text-ink-muted">
							Search…
						</div>
						<span className="flex size-4.5 items-center justify-center rounded-full bg-primary/15 text-[8px] font-bold text-primary">
							A
						</span>
					</div>
				</div>
				<div className={`relative flex-1 rounded-md border border-border-secondary bg-white p-3 ${phaseClass(phase, 3)}`}>
					<div className="flex items-center justify-between">
						<p className="text-[11px] font-bold tracking-tight text-ink-dark">Projects</p>
						<span className="rounded-[3px] bg-[#141422] px-1.5 py-0.5 text-[8px] font-semibold text-white">
							New
						</span>
					</div>
					<div className="mt-2.5 grid grid-cols-2 gap-2">
						{projects.map((name, i) => (
							<div
								key={name}
								className={`rounded border border-border-secondary bg-panel/50 p-2 ${phaseClass(phase, 4)}`}
								style={{ transitionDelay: `${i * 70}ms` }}
							>
								<p className="truncate text-[9px] font-medium text-ink-dark">{name}</p>
								<div className="mt-1.5 h-1 overflow-hidden rounded-full bg-panel">
									<div className="h-full rounded-full bg-primary/70" style={{ width: `${[70, 35, 90, 50][i]}%` }} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

/* ── The demo ── */

const TYPE_MS = 30;
const STEP_MS = 620;
const PHASE_MS = 560;
const HOLD_MS = 3200;

export function AgentDemo() {
	const reduced = useReducedMotion();
	const [scenarioIdx, setScenarioIdx] = React.useState(0);
	const [typed, setTyped] = React.useState(0);
	const [stepCount, setStepCount] = React.useState(0);
	const [phase, setPhase] = React.useState(0);

	const scenario = scenarios[scenarioIdx];
	const prompt = scenarioPrompt(scenario);

	React.useEffect(() => {
		if (reduced) return;
		let cancelled = false;
		const timers: ReturnType<typeof setTimeout>[] = [];
		const wait = (ms: number) =>
			new Promise<void>(resolve => {
				timers.push(setTimeout(resolve, ms));
			});

		async function run() {
			setTyped(0);
			setStepCount(0);
			setPhase(0);
			for (let i = 1; i <= prompt.length; i++) {
				if (cancelled) return;
				setTyped(i);
				await wait(TYPE_MS);
			}
			await wait(300);
			for (let s = 1; s <= scenario.steps.length; s++) {
				if (cancelled) return;
				setStepCount(s);
				await wait(STEP_MS);
			}
			for (let p = 1; p <= scenario.phases; p++) {
				if (cancelled) return;
				setPhase(p);
				await wait(PHASE_MS);
			}
			await wait(HOLD_MS);
			if (!cancelled) setScenarioIdx(i => (i + 1) % scenarios.length);
		}

		run();
		return () => {
			cancelled = true;
			timers.forEach(clearTimeout);
		};
	}, [scenarioIdx, reduced, scenario, prompt]);

	const typedCount = reduced ? prompt.length : typed;
	const visibleSteps = reduced ? scenario.steps.length : stepCount;
	const currentPhase = reduced ? scenario.phases : phase;

	/* Render the prompt from its segments so each requirement phrase can light
	   up at the moment its UI piece lands on the right. */
	let charCursor = 0;
	const promptNodes = scenario.segments.map((seg, i) => {
		const start = charCursor;
		charCursor += seg.text.length;
		const visible = Math.max(0, Math.min(seg.text.length, typedCount - start));
		const text = seg.text.slice(0, visible);
		if (!text) return null;
		const lit = seg.phase !== undefined && currentPhase >= seg.phase;
		return (
			<span
				key={i}
				className={
					seg.phase !== undefined
						? `rounded-[3px] px-0.5 transition-colors duration-300 ${lit ? 'bg-primary/25 text-white' : 'text-white/90'}`
						: 'text-white/90'
				}
			>
				{text}
			</span>
		);
	});

	return (
		<section id="demo" className="scroll-mt-20 bg-bg pb-20 md:pb-28">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] font-semibold text-primary tracking-[-0.36px]">
						Prompt in, screen out
					</p>
					<h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-ink-dark tracking-[-1.2px] leading-[1.15]">
						Every piece traces back to your prompt
					</h2>
					<p className="mt-5 font-['Plus_Jakarta_Sans',sans-serif] text-[18px] text-ink-light tracking-[-0.36px] leading-[1.5]">
						Watch the mapping: as each part of the screen lands, the phrase that asked for it lights
						up — and every block is a real, named @marmoui/ui component. That&apos;s the opposite of
						slop.
					</p>
				</div>

				<div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
					{/* Left: agent terminal */}
					<div className="flex min-h-[340px] flex-col overflow-hidden rounded-[12px] bg-[#0d0d0d] shadow-[0_12px_40px_rgba(15,23,42,0.18)]">
						<div className="border-b border-white/10 px-4 py-2.5">
							<p className="font-mono text-[11px] font-medium text-white/50">
								your agent · marmo-ui MCP connected
							</p>
						</div>
						<div className="flex-1 p-4 font-mono text-[13px] leading-relaxed">
							<p>
								<span className="text-primary">❯</span> {promptNodes}
								<span
									className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse bg-white/80 motion-reduce:hidden"
									aria-hidden
								/>
							</p>
							<div className="mt-4 space-y-2">
								{scenario.steps.slice(0, visibleSteps).map((step, i) => {
									const isLast = i === scenario.steps.length - 1;
									return (
										<p key={step} className={isLast ? 'text-emerald-400/90' : 'text-white/55'}>
											<span className="text-white/30">{isLast ? '✓' : '→'}</span> {step}
										</p>
									);
								})}
								{currentPhase >= scenario.phases && (
									<p className="text-white/85">
										<span className="text-white/30">·</span> Done — code in your repo.
									</p>
								)}
							</div>
						</div>
						<div className="border-t border-white/10 px-4 py-2.5">
							<p className="font-mono text-[10px] text-white/35">
								{scenarios.map((s, i) => (
									<span key={s.id} className={i === scenarioIdx ? 'text-white/70' : ''}>
										{s.label}
										{i < scenarios.length - 1 ? '  ·  ' : ''}
									</span>
								))}
							</p>
						</div>
					</div>

					{/* Right: UI assembling */}
					<div className="min-h-[340px] overflow-hidden rounded-[12px] border border-border-secondary bg-panel shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
						{scenario.id === 'dashboard' && <DashboardPreview phase={currentPhase} />}
						{scenario.id === 'form' && <FormPreview phase={currentPhase} />}
						{scenario.id === 'shell' && <ShellPreview phase={currentPhase} />}
					</div>
				</div>

				<p className="mt-6 text-center text-sm text-ink-light">
					Real workflow: your agent asks the Marmo MCP for live component APIs and patterns,
					composes, and validates with{' '}
					<code className="rounded bg-panel px-1.5 py-0.5 font-mono text-[12px] text-ink">
						review_generated_code
					</code>{' '}
					before reporting done.
				</p>
			</div>
		</section>
	);
}
