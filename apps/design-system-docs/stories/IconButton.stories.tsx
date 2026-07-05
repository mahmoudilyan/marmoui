import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '@marmoui/ui';
import {
	MdAdd,
	MdEdit,
	MdDelete,
	MdShare,
	MdFavorite,
	MdMoreVert,
	MdClose,
	MdSettings,
	MdSearch,
	MdMenu,
	MdArrowBack,
	MdRefresh,
	MdDownload,
} from 'react-icons/md';

const meta = {
	title: 'Components/Icon Button',
	component: IconButton,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Icon Button

A button component designed specifically for displaying icons. Perfect for toolbars, action menus, and compact interfaces where space is at a premium.

## Features

- **Multiple variants**: Primary, secondary, ghost, destructive, link
- **Size options**: xs, sm, default, lg
- **Loading state**: Shows spinning refresh icon
- **Accessible**: Proper ARIA labels and focus management
- **Flexible**: Works with any React icon library
- **Consistent**: Uses same styling system as regular buttons

## Usage

\`\`\`tsx
import { IconButton } from '@marmoui/ui';
import { MdAdd } from 'react-icons/md';

// Basic icon button
<IconButton 
  icon={<MdAdd />} 
  aria-label="Add item" 
/>

// With variant and size
<IconButton 
  variant="primary" 
  size="lg"
  icon={<MdAdd />}
  aria-label="Add item"
/>
\`\`\`

## Accessibility

Always provide an \`aria-label\` or \`aria-labelledby\` attribute to describe the button's purpose for screen readers.
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'ghost', 'destructive', 'link'],
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'default', 'lg'],
		},
		loading: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
	args: {
		icon: <MdAdd />,
		'aria-label': 'Add item',
	},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'primary',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<div className="flex flex-col items-center gap-2">
				<IconButton variant="primary" icon={<MdAdd />} aria-label="Add" />
				<span className="text-xs text-ink-light">Primary</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton variant="secondary" icon={<MdEdit />} aria-label="Edit" />
				<span className="text-xs text-ink-light">Secondary</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton variant="ghost" icon={<MdShare />} aria-label="Share" />
				<span className="text-xs text-ink-light">Ghost</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton variant="destructive" icon={<MdDelete />} aria-label="Delete" />
				<span className="text-xs text-ink-light">Destructive</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton variant="link" icon={<MdShare />} aria-label="Share" />
				<span className="text-xs text-ink-light">Link</span>
			</div>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-end gap-4">
			<div className="flex flex-col items-center gap-2">
				<IconButton size="xs" variant="secondary" icon={<MdAdd />} aria-label="Add" />
				<span className="text-xs text-ink-light">XS</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton size="sm" variant="secondary" icon={<MdAdd />} aria-label="Add" />
				<span className="text-xs text-ink-light">SM</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton size="md" variant="secondary" icon={<MdAdd />} aria-label="Add" />
				<span className="text-xs text-ink-light">Default</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton size="lg" variant="secondary" icon={<MdAdd />} aria-label="Add" />
				<span className="text-xs text-ink-light">LG</span>
			</div>
		</div>
	),
};

export const LoadingState: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<div className="flex flex-col items-center gap-2">
				<IconButton variant="primary" icon={<MdRefresh />} loading aria-label="Refreshing" />
				<span className="text-xs text-ink-light">Loading</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton variant="secondary" icon={<MdDownload />} loading aria-label="Downloading" />
				<span className="text-xs text-ink-light">Loading</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<IconButton variant="ghost" icon={<MdRefresh />} loading aria-label="Refreshing" />
				<span className="text-xs text-ink-light">Loading</span>
			</div>
		</div>
	),
};

export const DisabledState: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<IconButton variant="primary" icon={<MdAdd />} disabled aria-label="Add (disabled)" />
			<IconButton variant="secondary" icon={<MdEdit />} disabled aria-label="Edit (disabled)" />
			<IconButton variant="ghost" icon={<MdShare />} disabled aria-label="Share (disabled)" />
			<IconButton
				variant="destructive"
				icon={<MdDelete />}
				disabled
				aria-label="Delete (disabled)"
			/>
		</div>
	),
};

export const CommonIcons: Story = {
	render: () => (
		<div className="grid grid-cols-5 gap-4">
			{[
				{ icon: MdAdd, label: 'Add' },
				{ icon: MdEdit, label: 'Edit' },
				{ icon: MdDelete, label: 'Delete' },
				{ icon: MdShare, label: 'Share' },
				{ icon: MdFavorite, label: 'Favorite' },
				{ icon: MdMoreVert, label: 'More options' },
				{ icon: MdClose, label: 'Close' },
				{ icon: MdSettings, label: 'Settings' },
				{ icon: MdSearch, label: 'Search' },
				{ icon: MdMenu, label: 'Menu' },
				{ icon: MdArrowBack, label: 'Back' },
				{ icon: MdRefresh, label: 'Refresh' },
				{ icon: MdDownload, label: 'Download' },
			].map(({ icon: Icon, label }) => (
				<div key={label} className="flex flex-col items-center gap-2">
					<IconButton variant="secondary" icon={<Icon />} aria-label={label} />
					<span className="text-xs text-ink-light text-center">{label}</span>
				</div>
			))}
		</div>
	),
};

export const ToolbarActions: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h4 className="text-sm font-medium mb-3">Navigation Bar</h4>
				<div className="flex items-center justify-between p-3 border rounded-lg bg-panel">
					<div className="flex items-center gap-1">
						<IconButton variant="ghost" size="sm" icon={<MdMenu />} aria-label="Menu" />
						<IconButton variant="ghost" size="sm" icon={<MdArrowBack />} aria-label="Back" />
					</div>
					<div className="flex items-center gap-1">
						<IconButton variant="ghost" size="sm" icon={<MdSearch />} aria-label="Search" />
						<IconButton variant="ghost" size="sm" icon={<MdSettings />} aria-label="Settings" />
						<IconButton variant="ghost" size="sm" icon={<MdMoreVert />} aria-label="More options" />
					</div>
				</div>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">Card Actions</h4>
				<div className="border rounded-lg p-4 bg-panel">
					<div className="flex items-start justify-between mb-3">
						<div>
							<h5 className="font-medium">Project Title</h5>
							<p className="text-sm text-ink-light">Last updated 2 hours ago</p>
						</div>
						<div className="flex items-center gap-1">
							<IconButton
								variant="ghost"
								size="xs"
								icon={<MdFavorite />}
								aria-label="Add to favorites"
							/>
							<IconButton variant="ghost" size="xs" icon={<MdShare />} aria-label="Share" />
							<IconButton
								variant="ghost"
								size="xs"
								icon={<MdMoreVert />}
								aria-label="More options"
							/>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<IconButton variant="secondary" size="sm" icon={<MdEdit />} aria-label="Edit project" />
						<IconButton
							variant="secondary"
							size="sm"
							icon={<MdDownload />}
							aria-label="Download project"
						/>
						<IconButton
							variant="destructive"
							size="sm"
							icon={<MdDelete />}
							aria-label="Delete project"
						/>
					</div>
				</div>
			</div>
		</div>
	),
};

export const InFormContext: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h4 className="text-sm font-medium mb-3">Form Input with Actions</h4>
				<div className="flex items-center gap-2 p-3 border rounded-lg">
					<input
						type="text"
						placeholder="Search..."
						className="flex-1 outline-none bg-transparent"
					/>
					<IconButton variant="ghost" size="sm" icon={<MdSearch />} aria-label="Search" />
					<IconButton variant="ghost" size="sm" icon={<MdClose />} aria-label="Clear" />
				</div>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">Upload Field</h4>
				<div className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg">
					<div className="flex-1 text-sm text-ink-light">No file selected</div>
					<IconButton variant="primary" icon={<MdAdd />} aria-label="Add file" />
				</div>
			</div>
		</div>
	),
};
