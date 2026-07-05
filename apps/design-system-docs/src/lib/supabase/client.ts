'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser Supabase client (anon key). Returns `null` when auth env is absent
 * so client components can render a "not configured" state instead of crashing.
 */
export function getSupabaseBrowserClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!url || !anonKey) return null;
	return createBrowserClient(url, anonKey);
}
