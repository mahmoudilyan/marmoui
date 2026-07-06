import * as React from 'react';
import { MdLock, MdArrowForward } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/copy-button';
import { getIconForLanguageExtension } from '@/components/language-icons';
import { getEntitlement } from '@/lib/entitlement';
import { BuyProButton } from '@/components/buy-pro-button';

/**
 * ProCode — gated source code for Pro (paid) content.
 *
 * Renders a normal, syntax-highlighted code block for signed-in Pro users, and
 * a blurred "locked" preview with an upgrade CTA for everyone else. The code
 * string is still sent to the client in the locked state only as a blurred
 * teaser; for true server-only delivery use the `/api/pro-code/[id]` route.
 *
 * Usage in an MDX file (server component, so just drop it in):
 *
 *   import { ProCode } from '@/components/pro-code';
 *
 *   <ProCode lang="tsx" title="dashboard.tsx" code={`export function Dashboard() {
 *     return <div>...</div>;
 *   }`} />
 */
export interface ProCodeProps {
	/** Raw source code to display (highlighted when the viewer is Pro). */
	code: string;
	/** Language for syntax highlighting. @defaultValue 'tsx' */
	lang?: string;
	/** Optional filename/title shown in the header bar. */
	title?: string;
	className?: string;
}

export async function ProCode({ code, lang = 'tsx', title, className }: ProCodeProps) {
	const { plan } = await getEntitlement();

	if (plan === 'pro') {
		return <UnlockedCode code={code} lang={lang} title={title} className={className} />;
	}

	return <LockedCode code={code} lang={lang} title={title} className={className} />;
}

async function UnlockedCode({ code, lang, title, className }: Required<Pick<ProCodeProps, 'code' | 'lang'>> & Pick<ProCodeProps, 'title' | 'className'>) {
	const { codeToHtml } = await import('shiki');

	const html = await codeToHtml(code, {
		lang: lang === 'tsx' ? 'tsx' : lang === 'ts' ? 'typescript' : lang,
		themes: {
			light: 'light',
			dark: 'dark',
		},
	});

	return (
		<figure
			className={cn('shiki relative group bg-panel rounded-xl border border-border overflow-hidden my-4', className)}
		>
			{title && (
				<figcaption
					data-language={lang}
					className="flex items-center gap-2 border-b border-border bg-panel px-4 py-3 text-sm font-medium text-ink"
				>
					<span className="flex items-center gap-2">
						{getIconForLanguageExtension(lang)}
						{title}
					</span>
				</figcaption>
			)}
			<div className="absolute top-2 right-2 z-10">
				<CopyButton value={code} />
			</div>
			<div
				className="relative p-6 max-h-[450px] overflow-auto"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</figure>
	);
}

function LockedCode({ code, lang, title, className }: Required<Pick<ProCodeProps, 'code' | 'lang'>> & Pick<ProCodeProps, 'title' | 'className'>) {
	// Show a short, obscured teaser of the real code behind the blur.
	const teaser = code.split('\n').slice(0, 14).join('\n');

	return (
		<figure
			className={cn('relative rounded-xl border border-border bg-panel overflow-hidden my-4 not-prose', className)}
		>
			{title && (
				<figcaption
					data-language={lang}
					className="flex items-center gap-2 border-b border-border bg-panel px-4 py-3 text-sm font-medium text-ink"
				>
					<span className="flex items-center gap-2">
						{getIconForLanguageExtension(lang)}
						{title}
					</span>
				</figcaption>
			)}

			<div className="relative">
				<pre
					aria-hidden="true"
					className="m-0 select-none p-6 text-[13px] leading-relaxed text-ink-light blur-[6px] overflow-hidden max-h-[280px]"
				>
					{teaser}
				</pre>
				<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-panel/40 to-panel" />

				<div className="absolute inset-0 flex items-center justify-center p-6">
					<div className="pointer-events-auto w-full max-w-sm rounded-xl border border-border bg-bg/95 p-6 text-center shadow-lg backdrop-blur">
						<div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-ink">
							<MdLock className="h-5 w-5" />
						</div>
						<p className="text-sm font-semibold text-ink">This code is a Pro feature</p>
						<p className="mt-1 text-sm text-ink-light">
							Unlock the full source for every Marmo UI pattern with a Pro license.
						</p>
						<div className="mt-4 flex flex-col gap-2">
							<BuyProButton className="h-9 gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 hover:opacity-100">
								Unlock with Pro
								<MdArrowForward className="h-4 w-4" />
							</BuyProButton>
							<a
								href="/unlock"
								className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-ink-light transition-colors hover:text-ink"
							>
								Already paid? Sign in
							</a>
						</div>
					</div>
				</div>
			</div>
		</figure>
	);
}
