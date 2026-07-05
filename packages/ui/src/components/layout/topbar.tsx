'use client';

import { cn } from '../../lib/utils';

interface TopBarProps {
	links: {
		label: string;
		href: string;
	}[];
}

export default function TopBar(props: TopBarProps) {
	
	return (
		<div className="bg-background border-b border-gray-200 dark:border-gray-700 flex gap-6 px-8 h-16">
			{props.links.map(link => {
				return (
					<a
						key={link.href}
						href={link.href}
						className={cn(
							"flex items-center border-b-2 transition-colors",
							link.href === window.location.pathname + '/' ? "text-primary border-primary" 
								: "text-foreground hover:text-primary border-transparent"
						)}
					>
						{link.label}
					</a>
				);
			})}
		</div>
	);
}