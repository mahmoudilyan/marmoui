import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Dialog as DialogBase,
	DialogContent as DialogContentBase,
	DialogDescription as DialogDescriptionBase,
	DialogFooter as DialogFooterBase,
	DialogHeader as DialogHeaderBase,
	DialogTitle as DialogTitleBase,
	DialogTrigger as DialogTriggerBase,
	Button as ButtonBase,
	Input as InputBase,
	Select as SelectBase,
	SelectContent as SelectContentBase,
	SelectItem as SelectItemBase,
	SelectTrigger as SelectTriggerBase,
	SelectValue as SelectValueBase,
	Text as TextBase,
} from '@marmoui/ui';
import { MdWarning, MdDelete, MdAdd, MdFolder } from 'react-icons/md';

// Type assertions to fix React 19 compatibility
const Dialog = DialogBase as any;
const DialogContent = DialogContentBase as any;
const DialogDescription = DialogDescriptionBase as any;
const DialogFooter = DialogFooterBase as any;
const DialogHeader = DialogHeaderBase as any;
const DialogTitle = DialogTitleBase as any;
const DialogTrigger = DialogTriggerBase as any;
const Button = ButtonBase as any;
const Input = InputBase as any;
const Select = SelectBase as any;
const SelectContent = SelectContentBase as any;
const SelectItem = SelectItemBase as any;
const SelectTrigger = SelectTriggerBase as any;
const SelectValue = SelectValueBase as any;
const Text = TextBase as any;

const meta = {
	title: 'Components/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Dialog

A comprehensive dialog system built on Radix UI primitives, showcasing real-world examples from common application workflows.

## Features

- **Accessible**: Full keyboard navigation and screen reader support
- **Focus management**: Traps focus within the dialog
- **Backdrop**: Overlay prevents interaction with background content
- **Animations**: Smooth open/close transitions
- **Flexible sizing**: Adapts to content with maximum width constraints
- **Close handling**: ESC key and backdrop click to close
- **Customizable**: Optional close button and custom styling

## Common Dialog Patterns

These examples are based on real dialog components used throughout the application:

- **Confirmation dialogs**: Delete confirmations with warnings
- **Form dialogs**: Create and edit workflows
- **Complex workflows**: Multi-step processes and advanced forms
- **Utility dialogs**: Email sending, folder management, etc.

## Usage

\`\`\`tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@marmoui/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text goes here.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="primary">Open Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Basic Dialog</DialogTitle>
					<DialogDescription>
						This is a simple dialog with a title, description, and action buttons.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="secondary">Cancel</Button>
					<Button variant="primary">Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

// Based on delete-folder-dialog.tsx
export const DeleteFolderConfirmation: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" leftIcon={<MdDelete />}>
					Delete Folder
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Folder</DialogTitle>
					<DialogDescription>Are you sure you want to delete this folder?</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="secondary">Cancel</Button>
					<Button variant="destructive">Delete</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};
