import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMDXComponents } from '@/mdx-components';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { findNeighbour } from 'fumadocs-core/page-tree';
import { source } from '@/lib/source';
import { ComponentPageHeader } from '@/components/mdx/component-page';
import { DocsTableOfContents } from '@/components/docs-toc';
import { CopyMarkdownButton } from '@/components/copy-markdown-button';
import type { Metadata } from 'next';

interface PageProps {
	params: Promise<{ slug?: string[] }>;
}

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const params = await props.params;
	const page = source.getPage(params.slug);

	if (!page) {
		notFound();
	}

	const doc = page.data;

	if (!doc.title || !doc.description) {
		notFound();
	}

	return {
		title: doc.title,
		description: doc.description,
	};
}

export default async function Page(props: PageProps) {
	const params = await props.params;
	const page = source.getPage(params.slug);

	if (!page) {
		notFound();
	}

	const doc = page.data as any;
	const MDX = doc.body as any;
	const neighbours = findNeighbour(source.pageTree, page.url);
	const components = useMDXComponents({});

	return (
		<div className="flex flex-col text-base xl:w-full flex-1">
			<div className="bg-bg">
				<div className={`${doc.wideLayout ? 'max-w-[80rem]' : 'max-w-[64rem]'} mx-auto py-8 flex justify-between items-start`}>
					<ComponentPageHeader
						title={doc.title || ''}
						description={doc.description || ''}
						status={doc.status as 'stable' | 'beta' | 'alpha' | 'deprecated'}
						category={doc.category as string}
						githubUrl={doc?.links?.github}
					/>
					<CopyMarkdownButton
						slug={params.slug}
						title={doc.title || ''}
						description={doc.description}
					/>
				</div>
			</div>
			<div className={`flex min-w-0 flex-1 flex-col ${doc.wideLayout ? 'max-w-[80rem]' : 'max-w-[64rem]'} mx-auto`}>
				<div className={`mx-auto flex w-full ${doc.wideLayout ? 'max-w-[80rem]' : 'max-w-[64rem]'} min-w-0 flex-1 gap-8 px-4 py-8 md:px-6 lg:py-12`}>
					<div className="docs-prose w-full flex-1 min-w-0 [&>:first-child]:mt-0">
						<MDX components={components} />
					</div>
					<div className="sticky top-[calc(var(--header-height,64px)+1px)] z-30 ml-auto hidden self-start pt-8 xl:block">
						<DocsTableOfContents toc={(doc.toc as any) || []} />
					</div>
				</div>
				{(neighbours.previous || neighbours.next) && (
					<div className={`mx-auto mt-4 mb-12 hidden w-full ${doc.wideLayout ? 'max-w-[80rem]' : 'max-w-[64rem]'} grid-cols-2 gap-4 sm:grid`}>
						{neighbours.previous ? (
							<Link
								href={neighbours.previous.url}
								className="group flex flex-col items-start gap-1 rounded-xl border border-border bg-panel/60 p-4 transition-colors hover:border-ink/30 hover:bg-panel"
							>
								<span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-light">
									<MdArrowBack className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
									Previous
								</span>
								<span className="text-sm font-medium text-ink">
									{neighbours.previous.name}
								</span>
							</Link>
						) : (
							<span />
						)}
						{neighbours.next ? (
							<Link
								href={neighbours.next.url}
								className="group flex flex-col items-end gap-1 rounded-xl border border-border bg-panel/60 p-4 text-right transition-colors hover:border-ink/30 hover:bg-panel"
							>
								<span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-light">
									Next
									<MdArrowForward className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
								</span>
								<span className="text-sm font-medium text-ink">
									{neighbours.next.name}
								</span>
							</Link>
						) : (
							<span />
						)}
					</div>
				)}
			</div>
		</div>
	);
}
