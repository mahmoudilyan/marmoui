import { NextResponse, type NextRequest } from 'next/server';
import { resolveAccountByMcpToken, isPlatformConfigured } from '@/lib/platform/entitlements';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/mcp/resolve-tenant
 *
 * The endpoint the MCP server calls (as `PLATFORM_API_URL/api/mcp/resolve-tenant`)
 * to resolve an incoming `Authorization: Bearer <token>` into a tenant context.
 * See `apps/design-system-mcp/src/tenant/store.ts` → `fetchRemoteTenant`, which
 * expects exactly these JSON keys:
 *   tenantId, tenantName, tenantSlug, theme, componentOverrides, customPatterns
 *
 * The token is validated by hashing it and looking up a non-revoked `mcp_tokens`
 * row; the account must hold a Pro entitlement.
 *   401 — missing / unknown / revoked token.
 *   403 — token resolves but the account is not Pro.
 *
 * `theme` is returned as `null` here: an individual Pro account uses the default
 * Marmo theme, and the MCP falls back to `DEFAULT_MARMO_THEME` when `theme` is
 * absent. Custom-themed tenants (workspace ingestion) will populate these later.
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

	if (resolved.plan !== 'pro') {
		return NextResponse.json({ error: 'Account does not have a Pro entitlement.' }, { status: 403 });
	}

	const slug =
		resolved.account.email
			.split('@')[0]
			.replace(/[^a-z0-9]+/gi, '-')
			.replace(/^-+|-+$/g, '')
			.toLowerCase() || 'account';

	return NextResponse.json({
		tenantId: resolved.account.id,
		tenantName: resolved.account.email,
		tenantSlug: slug,
		theme: null,
		componentOverrides: {},
		customPatterns: {},
	});
}
