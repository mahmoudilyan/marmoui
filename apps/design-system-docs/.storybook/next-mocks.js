// Mock Next.js navigation and link components for Storybook
import React from 'react';

// Mock usePathname hook
export const usePathname = () => '/dashboard/campaigns';

// Mock useRouter hook
export const useRouter = () => ({
	push: (url: string) => {
		console.log('Router.push called with:', url);
	},
	replace: (url: string) => {
		console.log('Router.replace called with:', url);
	},
	prefetch: () => {},
	back: () => {
		console.log('Router.back called');
	},
	forward: () => {
		console.log('Router.forward called');
	},
	refresh: () => {
		console.log('Router.refresh called');
	},
});

// Mock Next.js Link component
interface LinkProps {
	href: string;
	children: React.ReactNode;
	[key: string]: any;
}

export const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
	return React.createElement(
		'a',
		{
			href,
			onClick: (e: React.MouseEvent) => {
				e.preventDefault();
				console.log('Link clicked:', href);
			},
			...props,
		},
		children
	);
};



