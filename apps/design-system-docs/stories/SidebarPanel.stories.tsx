import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SidebarPanelProps } from '@marmoui/ui';
import {
	SidebarPanel,
	SidebarPanelHeader,
	SidebarPanelContent,
	SidebarPanelFooter,
	SidebarPanelTitle,
	SidebarProvider,
	useSidebar,
	SidebarItem,
	SidebarSubItem,
	Button,
} from '@marmoui/ui';
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
	MdOutlineHelpOutline,
	MdNotificationsNone,
} from 'react-icons/md';

// ── Helpers ────────────────────────────────────────────────────────────

/** Wraps stories in a SidebarProvider so `useSidebar()` works. */
const WithSidebarProvider = (
	Story: React.ComponentType,
	{ args }: { args: Record<string, unknown> },
) => (
	<SidebarProvider
		mainNavItems={[]}
		config={{
			defaultSecondaryOpen: (args.defaultOpen as boolean) ?? true,
		}}
	>
		<Story />
	</SidebarProvider>
);

/** Layout shell — sidebar on the left, toggle button on the right. */
function PanelWrapper({ children }: { children: React.ReactNode }) {
	const { secondaryIsOpen, toggleSecondary } = useSidebar();

	return (
		<div className="h-screen w-full bg-gray-100 flex">
			{children}
			<div className="flex-1 flex items-center justify-center p-8">
				<button
					className="px-4 py-2 bg-primary-solid text-white rounded-md hover:bg-primary-solid/90 transition-colors"
					onClick={toggleSecondary}
				>
					{secondaryIsOpen ? 'Close Panel' : 'Open Panel'}
				</button>
			</div>
		</div>
	);
}

/** Inner render component — SidebarPanel reads state from the provider automatically. */
function PanelStory({
	children,
	...panelProps
}: React.ComponentProps<typeof SidebarPanel>) {
	return (
		<PanelWrapper>
			<SidebarPanel {...panelProps}>
				{children}
			</SidebarPanel>
		</PanelWrapper>
	);
}

// ── Types ──────────────────────────────────────────────────────────────

/** `defaultOpen` is a decorator-only arg passed to `SidebarProvider`, not a prop on `SidebarPanel`. */
type SidebarPanelStoryArgs = SidebarPanelProps & { defaultOpen?: boolean };

// ── Meta ───────────────────────────────────────────────────────────────

const meta: Meta<SidebarPanelStoryArgs> = {
	title: 'Layout/Sidebar/SidebarPanel',
	component: SidebarPanel,
	decorators: [WithSidebarProvider],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
# Sidebar Panel

A compound-component panel for secondary navigation, inspired by the shadcn sidebar pattern.

## Compound Components

| Component | Purpose |
|---|---|
| \`SidebarPanel\` | Outer shell — handles width animation (desktop) and Sheet overlay (mobile). |
| \`SidebarPanelHeader\` | Non-scrollable header area pinned to the top. |
| \`SidebarPanelContent\` | Scrollable middle area (\`flex-1\`, \`overflow-y-auto\`). |
| \`SidebarPanelFooter\` | Non-scrollable footer area pinned to the bottom. |
| \`SidebarPanelTitle\` | Pre-built title row with collapse/expand toggle. Reads state from \`SidebarProvider\` automatically. |

All components read \`secondaryIsOpen\` and \`toggleSecondary\` from \`SidebarProvider\` — no props to wire.
Flexbox does the layout — no child-parsing magic. Just compose the sub-components inside \`SidebarPanel\`.

## Basic Usage

\`\`\`tsx
import {
  SidebarPanel,
  SidebarPanelHeader,
  SidebarPanelContent,
  SidebarPanelFooter,
  SidebarPanelTitle,
  SidebarItem,
} from '@marmoui/ui';

<SidebarPanel>
  <SidebarPanelHeader>
    <SidebarPanelTitle>Navigation</SidebarPanelTitle>
  </SidebarPanelHeader>

  <SidebarPanelContent>
    <SidebarItem label="Dashboard" />
    <SidebarItem label="Contacts" />
  </SidebarPanelContent>

  <SidebarPanelFooter>
    <Button>Settings</Button>
  </SidebarPanelFooter>
</SidebarPanel>
\`\`\`

## Mobile Behaviour

On screens below \`768px\`, \`SidebarPanel\` automatically renders its children inside a side-sliding **Sheet** overlay. Set \`mobileMode="hidden"\` to completely hide the panel on mobile instead.
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		animationDuration: {
			control: { type: 'number', min: 0, max: 1000, step: 50 },
			description: 'Animation duration in milliseconds (desktop only)',
		},
		width: {
			control: { type: 'number', min: 160, max: 400, step: 8 },
			description: 'Panel width in pixels when open',
		},
		mobileMode: {
			control: 'radio',
			options: ['sheet', 'hidden'],
			description: 'Mobile rendering mode',
		},
	},
};

export default meta;
type Story = StoryObj<SidebarPanelStoryArgs>;

// ============================================
// Default — compound components
// ============================================

export const Default: Story = {
	name: 'Default',
	args: {
		defaultOpen: true,
		animationDuration: 300,
	},
	parameters: {
		docs: {
			description: {
				story: 'Basic panel composed with `SidebarPanelHeader`, `SidebarPanelTitle`, `SidebarPanelContent`, and `SidebarPanelFooter`.',
			},
			source: {
				code: `
<SidebarPanel>
  <SidebarPanelHeader>
    <SidebarPanelTitle>Dashboard</SidebarPanelTitle>
  </SidebarPanelHeader>

  <SidebarPanelContent>
    <SidebarItem label="Overview" />
    <SidebarItem label="Analytics" />
    <SidebarItem label="Reports" />
  </SidebarPanelContent>

  <SidebarPanelFooter>
    <Button variant="ghost" size="sm">Settings</Button>
  </SidebarPanelFooter>
</SidebarPanel>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<PanelStory>
			<SidebarPanelHeader>
				<SidebarPanelTitle>Dashboard</SidebarPanelTitle>
			</SidebarPanelHeader>

			<SidebarPanelContent>
				<SidebarItem label="Overview" />
				<SidebarItem label="Analytics" />
				<SidebarItem label="Reports" />
			</SidebarPanelContent>

			<SidebarPanelFooter>
				<Button variant="ghost" size="sm" className="w-full justify-start">
					Settings
				</Button>
			</SidebarPanelFooter>
		</PanelStory>
	),
};

// ============================================
// With Icons
// ============================================

export const WithIcons: Story = {
	name: 'With Icons',
	args: { defaultOpen: true },
	parameters: {
		docs: {
			description: {
				story: 'Panel items with outlined and filled icon variants for active states.',
			},
		},
	},
	render: function Render() {
		const [activeItem, setActiveItem] = React.useState('dashboard');

		return (
			<PanelStory>
				<SidebarPanelHeader>
					<SidebarPanelTitle>Navigation</SidebarPanelTitle>
				</SidebarPanelHeader>

				<SidebarPanelContent>
					<SidebarItem
						label="Dashboard"
						iconOutlined={MdOutlineDashboard}
						iconFilled={MdDashboard}
						isActive={activeItem === 'dashboard'}
						onClick={() => setActiveItem('dashboard')}
					/>
					<SidebarItem
						label="Campaigns"
						iconOutlined={MdOutlineCampaign}
						iconFilled={MdCampaign}
						isActive={activeItem === 'campaigns'}
						onClick={() => setActiveItem('campaigns')}
					/>
					<SidebarItem
						label="Contacts"
						iconOutlined={MdPeopleOutline}
						iconFilled={MdPeople}
						isActive={activeItem === 'contacts'}
						onClick={() => setActiveItem('contacts')}
					/>
					<SidebarItem
						label="Settings"
						iconOutlined={MdOutlineSettings}
						iconFilled={MdSettings}
						isActive={activeItem === 'settings'}
						onClick={() => setActiveItem('settings')}
					/>
				</SidebarPanelContent>
			</PanelStory>
		);
	},
};

// ============================================
// With Nested Items
// ============================================

export const WithNestedItems: Story = {
	name: 'Nested Items',
	args: { defaultOpen: true },
	parameters: {
		docs: {
			description: {
				story: 'Items can have nested sub-items for hierarchical navigation.',
			},
		},
	},
	render: function Render() {
		const [activeItem, setActiveItem] = React.useState('contacts');
		const [activeSubItem, setActiveSubItem] = React.useState('all-contacts');

		return (
			<PanelStory>
				<SidebarPanelHeader>
					<SidebarPanelTitle>Contacts</SidebarPanelTitle>
				</SidebarPanelHeader>

				<SidebarPanelContent>
					<SidebarItem
						label="Contacts"
						iconOutlined={MdPeopleOutline}
						iconFilled={MdPeople}
						isActive={activeItem === 'contacts'}
						onClick={() => {
							setActiveItem('contacts');
							setActiveSubItem('all-contacts');
						}}
					>
						<SidebarSubItem
							label="All Contacts"
							isActive={activeSubItem === 'all-contacts'}
							onClick={() => setActiveSubItem('all-contacts')}
						/>
						<SidebarSubItem
							label="Segments"
							isActive={activeSubItem === 'segments'}
							onClick={() => setActiveSubItem('segments')}
						/>
						<SidebarSubItem
							label="Tags"
							isActive={activeSubItem === 'tags'}
							onClick={() => setActiveSubItem('tags')}
						/>
					</SidebarItem>
					<SidebarItem
						label="Campaigns"
						iconOutlined={MdOutlineCampaign}
						iconFilled={MdCampaign}
						isActive={activeItem === 'campaigns'}
						onClick={() => {
							setActiveItem('campaigns');
							setActiveSubItem('active');
						}}
					>
						<SidebarSubItem
							label="Active"
							isActive={activeSubItem === 'active'}
							onClick={() => setActiveSubItem('active')}
						/>
						<SidebarSubItem
							label="Drafts"
							isActive={activeSubItem === 'drafts'}
							onClick={() => setActiveSubItem('drafts')}
						/>
						<SidebarSubItem
							label="Archived"
							isActive={activeSubItem === 'archived'}
							onClick={() => setActiveSubItem('archived')}
						/>
					</SidebarItem>
				</SidebarPanelContent>
			</PanelStory>
		);
	},
};

// ============================================
// With Footer
// ============================================

export const WithFooter: Story = {
	name: 'With Footer',
	args: { defaultOpen: true },
	parameters: {
		docs: {
			description: {
				story:
					'Use `SidebarPanelFooter` to pin action buttons, links, or user info to the bottom of the panel.',
			},
			source: {
				code: `
<SidebarPanel>
  <SidebarPanelHeader>
    <SidebarPanelTitle>Dashboard</SidebarPanelTitle>
  </SidebarPanelHeader>
  <SidebarPanelContent>…</SidebarPanelContent>
  <SidebarPanelFooter>
    <Button variant="ghost" size="sm">Help Center</Button>
    <Button variant="ghost" size="sm">Settings</Button>
  </SidebarPanelFooter>
</SidebarPanel>
				`,
				language: 'tsx',
			},
		},
	},
	render: function Render() {
		const [activeItem, setActiveItem] = React.useState('dashboard');

		return (
			<PanelStory>
				<SidebarPanelHeader>
					<SidebarPanelTitle>Dashboard</SidebarPanelTitle>
				</SidebarPanelHeader>

				<SidebarPanelContent>
					<SidebarItem
						label="Dashboard"
						iconOutlined={MdOutlineDashboard}
						iconFilled={MdDashboard}
						isActive={activeItem === 'dashboard'}
						onClick={() => setActiveItem('dashboard')}
					/>
					<SidebarItem
						label="Campaigns"
						iconOutlined={MdOutlineCampaign}
						iconFilled={MdCampaign}
						isActive={activeItem === 'campaigns'}
						onClick={() => setActiveItem('campaigns')}
					/>
					<SidebarItem
						label="Contacts"
						iconOutlined={MdPeopleOutline}
						iconFilled={MdPeople}
						isActive={activeItem === 'contacts'}
						onClick={() => setActiveItem('contacts')}
					/>
				</SidebarPanelContent>

				<SidebarPanelFooter>
					<div className="flex flex-col gap-1">
						<Button variant="ghost" size="sm" className="w-full justify-start gap-2">
							<MdNotificationsNone className="w-4 h-4" />
							Notifications
						</Button>
						<Button variant="ghost" size="sm" className="w-full justify-start gap-2">
							<MdOutlineHelpOutline className="w-4 h-4" />
							Help Center
						</Button>
						<Button variant="ghost" size="sm" className="w-full justify-start gap-2">
							<MdOutlineSettings className="w-4 h-4" />
							Settings
						</Button>
					</div>
				</SidebarPanelFooter>
			</PanelStory>
		);
	},
};

// ============================================
// Collapsed
// ============================================

export const Collapsed: Story = {
	name: 'Collapsed',
	args: { defaultOpen: false },
	parameters: {
		docs: {
			description: {
				story: 'Panel in collapsed state. Click the button to expand.',
			},
		},
	},
	render: () => (
		<PanelStory>
			<SidebarPanelHeader>
				<SidebarPanelTitle>Dashboard</SidebarPanelTitle>
			</SidebarPanelHeader>
			<SidebarPanelContent>
				<SidebarItem label="Overview" />
				<SidebarItem label="Analytics" />
			</SidebarPanelContent>
		</PanelStory>
	),
};

// ============================================
// Custom Animation
// ============================================

export const CustomAnimation: Story = {
	name: 'Custom Animation',
	args: { defaultOpen: true, animationDuration: 600 },
	parameters: {
		docs: {
			description: {
				story: 'Animation duration can be customized via the `animationDuration` prop.',
			},
		},
	},
	render: () => (
		<PanelStory animationDuration={600}>
			<SidebarPanelHeader>
				<SidebarPanelTitle>Slow Animation</SidebarPanelTitle>
			</SidebarPanelHeader>
			<SidebarPanelContent>
				<SidebarItem label="Item 1" />
				<SidebarItem label="Item 2" />
				<SidebarItem label="Item 3" />
			</SidebarPanelContent>
		</PanelStory>
	),
};

// ============================================
// Scrollable Content
// ============================================

export const ScrollableContent: Story = {
	name: 'Scrollable',
	args: { defaultOpen: true },
	parameters: {
		docs: {
			description: {
				story:
					'`SidebarPanelContent` automatically scrolls when content exceeds the viewport. Header and footer stay pinned.',
			},
		},
	},
	render: function Render() {
		const items = Array.from({ length: 20 }, (_, i) => `Navigation Item ${i + 1}`);

		return (
			<PanelStory>
				<SidebarPanelHeader>
					<SidebarPanelTitle>Scrollable</SidebarPanelTitle>
				</SidebarPanelHeader>

				<SidebarPanelContent>
					{items.map((item, index) => (
						<SidebarItem key={index} label={item} />
					))}
				</SidebarPanelContent>

				<SidebarPanelFooter>
					<Button variant="ghost" size="sm" className="w-full justify-start">
						Footer stays pinned
					</Button>
				</SidebarPanelFooter>
			</PanelStory>
		);
	},
};

// ============================================
// Mobile — Sheet Mode (default)
// ============================================

export const MobileSheet: Story = {
	name: 'Mobile Sheet',
	args: { defaultOpen: false },
	parameters: {
		viewport: { defaultViewport: 'mobile1' },
		docs: {
			description: {
				story:
					'On mobile (`< 768px`), the panel renders inside a Sheet overlay. Use the "Open Panel" button to trigger it. The same compound children render inside the Sheet.',
			},
			source: {
				code: `
<SidebarPanel mobileMode="sheet">
  <SidebarPanelHeader>
    <SidebarPanelTitle>Navigation</SidebarPanelTitle>
  </SidebarPanelHeader>
  <SidebarPanelContent>…</SidebarPanelContent>
  <SidebarPanelFooter>…</SidebarPanelFooter>
</SidebarPanel>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<PanelStory mobileMode="sheet">
			<SidebarPanelHeader>
				<SidebarPanelTitle>Navigation</SidebarPanelTitle>
			</SidebarPanelHeader>

			<SidebarPanelContent>
				<SidebarItem label="Dashboard" iconOutlined={MdOutlineDashboard} iconFilled={MdDashboard} isActive />
				<SidebarItem label="Campaigns" iconOutlined={MdOutlineCampaign} iconFilled={MdCampaign} />
				<SidebarItem label="Contacts" iconOutlined={MdPeopleOutline} iconFilled={MdPeople} />
			</SidebarPanelContent>

			<SidebarPanelFooter>
				<Button variant="ghost" size="sm" className="w-full justify-start">
					Settings
				</Button>
			</SidebarPanelFooter>
		</PanelStory>
	),
};

// ============================================
// Mobile — Hidden Mode
// ============================================

export const MobileHidden: Story = {
	name: 'Mobile Hidden',
	args: { defaultOpen: true },
	parameters: {
		viewport: { defaultViewport: 'mobile1' },
		docs: {
			description: {
				story:
					'With `mobileMode="hidden"`, the panel renders **nothing** on mobile. Useful when you want to completely remove the sidebar panel on small screens.',
			},
			source: {
				code: `
<SidebarPanel mobileMode="hidden">
  …
</SidebarPanel>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<PanelStory mobileMode="hidden">
			<SidebarPanelHeader>
				<SidebarPanelTitle>Hidden on mobile</SidebarPanelTitle>
			</SidebarPanelHeader>
			<SidebarPanelContent>
				<SidebarItem label="Dashboard" />
				<SidebarItem label="Contacts" />
			</SidebarPanelContent>
		</PanelStory>
	),
};

// ============================================
// Header Only (no footer)
// ============================================

export const HeaderOnly: Story = {
	name: 'Header Only',
	args: { defaultOpen: true },
	parameters: {
		docs: {
			description: {
				story:
					'Footer is optional. Use only `SidebarPanelHeader` and `SidebarPanelContent` for a minimal layout.',
			},
		},
	},
	render: () => (
		<PanelStory>
			<SidebarPanelHeader>
				<SidebarPanelTitle>Files</SidebarPanelTitle>
			</SidebarPanelHeader>

			<SidebarPanelContent>
				<SidebarItem label="Documents" iconOutlined={MdOutlineFolder} iconFilled={MdFolder} isActive />
				<SidebarItem label="Images" iconOutlined={MdOutlineFolder} iconFilled={MdFolder} />
				<SidebarItem label="Downloads" iconOutlined={MdOutlineFolder} iconFilled={MdFolder} />
			</SidebarPanelContent>
		</PanelStory>
	),
};
