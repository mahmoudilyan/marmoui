import matter from 'gray-matter';
import { NextResponse, type NextRequest } from 'next/server';
import { getEntitlement } from '@/lib/entitlement';
import { upsertAccount } from '@/lib/platform/entitlements';
import { getTenantForAccount, upsertTenantForAccount } from '@/lib/platform/tenants';
import type { TenantTokens } from '@/lib/tenant-theme';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * /api/tenant — the signed-in Pro user's Tenant (Docs Site).
 *
 * GET  → current tenant (slug, name, tokens) or 404.
 * POST → create/update: { slug, name?, designMd } — tokens parsed from the
 *        DESIGN.md frontmatter (Stitch-compatible schema), or { slug, tokens }.
 */

async function requireProAccount() {
	const { authenticated, plan, email } = await getEntitlement();
	if (!authenticated || !email) {
		return { error: NextResponse.json({ error: 'Sign in first.' }, { status: 401 }) };
	}
	if (plan !== 'pro') {
		return { error: NextResponse.json({ error: 'Pro required.' }, { status: 403 }) };
	}
	const account = await upsertAccount(email);
	if (!account) {
		return { error: NextResponse.json({ error: 'Platform not configured.' }, { status: 503 }) };
	}
	return { account };
}

export async function GET() {
	const { account, error } = await requireProAccount();
	if (error) return error;

	const tenant = await getTenantForAccount(account.id);
	if (!tenant) return NextResponse.json({ error: 'No tenant yet.' }, { status: 404 });
	return NextResponse.json({ slug: tenant.slug, name: tenant.name, tokens: tenant.tokens });
}

export async function POST(request: NextRequest) {
	const { account, error } = await requireProAccount();
	if (error) return error;

	let body: { slug?: unknown; name?: unknown; designMd?: unknown; tokens?: unknown };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
	}

	const slug = typeof body.slug === 'string' ? body.slug.trim().toLowerCase() : '';
	if (!slug) return NextResponse.json({ error: 'Missing slug.' }, { status: 400 });

	let tokens: TenantTokens = {};
	if (typeof body.designMd === 'string' && body.designMd.trim()) {
		try {
			tokens = matter(body.designMd).data as TenantTokens;
		} catch {
			return NextResponse.json({ error: 'DESIGN.md frontmatter is not valid YAML.' }, { status: 400 });
		}
	} else if (body.tokens && typeof body.tokens === 'object') {
		tokens = body.tokens as TenantTokens;
	}

	const name =
		(typeof body.name === 'string' && body.name.trim()) ||
		(typeof tokens.name === 'string' && tokens.name) ||
		slug;

	const result = await upsertTenantForAccount({ accountId: account.id, slug, name, tokens });
	if (!result.ok) {
		const status = result.error === 'slug-taken' ? 409 : result.error === 'invalid-slug' ? 400 : 503;
		return NextResponse.json({ error: result.error }, { status });
	}

	return NextResponse.json({
		slug: result.tenant.slug,
		name: result.tenant.name,
		url: `/t/${result.tenant.slug}`,
	});
}
