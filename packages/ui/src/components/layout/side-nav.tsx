'use client';

import { cn } from '../../lib/utils';
import { TooltipRoot, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { Headset, Bell } from '@phosphor-icons/react';
import ProfileDropdown from './profile-dropdown';

interface NavItemProps {
	label: string;
	href: string;
	icon: React.ReactElement;
	isActive: boolean;
}

const NavItem = ({ label, href, icon, isActive }: NavItemProps) => {
	return (
		<TooltipProvider>
			<TooltipRoot>
				<TooltipTrigger asChild>
					<a
						href={href}
						className={cn(
							'flex items-center justify-center p-2 py-3 cursor-pointer transition-colors',
							isActive ? 'bg-gray-800' : 'bg-transparent hover:bg-gray-800/50'
						)}
					>
						<div
							className={cn(
								'transition-colors',
								isActive ? 'text-primary-400' : 'text-gray-400 hover:text-gray-300'
							)}
						>
							{icon}
						</div>
					</a>
				</TooltipTrigger>
				<TooltipContent side="right">{label}</TooltipContent>
			</TooltipRoot>
		</TooltipProvider>
	);
};

export interface SideNavItem {
	href: string;
	label: string;
	icon: React.ReactElement;
}

export interface SideNavProps {
	currentPathname?: string;
	items?: SideNavItem[];
	secondaryItems?: SideNavItem[];
	logoHref?: string;
	logo?: React.ReactNode;
	profileDropdown?: React.ReactNode;
}

const SideNav = ({
	currentPathname = '',
	items = [
		{ href: '/dashboard', label: 'Dashboard', icon: <div className="w-6 h-6 bg-gray-400 rounded"></div> },
		{ href: '/campaigns', label: 'Campaigns', icon: <div className="w-6 h-6 bg-gray-400 rounded"></div> },
		{ href: '/automation', label: 'Automation', icon: <div className="w-6 h-6 bg-gray-400 rounded"></div> },
		{ href: '/contacts', label: 'Contacts', icon: <div className="w-6 h-6 bg-gray-400 rounded"></div> },
		{ href: '/social', label: 'Social', icon: <div className="w-6 h-6 bg-gray-400 rounded"></div> },
		{ href: '/landing-pages', label: 'Landing Pages', icon: <div className="w-6 h-6 bg-gray-400 rounded"></div> },
		{ href: '/chatbot', label: 'Chatbot', icon: <div className="w-6 h-6 bg-gray-400 rounded"></div> },
		{ href: '/content', label: 'Content Manager', icon: <div className="w-6 h-6 bg-gray-400 rounded"></div> },
	],
	secondaryItems = [
		{ href: '/support', label: 'Support', icon: <Headset className="w-6 h-6 text-gray-400" /> },
		{ href: '/notifications', label: 'Notifications', icon: <Bell className="w-6 h-6 text-gray-400" /> },
	],
	logoHref = '/',
	logo,
	profileDropdown,
}: SideNavProps) => {
	const logoContent = logo || (
		<div className="w-6 h-6 bg-primary-400 rounded"></div>
	);

	return (
		<nav className="sticky top-0 left-0 h-screen pb-2 bg-gray-900 w-12 flex flex-col justify-around">
			<div className="w-full flex items-center p-2 justify-center mb-8">
				<a href={logoHref}>
					{logoContent}
				</a>
			</div>

			<div className="flex flex-col grow text-sm text-gray-600" aria-label="Main Navigation">
				{items.map((item) => (
					<NavItem
						key={item.href}
						href={item.href}
						label={item.label}
						icon={item.icon}
						isActive={currentPathname.startsWith(item.href)}
					/>
				))}
			</div>

			<div className="flex flex-col text-sm text-gray-600" aria-label="Secondary Navigation">
				{secondaryItems.map((item) => (
					<NavItem
						key={item.href}
						href={item.href}
						label={item.label}
						icon={item.icon}
						isActive={currentPathname.startsWith(item.href)}
					/>
				))}
				{profileDropdown || <ProfileDropdown />}
			</div>
		</nav>
	);
};

export default SideNav;
