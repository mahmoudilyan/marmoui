import Script from 'next/script';

/**
 * Third-party analytics + marketing pixels, production only.
 * Ported from the old Framer site's <head>: GA4, LemonSqueezy affiliate
 * tracking, Reddit pixel, Meta pixel. The Reddit AddToCart event fires
 * from <BuyProButton /> on checkout clicks.
 */
export function Analytics() {
	if (process.env.NODE_ENV !== 'production') return null;

	return (
		<>
			{/* Google Analytics */}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-RM5DJ0Y6BC"
				strategy="afterInteractive"
			/>
			<Script id="ga4" strategy="afterInteractive">
				{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-RM5DJ0Y6BC');`}
			</Script>

			{/* LemonSqueezy affiliate tracking */}
			<Script id="ls-affiliate-config" strategy="beforeInteractive">
				{`window.lemonSqueezyAffiliateConfig = { store: "marmoui" };`}
			</Script>
			<Script src="https://lmsqueezy.com/affiliate.js" strategy="afterInteractive" />

			{/* Reddit Pixel */}
			<Script id="reddit-pixel" strategy="afterInteractive">
				{`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','t2_aojapqcr');rdt('track', 'PageVisit');`}
			</Script>

			{/* Meta Pixel */}
			<Script id="meta-pixel" strategy="afterInteractive">
				{`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '684455992028266');
fbq('track', 'PageView');`}
			</Script>
			<noscript>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					height="1"
					width="1"
					style={{ display: 'none' }}
					alt=""
					src="https://www.facebook.com/tr?id=684455992028266&ev=PageView&noscript=1"
				/>
			</noscript>
		</>
	);
}
