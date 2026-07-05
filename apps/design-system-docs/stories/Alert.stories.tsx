import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert as AlertBase } from '@marmoui/ui';
import { MdInfo, MdWarning, MdCheckCircle, MdError } from 'react-icons/md';

const Alert = AlertBase as any;

const meta = {
	title: 'Components/Alert',
	component: Alert,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
# Alert

Displays contextual feedback messages for user actions or system status.

## Features
- **Multiple variants**: Info, success, warning, destructive
- **Icon support**: Custom or automatic icons
- **Closeable**: Optional dismiss button
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['info', 'success', 'warning', 'destructive'],
		},
	},
} satisfies Meta<typeof AlertBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'This is an informational alert message.',
		variant: 'info',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-[500px]">
			<Alert variant="info">This is an info alert — check it out!</Alert>
			<Alert variant="success">This is a success alert — well done!</Alert>
			<Alert variant="warning">This is a warning alert — be careful!</Alert>
			<Alert variant="destructive">This is an error alert — something went wrong!</Alert>
		</div>
	),
};

export const WithTitle: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-[500px]">
			<Alert variant="info" title="Heads up!">
				You can add components to your app using the CLI.
			</Alert>
			<Alert variant="success" title="Success!">
				Your changes have been saved.
			</Alert>
			<Alert variant="warning" title="Warning">
				Your session is about to expire.
			</Alert>
			<Alert variant="destructive" title="Error">
				Your session has expired. Please log in again.
			</Alert>
		</div>
	),
};
