import 'server-only';
import { cookies } from 'next/headers';
import { createHash, randomBytes } from 'node:crypto';
import { SESSION_COOKIE, type Plan } from '@/lib/entitlement';
import { getServiceClient, isPlatformConfigured } from './supabase';

/**
 * Platform data-access helpers for accounts, entitlements, and MCP tokens.
 *
 * Every function here is a no-op-friendly wrapper over the service-role
 * Supabase client: if the Platform env vars are absent, `getServiceClient()`
 * returns `null` and these helpers degrade gracefully (logging a warning where
 * a write was expected) so local dev and CI builds work without secrets.
 *
 * This module is the single place that knows the Supabase table/column shapes,
 * so the webhook, the docs API routes, and the MCP resolver all stay in sync.
 */

export interface PlatformAccount {
	id: string;
	email: string;
}

export interface EntitlementUpsert {
	email: string;
	plan: Plan;
	/** Provenance of the entitlement, e.g. 'lemonsqueezy'. */
	source?: string;
	lemonsqueezyOrderId?: string | null;
	lemonsqueezySubscriptionId?: string | null;
	/** Provider-reported status, e.g. 'active' | 'cancelled' | 'expired'. */
	status?: string | null;
}

/** SHA-256 hex digest. Must match the MCP's `hashApiKey` so tokens resolve. */
export function hashToken(plaintext: string): string {
	return createHash('sha256').update(plaintext).digest('hex');
}

/**
 * Find-or-create an account by email and return its id. Used by the checkout
 * webhook (email comes from the Lemon Squeezy payload) and by session
 * resolution. Returns `null` if the Platform is not configured.
 */
export async function upsertAccount(email: string): Promise<PlatformAccount | null> {
	const client = getServiceClient();
	if (!client) {
		console.warn('[platform] upsertAccount skipped: Supabase env not configured');
		return null;
	}

	const normalizedEmail = email.trim().toLowerCase();
	const { data, error } = await client
		.from('accounts')
		.upsert({ email: normalizedEmail }, { onConflict: 'email' })
		.select('id, email')
		.single();

	if (error || !data) {
		console.error('[platform] upsertAccount failed:', error?.message);
		return null;
	}
	return { id: data.id as string, email: data.email as string };
}

/**
 * Upsert an account and its entitlement in one call. The entitlement row is
 * keyed by account_id (one entitlement per account), so this is idempotent at
 * the account level. Returns the resolved account, or `null` on failure / when
 * the Platform is not configured.
 *
 * TODO(platform): add event-level idempotency. The webhook should record the
 * Lemon Squeezy event id (e.g. in a `processed_webhook_events` table) and skip
 * already-applied events so provider retries don't flip state unexpectedly.
 */
export async function upsertAccountEntitlement(
	input: EntitlementUpsert
): Promise<PlatformAccount | null> {
	const client = getServiceClient();
	if (!client) {
		console.warn('[platform] upsertAccountEntitlement skipped: Supabase env not configured');
		return null;
	}

	const account = await upsertAccount(input.email);
	if (!account) return null;

	const { error } = await client.from('entitlements').upsert(
		{
			account_id: account.id,
			plan: input.plan,
			source: input.source ?? null,
			lemonsqueezy_order_id: input.lemonsqueezyOrderId ?? null,
			lemonsqueezy_subscription_id: input.lemonsqueezySubscriptionId ?? null,
			status: input.status ?? null,
		},
		{ onConflict: 'account_id' }
	);

	if (error) {
		console.error('[platform] entitlement upsert failed:', error.message);
		return null;
	}
	return account;
}

/** Look up an account's plan. Defaults to 'free' when no row exists. */
export async function getPlanForAccount(accountId: string): Promise<Plan> {
	const client = getServiceClient();
	if (!client) return 'free';

	const { data, error } = await client
		.from('entitlements')
		.select('plan')
		.eq('account_id', accountId)
		.maybeSingle();

	if (error || !data) return 'free';
	return (data.plan as Plan) === 'pro' ? 'pro' : 'free';
}

/**
 * Resolve the current browser session to a Platform account.
 *
 * The `marmo_session` cookie carries the Supabase Auth access token; we verify
 * it with the service client (`auth.getUser`) to obtain the signed-in user's
 * email, then find-or-create the matching account. Returns `null` when the
 * Platform is not configured, no session cookie is present, or the token is
 * invalid/expired.
 *
 * TODO(platform): once the docs site adopts `@supabase/ssr`, read the official
 * Supabase auth cookies instead of a single opaque `marmo_session` value.
 */
export async function resolveSessionAccount(): Promise<PlatformAccount | null> {
	const client = getServiceClient();
	if (!client) return null;

	const store = await cookies();
	const accessToken = store.get(SESSION_COOKIE)?.value;
	if (!accessToken) return null;

	const { data, error } = await client.auth.getUser(accessToken);
	if (error || !data.user?.email) return null;

	return upsertAccount(data.user.email);
}

/** Token prefix so keys are recognizable in logs/config without being secret. */
const TOKEN_PREFIX = 'marmo_live_';

/**
 * Generate a new MCP token for an account, store only its SHA-256 hash, and
 * return the plaintext exactly once. Returns `null` when the Platform is not
 * configured (the token can't be persisted, so issuing it would be a lie).
 */
export async function issueMcpToken(accountId: string): Promise<string | null> {
	const client = getServiceClient();
	if (!client) {
		console.warn('[platform] issueMcpToken skipped: Supabase env not configured');
		return null;
	}

	const plaintext = `${TOKEN_PREFIX}${randomBytes(32).toString('hex')}`;
	const { error } = await client.from('mcp_tokens').insert({
		account_id: accountId,
		token_hash: hashToken(plaintext),
	});

	if (error) {
		console.error('[platform] issueMcpToken failed:', error.message);
		return null;
	}
	return plaintext;
}

export interface ResolvedToken {
	account: PlatformAccount;
	plan: Plan;
}

/**
 * Resolve an incoming MCP Bearer token to its account + entitlement. Hashes the
 * plaintext and looks up a non-revoked `mcp_tokens` row, then reads the plan.
 * Best-effort updates `last_used_at`. Returns `null` if unknown/revoked or the
 * Platform is not configured.
 */
export async function resolveAccountByMcpToken(token: string): Promise<ResolvedToken | null> {
	const client = getServiceClient();
	if (!client) return null;

	const { data: tokenRow, error } = await client
		.from('mcp_tokens')
		.select('id, account_id, revoked, accounts(id, email)')
		.eq('token_hash', hashToken(token))
		.maybeSingle();

	if (error || !tokenRow || tokenRow.revoked) return null;

	// `accounts(...)` is returned as an array by the join; take the first.
	const accountRel = tokenRow.accounts as
		| { id: string; email: string }
		| Array<{ id: string; email: string }>
		| null;
	const accountData = Array.isArray(accountRel) ? accountRel[0] : accountRel;
	if (!accountData) return null;

	// Best-effort touch; ignore failures.
	await client
		.from('mcp_tokens')
		.update({ last_used_at: new Date().toISOString() })
		.eq('id', tokenRow.id as string);

	const plan = await getPlanForAccount(accountData.id);
	return { account: { id: accountData.id, email: accountData.email }, plan };
}

// Re-export for callers that want to branch on configuration.
export { isPlatformConfigured };
