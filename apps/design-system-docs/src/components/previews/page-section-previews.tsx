'use client';

import React, { useState } from 'react';
import {
	PageSection,
	PageSectionWizard,
	SidebarProvider,
	Button,
} from '@marmoui/ui';
import {
	MdOutlineEdit,
	MdOutlineDelete,
	MdOutlineArchive,
	MdOutlineCopyAll,
} from 'react-icons/md';

// ============================================================================
// PageSection Previews
// ============================================================================

/** Basic page title */
export function PageSectionTitlePreview() {
	return (
		<div className="w-full border border-border rounded-lg overflow-hidden">
			<PageSection pageTitle="Dashboard" />
		</div>
	);
}

/** Breadcrumb navigation */
export function PageSectionBreadcrumbPreview() {
	return (
		<div className="w-full border border-border rounded-lg overflow-hidden">
			<PageSection
				breadcrumbs={[
					{ label: 'Home', href: '#' },
					{ label: 'Projects', href: '#' },
					{ label: 'Website Redesign' },
				]}
			/>
		</div>
	);
}

/** Action buttons */
export function PageSectionActionsPreview() {
	return (
		<div className="w-full border border-border rounded-lg overflow-hidden">
			<PageSection
				pageTitle="User Management"
				primaryAction={{ label: 'Add User', onClick: () => {} }}
				secondaryActions={[
					{ label: 'Import', onClick: () => {} },
					{ label: 'Export', onClick: () => {} },
				]}
				otherActions={[
					{ label: 'Settings', onClick: () => {} },
					{ label: 'Help', onClick: () => {} },
				]}
			/>
		</div>
	);
}

/** Breadcrumb with contextual actions on last item */
export function PageSectionBreadcrumbActionsPreview() {
	return (
		<div className="w-full border border-border rounded-lg overflow-hidden">
			<PageSection
				breadcrumbs={[
					{ label: 'Campaigns', href: '#' },
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
		</div>
	);
}

/** Compact variant — Layout 4 / dual-sidebar */
export function PageSectionCompactVariantPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: false }}>
			<div className="w-full overflow-hidden rounded-lg border border-border">
				<PageSection variant="compact" pageTitle="Projects" />
			</div>
		</SidebarProvider>
	);
}

/** Default variant — brand + search (Layout 1) */
export function PageSectionDefaultVariantPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
			<div className="w-full overflow-hidden rounded-lg border border-border">
				<PageSection
					variant="default"
					breadcrumbs={[{ label: 'Projects' }]}
					searchPlaceholder="Search"
				/>
			</div>
		</SidebarProvider>
	);
}

/** Global variant — horizontal nav (Layout 3) */
export function PageSectionGlobalVariantPreview() {
	return (
		<div className="w-full overflow-hidden rounded-lg border border-border">
			<PageSection
				variant="global"
				globalNavItems={[
					{ label: 'Dashboards', hasMenu: true, isActive: true },
					{ label: 'Components', hasMenu: true },
					{ label: 'Templates', hasMenu: true },
				]}
			/>
		</div>
	);
}

// ============================================================================
// PageSectionWizard Previews
// ============================================================================

/** Basic wizard with step indicators */
export function WizardBasicPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: false }}>
			<div className="w-full border border-border rounded-lg overflow-hidden">
				<PageSectionWizard
					title="Create Campaign"
					currentStep={1}
					totalSteps={4}
					steps={[
						{ id: 'details', label: 'Details' },
						{ id: 'content', label: 'Content' },
						{ id: 'audience', label: 'Audience' },
						{ id: 'review', label: 'Review' },
					]}
				/>
			</div>
		</SidebarProvider>
	);
}

/** Editable title wizard */
export function WizardEditableTitlePreview() {
	const [title, setTitle] = useState('My New Campaign');

	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: false }}>
			<div className="w-full border border-border rounded-lg overflow-hidden">
				<PageSectionWizard
					title={title}
					onTitleChange={setTitle}
					onTitleChangeEnd={(newTitle) => console.log('Saved:', newTitle)}
					titlePlaceholder="Untitled Campaign"
					currentStep={0}
					totalSteps={3}
					steps={[
						{ id: 'details', label: 'Details' },
						{ id: 'content', label: 'Content' },
						{ id: 'review', label: 'Review' },
					]}
				/>
			</div>
		</SidebarProvider>
	);
}

/** Wizard with clickable step navigation */
export function WizardStepNavigationPreview() {
	const [currentStep, setCurrentStep] = useState(2);

	const steps = [
		{ id: 'details', label: 'Details' },
		{ id: 'content', label: 'Content' },
		{ id: 'audience', label: 'Audience' },
		{ id: 'review', label: 'Review' },
	];

	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: false }}>
			<div className="w-full border border-border rounded-lg overflow-hidden">
				<PageSectionWizard
					title="Campaign Builder"
					currentStep={currentStep}
					totalSteps={steps.length}
					steps={steps}
					onStepClick={setCurrentStep}
				/>
			</div>
		</SidebarProvider>
	);
}

/** Simple step counter without labels */
export function WizardStepCounterPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: false }}>
			<div className="w-full border border-border rounded-lg overflow-hidden">
				<PageSectionWizard
					title="Setup Wizard"
					currentStep={2}
					totalSteps={5}
				/>
			</div>
		</SidebarProvider>
	);
}

/** Custom steps content area */
export function WizardCustomStepsPreview() {
	return (
		<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: false }}>
			<div className="w-full border border-border rounded-lg overflow-hidden">
				<PageSectionWizard
					title="Import Contacts"
					stepsContent={
						<div className="flex items-center gap-2">
							<Button variant="secondary" size="sm">Cancel</Button>
							<Button variant="primary" size="sm">Import 234 Contacts</Button>
						</div>
					}
				/>
			</div>
		</SidebarProvider>
	);
}
