import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '@/../site.config';
import { sanityConfigured } from '@/sanity/client';
import { getPosts } from '@/sanity/queries';

export const metadata: Metadata = {
	title: `Updates — ${siteConfig.title}`,
	description: 'Product updates, new components, and MCP knowledge-base changes.',
};

export const revalidate = 300;

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default async function UpdatesPage() {
	const posts = await getPosts();

	return (
		<div className="bg-bg">
			<div className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-24">
				<p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-[16px] font-semibold text-primary tracking-[-0.32px]">
					Updates
				</p>
				<h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-ink-dark tracking-[-1.2px] leading-[1.1]">
					What&apos;s new in Marmo
				</h1>
				<p className="mt-4 text-[17px] leading-relaxed text-ink-light">
					New components, pattern releases, and MCP knowledge-base changes. Your connected agent
					picks these up automatically — this page is for the humans.
				</p>

				<div className="mt-14">
					{posts.length === 0 ? (
						<div className="rounded-[12px] border border-border-secondary bg-panel px-8 py-12 text-center">
							<p className="text-[15px] text-ink-light">
								{sanityConfigured
									? 'No updates published yet — check back soon.'
									: 'Updates are served from Sanity. Set NEXT_PUBLIC_SANITY_PROJECT_ID to connect the CMS (see sanity/README.md).'}
							</p>
						</div>
					) : (
						<ul className="divide-y divide-border-secondary">
							{posts.map(post => (
								<li key={post.slug} className="py-8 first:pt-0">
									<article>
										<time className="text-[13px] font-medium text-ink-muted" dateTime={post.publishedAt}>
											{formatDate(post.publishedAt)}
										</time>
										<h2 className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-semibold tracking-[-0.55px]">
											<Link
												href={`/updates/${post.slug}`}
												className="text-ink-dark transition-colors hover:text-primary"
											>
												{post.title}
											</Link>
										</h2>
										{post.excerpt ? (
											<p className="mt-2 text-[15px] leading-relaxed text-ink-light">{post.excerpt}</p>
										) : null}
									</article>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
