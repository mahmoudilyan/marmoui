import { NextResponse, type NextRequest } from 'next/server';
import { redeemAuthCode } from '@/lib/platform/oauth';
import { issueMcpToken, isPlatformConfigured } from '@/lib/platform/entitlements';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * OAuth token endpoint (authorization_code + PKCE, public clients).
 * The issued access token IS a personal MCP token (`marmo_live_…`), so the
 * MCP resolves it through the existing resolve-tenant path with plan tiering.
 * Tokens don't expire (revocable server-side), so no refresh token is issued.
 */
export async function POST(request: NextRequest) {
	if (!isPlatformConfigured()) {
		return NextResponse.json({ error: 'temporarily_unavailable' }, { status: 503 });
	}

	const contentType = request.headers.get('content-type') ?? '';
	let params: URLSearchParams;
	if (contentType.includes('application/json')) {
		const body = (await request.json().catch(() => ({}))) as Record<string, string>;
		params = new URLSearchParams(body);
	} else {
		params = new URLSearchParams(await request.text());
	}

	if (params.get('grant_type') !== 'authorization_code') {
		return NextResponse.json({ error: 'unsupported_grant_type' }, { status: 400 });
	}

	const code = params.get('code');
	const clientId = params.get('client_id');
	const redirectUri = params.get('redirect_uri');
	const codeVerifier = params.get('code_verifier');
	if (!code || !clientId || !redirectUri || !codeVerifier) {
		return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
	}

	const accountId = await redeemAuthCode({ code, clientId, redirectUri, codeVerifier });
	if (!accountId) {
		return NextResponse.json({ error: 'invalid_grant' }, { status: 400 });
	}

	const token = await issueMcpToken(accountId);
	if (!token) {
		return NextResponse.json({ error: 'server_error' }, { status: 500 });
	}

	return NextResponse.json(
		{ access_token: token, token_type: 'Bearer', scope: 'mcp' },
		{ headers: { 'Cache-Control': 'no-store' } }
	);
}
