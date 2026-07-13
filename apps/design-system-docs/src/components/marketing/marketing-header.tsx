'use client';

import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/../site.config';
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerClose, DrawerTrigger } from '@marmoui/ui';

const navLinks = [
	{ label: 'Components', href: siteConfig.componentsUrl },
	{ label: 'Docs', href: siteConfig.docsUrl },
	{ label: 'Pricing', href: siteConfig.pricingUrl },
	{ label: 'Updates', href: siteConfig.updatesUrl },
];

export function MarketingHeader({ className }: { className?: string }) {
	return (
		<header className={cn('sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e8ecef]', className)}>
			<div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 md:px-6">
				<Link href="/" className="flex shrink-0 items-center gap-1.5">
					<Image src="/marmo-icon.svg" alt="Marmo UI" width={40} height={40} className="size-10" priority />
					<span
						className="text-[18px] font-bold tracking-[-1px]"
						style={{ backgroundImage: 'linear-gradient(171deg, #000 17%, #525252 60%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}
					>
						MARMO&nbsp;UI
					</span>
				</Link>

				<nav className="flex items-center gap-4">
					{navLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className="hidden text-[16px] font-medium text-[#434040] tracking-[-0.5px] hover:text-black transition-colors sm:inline-flex"
						>
							{link.label}
						</Link>
					))}
					<Link
						href={siteConfig.connectUrl}
						className="inline-flex h-[44px] items-center gap-1.5 rounded-[4px] bg-[#0d0d0d] px-5 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
					>
						Connect agent
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
							<path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Link>

					<Drawer direction="right">
						<DrawerTrigger asChild>
							<button
								type="button"
								aria-label="Open menu"
								className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#434040] hover:bg-black/5 sm:hidden"
							>
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
									<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
								</svg>
							</button>
						</DrawerTrigger>
						<DrawerContent className="inset-y-0 right-0 left-auto mt-0 h-full w-[280px] rounded-none border-l">
							<div className="flex items-center justify-between p-4 border-b border-[#e8ecef]">
								<span className="text-[16px] font-bold">Menu</span>
								<DrawerClose asChild>
									<button
										type="button"
										aria-label="Close menu"
										className="inline-flex size-9 items-center justify-center rounded-[4px] text-[#434040] hover:bg-black/5"
									>
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
											<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
										</svg>
									</button>
								</DrawerClose>
							</div>
							<nav className="flex flex-col p-4 gap-1">
								{navLinks.map(link => (
									<DrawerClose asChild key={link.href}>
										<Link
											href={link.href}
											className="rounded-[4px] px-3 py-3 text-[16px] font-medium text-[#434040] hover:bg-black/5 hover:text-black"
										>
											{link.label}
										</Link>
									</DrawerClose>
								))}
								<DrawerClose asChild>
									<Link
										href={siteConfig.connectUrl}
										className="mt-2 inline-flex h-[44px] items-center justify-center gap-1.5 rounded-[4px] bg-[#0d0d0d] px-5 text-[16px] font-medium text-white"
									>
										Connect agent
									</Link>
								</DrawerClose>
							</nav>
						</DrawerContent>
					</Drawer>
				</nav>
			</div>
		</header>
	);
}
