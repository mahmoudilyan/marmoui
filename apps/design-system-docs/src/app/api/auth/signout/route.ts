import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { SESSION_COOKIE } from '@/lib/entitlement';

export const dynamic = 'force-dynamic';

/** POST /api/auth/signout — ends the Supabase session and clears legacy cookies. */
export async function POST(request: NextRequest) {
	const supabase = await getSupabaseServerClient();
	if (supabase) {
		await supabase.auth.signOut();
	}
	const response = NextResponse.redirect(new URL('/', request.url), { status: 303 });
	response.cookies.delete(SESSION_COOKIE);
	return response;
}
