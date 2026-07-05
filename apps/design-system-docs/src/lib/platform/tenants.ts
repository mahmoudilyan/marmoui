import 'server-only';
import { getServiceClient } from './supabase';
import type { TenantTokens } from '@/lib/tenant-theme';

/**
 * Tenant data access (Tenant Docs Sites — one Tenant per Account).
 * Table shape: marmo-platform migration 0005_tenants.sql.
 */

export interface Tenant {
	id: string;
	accountId: string;
	slug: string;
	name: string;
	tokens: TenantTokens;
}

const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/;
/** Reserved path segments that can never be tenant slugs. */
const RESERVED = new Set(['docs', 'api', 'connect', 'pricing', 'updates', 'welcome', 'signin', 'unlock', 'components', 'auth', 'admin', 'marmo']);

export function isValidSlug(slug: string): boolean {
	return SLUG_PATTERN.test(slug) && !RESERVED.has(slug);
}

function rowToTenant(row: Record<string, unknown>): Tenant {
	return {
		id: row.id as string,
		accountId: row.account_id as string,
		slug: row.slug as string,
		name: row.name as string,
		tokens: (row.tokens ?? {}) as TenantTokens,
	};
}

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
	const client = getServiceClient();
	if (!client || !SLUG_PATTERN.test(slug)) return null;

	const { data, error } = await client
		.from('tenants')
		.select('id, account_id, slug, name, tokens')
		.eq('slug', slug)
		.maybeSingle();
	if (error || !data) return null;
	return rowToTenant(data);
}

export async function getTenantForAccount(accountId: string): Promise<Tenant | null> {
	const client = getServiceClient();
	if (!client) return null;

	const { data, error } = await client
		.from('tenants')
		.select('id, account_id, slug, name, tokens')
		.eq('account_id', accountId)
		.maybeSingle();
	if (error || !data) return null;
	return rowToTenant(data);
}

export interface TenantUpsert {
	accountId: string;
	slug: string;
	name: string;
	tokens: TenantTokens;
}

export type TenantUpsertResult =
	| { ok: true; tenant: Tenant }
	| { ok: false; error: 'invalid-slug' | 'slug-taken' | 'not-configured' | 'failed' };

export async function upsertTenantForAccount(input: TenantUpsert): Promise<TenantUpsertResult> {
	const client = getServiceClient();
	if (!client) return { ok: false, error: 'not-configured' };
	if (!isValidSlug(input.slug)) return { ok: false, error: 'invalid-slug' };

	// Slug collision with a different account?
	const existing = await getTenantBySlug(input.slug);
	if (existing && existing.accountId !== input.accountId) {
		return { ok: false, error: 'slug-taken' };
	}

	const { data, error } = await client
		.from('tenants')
		.upsert(
			{
				account_id: input.accountId,
				slug: input.slug,
				name: input.name,
				tokens: input.tokens,
				updated_at: new Date().toISOString(),
			},
			{ onConflict: 'account_id' }
		)
		.select('id, account_id, slug, name, tokens')
		.single();

	if (error || !data) {
		console.error('[platform] tenant upsert failed:', error?.message);
		return { ok: false, error: 'failed' };
	}
	return { ok: true, tenant: rowToTenant(data) };
}
