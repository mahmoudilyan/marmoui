import { NextResponse } from 'next/server';
import { getEntitlement } from '@/lib/entitlement';
import {
	resolveSessionAccount,
	upsertAccount,
	issueMcpToken,
	isPlatformConfigured,
} from '@/lib/platform/entitlements';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/mcp-token
 *
 * Issues a new personal MCP Bearer token for any signed-in account — free or
 * Pro (the soft-gate model: anonymous MCP use is rate-limited; a free account
 * token lifts the limit; Pro unlocks on-brand generation). The MCP resolves
 * the token to the account's plan via GET /api/mcp/resolve-tenant, so the
 * tier enforcement lives server-side regardless of who holds a token.
 *
 * The plaintext is returned exactly once; only its SHA-256 hash is stored.
 *
 * 401 when not signed in.
 * 503 when the Platform (Supabase) isn't configured — there's nowhere to store
 *     the token hash, so we don't mint one.
 */
export async function POST() {
	if (!isPlatformConfigured()) {
		return NextResponse.json(
			{ error: 'Platform is not configured; token issuance is unavailable.' },
			{ status: 503 }
		);
	}

	const { authenticated, email } = await getEntitlement();
	if (!authenticated) {
		return NextResponse.json(
			{ error: 'Sign in to generate a personal MCP token.' },
			{ status: 401 }
		);
	}

	// Supabase Auth session first; legacy unlock-cookie session as fallback.
	const account = email ? await upsertAccount(email) : await resolveSessionAccount();
	if (!account) {
		return NextResponse.json({ error: 'No authenticated account.' }, { status: 403 });
	}

	const token = await issueMcpToken(account.id);
	if (!token) {
		return NextResponse.json({ error: 'Failed to issue token.' }, { status: 500 });
	}

	// Returned once. The client must copy it now; it is unrecoverable afterward.
	return NextResponse.json({ token });
}
