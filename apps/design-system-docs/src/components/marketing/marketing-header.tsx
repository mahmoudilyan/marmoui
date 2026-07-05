'use client';

import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/../site.config';
import { cn } from '@/lib/utils';

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
					<Link href={siteConfig.componentsUrl} className="hidden text-[16px] font-medium text-[#434040] tracking-[-0.5px] hover:text-black transition-colors sm:inline-flex">
						Components
					</Link>
					<Link href={siteConfig.docsUrl} className="hidden text-[16px] font-medium text-[#434040] tracking-[-0.5px] hover:text-black transition-colors sm:inline-flex">
						Docs
					</Link>
					<Link href={siteConfig.pricingUrl} className="hidden text-[16px] font-medium text-[#434040] tracking-[-0.5px] hover:text-black transition-colors sm:inline-flex">
						Pricing
					</Link>
					<Link href={siteConfig.updatesUrl} className="hidden text-[16px] font-medium text-[#434040] tracking-[-0.5px] hover:text-black transition-colors sm:inline-flex">
						Updates
					</Link>
					<Link
						href={siteConfig.connectUrl}
						className="inline-flex h-[44px] items-center gap-1.5 rounded-[4px] bg-[#0d0d0d] px-5 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
					>
						Connect agent
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
							<path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Link>
				</nav>
			</div>
		</header>
	);
}
