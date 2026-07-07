'use client';

import { Button } from '../button';
import { DotsThreeOutline } from '@phosphor-icons/react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '../dropdown-menu';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../breadcrumbs';

interface BreadcrumbItemType {
	label: string;
	href?: string;
	onClick?: () => void;
	actions?: Array<{
		label: string;
		onClick: () => void;
		isDelete?: boolean;
	}>;
}

interface ActionItem {
	label: string;
	onClick: () => void;
}

interface DataNavProps {
	breadcrumbs?: BreadcrumbItemType[];
	actions?: ActionItem[];
	primaryAction?: {
		label: string;
		href?: string;
		onClick?: () => void;
	};
}

export function DataNav({ breadcrumbs, actions, primaryAction }: DataNavProps) {
	const handleBreadcrumbClick = (item: BreadcrumbItemType, e: React.MouseEvent) => {
		if (item.onClick) {
			e.preventDefault();
			item.onClick();
		}
	};

	return (
		<div className="flex justify-between items-center mb-8">
			{breadcrumbs && breadcrumbs.length > 0 && (
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((item, index) => {
							const isLast = index === breadcrumbs.length - 1;

							return (
								<BreadcrumbItem key={item.label}>
									{!isLast ? (
										<>
											<BreadcrumbLink
												onClick={e => handleBreadcrumbClick(item, e)}
												href={item.href || '#'}
											>
												{item.label}
											</BreadcrumbLink>
											<BreadcrumbSeparator />
										</>
									) : (
										<div className="flex items-center gap-2">
											<BreadcrumbPage>{item.label}</BreadcrumbPage>
											{item.actions && item.actions.length > 0 && (
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="sm" aria-label="More options">
															<DotsThreeOutline className="w-4 h-4" weight="fill" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														{item.actions.map(action => (
															<DropdownMenuItem
																key={action.label}
																onClick={action.onClick}
																className={
																	action.isDelete ? 'text-destructive hover:text-destructive' : ''
																}
															>
																{action.label}
															</DropdownMenuItem>
														))}
													</DropdownMenuContent>
												</DropdownMenu>
											)}
										</div>
									)}
								</BreadcrumbItem>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			)}

			<div className="flex items-center gap-2">
				{actions && actions.length > 0 && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" aria-label="More options">
								<DotsThreeOutline className="w-4 h-4" weight="fill" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{actions.map(action => (
								<DropdownMenuItem key={action.label} onClick={action.onClick}>
									{action.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}

				{primaryAction && (
					primaryAction.href ? (
						<Button variant="primary" asChild>
							<a href={primaryAction.href} onClick={primaryAction.onClick}>
								{primaryAction.label}
							</a>
						</Button>
					) : (
						<Button variant="primary" onClick={primaryAction.onClick}>
							{primaryAction.label}
						</Button>
					)
				)}
			</div>
		</div>
	);
}
