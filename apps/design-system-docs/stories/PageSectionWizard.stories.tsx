import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageSectionWizard as PageSectionWizardBase, Button as ButtonBase } from '@marmoui/ui';

const PageSectionWizard = PageSectionWizardBase as any;
const Button = ButtonBase as any;

const meta = {
	title: 'Components/PageSectionWizard',
	component: PageSectionWizard,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
# PageSectionWizard

A page section variant designed for multi-step wizard flows with progress indication.

## Features
- **Step tracking**: Shows current step and total
- **Navigation**: Back and next buttons
- **Progress**: Visual step indicator
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof PageSectionWizardBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<PageSectionWizard
			pageTitle="Create Campaign"
			currentStep={2}
			totalSteps={4}
			stepLabel="Campaign Details"
		/>
	),
};

export const FirstStep: Story = {
	render: () => (
		<PageSectionWizard
			pageTitle="New Contact"
			currentStep={1}
			totalSteps={3}
			stepLabel="Basic Information"
		/>
	),
};

export const LastStep: Story = {
	render: () => (
		<PageSectionWizard
			pageTitle="Setup Complete"
			currentStep={4}
			totalSteps={4}
			stepLabel="Review & Confirm"
		/>
	),
};
