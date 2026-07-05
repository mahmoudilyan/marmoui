'use client';

import * as React from 'react';
import { MdContentCopy, MdCheck, MdKey, MdWarningAmber } from 'react-icons/md';

const PLACEHOLDER = 'YOUR_MARMO_MCP_TOKEN';

type GenStatus = 'idle' | 'generating' | 'done' | 'error';

interface ConnectClientProps {
	mcpUrl: string;
}

/**
 * Pro-only client UI for generating and copying a personal MCP token, plus
 * ready-to-paste Cursor / Claude / Codex configuration. The token is shown once
 * (POST /api/mcp-token returns the plaintext a single time) and the config
 * blocks fall back to a placeholder until one is generated.
 *
 * The config shapes mirror `apps/design-system-mcp/src/tools/get-agent-connect-config.ts`.
 */
export function ConnectClient({ mcpUrl }: ConnectClientProps) {
	const [token, setToken] = React.useState('');
	const [status, setStatus] = React.useState<GenStatus>('idle');
	const [error, setError] = React.useState<string | null>(null);

	const key = token || PLACEHOLDER;

	const mcpJson = JSON.stringify(
		{
			mcpServers: {
				'marmo-ui': {
					url: mcpUrl,
					headers: { Authorization: `Bearer ${key}` },
				},
			},
		},
		null,
		2
	);

	const claudeEnv = `MARMO_MCP_TOKEN=${key}`;
	const codexCommand = `codex mcp add marmo-ui --url ${mcpUrl} --header "Authorization: Bearer ${key}"`;

	async function handleGenerate() {
		setStatus('generating');
		setError(null);
		try {
			const res = await fetch('/api/mcp-token', { method: 'POST' });
			const data = (await res.json().catch(() => ({}))) as { token?: string; error?: string };
			if (res.ok && data.token) {
				setToken(data.token);
				setStatus('done');
				return;
			}
			setStatus('error');
			setError(data.error ?? 'Could not generate a token. Please try again.');
		} catch {
			setStatus('error');
			setError('Something went wrong. Please try again.');
		}
	}

	return (
		<div className="flex flex-col gap-8">
			<section className="flex flex-col gap-3">
				<button
					type="button"
					onClick={handleGenerate}
					disabled={status === 'generating'}
					className="inline-flex h-10 w-fit items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
				>
					<MdKey className="h-4 w-4" />
					{status === 'generating'
						? 'Generating…'
						: token
							? 'Generate a new token'
							: 'Generate MCP token'}
				</button>

				{status === 'error' && error ? <p className="text-sm text-destructive">{error}</p> : null}

				{token ? (
					<div className="flex flex-col gap-2">
						<div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-amber-700 dark:text-amber-400">
							<MdWarningAmber className="mt-0.5 h-4 w-4 shrink-0" />
							<p className="text-xs">
								Copy this token now — it&apos;s shown only once and can&apos;t be retrieved later.
								Generating a new token does not revoke previous ones.
							</p>
						</div>
						<CopyBlock label="Your MCP token" value={token} mono />
					</div>
				) : null}
			</section>

			<section className="flex flex-col gap-3">
				<div>
					<h2 className="text-sm font-semibold text-ink">Cursor</h2>
					<p className="mt-1 text-sm text-ink-light">
						Save as <code className="rounded bg-secondary px-1 py-0.5 text-xs">.cursor/mcp.json</code>{' '}
						in your project root, then restart Cursor.
					</p>
				</div>
				<CopyBlock label="Cursor config" value={mcpJson} />
			</section>

			<section className="flex flex-col gap-3">
				<div>
					<h2 className="text-sm font-semibold text-ink">Claude Code</h2>
					<p className="mt-1 text-sm text-ink-light">
						Save the same config as <code className="rounded bg-secondary px-1 py-0.5 text-xs">.mcp.json</code>,
						or set the token as an environment variable for the marmo-ui plugin.
					</p>
				</div>
				<CopyBlock label="Claude config" value={mcpJson} />
				<CopyBlock label="Claude env var" value={claudeEnv} mono />
			</section>

			<section className="flex flex-col gap-3">
				<div>
					<h2 className="text-sm font-semibold text-ink">Codex</h2>
					<p className="mt-1 text-sm text-ink-light">Run this command in your project:</p>
				</div>
				<CopyBlock label="Codex command" value={codexCommand} mono />
			</section>
		</div>
	);
}

function CopyBlock({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
	const [copied, setCopied] = React.useState(false);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard unavailable; ignore */
		}
	}

	return (
		<div className="relative rounded-lg border border-border bg-panel">
			<div className="flex items-center justify-between border-b border-border px-3 py-2">
				<span className="text-xs font-medium text-ink-light">{label}</span>
				<button
					type="button"
					onClick={handleCopy}
					className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-ink-light transition-colors hover:bg-secondary hover:text-ink"
				>
					{copied ? <MdCheck className="h-3.5 w-3.5" /> : <MdContentCopy className="h-3.5 w-3.5" />}
					{copied ? 'Copied' : 'Copy'}
				</button>
			</div>
			<pre
				className={`overflow-x-auto p-3 text-xs text-ink ${mono ? 'font-mono' : ''}`}
			>
				<code>{value}</code>
			</pre>
		</div>
	);
}
