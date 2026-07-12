import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import siteConfig from '@/../site.config';
import { getArticle, getArticles } from '@/sanity/queries';

const SITE_URL = 'https://www.marmoui.com';

export const revalidate = 300;

type Params = { slug: string };

export async function generateStaticParams() {
	const articles = await getArticles();
	return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const article = await getArticle(slug);
	if (!article) notFound();

	const title = article.seoTitle || `${article.title} — ${siteConfig.title}`;
	const description = article.seoDescription || article.excerpt;
	const canonical = `/blog/${slug}`;

	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			title,
			description,
			url: `${SITE_URL}${canonical}`,
			type: 'article',
			publishedTime: article.publishedAt,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
	};
}

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
	const { slug } = await params;
	const article = await getArticle(slug);
	if (!article) notFound();

	const articleLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: article.title,
		description: article.excerpt || '',
		datePublished: article.publishedAt,
		dateModified: article.publishedAt,
		author: { '@type': 'Organization', name: 'Marmo UI' },
		publisher: {
			'@type': 'Organization',
			name: 'Marmo UI',
			logo: { '@type': 'ImageObject', url: `${SITE_URL}/marmo-icon.svg` },
		},
		mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
	};

	const breadcrumbLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
			{ '@type': 'ListItem', position: 3, name: article.title, item: `${SITE_URL}/blog/${slug}` },
		],
	};

	return (
		<div className="bg-bg">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
			/>
			<article className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-24">
				<Link href="/blog" className="text-[14px] font-medium text-primary hover:underline">
					← All articles
				</Link>
				<time
					className="mt-6 block text-[13px] font-medium text-ink-muted"
					dateTime={article.publishedAt}
				>
					{formatDate(article.publishedAt)}
				</time>
				<h1 className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-[36px] font-bold text-ink-dark tracking-[-1px] leading-[1.15]">
					{article.title}
				</h1>
				{article.excerpt ? (
					<p className="mt-4 text-[17px] leading-relaxed text-ink-light">{article.excerpt}</p>
				) : null}
				{article.body ? (
					<div className="prose prose-neutral mt-10 max-w-none">
						<PortableText value={article.body as never} />
					</div>
				) : null}
			</article>
		</div>
	);
}
