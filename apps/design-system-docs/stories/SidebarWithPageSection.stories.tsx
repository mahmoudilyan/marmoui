import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SideNavigation, SidebarProvider, PageSection, PageSectionWizard } from '@marmoui/ui';
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

// Mock navigation items
const mockMainNavItems: NavigationItem[] = [
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
				id: 'create-campaign',
				label: 'Create Campaign',
				iconOutlined: MdOutlineCampaign,
				iconFilled: MdCampaign,
				onClick: () => console.log('Create Campaign clicked'),
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
	title: 'Layout/Sidebar with Page Section',
	component: SideNavigation,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
# Sidebar with Page Section

A complete layout example showing the Sidebar component integrated with PageSection and page content. This demonstrates the typical application layout pattern.

## Features

- **Full Layout**: Sidebar navigation with page header and content area
- **Integration**: PageSection integrates with Sidebar for toggle functionality
- **Responsive**: Adapts to sidebar state changes
- **Content Area**: Demonstrates proper content layout with sidebar

## Usage

\`\`\`tsx
<SidebarProvider mainNavItems={navItems}>
  <div className="flex">
    <SideNavigation />
    <div className="flex-1">
      <PageSection pageTitle="Dashboard" showSidebarToggle />
      <main className="p-6">
        {/* Your content here */}
      </main>
    </div>
  </div>
</SidebarProvider>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={mockMainNavItems} config={{ defaultSecondaryOpen: true }}>
				<Story />
			</SidebarProvider>
		),
	],
} satisfies Meta<typeof SideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicLayout: Story = {
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSection pageTitle="Dashboard" showSidebarToggle />
				<main className="flex-1 p-6">
					<div className="max-w-4xl">
						<h2 className="text-2xl font-semibold mb-4">Welcome to Dashboard</h2>
						<p className="text-ink-secondary mb-6">
							This is a complete layout example showing the Sidebar integrated with PageSection and
							content area.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-panel p-4 rounded-lg">
								<h3 className="font-medium mb-2">Total Campaigns</h3>
								<p className="text-2xl font-semibold">24</p>
							</div>
							<div className="bg-panel p-4 rounded-lg">
								<h3 className="font-medium mb-2">Active Contacts</h3>
								<p className="text-2xl font-semibold">1,234</p>
							</div>
							<div className="bg-panel p-4 rounded-lg">
								<h3 className="font-medium mb-2">Open Rate</h3>
								<p className="text-2xl font-semibold">23.5%</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

export const WithBreadcrumbs: Story = {
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSection
					breadcrumbs={[
						{ label: 'Home', href: '/' },
						{ label: 'Campaigns', href: '/campaigns' },
						{ label: 'Email Campaign' },
					]}
					showSidebarToggle
				/>
				<main className="flex-1 p-6">
					<div className="max-w-4xl">
						<h2 className="text-2xl font-semibold mb-4">Email Campaign</h2>
						<p className="text-ink-secondary mb-6">
							Campaign details and management interface with breadcrumb navigation.
						</p>
						<div className="bg-panel p-6 rounded-lg">
							<h3 className="font-medium mb-4">Campaign Information</h3>
							<div className="space-y-3">
								<div>
									<label className="text-sm text-ink-secondary">Campaign Name</label>
									<p className="font-medium">Summer Sale 2024</p>
								</div>
								<div>
									<label className="text-sm text-ink-secondary">Status</label>
									<p className="font-medium">Active</p>
								</div>
								<div>
									<label className="text-sm text-ink-secondary">Recipients</label>
									<p className="font-medium">5,234 contacts</p>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

export const WithActions: Story = {
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSection
					pageTitle="User Management"
					showSidebarToggle
					primaryAction={{
						label: 'Add User',
						onClick: () => alert('Add user clicked'),
					}}
					secondaryActions={[
						{
							label: 'Import Users',
							onClick: () => alert('Import clicked'),
						},
						{
							label: 'Export CSV',
							onClick: () => alert('Export clicked'),
						},
					]}
				/>
				<main className="flex-1 p-6">
					<div className="max-w-6xl">
						<div className="bg-panel rounded-lg overflow-hidden">
							<table className="w-full">
								<thead className="bg-panel border-b border-secondary">
									<tr>
										<th className="text-left p-4 font-medium">Name</th>
										<th className="text-left p-4 font-medium">Email</th>
										<th className="text-left p-4 font-medium">Role</th>
										<th className="text-left p-4 font-medium">Status</th>
									</tr>
								</thead>
								<tbody>
									{[1, 2, 3, 4, 5].map(i => (
										<tr key={i} className="border-b border-secondary">
											<td className="p-4">User {i}</td>
											<td className="p-4 text-ink-secondary">user{i}@example.com</td>
											<td className="p-4 text-ink-secondary">Admin</td>
											<td className="p-4">
												<span className="px-2 py-1 bg-success-muted text-success rounded text-sm">
													Active
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

export const CollapsedSecondary: Story = {
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={mockMainNavItems} config={{ defaultSecondaryOpen: false }}>
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
						<h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
						<p className="text-ink-secondary mb-6">
							This example shows the layout with the secondary sidebar collapsed. Use the toggle
							button in the PageSection to expand it.
						</p>
						<div className="bg-panel p-6 rounded-lg">
							<p className="text-ink-secondary">
								The sidebar toggle button appears when the secondary panel is closed, allowing users
								to reopen it.
							</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

export const CreateWizardVariant: Story = {
	render: () => (
		<div className="bg-bg min-h-screen flex">
			<SideNavigation />
			<div className="flex-1 flex flex-col">
				<PageSectionWizard
					title="Create Campaign"
					showSidebarToggle
					steps={[
						{ id: 'basic', label: 'Basic Information' },
						{ id: 'settings', label: 'Settings' },
						{ id: 'review', label: 'Review' },
					]}
					currentStep={0}
					totalSteps={3}
				/>
				<main className="flex-1 p-6">
					<div className="max-w-2xl">
						<div className="bg-panel p-6 rounded-lg space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">Campaign Name</label>
								<input
									type="text"
									className="w-full px-3 py-2 border border-secondary rounded bg-bg"
									placeholder="Enter campaign name"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Description</label>
								<textarea
									className="w-full px-3 py-2 border border-secondary rounded bg-bg"
									rows={4}
									placeholder="Enter campaign description"
								/>
							</div>
							<div className="flex justify-end gap-2 pt-4">
								<button className="px-4 py-2 border border-secondary rounded hover:bg-panel">
									Cancel
								</button>
								<button className="px-4 py-2 bg-primary text-white rounded hover:opacity-90">
									Next Step
								</button>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};

// Extended navigation items for more complex layouts
const extendedNavItems: NavigationItem[] = [
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

export const FullLayoutWithExtendedNav: Story = {
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={extendedNavItems} config={{ defaultSecondaryOpen: true }}>
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
				/>
				<main className="flex-1 p-6">
					<div className="max-w-6xl">
						<div className="bg-panel rounded-lg overflow-hidden">
							<div className="p-4 border-b border-secondary">
								<h3 className="font-semibold text-lg">Draft Campaigns</h3>
								<p className="text-sm text-ink-secondary mt-1">Manage your draft email campaigns</p>
							</div>
							<div className="p-4">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{[1, 2, 3, 4, 5, 6].map(i => (
										<div key={i} className="bg-bg p-4 rounded-lg border border-secondary">
											<h4 className="font-medium mb-2">Campaign Draft {i}</h4>
											<p className="text-sm text-ink-secondary mb-3">Last edited 2 days ago</p>
											<div className="flex gap-2">
												<button className="px-3 py-1 text-sm border border-secondary rounded hover:bg-panel">
													Edit
												</button>
												<button className="px-3 py-1 text-sm bg-primary text-white rounded hover:opacity-90">
													Send
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

export const LayoutWithExpandedSubItems: Story = {
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={extendedNavItems} config={{ defaultSecondaryOpen: true }}>
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
				/>
				<main className="flex-1 p-6">
					<div className="max-w-4xl">
						<div className="bg-panel p-6 rounded-lg">
							<h2 className="text-xl font-semibold mb-4">Drafts</h2>
							<p className="text-ink-secondary mb-6">
								This layout demonstrates the sidebar with expanded sub-items. The Email Campaigns
								item in the sidebar has sub-items (Drafts, Scheduled, Sent) that can be expanded.
							</p>
							<div className="space-y-3">
								{[1, 2, 3].map(i => (
									<div key={i} className="p-4 bg-bg rounded-lg border border-secondary">
										<h3 className="font-medium">Draft Campaign {i}</h3>
										<p className="text-sm text-ink-secondary mt-1">
											Click on "Email Campaigns" in the sidebar to see the sub-items.
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	),
};
