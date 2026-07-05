'use client';

import { PageSection, PageSectionWizard } from '@marmoui/ui';
import { InteractiveCodeExample } from './interactive-code-example';

/**
 * Pre-built PageSection examples with onClick handlers
 * All JSX is created entirely on the client side to avoid serialization issues
 */

export function PageSectionWithActionsExample() {
	return (
		<InteractiveCodeExample
			title="Page with Actions"
			description="Primary and secondary actions for the page"
			code={`<PageSection
  pageTitle="User Management"
  primaryAction={{
    label: 'Add User',
    onClick: () => console.log('Add User clicked')
  }}
  secondaryActions={[
    {
      label: 'Import Users',
      href: '/import-users',
      onClick: () => console.log('Import Users clicked')
    },
    {
      label: 'Export CSV',
      href: '/export-csv',
      onClick: () => console.log('Export CSV clicked')
    }
  ]}
/>`}
		>
			<div className="bg-bg p-4 rounded-lg">
				<PageSection
					pageTitle="User Management"
					primaryAction={{
						label: 'Add User',
						onClick: () => console.log('Add User clicked'),
					}}
					secondaryActions={[
						{
							label: 'Import Users',
							href: '/import-users',
							onClick: () => console.log('Import Users clicked'),
						},
						{
							label: 'Export CSV',
							href: '/export-csv',
							onClick: () => console.log('Export CSV clicked'),
						},
					]}
				/>
			</div>
		</InteractiveCodeExample>
	);
}

export function PageSectionWithOverflowExample() {
	return (
		<InteractiveCodeExample
			title="Actions with Overflow"
			description="Additional actions in an overflow menu"
			code={`<PageSection
  pageTitle="Project Settings"
  primaryAction={{
    label: 'Save Changes',
    onClick: () => console.log('Save clicked')
  }}
  secondaryActions={[
    { label: 'Preview', href: '/preview', onClick: () => console.log('Preview clicked') }
  ]}
  otherActions={[
    { label: 'Settings', onClick: () => console.log('Settings clicked') },
    { label: 'Help', onClick: () => console.log('Help clicked') },
    { label: 'Archive Project', onClick: () => console.log('Archive clicked') }
  ]}
/>`}
		>
			<div className="bg-bg p-4 rounded-lg">
				<PageSection
					pageTitle="Project Settings"
					primaryAction={{
						label: 'Save Changes',
						onClick: () => console.log('Save clicked'),
					}}
					secondaryActions={[
						{ label: 'Preview', href: '/preview', onClick: () => console.log('Preview clicked') },
					]}
					otherActions={[
						{ label: 'Settings', onClick: () => console.log('Settings clicked') },
						{ label: 'Help', onClick: () => console.log('Help clicked') },
						{ label: 'Archive Project', onClick: () => console.log('Archive clicked') },
					]}
				/>
			</div>
		</InteractiveCodeExample>
	);
}

export function PageSectionWithSidebarToggleExample() {
	return (
		<InteractiveCodeExample
			title="Sidebar Integration"
			description="Show sidebar toggle button for mobile navigation"
			code={`<PageSection
  pageTitle="Dashboard"
  showSidebarToggle
/>`}
		>
			<div className="bg-bg p-4 rounded-lg">
				<PageSection pageTitle="Dashboard" showSidebarToggle />
			</div>
		</InteractiveCodeExample>
	);
}

export function PageSectionWizardExample() {
	return (
		<InteractiveCodeExample
			title="Wizard Layout"
			description="Specialized layout for multi-step forms with editable title and step indicators"
			code={`<PageSectionWizard
  title="New Campaign"
  onTitleChange={(newTitle) => console.log('Title changed:', newTitle)}
  steps={[
    { id: 'details', label: 'Details' },
    { id: 'audience', label: 'Audience' },
    { id: 'content', label: 'Content' },
    { id: 'review', label: 'Review' }
  ]}
  currentStep={1}
  totalSteps={4}
  onStepClick={(step) => console.log('Step clicked:', step)}
/>`}
		>
			<div className="bg-bg p-4 rounded-lg">
				<PageSectionWizard
					title="New Campaign"
					onTitleChange={newTitle => console.log('Title changed:', newTitle)}
					steps={[
						{ id: 'details', label: 'Details' },
						{ id: 'audience', label: 'Audience' },
						{ id: 'content', label: 'Content' },
						{ id: 'review', label: 'Review' },
					]}
					currentStep={1}
					totalSteps={4}
					onStepClick={step => console.log('Step clicked:', step)}
				/>
			</div>
		</InteractiveCodeExample>
	);
}
