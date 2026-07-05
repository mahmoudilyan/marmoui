import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import siteConfig from '@/../site.config';
import { getEntitlement } from '@/lib/entitlement';
import { SignInForm } from '@/components/auth/sign-in-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: `Sign in — ${siteConfig.title}`,
	description: 'Sign in to Marmo UI with a magic link.',
};

export default async function SignInPage() {
	const { authenticated } = await getEntitlement();
	if (authenticated) redirect('/welcome');

	return (
		<div className="bg-bg">
			<main className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col justify-center px-6 py-16">
				<h1 className="text-2xl font-semibold tracking-tight text-ink">Sign in</h1>
				<p className="mt-2 text-sm text-ink-light">
					We&apos;ll email you a magic link — no password.
				</p>
				<div className="mt-8">
					<SignInForm next="/welcome" />
				</div>
			</main>
		</div>
	);
}
