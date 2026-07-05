import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

/**
 * Anon-key Supabase server client bound to the request cookies — the auth
 * counterpart to the service-role client in `@/lib/platform/supabase`.
 *
 * Returns `null` when the public Supabase env vars are absent so the site
 * builds and runs without auth configured (auth-dependent UI degrades to
 * "not signed in").
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isAuthConfigured(): boolean {
	return Boolean(URL && ANON_KEY);
}

export async function getSupabaseServerClient() {
	if (!isAuthConfigured()) return null;
	const cookieStore = await cookies();

	return createServerClient(URL as string, ANON_KEY as string, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) =>
						cookieStore.set(name, value, options)
					);
				} catch {
					// Called from a Server Component — safe to ignore; the middleware
					// refreshes sessions, so cookie writes happen there.
				}
			},
		},
	});
}

/** Signed-in Supabase user for the current request, or null. */
export async function getAuthUser() {
	const supabase = await getSupabaseServerClient();
	if (!supabase) return null;
	const { data, error } = await supabase.auth.getUser();
	if (error || !data.user) return null;
	return data.user;
}
