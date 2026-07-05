'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

export function ComponentPreviewTabs({
	className,
	align = 'center',
	hideCode = false,
	component,
	source,
	...props
}: React.ComponentProps<'div'> & {
	align?: 'center' | 'start' | 'end';
	hideCode?: boolean;
	component: React.ReactNode;
	source: React.ReactNode;
}) {
	const [tab, setTab] = React.useState('preview');

	return (
		<div className={cn('group relative mt-4 mb-12 flex flex-col gap-2', className)} {...props}>
			<div className="flex items-center justify-between">
				{!hideCode && (
					<div className="flex gap-2 border-b border-border">
						<button
							onClick={() => setTab('preview')}
							className={cn(
								'px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
								tab === 'preview'
									? 'border-primary text-foreground'
									: 'border-transparent text-muted-foreground hover:text-foreground'
							)}
						>
							Preview
						</button>
						<button
							onClick={() => setTab('code')}
							className={cn(
								'px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
								tab === 'code'
									? 'border-primary text-foreground'
									: 'border-transparent text-muted-foreground hover:text-foreground'
							)}
						>
							Code
						</button>
					</div>
				)}
			</div>
			<div data-tab={tab} className="relative rounded-xl border data-[tab=code]:bg-muted/30">
				<div
					data-slot="preview"
					data-active={tab === 'preview'}
					className="invisible data-[active=true]:visible"
				>
					<div
						data-align={align}
						className={cn(
							'preview flex h-[450px] w-full justify-center overflow-y-auto p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start max-sm:px-6'
						)}
					>
						{component}
					</div>
				</div>
				#
				<div
					data-slot="code"
					data-active={tab === 'code'}
					className="absolute inset-0 hidden overflow-hidden data-[active=true]:block p-6"
				>
					<div className="h-[450px] overflow-auto">{source}</div>
				</div>
			</div>
		</div>
	);
}
