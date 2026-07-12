import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/../site.config';

const columns = [
	{
		heading: 'Product',
		links: [
			{ label: 'React components', href: siteConfig.componentsUrl },
			{ label: 'Pricing', href: siteConfig.pricingUrl },
			{ label: 'Updates', href: siteConfig.updatesUrl },
			{ label: 'Roadmap', href: '/docs/introduction/roadmap' },
			{ label: 'Connect your agent', href: siteConfig.connectUrl },
			{ label: 'Account', href: '/account' },
		],
	},
	{
		heading: 'Docs',
		links: [
			{ label: 'Get started', href: siteConfig.docsUrl },
			{ label: 'Install the agent', href: '/docs/introduction/install-agent' },
			{ label: 'DESIGN.md for AI agents', href: '/docs/tools/design-md' },
			{ label: 'Design tokens & colors', href: '/docs/foundation/colors' },
			{ label: 'Dashboard charts', href: '/docs/foundation/charts' },
		],
	},
	{
		heading: 'Company',
		links: [
			{ label: 'About', href: '/#features' },
			{ label: 'FAQ', href: '/#faq' },
			{ label: 'GitHub', href: siteConfig.githubMainUrl },
			{ label: 'Figma library', href: siteConfig.figmaUrl },
			{ label: 'MIT license', href: `${siteConfig.githubMainUrl}/blob/main/LICENSE` },
		],
	},
];

export function MarketingFooter() {
	return (
		<footer className="bg-[#0d0d0d] text-white">
			<div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-6 md:py-20">
				<div>
					<div className="mb-4 flex items-center gap-2">
						<Image src="/marmo-icon.svg" alt="" width={34} height={34} className="size-[34px]" />
						<span className="text-[18px] font-bold tracking-[-1px]">MARMO&nbsp;&nbsp;UI</span>
					</div>
					<p className="max-w-[300px] text-[15px] leading-relaxed text-white/60">
						The AI agentic designer. Connect Claude Code, Codex, Cursor, or Gemini to the Marmo
						MCP and ship dashboards and apps in minutes — in your own style.
					</p>
				</div>

				{columns.map(col => (
					<div key={col.heading}>
						<p className="mb-4 text-[13px] font-bold uppercase tracking-[0.04em] text-white/45">
							{col.heading}
						</p>
						<ul className="flex flex-col gap-3">
							{col.links.map(link => (
								<li key={link.label}>
									<Link
										href={link.href}
										className="text-[15px] text-white/78 transition-colors hover:text-white"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="border-t border-white/10">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
					<span className="text-[14px] text-white/55">© {new Date().getFullYear()} Marmo UI</span>
					<div className="flex items-center gap-5">
						<a
							href={`${siteConfig.githubMainUrl}/blob/main/LICENSE`}
							target="_blank"
							rel="noreferrer"
							className="text-[14px] text-white/55 transition-colors hover:text-white"
						>
							License
						</a>
						<a
							href="https://x.com/marmoui"
							target="_blank"
							rel="noreferrer"
							className="text-white/70 transition-colors hover:text-white"
							aria-label="X (Twitter)"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
