import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	SideNavigation,
	SidebarProvider,
} from '@marmoui/ui';
import type { NavigationItem } from '@marmoui/ui';
import {
	SquaresFour,
	Megaphone,
	AddressBook,
	GearSix,
	Folder,
	Envelope,
	Sparkle,
	Users,
} from '@phosphor-icons/react';

// Phosphor weight wrappers — the SideNavigation `iconDuotone`/`iconOutlined`/
// `iconFilled` slots take a component type and render it with className only,
// so the weight must be baked into the component here.
//   - Dashboard / analytics icons → duotone (two-tone) per product policy.
//   - Primary nav icons → regular (default) for the duotone/active slot here.
//   - Secondary nav: regular for default, fill for the active/hover variant.
const DashboardDuotone = (props: React.ComponentProps<'svg'>) => (
	<SquaresFour weight="duotone" {...props} />
);
const CampaignDuotone = (props: React.ComponentProps<'svg'>) => (
	<Megaphone weight="duotone" {...props} />
);
const ContactsDuotone = (props: React.ComponentProps<'svg'>) => (
	<AddressBook weight="duotone" {...props} />
);
const SettingsDuotone = (props: React.ComponentProps<'svg'>) => (
	<GearSix weight="duotone" {...props} />
);

// Regular (default weight) variants for the primary icon slot.
const DashboardRegular = (props: React.ComponentProps<'svg'>) => (
	<SquaresFour {...props} />
);
const CampaignRegular = (props: React.ComponentProps<'svg'>) => (
	<Megaphone {...props} />
);
const ContactsRegular = (props: React.ComponentProps<'svg'>) => (
	<AddressBook {...props} />
);
const SettingsRegular = (props: React.ComponentProps<'svg'>) => (
	<GearSix {...props} />
);

// Filled (solid) variants — active/hover state of secondary nav items.
const DashboardFilled = (props: React.ComponentProps<'svg'>) => (
	<SquaresFour weight="fill" {...props} />
);
const CampaignFilled = (props: React.ComponentProps<'svg'>) => (
	<Megaphone weight="fill" {...props} />
);
const ContactsFilled = (props: React.ComponentProps<'svg'>) => (
	<AddressBook weight="fill" {...props} />
);
const SettingsFilled = (props: React.ComponentProps<'svg'>) => (
	<GearSix weight="fill" {...props} />
);
const AnalyticsFilled = (props: React.ComponentProps<'svg'>) => (
	<SquaresFour weight="fill" {...props} />
);
const EmailFilled = (props: React.ComponentProps<'svg'>) => (
	<Envelope weight="fill" {...props} />
);
const AutomationsFilled = (props: React.ComponentProps<'svg'>) => (
	<Sparkle weight="fill" {...props} />
);
const FolderFilled = (props: React.ComponentProps<'svg'>) => (
	<Folder weight="fill" {...props} />
);
const PeopleFilled = (props: React.ComponentProps<'svg'>) => (
	<Users weight="fill" {...props} />
);

// Navigation items for stories
const mockMainNavItems: NavigationItem[] = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		icon: DashboardDuotone,
		iconOutlined: DashboardRegular,
		iconDuotone: DashboardDuotone,
		onClick: () => console.log('Dashboard clicked'),
		children: [
			{
				id: 'overview',
				label: 'Overview',
				iconOutlined: DashboardRegular,
				iconFilled: DashboardFilled,
				onClick: () => console.log('Overview clicked'),
			},
			{
				id: 'analytics',
				label: 'Analytics',
				iconOutlined: DashboardRegular,
				iconFilled: AnalyticsFilled,
				onClick: () => console.log('Analytics clicked'),
			},
		],
	},
	{
		id: 'campaigns',
		label: 'Campaigns',
		icon: CampaignDuotone,
		iconOutlined: CampaignRegular,
		iconDuotone: CampaignDuotone,
		onClick: () => console.log('Campaigns clicked'),
		children: [
			{
				id: 'all-campaigns',
				label: 'All Campaigns',
				iconOutlined: CampaignRegular,
				iconFilled: CampaignFilled,
				onClick: () => console.log('All Campaigns clicked'),
			},
			{
				id: 'create-campaign',
				label: 'Create Campaign',
				iconOutlined: CampaignRegular,
				iconFilled: CampaignFilled,
				onClick: () => console.log('Create Campaign clicked'),
			},
		],
	},
	{
		id: 'contacts',
		label: 'Contacts',
		icon: ContactsDuotone,
		iconOutlined: ContactsRegular,
		iconDuotone: ContactsDuotone,
		onClick: () => console.log('Contacts clicked'),
		children: [
			{
				id: 'all-contacts',
				label: 'All Contacts',
				iconOutlined: ContactsRegular,
				iconFilled: ContactsFilled,
				onClick: () => console.log('All Contacts clicked'),
			},
			{
				id: 'segments',
				label: 'Segments',
				iconOutlined: ContactsRegular,
				iconFilled: PeopleFilled,
				onClick: () => console.log('Segments clicked'),
				subItems: [
					{
						id: 'segment-1',
						label: 'VIP Customers',
						onClick: () => console.log('VIP Customers clicked'),
					},
					{ id: 'segment-2', label: 'New Leads', onClick: () => console.log('New Leads clicked') },
				],
			},
		],
	},
	{
		id: 'settings',
		label: 'Settings',
		icon: SettingsDuotone,
		iconOutlined: SettingsRegular,
		iconDuotone: SettingsDuotone,
		onClick: () => console.log('Settings clicked'),
		children: [
			{
				id: 'general',
				label: 'General',
				iconOutlined: SettingsRegular,
				iconFilled: SettingsFilled,
				onClick: () => console.log('General clicked'),
			},
		],
	},
];

const meta = {
	title: 'Layout/Sidebar',
	component: SideNavigation,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
# Sidebar

A comprehensive navigation sidebar with primary and secondary navigation panels.

## Features

- **Primary Navigation**: Main nav items as icon buttons
- **Secondary Navigation**: Expandable panel with detailed items
- **Sub-navigation**: Nested items within secondary items
- **State Management**: Built-in via SidebarProvider
- **Animations**: Smooth transitions for expand/collapse

## Usage

\`\`\`tsx
import { SideNavigation, SidebarProvider } from '@marmoui/ui';
import { SquaresFour } from '@phosphor-icons/react';

const DashboardDuotone = (props) => <SquaresFour weight="duotone" {...props} />;

const navItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: DashboardDuotone,
    iconOutlined: SquaresFour,
    iconDuotone: DashboardDuotone,
    onClick: () => {},
    children: [
      {
        id: 'overview',
        label: 'Overview',
        iconOutlined: SquaresFour,
        iconFilled: (props) => <SquaresFour weight="fill" {...props} />,
        onClick: () => {},
      },
    ],
  },
];

<SidebarProvider mainNavItems={navItems}>
  <SideNavigation />
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

// ============================================
// Default
// ============================================

export const Default: Story = {
	name: 'Default',
	parameters: {
		docs: {
			description: {
				story: 'Default sidebar with secondary panel open.',
			},
			source: {
				code: `
<SidebarProvider mainNavItems={navItems} config={{ defaultSecondaryOpen: true }}>
  <SideNavigation />
</SidebarProvider>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-bg min-h-screen">
			<SideNavigation />
		</div>
	),
};

// ============================================
// Secondary Closed
// ============================================

export const SecondaryClosed: Story = {
	name: 'Collapsed',
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={mockMainNavItems} config={{ defaultSecondaryOpen: false }}>
				<Story />
			</SidebarProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: 'Sidebar with secondary panel collapsed, showing only primary icons.',
			},
			source: {
				code: `
<SidebarProvider mainNavItems={navItems} config={{ defaultSecondaryOpen: false }}>
  <SideNavigation />
</SidebarProvider>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-bg min-h-screen">
			<SideNavigation />
		</div>
	),
};

// ============================================
// With Sub Items
// ============================================

export const WithSubItems: Story = {
	name: 'With Sub Items',
	parameters: {
		docs: {
			description: {
				story: 'Navigation items can have nested sub-items for deeper hierarchy.',
			},
			source: {
				code: `
const navItems: NavigationItem[] = [
  {
    id: 'contacts',
    label: 'Contacts',
    icon: (props) => <AddressBook weight="duotone" {...props} />,
    iconOutlined: AddressBook,
    iconDuotone: (props) => <AddressBook weight="duotone" {...props} />,
    children: [
      {
        id: 'segments',
        label: 'Segments',
        iconOutlined: AddressBook,
        iconFilled: (props) => <AddressBook weight="fill" {...props} />,
        subItems: [
          { id: 'vip', label: 'VIP Customers', onClick: () => {} },
          { id: 'leads', label: 'New Leads', onClick: () => {} },
        ],
      },
    ],
  },
];
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-bg min-h-screen">
			<SideNavigation />
		</div>
	),
};

// ============================================
// Minimal Navigation
// ============================================

export const MinimalNavigation: Story = {
	name: 'Minimal',
	decorators: [
		Story => (
			<SidebarProvider
				mainNavItems={[
					{
						id: 'dashboard',
						label: 'Dashboard',
						icon: DashboardDuotone,
						iconOutlined: DashboardRegular,
						iconDuotone: DashboardDuotone,
						onClick: () => console.log('Dashboard clicked'),
						children: [
							{
								id: 'overview',
								label: 'Overview',
								iconOutlined: DashboardRegular,
								iconFilled: DashboardFilled,
								onClick: () => console.log('Overview clicked'),
							},
						],
					},
				]}
				config={{ defaultSecondaryOpen: true }}
			>
				<Story />
			</SidebarProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: 'Minimal sidebar with a single navigation item.',
			},
			source: {
				code: `
<SidebarProvider
  mainNavItems={[
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: DashboardDuotone,
      iconOutlined: DashboardRegular,
      iconDuotone: DashboardDuotone,
      children: [
        { id: 'overview', label: 'Overview', ... },
      ],
    },
  ]}
>
  <SideNavigation />
</SidebarProvider>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-bg min-h-screen">
			<SideNavigation />
		</div>
	),
};

// Extended navigation with more items
const extendedNavItems: NavigationItem[] = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		icon: DashboardDuotone,
		iconOutlined: DashboardRegular,
		iconDuotone: DashboardDuotone,
		onClick: () => console.log('Dashboard clicked'),
		children: [
			{
				id: 'overview',
				label: 'Overview',
				iconOutlined: DashboardRegular,
				iconFilled: DashboardFilled,
				onClick: () => {},
			},
			{
				id: 'analytics',
				label: 'Analytics',
				iconOutlined: DashboardRegular,
				iconFilled: AnalyticsFilled,
				onClick: () => {},
			},
		],
	},
	{
		id: 'campaigns',
		label: 'Campaigns',
		icon: CampaignDuotone,
		iconOutlined: CampaignRegular,
		iconDuotone: CampaignDuotone,
		onClick: () => console.log('Campaigns clicked'),
		children: [
			{
				id: 'all-campaigns',
				label: 'All Campaigns',
				iconOutlined: CampaignRegular,
				iconFilled: CampaignFilled,
				onClick: () => {},
			},
			{
				id: 'email-campaigns',
				label: 'Email Campaigns',
				iconOutlined: (props: React.ComponentProps<'svg'>) => <Envelope {...props} />,
				iconFilled: EmailFilled,
				onClick: () => {},
				subItems: [
					{ id: 'drafts', label: 'Drafts', onClick: () => {} },
					{ id: 'scheduled', label: 'Scheduled', onClick: () => {} },
					{ id: 'sent', label: 'Sent', onClick: () => {} },
				],
			},
			{
				id: 'automations',
				label: 'Automations',
				iconOutlined: (props: React.ComponentProps<'svg'>) => <Sparkle {...props} />,
				iconFilled: AutomationsFilled,
				onClick: () => {},
			},
		],
	},
	{
		id: 'contacts',
		label: 'Contacts',
		icon: ContactsDuotone,
		iconOutlined: ContactsRegular,
		iconDuotone: ContactsDuotone,
		onClick: () => {},
		children: [
			{
				id: 'all-contacts',
				label: 'All Contacts',
				iconOutlined: ContactsRegular,
				iconFilled: ContactsFilled,
				onClick: () => {},
			},
			{
				id: 'segments',
				label: 'Segments',
				iconOutlined: ContactsRegular,
				iconFilled: PeopleFilled,
				onClick: () => {},
				subItems: [
					{ id: 'segment-1', label: 'VIP Customers', onClick: () => {} },
					{ id: 'segment-2', label: 'New Leads', onClick: () => {} },
					{ id: 'segment-3', label: 'Inactive Users', onClick: () => {} },
				],
			},
		],
	},
	{
		id: 'content',
		label: 'Content',
		icon: (props: React.ComponentProps<'svg'>) => <Folder weight="fill" {...props} />,
		iconOutlined: (props: React.ComponentProps<'svg'>) => <Folder {...props} />,
		onClick: () => {},
		children: [
			{
				id: 'templates',
				label: 'Templates',
				iconOutlined: (props: React.ComponentProps<'svg'>) => <Folder {...props} />,
				iconFilled: FolderFilled,
				onClick: () => {},
			},
		],
	},
	{
		id: 'settings',
		label: 'Settings',
		icon: SettingsDuotone,
		iconOutlined: SettingsRegular,
		iconDuotone: SettingsDuotone,
		onClick: () => {},
		children: [
			{
				id: 'general',
				label: 'General',
				iconOutlined: SettingsRegular,
				iconFilled: SettingsFilled,
				onClick: () => {},
			},
		],
	},
];

// ============================================
// Extended Navigation
// ============================================

export const ExtendedNavigation: Story = {
	name: 'Extended',
	decorators: [
		Story => (
			<SidebarProvider mainNavItems={extendedNavItems} config={{ defaultSecondaryOpen: true }}>
				<Story />
			</SidebarProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: 'Full navigation with multiple items, sub-items, and nested sub-items.',
			},
			source: {
				code: `
const extendedNavItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: DashboardDuotone,
    iconDuotone: DashboardDuotone,
    children: [
      { id: 'overview', label: 'Overview', ... },
      { id: 'analytics', label: 'Analytics', ... },
    ],
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    children: [
      { id: 'all-campaigns', label: 'All Campaigns', ... },
      {
        id: 'email-campaigns',
        label: 'Email Campaigns',
        subItems: [
          { id: 'drafts', label: 'Drafts' },
          { id: 'scheduled', label: 'Scheduled' },
          { id: 'sent', label: 'Sent' },
        ],
      },
    ],
  },
  // ... more items
];

<SidebarProvider mainNavItems={extendedNavItems}>
  <SideNavigation />
</SidebarProvider>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-bg min-h-screen">
			<SideNavigation />
		</div>
	),
};
