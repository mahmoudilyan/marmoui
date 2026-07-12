import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '@/../site.config';
import { sanityConfigured } from '@/sanity/client';
import { getArticles } from '@/sanity/queries';

export const metadata: Metadata = {
	title: `Blog — ${siteConfig.title}`,
	description:
		'Guides and comparisons for building UI with Marmo UI — component-by-component looks at alternatives, and how AI agents fit into the design system workflow.',
	alternates: { canonical: '/blog' },
};

export const revalidate = 300;

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default async function BlogPage() {
	const articles = await getArticles();

	const itemListLd = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Marmo UI Blog',
		itemListElement: articles.map((article, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: article.title,
			url: `https://www.marmoui.com/blog/${article.slug}`,
		})),
	};

	return (
		<div className="bg-bg">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
			/>
			<div className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-24">
				<p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-[16px] font-semibold text-primary tracking-[-0.32px]">
					Blog
				</p>
				<h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] font-bold text-ink-dark tracking-[-1.2px] leading-[1.1]">
					Guides &amp; comparisons
				</h1>
				<p className="mt-4 text-[17px] leading-relaxed text-ink-light">
					Component-by-component looks at alternatives, and how AI agents fit into the design
					system workflow.
				</p>

				<div className="mt-14">
					{articles.length === 0 ? (
						<div className="rounded-[12px] border border-border-secondary bg-panel px-8 py-12 text-center">
							<p className="text-[15px] text-ink-light">
								{sanityConfigured
									? 'No articles published yet — check back soon.'
									: 'Articles are served from Sanity. Set NEXT_PUBLIC_SANITY_PROJECT_ID to connect the CMS.'}
							</p>
						</div>
					) : (
						<ul className="divide-y divide-border-secondary">
							{articles.map(article => (
								<li key={article.slug} className="py-8 first:pt-0">
									<article>
										<time className="text-[13px] font-medium text-ink-muted" dateTime={article.publishedAt}>
											{formatDate(article.publishedAt)}
										</time>
										<h2 className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-semibold tracking-[-0.55px]">
											<Link
												href={`/blog/${article.slug}`}
												className="text-ink-dark transition-colors hover:text-primary"
											>
												{article.title}
											</Link>
										</h2>
										{article.excerpt ? (
											<p className="mt-2 text-[15px] leading-relaxed text-ink-light">{article.excerpt}</p>
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
