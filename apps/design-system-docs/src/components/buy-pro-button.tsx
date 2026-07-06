'use client';

import Script from 'next/script';
import { cn } from '@/lib/utils';
import siteConfig from '@/../site.config';

/**
 * LemonSqueezy overlay checkout button. lemon.js binds to the
 * `lemonsqueezy-button` class and opens the checkout in an on-site overlay
 * (?embed=1) instead of navigating away. The webhook + /welcome flow finish
 * the upgrade after payment.
 */
export function BuyProButton({
	className,
	children = 'Get Pro',
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	const base = siteConfig.buyNowUrl;
	const href = base.includes('?') ? `${base}&embed=1` : `${base}?embed=1`;

	return (
		<>
			<a
				href={href}
				className={cn(
					'lemonsqueezy-button inline-flex h-11 items-center justify-center rounded-[6px] bg-[#141422] px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90',
					className
				)}
			>
				{children}
			</a>
			<Script src="https://assets.lemonsqueezy.com/lemon.js" strategy="lazyOnload" />
		</>
	);
}
