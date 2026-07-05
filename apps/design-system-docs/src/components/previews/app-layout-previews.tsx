'use client';

import {
	AppLayout,
	Badge,
	Box,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	SidebarBrand,
	SidebarItem,
	SidebarPanel,
	SidebarPanelContent,
	SidebarPanelHeader,
	SidebarSectionLabel,
	SidebarSubItem,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@marmoui/ui';
import type { NavigationItem } from '@marmoui/ui';
import {
	MdApps,
	MdBarChart,
	MdDashboard,
	MdGridView,
	MdInbox,
	MdOutlineApps,
	MdOutlineBarChart,
	MdOutlineDashboard,
	MdOutlineForum,
	MdOutlineGridView,
	MdOutlineInbox,
	MdOutlineSettings,
	MdSettings,
} from 'react-icons/md';

const dualNavItems: NavigationItem[] = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		icon: MdDashboard,
		onClick: () => {},
		children: [
			{
				id: 'overview',
				label: 'Overview',
				iconOutlined: MdOutlineDashboard,
				iconFilled: MdDashboard,
				onClick: () => {},
			},
		],
	},
	{
		id: 'apps',
		label: 'Apps',
		icon: MdApps,
		onClick: () => {},
		children: [
			{
				id: 'inbox',
				label: 'Inbox',
				iconOutlined: MdOutlineInbox,
				iconFilled: MdInbox,
				onClick: () => {},
			},
			{
				id: 'chat',
				label: 'Chat',
				iconOutlined: MdOutlineForum,
				iconFilled: MdOutlineForum,
				onClick: () => {},
			},
		],
	},
];

/** Layout 2 — horizontal nav items rendered UNDER the header. */
const hiddenLayoutNavItems: NavigationItem[] = [
	{ id: 'dashboard', label: 'Dashboard', icon: MdDashboard, onClick: () => {} },
	{ id: 'projects', label: 'Projects', icon: MdGridView, onClick: () => {} },
	{ id: 'apps', label: 'Apps', icon: MdApps, onClick: () => {} },
	{ id: 'reports', label: 'Reports', icon: MdBarChart, onClick: () => {} },
	{ id: 'settings', label: 'Settings', icon: MdSettings, onClick: () => {} },
];

function CollapsibleSidebar() {
	return (
		<SidebarPanel appearance="dark">
			<SidebarPanelHeader>
				<SidebarBrand inverted />
			</SidebarPanelHeader>
			<SidebarPanelContent>
				<SidebarSectionLabel>Components</SidebarSectionLabel>
				<SidebarItem
					label="Dashboard"
					iconOutlined={MdOutlineDashboard}
					iconFilled={MdDashboard}
					isActive
				>
					<SidebarSubItem label="Overview" isActive />
					<SidebarSubItem label="Analytics" />
				</SidebarItem>
				<SidebarItem label="Layouts" iconOutlined={MdOutlineGridView} iconFilled={MdGridView} />
				<SidebarItem label="Apps" iconOutlined={MdOutlineApps} iconFilled={MdApps} />
				<SidebarSectionLabel className="mt-space-md">More</SidebarSectionLabel>
				<SidebarItem label="Reports" iconOutlined={MdOutlineBarChart} iconFilled={MdBarChart} />
				<SidebarItem label="Settings" iconOutlined={MdOutlineSettings} iconFilled={MdSettings} />
			</SidebarPanelContent>
		</SidebarPanel>
	);
}

function ProjectsGrid() {
	const projects = [
		{ name: 'Marketing site refresh', status: 'Active', updated: '2 hours ago' },
		{ name: 'Mobile onboarding', status: 'In review', updated: 'Yesterday' },
		{ name: 'Analytics dashboard', status: 'Active', updated: '3 days ago' },
	];

	return (
		<div className="flex flex-1 flex-col gap-space-md overflow-y-auto px-space-2xl py-space-md">
			<Tabs defaultValue="recent">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="recent">Recent</TabsTrigger>
					<TabsTrigger value="starred">Starred</TabsTrigger>
				</TabsList>
				<TabsContent value="recent" className="mt-space-md">
					<div className="grid gap-space-md md:grid-cols-2 xl:grid-cols-3">
						{projects.map(project => (
							<Card key={project.name}>
								<CardHeader className="pb-space-xs">
									<div className="flex items-start justify-between gap-space-sm">
										<CardTitle className="text-heading-sm">{project.name}</CardTitle>
										<Badge variant="normal">{project.status}</Badge>
									</div>
									<CardDescription>Updated {project.updated}</CardDescription>
								</CardHeader>
								<CardContent className="pt-0 text-body-sm text-ink-muted">3/6 tasks complete</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

function LayoutPreviewFrame({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-[620px] w-full overflow-hidden rounded-xl border border-border-secondary bg-panel shadow-sm">
			{children}
		</div>
	);
}

/** Layout 1 — sidebar-collapsible + PageSection default */
export function AppLayoutSidebarCollapsiblePreview() {
	return (
		<LayoutPreviewFrame>
			<AppLayout
				layout="sidebar-collapsible"
				sidebar={<CollapsibleSidebar />}
				pageSection={{
					breadcrumbs: [{ label: 'Projects' }],
					searchPlaceholder: 'Search',
				}}
				sidebarConfig={{ defaultSecondaryOpen: true }}
			>
				<ProjectsGrid />
			</AppLayout>
		</LayoutPreviewFrame>
	);
}

/** Layout 2 — sidebar-hidden + PageSection workspace (nav under header) */
export function AppLayoutSidebarHiddenPreview() {
	return (
		<LayoutPreviewFrame>
			<AppLayout
				layout="sidebar-hidden"
				mainNavItems={hiddenLayoutNavItems}
				pageSection={{
					pageTitle: 'Projects',
					searchPlaceholder: 'Search',
				}}
				sidebarConfig={{ defaultSecondaryOpen: true }}
			>
				<ProjectsGrid />
			</AppLayout>
		</LayoutPreviewFrame>
	);
}

/** Layout 3 — top-nav + PageSection global (mega menu) */
export function AppLayoutTopNavPreview() {
	return (
		<LayoutPreviewFrame>
			<AppLayout
				layout="top-nav"
				pageSection={{
					globalNavItems: [
						{
							label: 'Dashboards',
							hasMenu: true,
							isActive: true,
							menu: [
								{
									label: 'Analytics',
									links: [
										{ label: 'Overview', description: 'High-level KPIs and trends' },
										{ label: 'Funnel', description: 'Lead lifecycle funnel' },
										{ label: 'Cohorts', description: 'Retention by cohort' },
									],
								},
								{
									label: 'Operations',
									links: [
										{ label: 'Pipeline', description: 'Deal pipeline health' },
										{ label: 'Activity', description: 'Team activity feed' },
									],
								},
							],
						},
						{
							label: 'Components',
							hasMenu: true,
							menu: [
								{
									links: [
										{ label: 'Forms', description: 'Inputs, fields, validation' },
										{ label: 'Tables', description: 'TanStack Table data grids' },
										{ label: 'Feedback', description: 'Toasts, dialogs, alerts' },
									],
								},
								{
									links: [
										{ label: 'Navigation', description: 'Tabs, breadcrumbs, sidebar' },
										{ label: 'Charts', description: 'Bar, donut, funnel charts' },
									],
								},
							],
						},
						{ label: 'Templates', href: '#' },
					],
				}}
			>
				<ProjectsGrid />
			</AppLayout>
		</LayoutPreviewFrame>
	);
}

/** Layout 4 — dual-sidebar + PageSection compact */
export function AppLayoutDualSidebarPreview() {
	return (
		<LayoutPreviewFrame>
			<AppLayout
				layout="dual-sidebar"
				mainNavItems={dualNavItems}
				pageSection={{ pageTitle: 'Projects' }}
				sidebarConfig={{ defaultSecondaryOpen: true, defaultMainItem: 'apps' }}
			>
				<ProjectsGrid />
			</AppLayout>
		</LayoutPreviewFrame>
	);
}

/** All four layouts in a selector grid for docs */
export function AppLayoutComparisonPreview() {
	return (
		<Box className="grid gap-space-xl">
			<div>
				<h3 className="mb-space-sm text-heading-sm font-semibold text-ink-dark">1. sidebar-collapsible</h3>
				<AppLayoutSidebarCollapsiblePreview />
			</div>
			<div>
				<h3 className="mb-space-sm text-heading-sm font-semibold text-ink-dark">2. sidebar-hidden</h3>
				<AppLayoutSidebarHiddenPreview />
			</div>
			<div>
				<h3 className="mb-space-sm text-heading-sm font-semibold text-ink-dark">3. top-nav</h3>
				<AppLayoutTopNavPreview />
			</div>
			<div>
				<h3 className="mb-space-sm text-heading-sm font-semibold text-ink-dark">4. dual-sidebar</h3>
				<AppLayoutDualSidebarPreview />
			</div>
		</Box>
	);
}
