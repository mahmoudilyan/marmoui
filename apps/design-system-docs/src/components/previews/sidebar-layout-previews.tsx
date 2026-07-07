'use client';

import React from 'react';
import {
	SidebarProvider,
	SidebarPanel,
	SidebarPanelHeader,
	SidebarPanelContent,
	SidebarPanelFooter,
	SidebarPanelTitle,
	SidebarItem,
	SidebarSubItem,
	PageSection,
	PageSectionWizard,
	useSidebar,
	Button,
	IconButton,
} from '@marmoui/ui';
import {
	MdDashboard,
	MdOutlineDashboard,
	MdCampaign,
	MdOutlineCampaign,
	MdPeople,
	MdOutlinePeople,
	MdSettings,
	MdOutlineSettings,
	MdHelpOutline,
} from 'react-icons/md';

/** Full layout: SidebarPanel + PageSection + content */
export function SidebarFullLayoutPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
			<div className="flex h-[400px] w-full border border-secondary overflow-hidden">
				<SidebarPanel logo={<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>
							<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />
						</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Dashboard"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
							isActive
						/>
						<SidebarItem label="Contacts" iconOutlined={MdOutlinePeople} iconFilled={MdPeople}>
							<SidebarSubItem label="All Contacts" />
							<SidebarSubItem label="Segments" />
						</SidebarItem>
						<SidebarItem label="Campaigns" iconOutlined={MdOutlineCampaign} iconFilled={MdCampaign}>
							<SidebarSubItem label="All Campaigns" />
							<SidebarSubItem label="Templates" />
						</SidebarItem>
						<SidebarItem
							label="Settings"
							iconOutlined={MdOutlineSettings}
							iconFilled={MdSettings}
						/>
					</SidebarPanelContent>
				</SidebarPanel>
				<div className="flex-1 flex flex-col overflow-hidden">
					<PageSection pageTitle="Dashboard" showSidebarToggle />
					<main className="flex-1 p-6 overflow-y-auto"></main>
				</div>
			</div>
		</SidebarProvider>
	);
}

/** Layout with breadcrumbs and actions */
export function SidebarBreadcrumbLayoutPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
			<div className="flex h-[400px] w-full border border-secondary overflow-hidden">
				<SidebarPanel logo={<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>
							<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />
						</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Dashboard"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
						/>
						<SidebarItem
							label="Campaigns"
							iconOutlined={MdOutlineCampaign}
							iconFilled={MdCampaign}
							isActive
						>
							<SidebarSubItem label="All Campaigns" />
							<SidebarSubItem label="Email Campaigns" isActive />
						</SidebarItem>
						<SidebarItem label="Contacts" iconOutlined={MdOutlinePeople} iconFilled={MdPeople} />
					</SidebarPanelContent>
				</SidebarPanel>
				<div className="flex-1 flex flex-col overflow-hidden">
					<PageSection
						breadcrumbs={[
							{ label: 'Campaigns', href: '#' },
							{ label: 'Email Campaigns', href: '#' },
							{ label: 'Summer Sale' },
						]}
						showSidebarToggle
						primaryAction={{ label: 'Create Campaign' }}
						otherActions={[{ label: 'Settings' }, { label: 'Help' }]}
					/>
					<main className="flex-1 p-6 overflow-y-auto"></main>
				</div>
			</div>
		</SidebarProvider>
	);
}

/** Collapsed sidebar with toggle in PageSection */
export function SidebarCollapsedLayoutPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: false }}>
			<div className="flex h-[300px] w-full border border-secondary overflow-hidden">
				<SidebarPanel logo={<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>
							<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />
						</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Dashboard"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
							isActive
						/>
						<SidebarItem label="Contacts" iconOutlined={MdOutlinePeople} iconFilled={MdPeople} />
					</SidebarPanelContent>
				</SidebarPanel>
				<div className="flex-1 flex flex-col overflow-hidden">
					<PageSection pageTitle="Dashboard" showSidebarToggle />
					<main className="flex-1 p-6 overflow-y-auto">
						<p className="text-ink text-sm">
							The sidebar is collapsed. Click the toggle icon in the page header to expand it.
						</p>
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}

/** Wizard layout with SidebarPanel */
export function SidebarWizardLayoutPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
			<div className="flex h-[400px] w-full border border-secondary overflow-hidden">
				<SidebarPanel logo={<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>
							<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />
						</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Dashboard"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
						/>
						<SidebarItem
							label="Campaigns"
							iconOutlined={MdOutlineCampaign}
							iconFilled={MdCampaign}
							isActive
						>
							<SidebarSubItem label="Templates" />
							<SidebarSubItem label="All Campaigns" isActive />
						</SidebarItem>
					</SidebarPanelContent>
				</SidebarPanel>
				<div className="flex-1 flex flex-col overflow-hidden">
					<PageSectionWizard
						title="Create Campaign"
						showSidebarToggle
						currentStep={1}
						totalSteps={4}
						steps={[
							{ id: 'details', label: 'Details' },
							{ id: 'content', label: 'Content' },
							{ id: 'audience', label: 'Audience' },
							{ id: 'review', label: 'Review' },
						]}
					/>
					<main className="flex-1 overflow-y-auto px-space-2xl">
						<div className="max-w-2xl">
							<h3 className="font-medium mb-4">Email Content</h3>
							<div className="space-y-4">
								<div className="h-8 bg-bg rounded w-full" />
								<div className="h-32 bg-bg rounded w-full" />
							</div>
						</div>
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}

/** Panel-only layout without primary navigation rail */
export function SidebarPanelOnlyLayoutPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
			<div className="flex h-[360px] w-full bg-bg border border-border rounded-lg overflow-hidden">
				<SidebarPanel logo={<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>
							<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />
						</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Dashboard"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
							isActive
						/>
						<SidebarItem label="Contacts" iconOutlined={MdOutlinePeople} iconFilled={MdPeople}>
							<SidebarSubItem label="All Contacts" />
							<SidebarSubItem label="Segments" />
						</SidebarItem>
					</SidebarPanelContent>
					<SidebarPanelFooter>
						<div className="flex gap-2">
							<IconButton aria-label="Help" variant="ghost" size="sm" icon={<MdHelpOutline />} />
							<IconButton
								aria-label="Settings"
								variant="ghost"
								size="sm"
								icon={<MdOutlineSettings />}
							/>
						</div>
					</SidebarPanelFooter>
				</SidebarPanel>
				<div className="flex-1 p-6">
					<div className="bg-panel p-4 rounded-lg">
						<p className="text-sm text-ink-light">Panel-only layout — no primary icon rail.</p>
					</div>
				</div>
			</div>
		</SidebarProvider>
	);
}

/** useSidebar hook demo */
export function UseSidebarHookPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
			<div className="flex h-[360px] bg-bg border border-border rounded-lg overflow-hidden">
				<SidebarPanel logo={<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>
							<img src="/marmo-icon.svg" alt="Marmo" className="size-7" />
						</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Dashboard"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
							isActive
						/>
						<SidebarItem label="Contacts" iconOutlined={MdOutlinePeople} iconFilled={MdPeople} />
					</SidebarPanelContent>
				</SidebarPanel>
				<div className="flex-1 flex flex-col overflow-hidden">
					<PageSection pageTitle="useSidebar Demo" showSidebarToggle />
					<main className="flex-1 p-6 overflow-y-auto">
						<SidebarStateDisplay />
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}

function SidebarStateDisplay() {
	const sidebar = useSidebar();

	return (
		<div className="bg-panel p-4 rounded-lg space-y-2 text-sm font-mono">
			<div>
				secondaryIsOpen:{' '}
				<span className="text-primary-solid">{String(sidebar.secondaryIsOpen)}</span>
			</div>
			<div>
				activeMainItem:{' '}
				<span className="text-primary-solid">{sidebar.activeMainItem || 'null'}</span>
			</div>
			<div>
				activeSecondaryItem:{' '}
				<span className="text-primary-solid">{sidebar.activeSecondaryItem || 'null'}</span>
			</div>
			<div>
				activeSubItem: <span className="text-primary-solid">{sidebar.activeSubItem || 'null'}</span>
			</div>
			<div className="pt-2">
				<Button size="sm" variant="secondary" onClick={sidebar.toggleSecondary}>
					Toggle Sidebar
				</Button>
			</div>
		</div>
	);
}
