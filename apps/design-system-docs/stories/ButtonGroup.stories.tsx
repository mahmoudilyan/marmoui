import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup, Button, IconButton } from '@marmoui/ui';
import {
	MdFormatBold,
	MdFormatItalic,
	MdFormatUnderlined,
	MdFormatAlignLeft,
	MdFormatAlignCenter,
	MdFormatAlignRight,
	MdViewList,
	MdViewModule,
	MdViewStream,
} from 'react-icons/md';

const meta = {
	title: 'Components/ButtonGroup',
	component: ButtonGroup,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Button Group

A container component for grouping related buttons together. Supports both attached and detached styles.

## Features

- **Attached mode**: Buttons are visually connected with shared borders
- **Detached mode**: Buttons are separated with consistent spacing
- **Size variants**: xs, sm, default, lg
- **Accessible**: Proper ARIA roles and keyboard navigation
- **Flexible**: Works with regular buttons and icon buttons

## Usage

\`\`\`tsx
import { ButtonGroup, Button, IconButton } from '@marmoui/ui';

// Attached group (default)
<ButtonGroup attached>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>

// Detached group
<ButtonGroup attached={false}>
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</ButtonGroup>

// Icon button group
<ButtonGroup attached>
  <IconButton variant="secondary" icon={<MdFormatBold />} aria-label="Bold" />
  <IconButton variant="secondary" icon={<MdFormatItalic />} aria-label="Italic" />
</ButtonGroup>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		attached: {
			control: 'boolean',
			description: 'Whether buttons are visually attached',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Size of buttons in the group',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
	},
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default
// ============================================

export const Default: Story = {
	name: 'Default',
	args: {
		attached: true,
		children: (
			<>
				<Button variant="secondary">Left</Button>
				<Button variant="secondary">Center</Button>
				<Button variant="secondary">Right</Button>
			</>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Basic button group with attached buttons.',
			},
			source: {
				code: `
<ButtonGroup attached>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<ButtonGroup attached>
			<Button variant="secondary">Left</Button>
			<Button variant="secondary">Center</Button>
			<Button variant="secondary">Right</Button>
		</ButtonGroup>
	),
};

// ============================================
// Attached (Icon Buttons)
// ============================================

export const Attached: Story = {
	name: 'Attached',
	args: {
		attached: true,
		children: (
			<>
				<IconButton variant="secondary" icon={<MdFormatBold />} aria-label="Bold" />
			</>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Attached button groups are ideal for toolbar controls where buttons represent related actions.',
			},
			source: {
				code: `
// Text formatting toolbar
<ButtonGroup attached>
  <IconButton variant="secondary" icon={<MdFormatBold />} aria-label="Bold" />
  <IconButton variant="secondary" icon={<MdFormatItalic />} aria-label="Italic" />
  <IconButton variant="secondary" icon={<MdFormatUnderlined />} aria-label="Underline" />
</ButtonGroup>

// Text alignment
<ButtonGroup attached>
  <IconButton variant="secondary" icon={<MdFormatAlignLeft />} aria-label="Align left" />
  <IconButton variant="secondary" icon={<MdFormatAlignCenter />} aria-label="Align center" />
  <IconButton variant="secondary" icon={<MdFormatAlignRight />} aria-label="Align right" />
</ButtonGroup>

// View options
<ButtonGroup attached>
  <IconButton variant="secondary" icon={<MdViewList />} aria-label="List view" />
  <IconButton variant="secondary" icon={<MdViewModule />} aria-label="Grid view" />
  <IconButton variant="secondary" icon={<MdViewStream />} aria-label="Stream view" />
</ButtonGroup>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="space-y-6">
			<div>
				<h4 className="text-sm font-medium mb-3">Text Formatting</h4>
				<ButtonGroup attached>
					<IconButton variant="secondary" icon={<MdFormatBold />} aria-label="Bold" />
					<IconButton variant="secondary" icon={<MdFormatItalic />} aria-label="Italic" />
					<IconButton variant="secondary" icon={<MdFormatUnderlined />} aria-label="Underline" />
				</ButtonGroup>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">Text Alignment</h4>
				<ButtonGroup attached>
					<IconButton variant="secondary" icon={<MdFormatAlignLeft />} aria-label="Align left" />
					<IconButton
						variant="secondary"
						icon={<MdFormatAlignCenter />}
						aria-label="Align center"
					/>
					<IconButton variant="secondary" icon={<MdFormatAlignRight />} aria-label="Align right" />
				</ButtonGroup>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">View Options</h4>
				<ButtonGroup attached>
					<IconButton variant="secondary" icon={<MdViewList />} aria-label="List view" />
					<IconButton variant="secondary" icon={<MdViewModule />} aria-label="Grid view" />
					<IconButton variant="secondary" icon={<MdViewStream />} aria-label="Stream view" />
				</ButtonGroup>
			</div>
		</div>
	),
};

// ============================================
// Detached
// ============================================

export const Detached: Story = {
	name: 'Detached',
	args: {
		attached: false,
		children: (
			<>
				<Button variant="primary">Save</Button>
				<Button variant="secondary">Cancel</Button>
			</>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Detached button groups maintain consistent spacing between buttons. Use for form actions or dialog buttons.',
			},
			source: {
				code: `
// Form actions
<ButtonGroup attached={false}>
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</ButtonGroup>

// Dialog actions
<ButtonGroup attached={false}>
  <Button variant="destructive">Delete</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</ButtonGroup>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="space-y-6">
			<div>
				<h4 className="text-sm font-medium mb-3">Form Actions</h4>
				<ButtonGroup attached={false}>
					<Button variant="primary">Save</Button>
					<Button variant="secondary">Cancel</Button>
				</ButtonGroup>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">Dialog Actions</h4>
				<ButtonGroup attached={false}>
					<Button variant="destructive">Delete</Button>
					<Button variant="secondary">Cancel</Button>
					<Button variant="primary">Confirm</Button>
				</ButtonGroup>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">Navigation</h4>
				<ButtonGroup attached={false}>
					<Button variant="secondary">Previous</Button>
					<Button variant="secondary">Next</Button>
				</ButtonGroup>
			</div>
		</div>
	),
};

// ============================================
// Sizes
// ============================================

export const Sizes: Story = {
	name: 'Sizes',
	args: {
		attached: true,
		children: (
			<>
				<Button variant="secondary">Left</Button>
				<Button variant="secondary">Right</Button>
			</>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Button groups support multiple sizes to fit different contexts.',
			},
			source: {
				code: `
<ButtonGroup size="xs">
  <Button variant="secondary">XS</Button>
  <Button variant="secondary">Size</Button>
</ButtonGroup>

<ButtonGroup size="sm">
  <Button variant="secondary">Small</Button>
  <Button variant="secondary">Size</Button>
</ButtonGroup>

<ButtonGroup size="md">
  <Button variant="secondary">Default</Button>
  <Button variant="secondary">Size</Button>
</ButtonGroup>

<ButtonGroup size="lg">
  <Button variant="secondary">Large</Button>
  <Button variant="secondary">Size</Button>
</ButtonGroup>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="space-y-6">
			<div>
				<h4 className="text-sm font-medium mb-3">Extra Small</h4>
				<ButtonGroup size="xs">
					<Button variant="secondary">XS</Button>
					<Button variant="secondary">Size</Button>
					<Button variant="secondary">Group</Button>
				</ButtonGroup>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">Small</h4>
				<ButtonGroup size="sm">
					<Button variant="secondary">Small</Button>
					<Button variant="secondary">Size</Button>
					<Button variant="secondary">Group</Button>
				</ButtonGroup>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">Default</h4>
				<ButtonGroup>
					<Button variant="secondary">Default</Button>
					<Button variant="secondary">Size</Button>
					<Button variant="secondary">Group</Button>
				</ButtonGroup>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3">Large</h4>
				<ButtonGroup size="lg">
					<Button variant="secondary">Large</Button>
					<Button variant="secondary">Size</Button>
					<Button variant="secondary">Group</Button>
				</ButtonGroup>
			</div>
		</div>
	),
};

// ============================================
// Toggle State
// ============================================

export const ToggleState: Story = {
	name: 'Toggle State',
	args: {
		attached: true,
		children: (
			<>
				<IconButton variant="secondary" icon={<MdViewList />} aria-label="List view" />
			</>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Button groups can be used for toggle controls. Use variant switching to show active state.',
			},
			source: {
				code: `
const [activeAlign, setActiveAlign] = useState('left');

<ButtonGroup attached>
  <IconButton
    variant={activeAlign === 'left' ? 'primary' : 'secondary'}
    icon={<MdFormatAlignLeft />}
    onClick={() => setActiveAlign('left')}
    aria-label="Align left"
  />
  <IconButton
    variant={activeAlign === 'center' ? 'primary' : 'secondary'}
    icon={<MdFormatAlignCenter />}
    onClick={() => setActiveAlign('center')}
    aria-label="Align center"
  />
  <IconButton
    variant={activeAlign === 'right' ? 'primary' : 'secondary'}
    icon={<MdFormatAlignRight />}
    onClick={() => setActiveAlign('right')}
    aria-label="Align right"
  />
</ButtonGroup>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => {
		const [activeAlign, setActiveAlign] = React.useState('left');
		const [activeView, setActiveView] = React.useState('list');
		const [formatting, setFormatting] = React.useState({
			bold: false,
			italic: false,
			underline: false,
		});

		return (
			<div className="space-y-6">
				<div>
					<h4 className="text-sm font-medium mb-3">Single Select (Alignment)</h4>
					<ButtonGroup attached>
						<IconButton
							variant={'secondary'}
							data-active={activeAlign === 'left'}
							icon={<MdFormatAlignLeft />}
							onClick={() => setActiveAlign('left')}
							aria-label="Align left"
						/>
						<IconButton
							variant={'secondary'}
							data-active={activeAlign === 'center'}
							icon={<MdFormatAlignCenter />}
							onClick={() => setActiveAlign('center')}
							aria-label="Align center"
						/>
						<IconButton
							variant={'secondary'}
							data-active={activeAlign === 'right'}
							icon={<MdFormatAlignRight />}
							onClick={() => setActiveAlign('right')}
							aria-label="Align right"
						/>
					</ButtonGroup>
				</div>

				<div>
					<h4 className="text-sm font-medium mb-3">Multi Select (Formatting)</h4>
					<ButtonGroup attached>
						<IconButton
							variant={'secondary'}
							icon={<MdFormatBold />}
							onClick={() => setFormatting(prev => ({ ...prev, bold: !prev.bold }))}
							aria-label="Bold"
							data-active={formatting.bold}
						/>
						<IconButton
							variant={'secondary'}
							icon={<MdFormatItalic />}
							onClick={() => setFormatting(prev => ({ ...prev, italic: !prev.italic }))}
							aria-label="Italic"
							data-active={formatting.italic}
						/>
						<IconButton
							variant={'secondary'}
							icon={<MdFormatUnderlined />}
							onClick={() => setFormatting(prev => ({ ...prev, underline: !prev.underline }))}
							aria-label="Underline"
							data-active={formatting.underline}
						/>
					</ButtonGroup>
				</div>

				<div>
					<h4 className="text-sm font-medium mb-3">View Type</h4>
					<ButtonGroup attached>
						<IconButton
							variant={'secondary'}
							icon={<MdViewList />}
							data-active={activeView === 'list'}
							onClick={() => setActiveView('list')}
							aria-label="List view"
						/>
						<IconButton
							variant={'secondary'}
							icon={<MdViewModule />}
							data-active={activeView === 'grid'}
							onClick={() => setActiveView('grid')}
							aria-label="Grid view"
						/>
						<IconButton
							variant={'secondary'}
							data-active={activeView === 'stream'}
							icon={<MdViewStream />}
							onClick={() => setActiveView('stream')}
							aria-label="Stream view"
						/>
					</ButtonGroup>
				</div>
			</div>
		);
	},
};
