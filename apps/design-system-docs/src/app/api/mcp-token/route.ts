import { NextResponse } from 'next/server';
import { getEntitlement } from '@/lib/entitlement';
import {
	resolveSessionAccount,
	issueMcpToken,
	isPlatformConfigured,
} from '@/lib/platform/entitlements';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/mcp-token
 *
 * Issues a new personal MCP Bearer token for the signed-in Pro user. The
 * plaintext is returned exactly once; only its SHA-256 hash is stored. The MCP
 * later resolves this token via GET /api/mcp/resolve-tenant.
 *
 * 403 unless `getEntitlement()` reports a paid plan.
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

	const { plan } = await getEntitlement();
	if (plan !== 'pro') {
		return NextResponse.json(
			{ error: 'A Pro plan is required to generate an MCP token.' },
			{ status: 403 }
		);
	}

	const account = await resolveSessionAccount();
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
