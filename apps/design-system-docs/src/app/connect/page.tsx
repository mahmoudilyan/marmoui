import type { Metadata } from 'next';
import Link from 'next/link';
import { MdAutoAwesome } from 'react-icons/md';
import { getEntitlement } from '@/lib/entitlement';
import { upsertAccount } from '@/lib/platform/entitlements';
import { getTenantForAccount } from '@/lib/platform/tenants';
import { ConnectClient } from './connect-client';
import { TenantSiteCard } from './tenant-site-card';
import siteConfig from '@/../site.config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: `Connect — ${siteConfig.title}`,
	description:
		'Connect Claude Code, Codex, Cursor, or Gemini to Marmo UI. Free tier connects with one command; Pro adds your personal token and on-brand generation.',
};

/**
 * /connect — agent setup for everyone.
 *
 * Free (and signed-out) visitors get the Core-tier setup: one command, no
 * account needed. Pro users additionally get the personal-token generator
 * (`ConnectClient`) that unlocks on-brand generation.
 */
export default async function ConnectPage() {
	const { plan, authenticated, email } = await getEntitlement();
	const mcpUrl = process.env.NEXT_PUBLIC_MCP_URL || 'http://localhost:3001/mcp';

	return (
		<main className="mx-auto w-full max-w-2xl px-6 py-16">
			<h1 className="text-2xl font-semibold tracking-tight text-ink">Connect your AI agent</h1>
			<p className="mt-2 text-sm text-ink-light">
				One command wires Claude Code, Codex, Cursor, Gemini CLI, and more. The free Core tier
				needs no account — your agent starts reading real component APIs immediately.
			</p>

			{/* Free tier — everyone */}
			<div className="mt-10 overflow-hidden rounded-xl border border-border bg-[#0d0d0d]">
				<div className="border-b border-white/10 px-4 py-2.5">
					<p className="font-mono text-[11px] font-medium text-white/50">
						terminal · free, no account needed
					</p>
				</div>
				<div className="p-5 font-mono text-[13px] leading-loose">
					<p className="text-white/90">
						<span className="text-white/40">$</span> npx marmoui init
					</p>
					<p className="mt-1 text-white/55">
						Writes the config for every detected client, then restart your agent and try:
					</p>
					<p className="text-white/55">&ldquo;Build a billing dashboard with Marmo UI.&rdquo;</p>
				</div>
			</div>
			<p className="mt-3 text-xs text-ink-muted">
				Prefer manual setup? Per-client instructions are in the{' '}
				<Link href="/docs/introduction/install-agent" className="font-medium text-primary hover:underline">
					install guide
				</Link>
				.
			</p>

			{plan === 'pro' ? (
				<ProSections mcpUrl={mcpUrl} email={email} />
			) : (
				<div className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-border bg-panel p-6">
					<div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-ink">
						<MdAutoAwesome className="h-5 w-5" />
					</div>
					<div>
						<h2 className="text-base font-medium text-ink">Make it yours with Pro</h2>
						<p className="mt-1 text-sm text-ink-light">
							Free generates with the default Marmo look. Pro adds a personal token that unlocks
							on-brand generation — your{' '}
							<Link href="/docs/tools/design-md" className="font-medium text-primary hover:underline">
								DESIGN.md
							</Link>{' '}
							drives every screen any of your agents generates — plus the patterns library and Pro
							blocks.
						</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link
							href={siteConfig.buyNowUrl}
							className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
						>
							Get Pro
						</Link>
						{authenticated ? (
							<Link
								href="/welcome"
								className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-ink transition-colors hover:bg-secondary"
							>
								Account{email ? ` (${email})` : ''}
							</Link>
						) : (
							<Link
								href="/signin"
								className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-ink transition-colors hover:bg-secondary"
							>
								Already bought? Sign in
							</Link>
						)}
					</div>
				</div>
			)}
		</main>
	);
}

/** Pro-only sections: personal MCP token + the tenant design-system site. */
async function ProSections({ mcpUrl, email }: { mcpUrl: string; email?: string }) {
	const account = email ? await upsertAccount(email) : null;
	const tenant = account ? await getTenantForAccount(account.id) : null;

	return (
		<>
			<div className="mt-12">
				<h2 className="text-base font-semibold text-ink">Your personal token</h2>
				<p className="mt-1 text-sm text-ink-light">
					Unlocks on-brand generation and patterns for every agent using it.
				</p>
				<div className="mt-6">
					<ConnectClient mcpUrl={mcpUrl} />
				</div>
			</div>
			<div className="mt-10">
				<TenantSiteCard initialSlug={tenant?.slug} initialName={tenant?.name} />
			</div>
		</>
	);
}
