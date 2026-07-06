import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MdAutoAwesome, MdCheckCircle } from 'react-icons/md';
import siteConfig from '@/../site.config';
import { getEntitlement } from '@/lib/entitlement';
import { upsertAccount } from '@/lib/platform/entitlements';
import { getTenantForAccount } from '@/lib/platform/tenants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: `Account — ${siteConfig.title}`,
	description: 'Your Marmo UI account: plan, agent connection, and design-system site.',
};

/** /account — the single place to see who you are and what you have. */
export default async function AccountPage() {
	const { authenticated, plan, email } = await getEntitlement();
	if (!authenticated) redirect('/signin');

	const account = email ? await upsertAccount(email) : null;
	const tenant = account ? await getTenantForAccount(account.id) : null;
	const isPro = plan === 'pro';

	return (
		<div className="bg-bg">
			<main className="mx-auto w-full max-w-2xl px-6 py-16">
				<h1 className="text-2xl font-semibold tracking-tight text-ink">Account</h1>
				<p className="mt-1 text-sm text-ink-light">{email}</p>

				{/* Plan */}
				<section className="mt-8 rounded-xl border border-border bg-panel p-6">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
								Plan
							</p>
							<p className="mt-1 flex items-center gap-2 text-lg font-semibold text-ink">
								{isPro ? (
									<>
										Pro
										<MdCheckCircle className="size-5 text-emerald-600" aria-hidden />
									</>
								) : (
									'Free'
								)}
							</p>
							<p className="mt-1 text-sm text-ink-light">
								{isPro
									? 'On-brand generation, patterns, Pro blocks, and your design-system site.'
									: 'Core components + free MCP. Upgrade for generation in your own style.'}
							</p>
						</div>
						{!isPro ? (
							<Link
								href={siteConfig.buyNowUrl}
								className="inline-flex h-10 shrink-0 items-center rounded-md bg-[#141422] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
							>
								Get Pro
							</Link>
						) : null}
					</div>
				</section>

				{/* Quick actions */}
				<section className="mt-6 grid gap-3 sm:grid-cols-2">
					<Link
						href={siteConfig.connectUrl}
						className="rounded-xl border border-border bg-white p-5 transition-colors hover:bg-panel"
					>
						<p className="text-sm font-semibold text-ink">Agent connection</p>
						<p className="mt-1 text-sm text-ink-light">
							{isPro ? 'Manage your personal MCP token.' : 'Connect the free Core MCP.'}
						</p>
					</Link>
					{isPro ? (
						<Link
							href={tenant ? `/t/${tenant.slug}` : siteConfig.connectUrl}
							className="rounded-xl border border-border bg-white p-5 transition-colors hover:bg-panel"
						>
							<p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
								<MdAutoAwesome className="size-4 text-primary" aria-hidden />
								Design-system site
							</p>
							<p className="mt-1 text-sm text-ink-light">
								{tenant ? `Live at /t/${tenant.slug}` : 'Publish yours from the connect page.'}
							</p>
						</Link>
					) : (
						<Link
							href={siteConfig.pricingUrl}
							className="rounded-xl border border-border bg-white p-5 transition-colors hover:bg-panel"
						>
							<p className="text-sm font-semibold text-ink">Compare plans</p>
							<p className="mt-1 text-sm text-ink-light">What Pro unlocks, in one table.</p>
						</Link>
					)}
				</section>

				{/* Help + sign out */}
				<section className="mt-6 flex flex-wrap items-center gap-3">
					<Link
						href={siteConfig.docsUrl}
						className="text-sm font-medium text-primary hover:underline"
					>
						Docs
					</Link>
					<span className="text-ink-muted">·</span>
					<Link href="/unlock" className="text-sm font-medium text-primary hover:underline">
						Redeem a license key
					</Link>
					<form action="/api/auth/signout" method="post" className="ml-auto">
						<button
							type="submit"
							className="inline-flex h-10 items-center rounded-md border border-border bg-white px-4 text-sm font-medium text-ink transition-colors hover:bg-panel"
						>
							Sign out
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}
