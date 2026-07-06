import { NextResponse, type NextRequest } from 'next/server';
import { registerClient } from '@/lib/platform/oauth';
import { isPlatformConfigured } from '@/lib/platform/entitlements';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** RFC 7591 dynamic client registration (public clients, PKCE-only). */
export async function POST(request: NextRequest) {
	if (!isPlatformConfigured()) {
		return NextResponse.json({ error: 'temporarily_unavailable' }, { status: 503 });
	}

	let body: { client_name?: unknown; redirect_uris?: unknown };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'invalid_client_metadata' }, { status: 400 });
	}

	const redirectUris = Array.isArray(body.redirect_uris)
		? body.redirect_uris.filter((u): u is string => typeof u === 'string')
		: [];
	if (redirectUris.length === 0) {
		return NextResponse.json({ error: 'invalid_redirect_uri' }, { status: 400 });
	}

	const client = await registerClient({
		clientName: typeof body.client_name === 'string' ? body.client_name.slice(0, 120) : undefined,
		redirectUris,
	});
	if (!client) {
		return NextResponse.json({ error: 'invalid_redirect_uri' }, { status: 400 });
	}

	return NextResponse.json(
		{
			client_id: client.clientId,
			client_name: client.clientName,
			redirect_uris: client.redirectUris,
			token_endpoint_auth_method: 'none',
			grant_types: ['authorization_code'],
			response_types: ['code'],
		},
		{ status: 201 }
	);
}
