'use client';

import {
	SidebarProvider,
	SidebarPanel,
	SidebarPanelHeader,
	SidebarPanelContent,
	SidebarPanelTitle,
	SidebarItem,
	SidebarSubItem,
	PageSection,
} from '@marmoui/ui';

function PreviewProvider({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
			{children}
		</SidebarProvider>
	);
}
import {
	MdOutlineDashboard,
	MdDashboard,
	MdPeopleOutline,
	MdPeople,
	MdOutlineCampaign,
	MdCampaign,
	MdOutlineSettings,
	MdSettings,
	MdOutlineFolder,
	MdFolder,
} from 'react-icons/md';

export function SidebarBasicPreview() {
	return (
		<PreviewProvider>
			<div className="w-full border border-secondary overflow-hidden">
				<SidebarPanel>
					<SidebarPanelHeader>
						<SidebarPanelTitle>Dashboard</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem label="Overview" isActive />
						<SidebarItem label="Analytics" />
						<SidebarItem label="Reports" />
					</SidebarPanelContent>
				</SidebarPanel>
			</div>
		</PreviewProvider>
	);
}

export function SidebarWithIconsPreview() {
	return (
		<PreviewProvider>
			<div className="flex h-[300px] w-full border border-secondary overflow-hidden">
				<SidebarPanel>
					<SidebarPanelHeader>
						<SidebarPanelTitle>Navigation</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Dashboard"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
							isActive
						/>
						<SidebarItem
							label="Campaigns"
							iconOutlined={MdOutlineCampaign}
							iconFilled={MdCampaign}
						/>
						<SidebarItem label="Contacts" iconOutlined={MdPeopleOutline} iconFilled={MdPeople} />
						<SidebarItem
							label="Settings"
							iconOutlined={MdOutlineSettings}
							iconFilled={MdSettings}
						/>
					</SidebarPanelContent>
				</SidebarPanel>
				<div className="flex-1 flex flex-col overflow-hidden">
					<PageSection pageTitle="Dashboard" showSidebarToggle />
				</div>
			</div>
		</PreviewProvider>
	);
}

export function SidebarNestedPreview() {
	return (
		<PreviewProvider>
			<div className="w-64 border border-border rounded-lg overflow-hidden bg-panel">
				<SidebarPanel isOpen={true}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>Contacts</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Contacts"
							iconOutlined={MdPeopleOutline}
							iconFilled={MdPeople}
							isActive
						>
							<SidebarSubItem label="All Contacts" isActive />
							<SidebarSubItem label="Segments" />
							<SidebarSubItem label="Tags" />
						</SidebarItem>
						<SidebarItem
							label="Campaigns"
							iconOutlined={MdOutlineCampaign}
							iconFilled={MdCampaign}
						/>
					</SidebarPanelContent>
				</SidebarPanel>
			</div>
		</PreviewProvider>
	);
}

export function SidebarDeepNestingPreview() {
	return (
		<PreviewProvider>
			<div className="w-64 border border-border rounded-lg overflow-hidden bg-panel">
				<SidebarPanel isOpen={true}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>Deep Nesting</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Level 1"
							iconOutlined={MdOutlineFolder}
							iconFilled={MdFolder}
							isActive
						>
							<SidebarSubItem label="Deep Item 1" isActive />
							<SidebarSubItem label="Deep Item 2" />
							<SidebarSubItem label="Deep Item 3" />
						</SidebarItem>
					</SidebarPanelContent>
				</SidebarPanel>
			</div>
		</PreviewProvider>
	);
}

export function SidebarCollapsiblePreview() {
	return (
		<PreviewProvider>
			<div className="w-64 border border-border rounded-lg overflow-hidden bg-panel">
				<SidebarPanel isOpen={true}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>Dashboard</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Overview"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
							isActive
						/>
						<SidebarItem
							label="Analytics"
							iconOutlined={MdOutlineCampaign}
							iconFilled={MdCampaign}
						/>
					</SidebarPanelContent>
				</SidebarPanel>
			</div>
		</PreviewProvider>
	);
}

export function SidebarScrollablePreview() {
	return (
		<PreviewProvider>
			<div className="w-64 h-48 border border-border rounded-lg overflow-hidden bg-panel">
				<SidebarPanel isOpen={true}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>Scrollable</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem label="Navigation Item 1" isActive />
						<SidebarItem label="Navigation Item 2" />
						<SidebarItem label="Navigation Item 3" />
						<SidebarItem label="Navigation Item 4" />
						<SidebarItem label="Navigation Item 5" />
						<SidebarItem label="Navigation Item 6" />
					</SidebarPanelContent>
				</SidebarPanel>
			</div>
		</PreviewProvider>
	);
}

export function SidebarDashboardPreview() {
	return (
		<PreviewProvider>
			<div className="w-64 border border-border rounded-lg overflow-hidden bg-panel">
				<SidebarPanel isOpen={true}>
					<SidebarPanelHeader>
						<SidebarPanelTitle>Navigation</SidebarPanelTitle>
					</SidebarPanelHeader>
					<SidebarPanelContent>
						<SidebarItem
							label="Dashboard"
							iconOutlined={MdOutlineDashboard}
							iconFilled={MdDashboard}
							isActive
						/>
						<SidebarItem label="Contacts" iconOutlined={MdPeopleOutline} iconFilled={MdPeople}>
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
			</div>
		</PreviewProvider>
	);
}
