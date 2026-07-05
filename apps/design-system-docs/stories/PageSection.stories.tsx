import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageSection, PageSectionWizard, Stepper, StepperContent, Button } from '@marmoui/ui';
import { MdOutlineEdit, MdOutlineDelete, MdOutlineArchive, MdOutlineCopyAll } from 'react-icons/md';

const meta = {
	title: 'Layout/Page Section',
	component: PageSection,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
# Page Section

A layout component for page headers with breadcrumb navigation, titles, and action buttons.

## Features

- **Breadcrumb navigation**: Hierarchical navigation with clickable links
- **Page titles**: Support for both standalone titles and breadcrumb-based titles
- **Action buttons**: Primary and secondary actions with overflow menu
- **Wizard variant**: Specialized layout for multi-step forms

## Usage

\`\`\`tsx
import { PageSection, PageSectionWizard } from '@marmoui/ui';

// Basic page with title
<PageSection pageTitle="Dashboard" />

// With breadcrumbs and actions
<PageSection
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Website Redesign' }
  ]}
  primaryAction={{
    label: 'Save Changes',
    onClick: () => {}
  }}
/>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		pageTitle: {
			control: 'text',
			description: 'Page title displayed in the header',
		},
		showSidebarToggle: {
			control: 'boolean',
			description: 'Whether to show sidebar toggle button',
		},
	},
} satisfies Meta<typeof PageSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default
// ============================================

export const Default: Story = {
	name: 'Default',
	args: {
		pageTitle: 'Dashboard',
	},
	parameters: {
		docs: {
			description: {
				story: 'Basic page section with a title.',
			},
			source: {
				code: `<PageSection pageTitle="Dashboard" />`,
				language: 'tsx',
			},
		},
	},
	render: args => (
		<div className="bg-panel min-h-[200px]">
			<PageSection {...args} />
		</div>
	),
};

// ============================================
// With Breadcrumbs
// ============================================

export const WithBreadcrumbs: Story = {
	name: 'With Breadcrumbs',
	args: {
		pageTitle: 'Website Redesign',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Page section with breadcrumb navigation. The last breadcrumb becomes the page title.',
			},
			source: {
				code: `
<PageSection
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Website Redesign' },
  ]}
/>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-panel min-h-[200px]">
			<PageSection
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Projects', href: '/projects' },
					{ label: 'Website Redesign' },
				]}
			/>
		</div>
	),
};

// ============================================
// With Actions
// ============================================

export const WithActions: Story = {
	name: 'With Actions',
	args: {
		pageTitle: 'User Management',
	},
	parameters: {
		docs: {
			description: {
				story: 'Page section with primary, secondary, and overflow actions.',
			},
			source: {
				code: `
<PageSection
  pageTitle="User Management"
  primaryAction={{
    label: 'Add User',
    href: '/add-user',
    onClick: () => {},
  }}
  secondaryActions={[
    { label: 'Import Users', onClick: () => {} },
    { label: 'Export CSV', onClick: () => {} },
  ]}
  otherActions={[
    { label: 'Settings', onClick: () => {} },
    { label: 'Help', onClick: () => {} },
  ]}
/>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-panel min-h-[200px]">
			<PageSection
				pageTitle="User Management"
				primaryAction={{
					label: 'Add User',
					href: '/add-user',
					onClick: () => alert('Add user clicked'),
				}}
				secondaryActions={[
					{ label: 'Import Users', onClick: () => alert('Import clicked') },
					{ label: 'Export CSV', onClick: () => alert('Export clicked') },
				]}
				otherActions={[
					{ label: 'Settings', onClick: () => alert('Settings clicked') },
					{ label: 'Help', onClick: () => alert('Help clicked') },
				]}
			/>
		</div>
	),
};

// ============================================
// Breadcrumb Actions
// ============================================

export const WithBreadcrumbActions: Story = {
	name: 'Breadcrumb Actions',
	args: {
		pageTitle: 'Summer Sale Campaign',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Breadcrumbs can have dropdown actions. When the last breadcrumb has actions, a menu appears next to the title.',
			},
			source: {
				code: `
<PageSection
  breadcrumbs={[
    { label: 'Campaigns', href: '/campaigns' },
    {
      label: 'Summer Sale Campaign',
      actions: [
        { label: 'Rename', icon: <MdOutlineEdit />, onClick: () => {} },
        { label: 'Duplicate', icon: <MdOutlineCopyAll />, onClick: () => {} },
        { label: 'Archive', icon: <MdOutlineArchive />, onClick: () => {} },
        { label: 'Delete', icon: <MdOutlineDelete />, isDelete: true, onClick: () => {} },
      ],
    },
  ]}
  primaryAction={{ label: 'Save Changes', onClick: () => {} }}
/>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-panel min-h-[200px]">
			<PageSection
				breadcrumbs={[
					{ label: 'Campaigns', href: '/campaigns' },
					{
						label: 'Summer Sale Campaign',
						actions: [
							{ label: 'Rename', icon: <MdOutlineEdit />, onClick: () => alert('Rename clicked') },
							{
								label: 'Duplicate',
								icon: <MdOutlineCopyAll />,
								onClick: () => alert('Duplicate clicked'),
							},
							{
								label: 'Archive',
								icon: <MdOutlineArchive />,
								onClick: () => alert('Archive clicked'),
							},
							{
								label: 'Delete',
								icon: <MdOutlineDelete />,
								isDelete: true,
								onClick: () => alert('Delete clicked'),
							},
						],
					},
				]}
				primaryAction={{ label: 'Save Changes', onClick: () => alert('Save clicked') }}
			/>
		</div>
	),
};

// ============================================
// Wizard Default
// ============================================

export const WizardDefault: Story = {
	name: 'Wizard',
	args: {
		pageTitle: 'Create Campaign',
	},
	parameters: {
		docs: {
			description: {
				story: 'Wizard variant for multi-step forms with progress indicator.',
			},
			source: {
				code: `
<PageSectionWizard
  title="Create Campaign"
  currentStep={1}
  totalSteps={4}
  steps={[
    { id: 'details', label: 'Campaign Details' },
    { id: 'content', label: 'Email Content' },
    { id: 'audience', label: 'Select Audience' },
    { id: 'review', label: 'Review & Send' },
  ]}
/>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="bg-bg min-h-[200px]">
			<PageSectionWizard
				title="Create Campaign"
				currentStep={1}
				totalSteps={4}
				steps={[
					{ id: 'details', label: 'Campaign Details' },
					{ id: 'content', label: 'Email Content' },
					{ id: 'audience', label: 'Select Audience' },
					{ id: 'review', label: 'Review & Send' },
				]}
			/>
		</div>
	),
};

// ============================================
// Wizard Editable Title
// ============================================

function WizardEditableDemo() {
	const [title, setTitle] = useState('My New Campaign');
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{ id: 'details', label: 'Details' },
		{ id: 'content', label: 'Content' },
		{ id: 'audience', label: 'Audience' },
		{ id: 'review', label: 'Review' },
	];

	return (
		<div className="bg-bg min-h-[300px]">
			<PageSectionWizard
				title={title}
				onTitleChange={setTitle}
				onTitleChangeEnd={newTitle => console.log('Title saved:', newTitle)}
				currentStep={currentStep}
				totalSteps={steps.length}
				steps={steps}
				onStepClick={setCurrentStep}
			/>
			<div className="p-8">
				<div className="bg-panel rounded-lg p-6 border border-border">
					<h2 className="text-lg font-semibold mb-4">{steps[currentStep].label}</h2>
					<p className="text-muted-foreground">
						Content for step {currentStep + 1}: {steps[currentStep].label}
					</p>
					<div className="mt-6 flex gap-2">
						<Button
							variant="secondary"
							onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
							disabled={currentStep === 0}
						>
							Previous
						</Button>
						<Button
							variant="primary"
							onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
							disabled={currentStep === steps.length - 1}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export const WizardEditableTitle: Story = {
	name: 'Wizard Editable Title',
	args: {
		pageTitle: 'My New Campaign',
	},
	parameters: {
		docs: {
			description: {
				story:
					'When `onTitleChange` is provided, the title becomes editable. Click the title or edit icon to start editing.',
			},
			source: {
				code: `
const [title, setTitle] = useState('My New Campaign');

<PageSectionWizard
  title={title}
  onTitleChange={setTitle}
  onTitleChangeEnd={(newTitle) => console.log('Title saved:', newTitle)}
  currentStep={0}
  totalSteps={4}
  steps={steps}
  onStepClick={setCurrentStep}
/>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => <WizardEditableDemo />,
};

// ============================================
// Wizard With Stepper Context
// ============================================
