import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/** Must stay in sync with `SESSION_COOKIE` in `src/lib/entitlement.ts`. */
const SESSION_COOKIE = 'marmo_session';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function isPatternsPath(pathname: string): boolean {
	return pathname === '/docs/patterns' || pathname.startsWith('/docs/patterns/');
}

/**
 * Middleware does two jobs:
 *
 * 1. **Supabase session refresh** (when auth env is configured): re-issues
 *    expired access tokens via the auth cookies so `getEntitlement()` in
 *    server components always sees a live session.
 * 2. **Coarse Pro gate for /docs/patterns**: dev bypass, a signed-in Supabase
 *    user, or the legacy `marmo_session` cookie passes; anyone else is sent to
 *    /unlock. Full entitlement resolution (plan lookup) happens in
 *    `getEntitlement()` — this is only the cheap edge check.
 */
export async function middleware(request: NextRequest) {
	let response = NextResponse.next({ request });
	let hasAuthUser = false;

	if (SUPABASE_URL && SUPABASE_ANON_KEY) {
		const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
					response = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options)
					);
				},
			},
		});

		// IMPORTANT: getUser() (not getSession()) — validates the JWT and
		// triggers the refresh that keeps sessions alive.
		const {
			data: { user },
		} = await supabase.auth.getUser();
		hasAuthUser = Boolean(user);
	}

	if (!isPatternsPath(request.nextUrl.pathname)) {
		return response;
	}

	const devPro = process.env.MARMO_DEV_PRO === 'true';
	const legacySession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

	if (devPro || hasAuthUser || legacySession) {
		return response;
	}

	const unlock = new URL('/unlock', request.url);
	unlock.searchParams.set('next', request.nextUrl.pathname);
	const redirect = NextResponse.redirect(unlock);
	// Carry any refreshed auth cookies onto the redirect.
	response.cookies.getAll().forEach(cookie => redirect.cookies.set(cookie));
	return redirect;
}

export const config = {
	// Run wherever a session might matter; skip static assets and Next internals.
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)',
	],
};
