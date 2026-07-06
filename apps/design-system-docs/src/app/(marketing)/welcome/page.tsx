import type { Metadata } from 'next';
import Link from 'next/link';
import { MdAutoAwesome, MdCheckCircle, MdHourglassEmpty } from 'react-icons/md';
import siteConfig from '@/../site.config';
import { getEntitlement } from '@/lib/entitlement';
import { SignInForm } from '@/components/auth/sign-in-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: `Welcome — ${siteConfig.title}`,
	description: 'Finish setting up your Marmo UI account.',
};

const errorMessages: Record<string, string> = {
	'missing-token': 'That sign-in link is incomplete. Request a new one below.',
	'invalid-or-expired': 'That sign-in link is invalid or has expired. Request a new one below.',
	'auth-not-configured': 'Sign-in is not configured in this environment.',
};

/**
 * /welcome — post-checkout landing and general sign-in destination.
 *
 * LemonSqueezy redirects buyers here after payment. By the time they arrive,
 * the webhook has usually already written their Pro entitlement (keyed by the
 * checkout email) — signing in with that email completes the upgrade with no
 * license key involved.
 */
export default async function WelcomePage({
	searchParams,
}: {
	searchParams: Promise<{ error?: string }>;
}) {
	const { error } = await searchParams;
	const { authenticated, plan, email } = await getEntitlement();

	return (
		<div className="bg-bg">
			<main className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col justify-center px-6 py-16">
				{authenticated && plan === 'pro' ? (
					<>
						<div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
							<MdCheckCircle className="h-5 w-5" aria-hidden />
						</div>
						<h1 className="text-2xl font-semibold tracking-tight text-ink">You&apos;re Pro 🎉</h1>
						<p className="mt-2 text-sm text-ink-light">
							{email ? (
								<>
									Signed in as <span className="font-medium text-ink">{email}</span>.{' '}
								</>
							) : null}
							On-brand generation, patterns, and Pro docs are unlocked. Next step: mint your
							personal MCP token so every agent you use gets your style.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href={siteConfig.connectUrl}
								className="inline-flex h-11 items-center rounded-md bg-[#141422] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
							>
								Get your MCP token
							</Link>
							<Link
								href="/docs/tools/design-md"
								className="inline-flex h-11 items-center rounded-md border border-border bg-white px-5 text-sm font-medium text-ink transition-colors hover:bg-panel"
							>
								Set up DESIGN.md
							</Link>
							<Link
								href="/account"
								className="inline-flex h-11 items-center rounded-md border border-border bg-white px-5 text-sm font-medium text-ink transition-colors hover:bg-panel"
							>
								Account
							</Link>
						</div>
					</>
				) : authenticated ? (
					<>
						<div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-ink">
							<MdHourglassEmpty className="h-5 w-5" aria-hidden />
						</div>
						<h1 className="text-2xl font-semibold tracking-tight text-ink">
							Signed in — no Pro purchase found yet
						</h1>
						<p className="mt-2 text-sm text-ink-light">
							You&apos;re signed in{email ? (
								<>
									{' '}as <span className="font-medium text-ink">{email}</span>
								</>
							) : null}
							, but this email has no Pro entitlement. Two common reasons:
						</p>
						<ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-light">
							<li>
								<strong className="text-ink">Payment still processing</strong> — the checkout
								webhook usually lands within seconds. Refresh this page in a moment.
							</li>
							<li>
								<strong className="text-ink">Different email at checkout</strong> — sign in with
								the exact email you used to pay, or contact support to re-link it.
							</li>
						</ul>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href={siteConfig.pricingUrl}
								className="inline-flex h-11 items-center rounded-md bg-[#141422] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
							>
								Get Pro
							</Link>
							<form action="/api/auth/signout" method="post">
								<button
									type="submit"
									className="inline-flex h-11 items-center rounded-md border border-border bg-white px-5 text-sm font-medium text-ink transition-colors hover:bg-panel"
								>
									Sign out
								</button>
							</form>
						</div>
					</>
				) : (
					<>
						<div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-ink">
							<MdAutoAwesome className="h-5 w-5" aria-hidden />
						</div>
						<h1 className="text-2xl font-semibold tracking-tight text-ink">Welcome to Marmo</h1>
						<p className="mt-2 text-sm text-ink-light">
							Just bought Pro? Sign in with the email you paid with — your upgrade is already
							attached to it. No license key needed.
						</p>
						{error && errorMessages[error] ? (
							<p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="alert">
								{errorMessages[error]}
							</p>
						) : null}
						<div className="mt-8">
							<SignInForm next="/welcome" />
						</div>
					</>
				)}
			</main>
		</div>
	);
}
