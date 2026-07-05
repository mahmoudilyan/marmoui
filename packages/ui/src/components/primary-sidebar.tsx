import * as React from 'react';
import {
	SquaresFour,
	TagSimple,
	GraduationCap,
	TreeStructure,
	Megaphone,
	AddressBook,
	Palette,
	Storefront,
	GearSix,
	Bell,
	ChartDonut,
	CaretLeft,
	List,
	X,
} from '@phosphor-icons/react';

import { cn } from '../lib/utils';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuBadge,
	SideNavigation,
	useSidebar,
} from './sidebar-deprecated';
import { IconButton } from './icon-button';
import { Button } from './button';

/**
 * Dashboard icons render in Phosphor's duotone weight (two-tone) to mark them
 * as analytics/overview surfaces. Built by wrapping the Phosphor component so
 * the `icon: ComponentType` slot in PrimaryNavigationItem picks up the weight.
 * Navigation icons stay regular (Phosphor default) — filled variants are used
 * for active/hover states by callers that need them.
 */
const DashboardDuotone = (props: React.ComponentProps<'svg'>) => (
	<SquaresFour weight="duotone" {...props} />
);
const ReportsDuotone = (props: React.ComponentProps<'svg'>) => (
	<ChartDonut weight="duotone" {...props} />
);

export interface PrimaryNavigationItem {
	url: string;
	excludePaths?: string[];
	label: string;
	icon: React.ComponentType<any>;
	badge?: string;
	selected?: boolean;
	subNavigationItems?: SecondaryNavigationItem[];
}

export interface SecondaryNavigationItem {
	url: string;
	excludePaths?: string[];
	disabled?: boolean;
	label: string;
	icon?: React.ComponentType<any>;
	selected?: boolean;
}

export interface PrimarySidebarProps {
	logo?: React.ReactNode;
	items?: PrimaryNavigationItem[];
	bottomItems?: Omit<PrimaryNavigationItem, 'subNavigationItems'>[];
	userAvatar?: React.ReactNode;
	onItemSelect?: (item: PrimaryNavigationItem) => void;
	onSecondaryItemSelect?: (
		item: SecondaryNavigationItem,
		primaryItem: PrimaryNavigationItem
	) => void;
	onUserAvatarClick?: () => void;
	footerContent?: React.ReactNode;
	// New side navigation props
	variant?: 'minimized' | 'expanded';
	defaultVariant?: 'minimized' | 'expanded';
	onVariantChange?: (variant: 'minimized' | 'expanded') => void;
	defaultSecondaryOpen?: boolean;
	onSecondaryToggle?: (isOpen: boolean) => void;
	className?: string;
}

// Default navigation items based on Figma design
const defaultPrimaryItems: PrimaryNavigationItem[] = [
	{
		url: '/dashboard',
		excludePaths: ['/dashboard'],
		label: 'Dashboard',
		icon: DashboardDuotone,
		selected: true,
		subNavigationItems: [
			{
				url: '/dashboard/analytics',
				excludePaths: ['/dashboard/analytics'],
				disabled: false,
				label: 'Analytics',
				icon: DashboardDuotone,
			},
			{
				url: '/dashboard/reports',
				excludePaths: ['/dashboard/reports'],
				disabled: false,
				label: 'Reports',
				icon: ReportsDuotone,
				selected: true,
			},
		],
	},
	{
		url: '/sell',
		excludePaths: ['/sell'],
		label: 'Sell',
		icon: TagSimple,
	},
	{
		url: '/teach',
		excludePaths: ['/teach'],
		label: 'Teach',
		icon: GraduationCap,
	},
	{
		url: '/automate',
		excludePaths: ['/automate'],
		label: 'Automate',
		icon: TreeStructure,
	},
	{
		url: '/market',
		excludePaths: ['/market'],
		label: 'Market',
		icon: Megaphone,
	},
	{
		url: '/connect',
		excludePaths: ['/connect'],
		label: 'Connect',
		icon: AddressBook,
	},
	{
		url: '/present',
		excludePaths: ['/present'],
		label: 'Present',
		icon: Palette,
	},
];

const defaultBottomItems: Omit<PrimaryNavigationItem, 'subNavigationItems'>[] = [
	{
		url: '/add-business',
		excludePaths: ['/add-business'],
		label: 'Add Business',
		icon: Storefront,
	},
	{
		url: '/settings',
		excludePaths: ['/settings'],
		label: 'Settings',
		icon: GearSix,
	},
	{
		url: '/notifications',
		excludePaths: ['/notifications'],
		label: 'Notifications',
		icon: Bell,
	},
];

const PrimarySidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
	({ className, children, ...props }, ref) => {
		return (
			<SidebarHeader
				ref={ref}
				className={cn('pb-8 pt-0 px-1 w-full flex justify-center', className)}
				{...props}
			>
				{children}
			</SidebarHeader>
		);
	}
);
PrimarySidebarHeader.displayName = 'PrimarySidebarHeader';

const PrimarySidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
	({ className, children, ...props }, ref) => {
		return (
			<SidebarContent
				ref={ref}
				className={cn('flex flex-col gap-3 items-center', className)}
				{...props}
			>
				{children}
			</SidebarContent>
		);
	}
);
PrimarySidebarContent.displayName = 'PrimarySidebarContent';

const PrimarySidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
	({ className, children, ...props }, ref) => {
		return (
			<SidebarGroup
				ref={ref}
				className={cn('flex flex-col gap-3 items-center w-full', className)}
				{...props}
			>
				{children}
			</SidebarGroup>
		);
	}
);
PrimarySidebarGroup.displayName = 'PrimarySidebarGroup';

const PrimarySidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
	({ className, children, ...props }, ref) => {
		return (
			<SidebarGroupLabel ref={ref} className={cn('sr-only', className)} {...props}>
				{children}
			</SidebarGroupLabel>
		);
	}
);
PrimarySidebarGroupLabel.displayName = 'PrimarySidebarGroupLabel';

const PrimarySidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
	({ className, children, ...props }, ref) => {
		return (
			<SidebarGroupContent ref={ref} className={cn('w-full', className)} {...props}>
				{children}
			</SidebarGroupContent>
		);
	}
);
PrimarySidebarGroupContent.displayName = 'PrimarySidebarGroupContent';

const PrimarySidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
	({ className, children, ...props }, ref) => {
		return (
			<SidebarMenu
				ref={ref}
				className={cn('flex flex-col gap-3 items-center w-full', className)}
				{...props}
			>
				{children}
			</SidebarMenu>
		);
	}
);
PrimarySidebarMenu.displayName = 'PrimarySidebarMenu';

const PrimarySidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
	({ className, children, ...props }, ref) => {
		return (
			<SidebarMenuItem ref={ref} className={cn('w-full flex justify-center', className)} {...props}>
				{children}
			</SidebarMenuItem>
		);
	}
);
PrimarySidebarMenuItem.displayName = 'PrimarySidebarMenuItem';

const PrimarySidebarFooter = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<'div'> & {
		bottomItems?: Omit<PrimaryNavigationItem, 'subNavigationItems'>[];
		userAvatar?: React.ReactNode;
		onItemSelect?: (item: Omit<PrimaryNavigationItem, 'subNavigationItems'>) => void;
		onUserAvatarClick?: () => void;
	}
>(
	(
		{
			className,
			bottomItems = [],
			userAvatar,
			onItemSelect,
			onUserAvatarClick,
			children,
			...props
		},
		ref
	) => {
		const defaultAvatar = (
			<div className="size-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded overflow-hidden flex items-center justify-center text-white text-xs font-medium">
				U
			</div>
		);

		// If children is provided, use custom content
		if (children) {
			return (
				<SidebarFooter
					ref={ref}
					className={cn('flex flex-col gap-5 items-center py-2', className)}
					{...props}
				>
					{children}
				</SidebarFooter>
			);
		}

		// Default footer implementation
		return (
			<SidebarFooter
				ref={ref}
				className={cn('flex flex-col gap-5 items-center py-2', className)}
				{...props}
			>
				{/* Bottom Items */}
				{bottomItems.length > 0 && (
					<div className="flex flex-col gap-3 items-center">
						{bottomItems.map(item => {
							const IconComponent = item.icon;
							return (
								<div key={item.url} className="relative">
									<IconButton
										variant="ghost"
										size="sm"
										icon={<IconComponent className="size-6" />}
										onClick={() => onItemSelect?.(item)}
										className="size-6"
									/>
									{item.badge && (
										<div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-4 h-4 flex items-center justify-center px-1">
											{item.badge}
										</div>
									)}
								</div>
							);
						})}
					</div>
				)}

				{/* User Avatar */}
				{(userAvatar || !children) && (
					<button
						onClick={onUserAvatarClick}
						className="size-8 rounded-full transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
					>
						{userAvatar || defaultAvatar}
					</button>
				)}
			</SidebarFooter>
		);
	}
);
PrimarySidebarFooter.displayName = 'PrimarySidebarFooter';

function PrimarySidebar({
	logo,
	items = defaultPrimaryItems,
	bottomItems = defaultBottomItems,
	userAvatar,
	onItemSelect,
	onSecondaryItemSelect,
	onUserAvatarClick,
	footerContent,
	// New side navigation props
	variant: variantProp,
	defaultVariant = 'expanded',
	onVariantChange,
	defaultSecondaryOpen = true,
	onSecondaryToggle,
	className,
}: PrimarySidebarProps) {
	const {
		open: isSecondaryOpen,
		setOpen: setIsSecondaryOpen,
		toggleSidebar,
		variant: contextVariant,
		setVariant,
		secondaryOpen,
		setSecondaryOpen,
		toggleSecondary,
	} = useSidebar();

	// Handle variant state
	const [_variant, _setVariant] = React.useState(defaultVariant);
	const variant = variantProp ?? contextVariant ?? _variant;

	// Initialize secondary open state if it's not controlled by the context
	React.useEffect(() => {
		if (setSecondaryOpen && secondaryOpen === undefined) {
			setSecondaryOpen(defaultSecondaryOpen);
		}
	}, [setSecondaryOpen, secondaryOpen, defaultSecondaryOpen]);

	const handleVariantChange = React.useCallback(
		(newVariant: 'minimized' | 'expanded') => {
			if (onVariantChange) {
				onVariantChange(newVariant);
			} else if (setVariant) {
				setVariant(newVariant);
			} else {
				_setVariant(newVariant);
			}
		},
		[onVariantChange, setVariant]
	);

	const [selectedItem, setSelectedItem] = React.useState<PrimaryNavigationItem | null>(() => {
		return items.find(item => item.selected) || null;
	});

	// Debug logging
	React.useEffect(() => {
		console.log('PrimarySidebar state:', {
			variant,
			secondaryOpen,
			isSecondaryOpen,
			hasToggleSecondary: !!toggleSecondary,
			selectedItem: selectedItem?.label,
		});
	}, [variant, secondaryOpen, isSecondaryOpen, toggleSecondary, selectedItem]);

	const toggleSecondaryMenu = () => {
		if (toggleSecondary) {
			toggleSecondary();
		} else {
			toggleSidebar();
		}
		// Use the current secondary state for the callback
		const currentSecondaryState = secondaryOpen ?? isSecondaryOpen;
		onSecondaryToggle?.(!currentSecondaryState);
	};

	const defaultLogo = (
		<div className="flex items-center gap-1 overflow-hidden w-9">
			<div className="size-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
				C
			</div>
		</div>
	);

	const defaultAvatar = (
		<div className="size-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded overflow-hidden flex items-center justify-center text-white text-xs font-medium">
			U
		</div>
	);

	const handleItemClick = (item: PrimaryNavigationItem) => {
		setSelectedItem(item);
		// Auto-expand if minimized and item has sub navigation
		if (variant === 'minimized' && item.subNavigationItems?.length) {
			handleVariantChange('expanded');
		}
		onItemSelect?.(item);
	};

	const handleSecondaryItemClick = (secondaryItem: SecondaryNavigationItem) => {
		if (selectedItem) {
			onSecondaryItemSelect?.(secondaryItem, selectedItem);
		}
	};

	const handleMinimizeToggle = () => {
		const newVariant = variant === 'minimized' ? 'expanded' : 'minimized';
		handleVariantChange(newVariant);
	};

	// Render primary navigation content
	const primaryContent = (
		<div className="flex flex-col items-center justify-between px-4 py-3 h-full">
			{/* Top Section */}
			<div className="flex flex-col items-center w-full">
				{/* Logo */}
				<PrimarySidebarHeader>{logo || defaultLogo}</PrimarySidebarHeader>

				{/* Primary Nav Items */}
				<PrimarySidebarContent>
					<PrimarySidebarGroup>
						<PrimarySidebarGroupLabel>Application</PrimarySidebarGroupLabel>
						<PrimarySidebarGroupContent>
							<PrimarySidebarMenu>
								{items.map(item => {
									const IconComponent = item.icon;
									const isSelected = selectedItem?.url === item.url;
									return (
										<PrimarySidebarMenuItem key={item.url}>
											<div className="relative">
												<IconButton
													variant={isSelected ? 'secondary' : 'ghost'}
													size="default"
													icon={<IconComponent className="size-6" />}
													onClick={() => handleItemClick(item)}
													className={cn('size-10', isSelected && 'bg-background shadow-sm')}
												/>
												{item.badge && (
													<div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
														{item.badge}
													</div>
												)}
											</div>
										</PrimarySidebarMenuItem>
									);
								})}
							</PrimarySidebarMenu>
						</PrimarySidebarGroupContent>
					</PrimarySidebarGroup>
				</PrimarySidebarContent>
			</div>

			{/* Bottom Section */}
			<PrimarySidebarFooter
				bottomItems={bottomItems}
				userAvatar={userAvatar}
				onItemSelect={item => onItemSelect?.(item as PrimaryNavigationItem)}
				onUserAvatarClick={onUserAvatarClick}
			>
				{footerContent}
			</PrimarySidebarFooter>
		</div>
	);

	// Render secondary navigation content
	const secondaryContent = selectedItem?.subNavigationItems && (
		<div className="px-4 py-3 h-full w-full">
			<div className="flex flex-col gap-6 h-full items-start justify-start w-full">
				{/* Header */}
				<div className="flex flex-col gap-1 items-start w-full py-2">
					<div className="flex items-center justify-between pl-2 pr-0 py-2 w-full">
						<h2 className="text-xl font-medium text-foreground whitespace-nowrap">
							{selectedItem.label}
						</h2>
						<div className="flex items-center gap-2 flex-shrink-0">
							{variant === 'expanded' && (
								<IconButton
									variant="ghost"
									size="xs"
									icon={<List className="size-5" />}
									onClick={toggleSecondaryMenu}
									className="size-8 hover:bg-muted"
								/>
							)}
							<IconButton
								variant="ghost"
								size="xs"
							icon={
							variant === 'expanded' ? (
								<CaretLeft className="size-5" />
							) : (
								<X className="size-5" />
								)
							}
								onClick={
									variant === 'expanded' ? handleMinimizeToggle : () => setSelectedItem(null)
								}
								className="size-8 hover:bg-muted"
							/>
						</div>
					</div>

					{/* Secondary Nav Items */}
					<div className="flex flex-col w-full space-y-1">
						{selectedItem.subNavigationItems.map((subItem, index) => {
							const IconComponent = subItem.icon;
							return (
								<div
									key={subItem.url}
									className="transition-all duration-200 ease-out"
									style={{
										transitionDelay: `${index * 50}ms`,
									}}
								>
									<Button
										variant={subItem.selected ? 'secondary' : 'ghost'}
										size="sm"
										leftIcon={IconComponent && <IconComponent className="size-4" />}
										onClick={() => handleSecondaryItemClick(subItem)}
										disabled={subItem.disabled}
										className={cn(
											'justify-start w-full hover:translate-x-1 transition-transform duration-200',
											subItem.selected && 'bg-primary/10 text-foreground font-medium shadow-sm',
											subItem.disabled && 'opacity-50 cursor-not-allowed'
										)}
									>
										{subItem.label}
									</Button>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<SideNavigation
			className={className}
			variant={variant}
			primaryContent={primaryContent}
			secondaryContent={secondaryContent}
			onVariantChange={handleVariantChange}
		/>
	);
}

export {
	PrimarySidebar,
	PrimarySidebarHeader,
	PrimarySidebarContent,
	PrimarySidebarGroup,
	PrimarySidebarGroupLabel,
	PrimarySidebarGroupContent,
	PrimarySidebarMenu,
	PrimarySidebarMenuItem,
	PrimarySidebarFooter,
};
