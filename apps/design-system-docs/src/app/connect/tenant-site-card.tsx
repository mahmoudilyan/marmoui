'use client';

import * as React from 'react';
import Link from 'next/link';
import { MdCheckCircle, MdOpenInNew } from 'react-icons/md';

type Status = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Pro-only card on /connect: claim a slug + paste DESIGN.md → the tenant's
 * hosted design-system site goes live at /t/<slug> (members only).
 */
export function TenantSiteCard({
	initialSlug,
	initialName,
}: {
	initialSlug?: string;
	initialName?: string;
}) {
	const [slug, setSlug] = React.useState(initialSlug ?? '');
	const [designMd, setDesignMd] = React.useState('');
	const [status, setStatus] = React.useState<Status>('idle');
	const [message, setMessage] = React.useState<string | null>(null);
	const [liveUrl, setLiveUrl] = React.useState<string | null>(initialSlug ? `/t/${initialSlug}` : null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus('saving');
		setMessage(null);

		const res = await fetch('/api/tenant', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ slug: slug.trim().toLowerCase(), designMd }),
		});

		if (!res.ok) {
			const data = (await res.json().catch(() => ({}))) as { error?: string };
			setStatus('error');
			setMessage(
				data.error === 'slug-taken'
					? 'That slug is taken — pick another.'
					: data.error === 'invalid-slug'
						? 'Slugs are 2–40 chars: lowercase letters, numbers, hyphens.'
						: 'Could not save. Try again.'
			);
			return;
		}

		const data = (await res.json()) as { url: string };
		setLiveUrl(data.url);
		setStatus('saved');
	}

	return (
		<div className="rounded-xl border border-border bg-panel p-6">
			<h2 className="text-base font-semibold text-ink">Your design-system site</h2>
			<p className="mt-1 text-sm text-ink-light">
				The Marmo component library rendered in <em>your</em> tokens, hosted for your team
				{initialName ? <> ({initialName})</> : null}. Paste your DESIGN.md — the frontmatter
				drives the theme.
			</p>

			<form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
				<div>
					<label htmlFor="tenant-slug" className="mb-1 block text-sm font-medium text-ink">
						Site address
					</label>
					<div className="flex items-center gap-1.5">
						<span className="text-sm text-ink-muted">marmoui.com/t/</span>
						<input
							id="tenant-slug"
							type="text"
							required
							value={slug}
							onChange={e => setSlug(e.target.value)}
							placeholder="acme"
							pattern="[a-z0-9][a-z0-9-]*"
							className="h-10 w-40 rounded-md border border-border bg-white px-3 font-mono text-sm text-ink-dark outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
						/>
					</div>
				</div>
				<div>
					<label htmlFor="tenant-designmd" className="mb-1 block text-sm font-medium text-ink">
						DESIGN.md
					</label>
					<textarea
						id="tenant-designmd"
						value={designMd}
						onChange={e => setDesignMd(e.target.value)}
						rows={7}
						placeholder={`---\nname: Acme\ncolors:\n  primary: "#B8422E"\nrounded:\n  md: 8px\n---`}
						className="w-full rounded-md border border-border bg-white px-3 py-2 font-mono text-[12px] leading-relaxed text-ink-dark outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
					/>
					<p className="mt-1 text-xs text-ink-muted">
						No file yet? Run <code className="font-mono">/marmo-ui:init</code> in Claude Code, or
						see the <Link href="/docs/tools/design-md" className="text-primary-600 hover:underline">schema</Link>.
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<button
						type="submit"
						disabled={status === 'saving'}
						className="inline-flex h-10 items-center rounded-md bg-[#141422] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
					>
						{status === 'saving' ? 'Publishing…' : liveUrl ? 'Update site' : 'Publish site'}
					</button>
					{liveUrl ? (
						<Link
							href={liveUrl}
							className="inline-flex h-10 items-center gap-1.5 rounded-md border border-border bg-white px-4 text-sm font-medium text-ink transition-colors hover:bg-secondary"
						>
							Open {liveUrl}
							<MdOpenInNew className="size-3.5" aria-hidden />
						</Link>
					) : null}
				</div>
				{status === 'saved' ? (
					<p className="flex items-center gap-1.5 text-sm text-emerald-700">
						<MdCheckCircle className="size-4" aria-hidden /> Live — your team can sign in and browse it.
					</p>
				) : null}
				{status === 'error' && message ? (
					<p className="text-sm text-red-600" role="alert">
						{message}
					</p>
				) : null}
			</form>
		</div>
	);
}
