import 'server-only';
import { cookies } from 'next/headers';

/**
 * The session cookie set after a successful unlock. The Platform (Supabase)
 * will eventually own minting/validating this token; for now it is a simple
 * opaque value compared against `process.env.MARMO_DEV_SESSION`.
 */
export const SESSION_COOKIE = 'marmo_session';

export type Plan = 'free' | 'pro';

export interface Entitlement {
	authenticated: boolean;
	plan: Plan;
	/** Signed-in user's email, when known. */
	email?: string;
}

const FREE: Entitlement = { authenticated: false, plan: 'free' };

/**
 * Server-side entitlement check. Defaults to "not entitled".
 *
 * Resolution order:
 *   1. `MARMO_DEV_PRO=true` → treat the request as Pro (explicit local/preview
 *      opt-in; always wins so previews can demo the paid experience).
 *   2. Platform configured (Supabase env present) → resolve the signed-in
 *      Supabase session from the `marmo_session` cookie and read the account's
 *      entitlement (`select plan from entitlements where account_id = ...`).
 *      Active paid subscription → `plan: 'pro'`.
 *   3. Dev fallback (no Supabase env) → if the `marmo_session` cookie matches
 *      `process.env.MARMO_DEV_SESSION`, treat the request as Pro. This keeps
 *      local dev / the existing unlock flow working without any secrets.
 *
 * The return shape is intentionally stable so callers (ProCode, API routes)
 * never change as the backing implementation evolves.
 */
export async function getEntitlement(): Promise<Entitlement> {
	if (process.env.MARMO_DEV_PRO === 'true') {
		return { authenticated: true, plan: 'pro' };
	}

	// Lazy import keeps the Supabase client out of the module graph (and out of
	// any bundle) when the Platform isn't configured, and avoids a static import
	// cycle with the platform/entitlements helper.
	const { isPlatformConfigured, resolveSessionAccount, getPlanForAccount, upsertAccount } =
		await import('@/lib/platform/entitlements');

	// Primary path: Supabase Auth session (magic-link sign-in via @supabase/ssr).
	// The middleware keeps the session cookies fresh; here we resolve the user's
	// email to an account and read its entitlement (written by the checkout
	// webhook, keyed by the same email).
	const { getAuthUser, isAuthConfigured } = await import('@/lib/supabase/server');
	if (isAuthConfigured()) {
		const user = await getAuthUser();
		if (user?.email) {
			if (!isPlatformConfigured()) {
				// Signed in but no service credentials to read plans (preview env).
				return { authenticated: true, plan: 'free', email: user.email };
			}
			const account = await upsertAccount(user.email);
			if (!account) return { authenticated: true, plan: 'free', email: user.email };
			const plan = await getPlanForAccount(account.id);
			return { authenticated: true, plan, email: user.email };
		}
	}

	if (isPlatformConfigured()) {
		const account = await resolveSessionAccount();
		if (!account) return FREE;
		const plan = await getPlanForAccount(account.id);
		return { authenticated: true, plan, email: account.email };
	}

	const store = await cookies();
	const session = store.get(SESSION_COOKIE)?.value;

	const devSession = process.env.MARMO_DEV_SESSION;
	if (session && devSession && session === devSession) {
		return { authenticated: true, plan: 'pro' };
	}

	return FREE;
}
