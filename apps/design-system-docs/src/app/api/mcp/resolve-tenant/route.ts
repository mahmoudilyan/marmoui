import { NextResponse, type NextRequest } from 'next/server';
import { resolveAccountByMcpToken, isPlatformConfigured } from '@/lib/platform/entitlements';
import { getTenantForAccount } from '@/lib/platform/tenants';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/mcp/resolve-tenant
 *
 * The endpoint the MCP server calls (as `PLATFORM_API_URL/api/mcp/resolve-tenant`)
 * to resolve an incoming `Authorization: Bearer <token>` into a tenant context.
 * The MCP's `fetchRemoteTenant` expects: tenantId, tenantName, tenantSlug, plan,
 * theme, componentOverrides, customPatterns.
 *
 * Tiering (ADR-0007): free-account tokens resolve successfully with
 * `plan: 'free'` — they lift the anonymous rate limit but get Core knowledge
 * only; the MCP gates patterns/on-brand context by plan. Pro tokens resolve
 * with `plan: 'pro'` plus the account's Tenant (slug/name) when one exists.
 *
 *   401 — missing / unknown / revoked token.
 */
export async function GET(request: NextRequest) {
	if (!isPlatformConfigured()) {
		return NextResponse.json({ error: 'Platform is not configured.' }, { status: 503 });
	}

	const header = request.headers.get('authorization') ?? '';
	const match = header.match(/^Bearer\s+(.+)$/i);
	if (!match) {
		return NextResponse.json({ error: 'Missing bearer token.' }, { status: 401 });
	}

	const resolved = await resolveAccountByMcpToken(match[1]);
	if (!resolved) {
		return NextResponse.json({ error: 'Invalid or revoked token.' }, { status: 401 });
	}

	const fallbackSlug =
		resolved.account.email
			.split('@')[0]
			.replace(/[^a-z0-9]+/gi, '-')
			.replace(/^-+|-+$/g, '')
			.toLowerCase() || 'account';

	// Pro accounts may have a Tenant (Docs Site) whose slug/name identify the
	// workspace; theme stays null until workspace ingestion maps DESIGN.md
	// tokens into the MCP theme shape (the MCP falls back to the Marmo default).
	const tenant = resolved.plan === 'pro' ? await getTenantForAccount(resolved.account.id) : null;

	return NextResponse.json({
		tenantId: resolved.account.id,
		tenantName: tenant?.name ?? resolved.account.email,
		tenantSlug: tenant?.slug ?? fallbackSlug,
		plan: resolved.plan,
		// Raw DESIGN.md frontmatter — the MCP turns this into the mandatory
		// brand CSS override block in get_design_guidelines.
		designTokens: tenant?.tokens ?? null,
		theme: null,
		componentOverrides: {},
		customPatterns: {},
	});
}
