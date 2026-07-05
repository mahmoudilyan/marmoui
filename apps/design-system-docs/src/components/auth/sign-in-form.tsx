'use client';

import * as React from 'react';
import { MdMailOutline, MdCheckCircle } from 'react-icons/md';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Magic-link sign-in. Sends a Supabase OTP email; the link lands on
 * /auth/confirm which sets the session cookies. Buyers must use the email
 * they paid with — the checkout webhook keyed their entitlement to it.
 */
export function SignInForm({ next = '/welcome' }: { next?: string }) {
	const [email, setEmail] = React.useState('');
	const [status, setStatus] = React.useState<Status>('idle');
	const [message, setMessage] = React.useState<string | null>(null);

	const supabase = React.useMemo(() => getSupabaseBrowserClient(), []);

	if (!supabase) {
		return (
			<div className="rounded-xl border border-border bg-panel p-5 text-sm text-ink-light">
				Sign-in isn&apos;t configured in this environment
				(<code className="font-mono text-[12px]">NEXT_PUBLIC_SUPABASE_URL</code> unset).
			</div>
		);
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus('sending');
		setMessage(null);

		const { error } = await supabase!.auth.signInWithOtp({
			email: email.trim().toLowerCase(),
			options: {
				emailRedirectTo: `${window.location.origin}${next}`,
			},
		});

		if (error) {
			setStatus('error');
			setMessage(error.message);
			return;
		}
		setStatus('sent');
	}

	if (status === 'sent') {
		return (
			<div className="flex items-start gap-3 rounded-xl border border-border bg-panel p-5">
				<MdCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
				<div>
					<p className="text-sm font-medium text-ink">Check your inbox</p>
					<p className="mt-1 text-sm text-ink-light">
						We sent a sign-in link to <span className="font-medium text-ink">{email}</span>. Open
						it on this device to finish signing in.
					</p>
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3">
			<label htmlFor="signin-email" className="text-sm font-medium text-ink">
				Email
			</label>
			<div className="flex gap-2 max-sm:flex-col">
				<div className="relative flex-1">
					<MdMailOutline
						className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
						aria-hidden
					/>
					<input
						id="signin-email"
						type="email"
						required
						autoComplete="email"
						placeholder="you@company.com"
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="h-11 w-full rounded-md border border-border bg-white pl-9 pr-3 text-sm text-ink-dark outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
					/>
				</div>
				<button
					type="submit"
					disabled={status === 'sending'}
					className="inline-flex h-11 items-center justify-center rounded-md bg-[#141422] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
				>
					{status === 'sending' ? 'Sending…' : 'Send sign-in link'}
				</button>
			</div>
			<p className="text-xs text-ink-muted">
				Bought Pro? Use the same email you paid with — your upgrade is attached to it.
			</p>
			{status === 'error' && message ? (
				<p className="text-sm text-red-600" role="alert">
					{message}
				</p>
			) : null}
		</form>
	);
}
