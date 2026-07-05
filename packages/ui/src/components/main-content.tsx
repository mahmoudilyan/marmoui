import * as React from 'react';
import { List } from '@phosphor-icons/react';

import { cn } from '../lib/utils';
import { useSidebar } from './sidebar';
import { IconButton } from './icon-button';
import { Button } from './button';

export interface PageSectionProps {
	title?: string;
	subtitle?: string;
	actions?: React.ReactNode;
	breadcrumbs?: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
	showToggle?: boolean;
	onToggle?: () => void;
}

const PageSection = React.forwardRef<HTMLDivElement, PageSectionProps>(
	(
		{
			title,
			subtitle,
			actions,
			breadcrumbs,
			className,
			children,
			showToggle = false,
			onToggle,
			...props
		},
		ref
	) => {
		const { secondaryIsOpen, toggleSecondary } = useSidebar();

		const handleToggle = () => {
			if (onToggle) {
				onToggle();
			} else {
				toggleSecondary();
			}
		};

		return (
			<div
				ref={ref}
				className={cn('flex flex-col gap-4 p-6 border-b border-border bg-background', className)}
				{...props}
			>
				{/* Breadcrumbs */}
				{breadcrumbs && (
					<div className="flex items-center text-sm text-muted-foreground">{breadcrumbs}</div>
				)}

				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						{/* Toggle button for secondary menu when it's collapsed */}
						{(showToggle || !secondaryIsOpen) && (
							<IconButton
								variant="ghost"
								size="sm"
								icon={<List className="size-5" />}
								onClick={handleToggle}
								className="size-8"
							/>
						)}

						<div className="flex flex-col gap-1">
							{title && <h1 className="text-2xl font-semibold text-foreground">{title}</h1>}
							{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
						</div>
					</div>

					{/* Actions */}
					{actions && <div className="flex items-center gap-2">{actions}</div>}
				</div>

				{/* Custom content */}
				{children}
			</div>
		);
	}
);
PageSection.displayName = 'PageSection';

export interface MainContentProps {
	className?: string;
	children?: React.ReactNode;
}

const MainContent = React.forwardRef<HTMLDivElement, MainContentProps>(
	({ className, children, ...props }, ref) => {
		return (
			<main
				ref={ref}
				className={cn('flex-1 flex flex-col h-full overflow-hidden bg-background', className)}
				{...props}
			>
				{children}
			</main>
		);
	}
);
MainContent.displayName = 'MainContent';

export { MainContent, PageSection };
