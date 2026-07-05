import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SideNavigation, SidebarProvider, PageSection } from '@marmoui/ui';
import type { NavigationItem } from '@marmoui/ui';
import {
	MdDashboard,
	MdCampaign,
	MdPeople,
	MdAnalytics,
	MdSettings,
	MdEmail,
	MdAutoAwesome,
	MdFolder,
	MdOutlineDashboard,
	MdOutlineCampaign,
	MdOutlinePeople,
	MdOutlineAnalytics,
	MdOutlineSettings,
	MdOutlineEmail,
	MdOutlineAutoAwesome,
	MdOutlineFolder,
} from 'react-icons/md';

// Comprehensive navigation structure matching Figma designs
const comprehensiveNavItems: NavigationItem[] = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		icon: MdDashboard,
		onClick: () => console.log('Dashboard clicked'),
		children: [
			{
				id: 'overview',
				label: 'Overview',
				iconOutlined: MdOutlineDashboard,
				iconFilled: MdDashboard,
				onClick: () => console.log('Overview clicked'),
			},
			{
				id: 'analytics',
				label: 'Analytics',
				iconOutlined: MdOutlineAnalytics,
				iconFilled: MdAnalytics,
				onClick: () => console.log('Analytics clicked'),
			},
		],
	},
	{
		id: 'campaigns',
		label: 'Campaigns',
		icon: MdCampaign,
		onClick: () => console.log('Campaigns clicked'),
		children: [
			{
				id: 'all-campaigns',
				label: 'All Campaigns',
				iconOutlined: MdOutlineCampaign,
				iconFilled: MdCampaign,
				onClick: () => console.log('All Campaigns clicked'),
			},
			{
				id: 'email-campaigns',
				label: 'Email Campaigns',
				iconOutlined: MdOutlineEmail,
				iconFilled: MdEmail,
				onClick: () => console.log('Email Campaigns clicked'),
				subItems: [
					{
						id: 'drafts',
						label: 'Drafts',
						onClick: () => console.log('Drafts clicked'),
					},
					{
						id: 'scheduled',
						label: 'Scheduled',
						onClick: () => console.log('Scheduled clicked'),
					},
					{
						id: 'sent',
						label: 'Sent',
						onClick: () => console.log('Sent clicked'),
					},
					{
						id: 'archived',
						label: 'Archived',
						onClick: () => console.log('Archived clicked'),
					},
				],
			},
			{
				id: 'automations',
				label: 'Automations',
				iconOutlined: MdOutlineAutoAwesome,
				iconFilled: MdAutoAwesome,
				onClick: () => console.log('Automations clicked'),
			},
		],
	},
	{
		id: 'contacts',
		label: 'Contacts',
		icon: MdPeople,
		onClick: () => console.log('Contacts clicked'),
		children: [
			{
				id: 'all-contacts',
				label: 'All Contacts',
				iconOutlined: MdOutlinePeople,
				iconFilled: MdPeople,
				onClick: () => console.log('All Contacts clicked'),
			},
			{
				id: 'segments',
				label: 'Segments',
				iconOutlined: MdOutlinePeople,
				iconFilled: MdPeople,
				onClick: () => console.log('Segments clicked'),
				subItems: [
					{
						id: 'segment-1',
						label: 'VIP Customers',
						onClick: () => console.log('VIP Customers clicked'),
					},
					{
						id: 'segment-2',
						label: 'New Leads',
						onClick: () => console.log('New Leads clicked'),
					},
					{
						id: 'segment-3',
						label: 'Inactive Users',
						onClick: () => console.log('Inactive Users clicked'),
					},
				],
			},
		],
	},
	{
		id: 'content',
		label: 'Content',
		icon: MdFolder,
		onClick: () => console.log('Content clicked'),
		children: [
			{
				id: 'templates',
				label: 'Templates',
				iconOutlined: MdOutlineFolder,
				iconFilled: MdFolder,
				onClick: () => console.log('Templates clicked'),
			},
		],
	},
	{
		id: 'settings',
		label: 'Settings',
		icon: MdSettings,
		onClick: () => console.log('Settings clicked'),
		children: [
			{
				id: 'general',
				label: 'General',
				iconOutlined: MdOutlineSettings,
				iconFilled: MdSettings,
				onClick: () => console.log('General clicked'),
			},
		],
	},
];

const meta = {
	title: 'Layout/Sidebar Layout Variations',
	component: SideNavigation,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
# Sidebar Layout Variations

Comprehensive examples of different sidebar layout states and configurations, matching Figma design specifications.

## Layout States

1. **Primary Only**: Sidebar with only primary navigation visible
2. **Secondary Open**: Full sidebar with secondary panel expanded
3. **Secondary Closed**: Primary navigation with collapsed secondary panel
4. **With Content**: Complete layout with sidebar, page header, and content area
5. **With Expanded Sub-items**: Sidebar showing nested navigation items

## Icon Behavior

- **Main Navigation**: Uses filled Material Icons that change color on active state
- **Secondary Navigation**: Uses outlined icons by default, filled icons on hover/active
- **Sub-items**: Text-only navigation items nested under secondary items
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Layout 1: Primary sidebar only (secondary closed)
export const Layout1PrimaryOnly: Story = {
	decorators: [
		Story => (
			<SidebarProvider
				mainNavItems={comprehensiveNavItems}
				config={{ defaultSecondaryOpen: false }}
			>
				<Story />
			</SidebarProvider>
		),
	],
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSection pageTitle="Dashboard" showSidebarToggle />
				<main className="flex-1 p-6">
					<div className="max-w-4xl">
						<h2 className="text-2xl font-semibold mb-4">Primary Sidebar Only</h2>
						<p className="text-ink-secondary mb-6">
							This layout shows only the primary navigation sidebar. The secondary panel is
							collapsed. Click the toggle button in the PageSection or click a main navigation item
							to expand the secondary panel.
						</p>
						<div className="bg-panel p-6 rounded-lg">
							<p className="text-ink-secondary">
								The primary sidebar contains icon-only navigation items. Hover over them to see the
								background highlight effect.
							</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

// Layout 2: Full sidebar with secondary open
export const Layout2FullSidebar: Story = {
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={comprehensiveNavItems} config={{ defaultSecondaryOpen: true }}>
				<Story />
			</SidebarProvider>
		),
	],
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSection
					breadcrumbs={[
						{ label: 'Home', href: '/' },
						{ label: 'Campaigns', href: '/campaigns' },
					]}
					showSidebarToggle
				/>
				<main className="flex-1 p-6">
					<div className="max-w-4xl">
						<h2 className="text-2xl font-semibold mb-4">Full Sidebar Layout</h2>
						<p className="text-ink-secondary mb-6">
							This layout shows both primary and secondary navigation panels. The secondary panel
							displays detailed navigation items with icons that change on hover and active states.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="bg-panel p-4 rounded-lg">
								<h3 className="font-medium mb-2">Primary Navigation</h3>
								<p className="text-sm text-ink-secondary">
									Icon-only buttons that show filled Material Icons
								</p>
							</div>
							<div className="bg-panel p-4 rounded-lg">
								<h3 className="font-medium mb-2">Secondary Navigation</h3>
								<p className="text-sm text-ink-secondary">
									Items with labels and icons that transition from outlined to filled on hover
								</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

// Layout 3: Sidebar with expanded sub-items
export const Layout3WithSubItems: Story = {
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={comprehensiveNavItems} config={{ defaultSecondaryOpen: true }}>
				<Story />
			</SidebarProvider>
		),
	],
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSection
					breadcrumbs={[
						{ label: 'Home', href: '/' },
						{ label: 'Campaigns', href: '/campaigns' },
						{ label: 'Email Campaigns', href: '/campaigns/email' },
						{ label: 'Drafts' },
					]}
					showSidebarToggle
					primaryAction={{
						label: 'New Campaign',
						onClick: () => alert('New campaign clicked'),
					}}
				/>
				<main className="flex-1 p-6">
					<div className="max-w-4xl">
						<h2 className="text-2xl font-semibold mb-4">Sidebar with Sub-items</h2>
						<p className="text-ink-secondary mb-6">
							This layout demonstrates the sidebar with expanded sub-navigation items. Click on
							"Email Campaigns" or "Segments" in the sidebar to see the sub-items expand.
						</p>
						<div className="bg-panel p-6 rounded-lg space-y-4">
							<div>
								<h3 className="font-medium mb-2">Sub-item Navigation</h3>
								<p className="text-sm text-ink-secondary">
									Sub-items appear indented under their parent items when expanded. They use
									text-only styling and change color on hover and active states.
								</p>
							</div>
							<div className="pt-4 border-t border-secondary">
								<h4 className="font-medium mb-3">Current Page: Drafts</h4>
								<p className="text-sm text-ink-secondary">
									The active sub-item is highlighted with medium font weight and primary text color.
								</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

// Layout 4: Complete dashboard layout
export const Layout4CompleteDashboard: Story = {
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={comprehensiveNavItems} config={{ defaultSecondaryOpen: true }}>
				<Story />
			</SidebarProvider>
		),
	],
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSection
					breadcrumbs={[
						{ label: 'Home', href: '/' },
						{ label: 'Dashboard', href: '/dashboard' },
					]}
					showSidebarToggle
					primaryAction={{
						label: 'Create Campaign',
						onClick: () => alert('Create campaign clicked'),
					}}
					secondaryActions={[
						{
							label: 'Import',
							onClick: () => alert('Import clicked'),
						},
						{
							label: 'Export',
							onClick: () => alert('Export clicked'),
						},
					]}
					otherActions={[
						{
							label: 'Settings',
							onClick: () => alert('Settings clicked'),
						},
						{
							label: 'Help',
							onClick: () => alert('Help clicked'),
						},
					]}
				/>
				<main className="flex-1 p-6">
					<div className="max-w-6xl">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							<div className="bg-panel p-6 rounded-lg">
								<h3 className="text-sm font-medium text-ink-secondary mb-2">Total Campaigns</h3>
								<p className="text-3xl font-semibold">24</p>
								<p className="text-sm text-success mt-2">+12% from last month</p>
							</div>
							<div className="bg-panel p-6 rounded-lg">
								<h3 className="text-sm font-medium text-ink-secondary mb-2">Active Contacts</h3>
								<p className="text-3xl font-semibold">1,234</p>
								<p className="text-sm text-success mt-2">+8% from last month</p>
							</div>
							<div className="bg-panel p-6 rounded-lg">
								<h3 className="text-sm font-medium text-ink-secondary mb-2">Open Rate</h3>
								<p className="text-3xl font-semibold">23.5%</p>
								<p className="text-sm text-success mt-2">+2.1% from last month</p>
							</div>
						</div>
						<div className="bg-panel rounded-lg overflow-hidden">
							<div className="p-4 border-b border-secondary">
								<h3 className="font-semibold">Recent Campaigns</h3>
							</div>
							<div className="p-4">
								<div className="space-y-3">
									{[1, 2, 3, 4, 5].map(i => (
										<div key={i} className="flex items-center justify-between p-4 bg-bg rounded-lg">
											<div>
												<h4 className="font-medium">Campaign {i}</h4>
												<p className="text-sm text-ink-secondary">Sent 2 days ago</p>
											</div>
											<div className="flex items-center gap-4">
												<span className="text-sm text-ink-secondary">23.5% open rate</span>
												<button className="px-3 py-1 text-sm border border-secondary rounded hover:bg-panel">
													View
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

// Layout 5: Collapsed secondary with content
export const Layout5CollapsedSecondary: Story = {
	decorators: [
		Story => (
			<SidebarProvider
				mainNavItems={comprehensiveNavItems}
				config={{ defaultSecondaryOpen: false }}
			>
				<Story />
			</SidebarProvider>
		),
	],
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSection
					pageTitle="Campaigns"
					showSidebarToggle
					primaryAction={{
						label: 'New Campaign',
						onClick: () => alert('New campaign clicked'),
					}}
				/>
				<main className="flex-1 p-6">
					<div className="max-w-6xl">
						<div className="bg-panel rounded-lg overflow-hidden">
							<div className="p-4 border-b border-secondary flex items-center justify-between">
								<h3 className="font-semibold">All Campaigns</h3>
								<div className="flex gap-2">
									<button className="px-3 py-1 text-sm border border-secondary rounded hover:bg-bg">
										Filter
									</button>
									<button className="px-3 py-1 text-sm border border-secondary rounded hover:bg-bg">
										Sort
									</button>
								</div>
							</div>
							<div className="p-4">
								<table className="w-full">
									<thead className="border-b border-secondary">
										<tr>
											<th className="text-left p-3 font-medium text-sm">Campaign</th>
											<th className="text-left p-3 font-medium text-sm">Status</th>
											<th className="text-left p-3 font-medium text-sm">Recipients</th>
											<th className="text-left p-3 font-medium text-sm">Open Rate</th>
											<th className="text-left p-3 font-medium text-sm">Actions</th>
										</tr>
									</thead>
									<tbody>
										{[1, 2, 3, 4, 5].map(i => (
											<tr key={i} className="border-b border-secondary">
												<td className="p-3">
													<div>
														<p className="font-medium">Summer Sale Campaign {i}</p>
														<p className="text-sm text-ink-secondary">Email Campaign</p>
													</div>
												</td>
												<td className="p-3">
													<span className="px-2 py-1 bg-success-muted text-success rounded text-sm">
														Active
													</span>
												</td>
												<td className="p-3 text-ink-secondary">5,234</td>
												<td className="p-3 text-ink-secondary">23.5%</td>
												<td className="p-3">
													<button className="text-sm text-primary hover:underline">View</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};
