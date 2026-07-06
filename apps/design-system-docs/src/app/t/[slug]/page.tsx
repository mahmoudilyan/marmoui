import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ComponentGallery } from '@/components/component-gallery';
import { getEntitlement } from '@/lib/entitlement';
import { upsertAccount } from '@/lib/platform/entitlements';
import { getTenantBySlug, type Tenant } from '@/lib/platform/tenants';
import { tenantCssVars, tenantPalette } from '@/lib/tenant-theme';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-dynamic';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
	const { slug } = await params;
	return { title: `${slug} — Design system`, robots: { index: false, follow: false } };
}

/**
 * /t/[slug] — a Tenant Docs Site (ADR-0006): the Marmo component library
 * rendered in the tenant's own tokens. Members-only: the signed-in account
 * must own the tenant; everyone else gets a 404 (never a "this exists but
 * you can't see it" signal).
 */
async function resolveAuthorizedTenant(slug: string): Promise<Tenant | null> {
	const tenant = await getTenantBySlug(slug);
	if (!tenant) return null;

	// Local/dev preview bypass, mirroring the rest of the entitlement stack.
	if (process.env.MARMO_DEV_PRO === 'true') return tenant;

	const { authenticated, email } = await getEntitlement();
	if (!authenticated || !email) return null;

	const account = await upsertAccount(email);
	if (!account || account.id !== tenant.accountId) return null;
	return tenant;
}

export default async function TenantSitePage({ params }: { params: Promise<Params> }) {
	const { slug } = await params;
	const tenant = await resolveAuthorizedTenant(slug);
	if (!tenant) notFound();

	const cssVars = tenantCssVars(tenant.tokens);
	const palette = tenantPalette(tenant.tokens);

	return (
		<div style={cssVars as React.CSSProperties} className="flex min-h-screen flex-col bg-bg">
			<SiteHeader />
			<main className="flex-1">
				{/* Brand head */}
				<section className="border-b border-border-secondary bg-panel">
					<div className="mx-auto max-w-[1680px] px-5 py-12 sm:px-8 lg:px-12">
						<p className="text-xs font-bold uppercase tracking-[0.08em] text-primary-600">
							Design system
						</p>
						<h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-ink-dark">
							{tenant.name}
						</h1>
						<p className="mt-2 max-w-xl text-sm text-ink-light">
							Every component below renders in your tokens. Agents connected with your MCP token
							generate against the same values — what you see here is what they build.
						</p>

						{palette.length > 0 ? (
							<div className="mt-6 flex flex-wrap gap-3">
								{palette.map(swatch => (
									<div
										key={swatch.name}
										className="flex items-center gap-2 rounded-md border border-border-secondary bg-white py-1.5 pl-1.5 pr-3"
									>
										<span
											className="size-6 rounded border border-black/10"
											style={{ backgroundColor: swatch.value }}
											aria-hidden
										/>
										<span className="text-xs font-medium text-ink">
											{swatch.name}
											<span className="ml-1.5 font-mono text-[10px] text-ink-muted">
												{swatch.value}
											</span>
										</span>
									</div>
								))}
							</div>
						) : (
							<p className="mt-6 text-sm text-ink-muted">
								No color tokens yet — update your DESIGN.md at{' '}
								<Link href="/connect" className="font-medium text-primary-600 hover:underline">
									/connect
								</Link>
								.
							</p>
						)}
					</div>
				</section>

				{/* The library, in their tokens */}
				<div className="mx-auto max-w-[1680px] px-5 py-12 sm:px-8 lg:px-12">
					<ComponentGallery query="" linked={false} />
				</div>
			</main>
		</div>
	);
}
