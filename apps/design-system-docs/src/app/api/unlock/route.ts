import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/entitlement';

export const dynamic = 'force-dynamic';

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * POST /api/unlock
 *
 * Accepts a license key or session token in the JSON body and, if valid, sets
 * the `marmo_session` cookie that `getEntitlement()` reads.
 *
 * TODO(platform): validate against Supabase entitlements. Exchange the license
 * key for a Supabase session (or verify it against the `entitlements` table),
 * set the real session cookie(s), and only grant access when the user has an
 * active paid plan. The dev-session shortcut below should be removed.
 */
export async function POST(request: NextRequest) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
	}

	const key =
		typeof body === 'object' && body !== null && 'key' in body
			? String((body as { key: unknown }).key ?? '')
			: '';

	const devSession = process.env.MARMO_DEV_SESSION;

	if (!key || !devSession || key !== devSession) {
		return NextResponse.json({ error: 'Invalid license key.' }, { status: 401 });
	}

	const response = NextResponse.json({ ok: true, plan: 'pro' });
	response.cookies.set(SESSION_COOKIE, key, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: ONE_YEAR,
	});

	return response;
}
