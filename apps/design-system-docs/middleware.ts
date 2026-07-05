import { NextResponse, type NextRequest } from 'next/server';

/** Must stay in sync with `SESSION_COOKIE` in `src/lib/entitlement.ts`. */
const SESSION_COOKIE = 'marmo_session';

function isPatternsPath(pathname: string): boolean {
	return pathname === '/docs/patterns' || pathname.startsWith('/docs/patterns/');
}

/**
 * Lightweight Pro check for Edge middleware. Full entitlement resolution
 * (Supabase plan lookup, dev-session validation) lives in `getEntitlement()`.
 *
 * Here we only need a coarse gate: dev bypass, or a session cookie present.
 */
function hasProSession(request: NextRequest): boolean {
	if (process.env.MARMO_DEV_PRO === 'true') {
		return true;
	}

	const session = request.cookies.get(SESSION_COOKIE)?.value;
	return Boolean(session && session.length > 0);
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (!isPatternsPath(pathname)) {
		return NextResponse.next();
	}

	if (hasProSession(request)) {
		return NextResponse.next();
	}

	const unlock = new URL('/unlock', request.url);
	unlock.searchParams.set('next', pathname);
	return NextResponse.redirect(unlock);
}

export const config = {
	matcher: ['/docs/:path*'],
};
