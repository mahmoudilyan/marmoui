import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MdKey } from 'react-icons/md';
import siteConfig from '@/../site.config';
import { getEntitlement } from '@/lib/entitlement';
import { upsertAccount } from '@/lib/platform/entitlements';
import { createAuthCode, getClient } from '@/lib/platform/oauth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: `Authorize — ${siteConfig.title}`,
	robots: { index: false, follow: false },
};

type Search = {
	client_id?: string;
	redirect_uri?: string;
	response_type?: string;
	code_challenge?: string;
	code_challenge_method?: string;
	state?: string;
	scope?: string;
};

/**
 * OAuth consent page for MCP clients. Signed-out users detour through the
 * magic-link sign-in and come back here; approving mints an auth code and
 * returns to the client's redirect_uri. Free accounts work — the token's
 * plan tiering happens at the MCP.
 */
export default async function AuthorizePage({
	searchParams,
}: {
	searchParams: Promise<Search>;
}) {
	const params = await searchParams;
	const { client_id, redirect_uri, response_type, code_challenge, code_challenge_method, state } =
		params;

	const fail = (msg: string) => (
		<Shell>
			<h1 className="text-xl font-semibold text-ink">Can&apos;t authorize</h1>
			<p className="mt-2 text-sm text-ink-light">{msg}</p>
		</Shell>
	);

	if (!client_id || !redirect_uri || !code_challenge) return fail('The authorization request is missing required parameters.');
	if (response_type !== 'code') return fail('Only response_type=code is supported.');
	if (code_challenge_method && code_challenge_method !== 'S256') return fail('Only S256 PKCE is supported.');

	const client = await getClient(client_id);
	if (!client) return fail('Unknown client. The application must register first.');
	if (!client.redirectUris.includes(redirect_uri)) return fail('The redirect URI is not registered for this client.');

	const { authenticated, email, plan } = await getEntitlement();
	if (!authenticated || !email) {
		const here = `/oauth/authorize?${new URLSearchParams(
			Object.entries(params).filter(([, v]) => typeof v === 'string') as [string, string][]
		).toString()}`;
		redirect(`/signin?next=${encodeURIComponent(here)}`);
	}

	async function approve() {
		'use server';
		const { authenticated: ok, email: authedEmail } = await getEntitlement();
		if (!ok || !authedEmail) redirect('/signin');
		const account = await upsertAccount(authedEmail!);
		if (!account) redirect(`${redirect_uri}?error=server_error${state ? `&state=${encodeURIComponent(state)}` : ''}`);
		const code = await createAuthCode({
			clientId: client_id!,
			accountId: account!.id,
			redirectUri: redirect_uri!,
			codeChallenge: code_challenge!,
		});
		if (!code) redirect(`${redirect_uri}?error=server_error${state ? `&state=${encodeURIComponent(state)}` : ''}`);
		const sep = redirect_uri!.includes('?') ? '&' : '?';
		redirect(`${redirect_uri}${sep}code=${code}${state ? `&state=${encodeURIComponent(state)}` : ''}`);
	}

	async function deny() {
		'use server';
		const sep = redirect_uri!.includes('?') ? '&' : '?';
		redirect(`${redirect_uri}${sep}error=access_denied${state ? `&state=${encodeURIComponent(state)}` : ''}`);
	}

	return (
		<Shell>
			<div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-ink">
				<MdKey className="h-5 w-5" aria-hidden />
			</div>
			<h1 className="text-xl font-semibold tracking-tight text-ink">
				Connect {client.clientName || 'this MCP client'} to Marmo
			</h1>
			<p className="mt-2 text-sm text-ink-light">
				Signed in as <span className="font-medium text-ink">{email}</span> ({plan}). The client
				gets a personal MCP token: live component APIs, patterns list, and validation
				{plan === 'pro' ? ', plus your on-brand generation.' : '. Pro adds your brand on top.'}
			</p>
			<ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-light">
				<li>Reads the Marmo design-system knowledge on your behalf</li>
				<li>Never sees your email password — there isn&apos;t one</li>
				<li>Revocable anytime from your account</li>
			</ul>
			<div className="mt-8 flex gap-3">
				<form action={approve}>
					<button
						type="submit"
						className="inline-flex h-11 items-center rounded-md bg-[#141422] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
					>
						Allow
					</button>
				</form>
				<form action={deny}>
					<button
						type="submit"
						className="inline-flex h-11 items-center rounded-md border border-border bg-white px-6 text-sm font-medium text-ink transition-colors hover:bg-panel"
					>
						Deny
					</button>
				</form>
			</div>
			<p className="mt-6 text-xs text-ink-muted">
				Wrong account?{' '}
				<Link href="/account" className="font-medium text-primary hover:underline">
					Manage account
				</Link>
			</p>
		</Shell>
	);
}

function Shell({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-bg">
			<main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
				{children}
			</main>
		</div>
	);
}
