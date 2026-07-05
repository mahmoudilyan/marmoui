import { source } from '@/lib/source';
import { SiteHeader } from '@/components/site-header';
import { DocsSidebar } from '@/components/docs-sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />
			<div className="flex flex-1 gap-0">
				<DocsSidebar tree={source.pageTree} />
				{children}
			</div>
		</div>
	);
}
