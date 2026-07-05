import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import siteConfig from '@/../site.config';
import { getPost, getPosts } from '@/sanity/queries';

export const revalidate = 300;

type Params = { slug: string };

export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) return { title: `Updates — ${siteConfig.title}` };
	return {
		title: `${post.title} — ${siteConfig.title}`,
		description: post.excerpt,
	};
}

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default async function UpdatePostPage({ params }: { params: Promise<Params> }) {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) notFound();

	return (
		<div className="bg-bg">
			<article className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-24">
				<Link
					href={siteConfig.updatesUrl}
					className="text-[14px] font-medium text-primary hover:underline"
				>
					← All updates
				</Link>
				<time
					className="mt-6 block text-[13px] font-medium text-ink-muted"
					dateTime={post.publishedAt}
				>
					{formatDate(post.publishedAt)}
				</time>
				<h1 className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-[36px] font-bold text-ink-dark tracking-[-1px] leading-[1.15]">
					{post.title}
				</h1>
				{post.excerpt ? (
					<p className="mt-4 text-[17px] leading-relaxed text-ink-light">{post.excerpt}</p>
				) : null}
				{post.body ? (
					<div className="prose prose-neutral mt-10 max-w-none">
						<PortableText value={post.body as never} />
					</div>
				) : null}
			</article>
		</div>
	);
}
