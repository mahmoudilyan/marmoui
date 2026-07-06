import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { getServiceClient } from './supabase';

/**
 * Minimal OAuth 2.1 authorization-server backing for MCP clients (RFC 8414
 * metadata + dynamic client registration + authorization-code w/ PKCE).
 * Access tokens are the same personal MCP tokens `/connect` mints, so the
 * MCP's existing resolve-tenant path needs no changes.
 */

const CODE_TTL_MS = 10 * 60 * 1000;

export interface OAuthClient {
	clientId: string;
	clientName: string;
	redirectUris: string[];
}

function allowedRedirect(uri: string): boolean {
	try {
		const u = new URL(uri);
		// Local loopback (Claude Code, other CLIs) or HTTPS callbacks only.
		if (u.hostname === '127.0.0.1' || u.hostname === 'localhost') return true;
		return u.protocol === 'https:';
	} catch {
		return false;
	}
}

export async function registerClient(input: {
	clientName?: string;
	redirectUris: string[];
}): Promise<OAuthClient | null> {
	const client = getServiceClient();
	if (!client) return null;
	const uris = input.redirectUris.filter(allowedRedirect);
	if (uris.length === 0) return null;

	const { data, error } = await client
		.from('oauth_clients')
		.insert({ client_name: input.clientName ?? 'MCP client', redirect_uris: uris })
		.select('client_id, client_name, redirect_uris')
		.single();
	if (error || !data) return null;
	return {
		clientId: data.client_id as string,
		clientName: data.client_name as string,
		redirectUris: data.redirect_uris as string[],
	};
}

export async function getClient(clientId: string): Promise<OAuthClient | null> {
	const client = getServiceClient();
	if (!client || !/^[0-9a-f-]{36}$/i.test(clientId)) return null;
	const { data, error } = await client
		.from('oauth_clients')
		.select('client_id, client_name, redirect_uris')
		.eq('client_id', clientId)
		.maybeSingle();
	if (error || !data) return null;
	return {
		clientId: data.client_id as string,
		clientName: data.client_name as string,
		redirectUris: data.redirect_uris as string[],
	};
}

export async function createAuthCode(input: {
	clientId: string;
	accountId: string;
	redirectUri: string;
	codeChallenge: string;
}): Promise<string | null> {
	const client = getServiceClient();
	if (!client) return null;
	const code = `mac_${randomBytes(32).toString('hex')}`;
	const { error } = await client.from('oauth_codes').insert({
		code,
		client_id: input.clientId,
		account_id: input.accountId,
		redirect_uri: input.redirectUri,
		code_challenge: input.codeChallenge,
		expires_at: new Date(Date.now() + CODE_TTL_MS).toISOString(),
	});
	return error ? null : code;
}

/** Verify + consume a code (single use). Returns the account id or null. */
export async function redeemAuthCode(input: {
	code: string;
	clientId: string;
	redirectUri: string;
	codeVerifier: string;
}): Promise<string | null> {
	const client = getServiceClient();
	if (!client) return null;

	const { data, error } = await client
		.from('oauth_codes')
		.select('code, client_id, account_id, redirect_uri, code_challenge, expires_at, used')
		.eq('code', input.code)
		.maybeSingle();
	if (error || !data || data.used) return null;
	if (new Date(data.expires_at as string).getTime() < Date.now()) return null;
	if ((data.client_id as string) !== input.clientId) return null;
	if ((data.redirect_uri as string) !== input.redirectUri) return null;

	const digest = createHash('sha256').update(input.codeVerifier).digest('base64url');
	if (digest !== (data.code_challenge as string)) return null;

	// Mark used before minting so a race can't redeem twice.
	const { error: updateError } = await client
		.from('oauth_codes')
		.update({ used: true })
		.eq('code', input.code)
		.eq('used', false);
	if (updateError) return null;

	return data.account_id as string;
}
