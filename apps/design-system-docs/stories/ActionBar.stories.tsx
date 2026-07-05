import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	ActionBarRoot as ActionBarRootBase,
	ActionBarContent as ActionBarContentBase,
	ActionBarCloseTrigger as ActionBarCloseTriggerBase,
	ActionBarSelectionTrigger as ActionBarSelectionTriggerBase,
	ActionBarSeparator as ActionBarSeparatorBase,
	Button as ButtonBase,
} from '@marmoui/ui';
import { MdDelete, MdEdit, MdArchive, MdEmail } from 'react-icons/md';

const ActionBarRoot = ActionBarRootBase as any;
const ActionBarContent = ActionBarContentBase as any;
const ActionBarCloseTrigger = ActionBarCloseTriggerBase as any;
const ActionBarSelectionTrigger = ActionBarSelectionTriggerBase as any;
const ActionBarSeparator = ActionBarSeparatorBase as any;
const Button = ButtonBase as any;

const meta = {
	title: 'Components/ActionBar',
	component: ActionBarRoot,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# ActionBar

A floating action bar that appears when items are selected, providing bulk actions.

## Features
- **Contextual actions**: Shows relevant bulk operations
- **Selection count**: Displays number of selected items
- **Dismissible**: Close with button or Escape key
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ActionBarRootBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ActionBarRoot>
			<ActionBarContent>
				<ActionBarSelectionTrigger className="text-sm font-medium">
					3 selected
				</ActionBarSelectionTrigger>
				<ActionBarSeparator />
				<Button variant="ghost" size="sm">
					<MdEmail className="mr-1" size={16} /> Email
				</Button>
				<Button variant="ghost" size="sm">
					<MdEdit className="mr-1" size={16} /> Edit
				</Button>
				<Button variant="ghost" size="sm">
					<MdArchive className="mr-1" size={16} /> Archive
				</Button>
				<Button variant="ghost" size="sm" className="text-destructive">
					<MdDelete className="mr-1" size={16} /> Delete
				</Button>
				<ActionBarSeparator />
				<ActionBarCloseTrigger />
			</ActionBarContent>
		</ActionBarRoot>
	),
};
