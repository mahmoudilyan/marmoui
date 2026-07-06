import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client for the docs app's Platform features
 * (entitlements + MCP tokens). Mirrors the convention in
 * `supabase/functions/comments-api/index.ts`: the service role bypasses RLS and
 * is only ever used from server code — it must never reach the browser.
 *
 * The client is created lazily and returns `null` when the Platform env vars
 * are absent, so local dev and CI builds work without any Supabase secrets.
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
// Accept both the classic service-role JWT and Supabase's newer secret key.
const SERVICE_ROLE_KEY =
	process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

/** True when both Supabase env vars are set and the Platform path is live. */
export function isPlatformConfigured(): boolean {
	return Boolean(SUPABASE_URL && SERVICE_ROLE_KEY);
}

let cached: SupabaseClient | null = null;

/**
 * Returns a memoized service-role client, or `null` if the Platform is not
 * configured. Callers must handle the `null` case by no-op'ing gracefully.
 */
export function getServiceClient(): SupabaseClient | null {
	if (!isPlatformConfigured()) return null;
	if (cached) return cached;

	cached = createClient(SUPABASE_URL as string, SERVICE_ROLE_KEY as string, {
		auth: { persistSession: false, autoRefreshToken: false },
	});
	return cached;
}
