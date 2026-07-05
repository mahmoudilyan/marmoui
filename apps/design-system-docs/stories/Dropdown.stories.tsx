import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	DropdownMenu,
	DropdownMenuLabel,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuShortcut,
	Button,
	IconButton,
	ButtonGroup,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuContent,
	Avatar,
	AvatarFallback,
} from '@marmoui/ui';
import {
	MdMoreVert,
	MdExpandMore,
	MdEdit,
	MdDelete,
	MdShare,
	MdDownload,
	MdSettings,
	MdVisibility,
	MdContentCopy,
	MdArchive,
	MdPlayArrow,
	MdPause,
	MdRefresh,
	MdPersonAdd,
	MdGroup,
	MdAnalytics,
	MdAttachFile,
	MdTask,
	MdFolder,
} from 'react-icons/md';

const meta = {
	title: 'Components/Dropdown Menu',
	component: DropdownMenu,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Dropdown Menu

Flexible dropdown menu components built on Radix UI primitives, showcasing real-world patterns from the Marmo Campaign application.

## Features

- **Accessible**: Full keyboard navigation and screen reader support
- **Flexible positioning**: Smart placement with collision detection
- **Rich interactions**: Support for various item types (action, checkbox, radio)
- **Nested menus**: Sub-menus for complex navigation structures
- **Shortcuts**: Display keyboard shortcuts and commands
- **Icons**: Support for icons and visual indicators
- **State management**: Built-in selection and callback handling

## Usage

\`\`\`tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from '@marmoui/ui';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`

## Real-world Examples

These examples are based on actual dropdown menus used throughout the Marmo Campaign application, showing common patterns for actions, settings, and user interactions.
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Actions</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<MdEdit className="mr-2" />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>
					<MdContentCopy className="mr-2" />
					Duplicate
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<MdDelete className="mr-2" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

// Based on campaign actions from the real application
export const CampaignActions: Story = {
	render: () => {
		const [campaignStatus, setCampaignStatus] = React.useState<'draft' | 'sent'>('draft');

		const handleAction = (value: string) => {
			console.log('Action selected:', value);
			if (value === 'toggle-status') {
				setCampaignStatus(campaignStatus === 'draft' ? 'sent' : 'draft');
			}
		};

		return (
			<DropdownMenu>
				<ButtonGroup attached>
					{campaignStatus === 'sent' ? (
						<Button variant="secondary" size="sm">
							<MdAnalytics className="mr-2" />
							Analytics
						</Button>
					) : (
						<Button variant="secondary" size="sm">
							<MdEdit className="mr-2" />
							Edit
						</Button>
					)}
					<DropdownMenuTrigger asChild>
						<IconButton variant="secondary" size="sm" icon={<MdExpandMore />} />
					</DropdownMenuTrigger>
				</ButtonGroup>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<MdVisibility className="mr-2" />
						Preview
					</DropdownMenuItem>
					<DropdownMenuItem>
						<MdShare className="mr-2" />
						Public Preview
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<MdEdit className="mr-2" />
						Rename
					</DropdownMenuItem>
					<DropdownMenuItem>
						<MdContentCopy className="mr-2" />
						Copy
					</DropdownMenuItem>
					<DropdownMenuItem>
						<MdGroup className="mr-2" />
						Copy to Account
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<MdAttachFile className="mr-2" />
						Attach to Campaign Group
					</DropdownMenuItem>
					<DropdownMenuItem>
						<MdTask className="mr-2" />
						Add to Task
					</DropdownMenuItem>
					<DropdownMenuItem>
						<MdTask className="mr-2" />
						Create Task
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive">
						<MdDelete className="mr-2" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
};

export const TableRowActions: Story = {
	render: () => {
		const handleAction = (value: string) => {
			alert(`Action: ${value}`);
		};

		return (
			<div className="w-full max-w-2xl">
				<div className="text-sm text-ink-muted mb-4">Example table row with dropdown actions:</div>
				<div className="border rounded-lg bg-panel">
					<div className="flex items-center justify-between p-4">
						<div className="flex items-center space-x-4">
							<div className="h-10 w-10 rounded bg-primary-100 flex items-center justify-center">
								<MdFolder className="w-5 h-5 text-primary-600" />
							</div>
							<div>
								<div className="font-medium text-ink-dark">Summer Campaign 2024</div>
								<div className="text-sm text-ink-light">Email • Created 2 days ago</div>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<IconButton
										variant="ghost"
										icon={<MdMoreVert />}
										aria-label="Row actions"
										size="sm"
									/>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>View Details</DropdownMenuItem>
									<DropdownMenuItem>Edit Campaign</DropdownMenuItem>
									<DropdownMenuItem>Duplicate</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>View Analytics</DropdownMenuItem>
									<DropdownMenuItem>Export Data</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Archive</DropdownMenuItem>
									<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		);
	},
};

export const ViewOptionsMenu: Story = {
	render: () => {
		const [viewOptions, setViewOptions] = React.useState({
			showGrid: true,
			showPreview: false,
			showDetails: true,
			compactMode: false,
		});

		const handleOptionChange = (option: string, checked: boolean) => {
			setViewOptions(prev => ({
				...prev,
				[option]: checked,
			}));
		};

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary">
						<MdSettings className="mr-2" />
						View Options
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Display Options</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem
						checked={viewOptions.showGrid}
						onCheckedChange={checked => handleOptionChange('showGrid', checked)}
					>
						Show Grid View
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={viewOptions.showPreview}
						onCheckedChange={checked => handleOptionChange('showPreview', checked)}
					>
						Show Preview Panel
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={viewOptions.showDetails}
						onCheckedChange={checked => handleOptionChange('showDetails', checked)}
					>
						Show Details
					</DropdownMenuCheckboxItem>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem
						checked={viewOptions.compactMode}
						onCheckedChange={checked => handleOptionChange('compactMode', checked)}
					>
						Compact Mode
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
};

export const UserProfileMenuWithNestedMenu: Story = {
	render: () => {
		const handleAction = (value: string) => {
			if (value === 'logout') {
				alert('Logging out...');
			} else {
				console.log('Profile action:', value);
			}
		};

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar size="md" variant="blue" className="cursor-pointer">
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuItem>
						Profile Settings
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing & Usage
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>Team Management</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Invite Users</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Send Email Invitation</DropdownMenuItem>
							<DropdownMenuItem>Generate Invite Link</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Bulk Import</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuItem>
						Support & Help
						<DropdownMenuShortcut>⌘?</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						Log Out
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
};
