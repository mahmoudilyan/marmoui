'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MdLock, MdCheckCircle } from 'react-icons/md';
import { BuyProButton } from '@/components/buy-pro-button';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function UnlockPage() {
	const router = useRouter();
	const [key, setKey] = React.useState('');
	const [status, setStatus] = React.useState<Status>('idle');
	const [message, setMessage] = React.useState<string | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus('submitting');
		setMessage(null);

		try {
			const res = await fetch('/api/unlock', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ key }),
			});

			if (res.ok) {
				setStatus('success');
				setMessage('Unlocked. Pro code is now visible across the docs.');
				router.refresh();
				return;
			}

			setStatus('error');
			setMessage("That key wasn't recognized. Check it and try again.");
		} catch {
			setStatus('error');
			setMessage('Something went wrong. Please try again.');
		}
	}

	return (
		<main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
			<div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-ink">
				<MdLock className="h-5 w-5" />
			</div>

			<h1 className="text-2xl font-semibold tracking-tight text-ink">Unlock Pro</h1>
			<p className="mt-2 text-sm text-ink-light">
				Pro gives you the full source code for every Marmo UI pattern. Enter your license key
				to unlock the code in your browser.
			</p>

			{status === 'success' ? (
				<div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-panel p-4">
					<MdCheckCircle className="mt-0.5 h-5 w-5 text-primary" />
					<div>
						<p className="text-sm font-medium text-ink">You&apos;re all set</p>
						<p className="mt-1 text-sm text-ink-light">{message}</p>
					</div>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
					<label htmlFor="license-key" className="text-sm font-medium text-ink">
						License key
					</label>
					<input
						id="license-key"
						name="key"
						type="text"
						autoComplete="off"
						value={key}
						onChange={event => setKey(event.target.value)}
						placeholder="marmo_xxxxxxxxxxxx"
						className="h-10 rounded-md border border-border bg-bg px-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-light/60 focus-visible:border-ink/40"
						required
					/>

					{status === 'error' && message ? (
						<p className="text-sm text-destructive">{message}</p>
					) : null}

					<button
						type="submit"
						disabled={status === 'submitting' || key.trim().length === 0}
						className="mt-1 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
					>
						{status === 'submitting' ? 'Unlocking…' : 'Unlock'}
					</button>
				</form>
			)}

			<p className="mt-6 text-sm text-ink-light">
				Don&apos;t have a license yet?{' '}
				<BuyProButton unstyled className="font-medium text-ink underline underline-offset-4">
					Get Pro
				</BuyProButton>
			</p>
		</main>
	);
}
