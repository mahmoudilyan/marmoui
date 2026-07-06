'use client';

import Script from 'next/script';
import { cn } from '@/lib/utils';
import siteConfig from '@/../site.config';

declare global {
	interface Window {
		LemonSqueezy?: { Url: { Open: (url: string) => void } };
		createLemonSqueezy?: () => void;
	}
}

/**
 * LemonSqueezy overlay checkout button. Opens the checkout in an on-site
 * overlay via the lemon.js `Url.Open` API instead of relying on the
 * `lemonsqueezy-button` class auto-binding, which misses anchors rendered
 * after lemon.js scans the page (the old behavior: full navigation to the
 * hosted checkout with a dead close button). Falls back to plain navigation
 * only if lemon.js failed to load. The webhook + /welcome flow finish the
 * upgrade after payment.
 */
export function BuyProButton({
	className,
	children = 'Get Pro',
	unstyled = false,
}: {
	className?: string;
	children?: React.ReactNode;
	unstyled?: boolean;
}) {
	const base = siteConfig.buyNowUrl;
	const href = base.includes('?') ? `${base}&embed=1` : `${base}?embed=1`;

	const openOverlay = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (typeof window === 'undefined' || !window.LemonSqueezy?.Url) return; // fall back to href
		e.preventDefault();
		window.LemonSqueezy.Url.Open(href);
	};

	return (
		<>
			<a
				href={href}
				onClick={openOverlay}
				className={
					unstyled
						? className
						: cn(
								'inline-flex h-11 items-center justify-center rounded-[6px] bg-[#141422] px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90',
								className
							)
				}
			>
				{children}
			</a>
			<Script
				src="https://assets.lemonsqueezy.com/lemon.js"
				strategy="afterInteractive"
				onLoad={() => window.createLemonSqueezy?.()}
			/>
		</>
	);
}
