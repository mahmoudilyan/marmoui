import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Dialog as DialogBase,
	DialogContent as DialogContentBase,
	DialogHeader as DialogHeaderBase,
	DialogTitle as DialogTitleBase,
	DialogTrigger as DialogTriggerBase,
	Button as ButtonBase,
} from '@marmoui/ui';

const Dialog = DialogBase as any;
const DialogContent = DialogContentBase as any;
const DialogHeader = DialogHeaderBase as any;
const DialogTitle = DialogTitleBase as any;
const DialogTrigger = DialogTriggerBase as any;
const Button = ButtonBase as any;

const meta = {
	title: 'Components/DialogStack',
	component: Dialog,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Dialog Stack

Demonstrates stacking dialogs where one dialog opens another.

## Features
- **Nested dialogs**: Open a dialog from within a dialog
- **Proper focus management**: Each level manages its own focus
- **Backdrop stacking**: Visual depth indication
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DialogBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Open First Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>First Dialog</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-ink-light mb-4">This is the first dialog. You can open another one from here.</p>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Second Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Second Dialog</DialogTitle>
						</DialogHeader>
						<p className="text-sm text-ink-light">This is a nested dialog stacked on top of the first one.</p>
					</DialogContent>
				</Dialog>
			</DialogContent>
		</Dialog>
	),
};
