import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Tooltip as TooltipBase,
	TooltipContent as TooltipContentBase,
	TooltipProvider as TooltipProviderBase,
	TooltipTrigger as TooltipTriggerBase,
	Button as ButtonBase,
} from '@marmoui/ui';
import { MdInfo, MdHelp, MdSettings } from 'react-icons/md';

const Tooltip = TooltipBase as any;
const TooltipContent = TooltipContentBase as any;
const TooltipProvider = TooltipProviderBase as any;
const TooltipTrigger = TooltipTriggerBase as any;
const Button = ButtonBase as any;

const meta = {
	title: 'Components/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Tooltip

A popup that displays informative text when hovering or focusing an element.

## Features
- **Multiple positions**: Top, bottom, left, right
- **Accessible**: Keyboard and screen reader support
- **Customizable delay**: Control open/close timing
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TooltipBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="outline">Hover me</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>This is a tooltip</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	),
};

export const Positions: Story = {
	render: () => (
		<TooltipProvider>
			<div className="flex items-center gap-4">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline" size="sm">Top</Button>
					</TooltipTrigger>
					<TooltipContent side="top">Tooltip on top</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline" size="sm">Bottom</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline" size="sm">Left</Button>
					</TooltipTrigger>
					<TooltipContent side="left">Tooltip on left</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline" size="sm">Right</Button>
					</TooltipTrigger>
					<TooltipContent side="right">Tooltip on right</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	),
};

export const WithIcon: Story = {
	render: () => (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<button className="text-ink-light hover:text-ink">
						<MdHelp size={20} />
					</button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Click here for more information</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	),
};
